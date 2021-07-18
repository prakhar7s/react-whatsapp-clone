import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, MoreVert, SearchOutlined } from "@material-ui/icons";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import firebase, { firestore } from "../../firebase/firebase";
import DeleteIcon from "@material-ui/icons/Delete";
import Sidebar from "../Sidebar/Sidebar";

const CURRENT_USER_ID = "EwdWhtNpLeeWlIZ6MHde";

export default function Chat(props) {
  const [chatMsgs, setChatMsgs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentMsgID, setCurrentMsgID] = useState(null);
  const chatMsgsBodyRef = useRef();

  const convoID = `${CURRENT_USER_ID}:${currentMsgID}`;

  useEffect(() => {
    setCurrentMsgID(props.location.search.split("id=")[1]);

    const unsub = firestore
      .collection("messages")
      .doc(convoID)
      .collection(convoID)
      .orderBy("timestamp", "asc")
      .onSnapshot((d) => {
        setChatMsgs(d.docs.map((msg) => ({ id: msg.id, ...msg.data() })));
        setIsLoading(false);
      });

    return unsub;
  }, [props]);

  const saveMsgInDB = (e) => {
    e.preventDefault();

    const userMsg = e.target.msg.value;

    if (!userMsg) return;

    firestore
      .collection("messages")
      .doc(convoID)
      .collection(convoID)
      .doc()
      .set({
        userMsg,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        // Msg saved
        firestore
          .collection("messages")
          .doc(convoID)
          .get()
          .then((d) => {
            d.ref.set({
              lastMessage: {
                userMsg,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              },
            });
          });
      })
      .catch((err) => console.error(err));

    e.target.reset();
  };

  useEffect(() => {
    chatMsgsBodyRef.current &&
      (chatMsgsBodyRef.current.scrollTop =
        chatMsgsBodyRef.current.scrollHeight);
  }, [chatMsgs]);

  const deleteMsg = (id) => {
    firestore
      .collection("messages")
      .doc(id)
      .get()
      .then((doc) => {
        doc.ref.delete();
        //deleted successfully
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="chat__container">
      <Sidebar />

      {currentMsgID && (
        <div className="chat">
          <div className="chat__header">
            <Avatar />
            <div className="chat__headerInfo">
              <h3>Room name</h3>
              <p>last seen at .....</p>
            </div>
            <div className="chat__headerRight">
              <IconButton>
                <SearchOutlined />
              </IconButton>
              <IconButton>
                <AttachFile />
              </IconButton>
              <IconButton>
                <MoreVert />
              </IconButton>
            </div>
          </div>

          <div ref={chatMsgsBodyRef} className="chat__body">
            {chatMsgs.map((chatMsg) => (
              <div key={chatMsg.id} className="chat__message">
                <span className="chat__name">Prakhar</span>
                {chatMsg.userMsg}
                <span className="chat__timestamp">
                  {chatMsg.timestamp &&
                    chatMsg.timestamp.toDate().toLocaleTimeString()}
                </span>

                <div className="chat__message-delBtn">
                  <IconButton onClick={() => deleteMsg(chatMsg.id)}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              </div>
            ))}

            <div
              className={`chat__body--loading${isLoading ? " showLoader" : ""}`}
            >
              Loading Chat Msgs
            </div>
          </div>

          <div className="chat__footer">
            <InsertEmoticonIcon />
            <form onSubmit={saveMsgInDB}>
              <input placeholder="Type a message...." type="text" name="msg" />
              <button type="submit">Send a message</button>
            </form>
            <MicIcon />
          </div>
        </div>
      )}
    </div>
  );
}
