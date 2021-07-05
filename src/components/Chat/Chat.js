import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, MoreVert, SearchOutlined } from "@material-ui/icons";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import firebase, { firestore } from "../../firebase/firebase";

export default function Chat() {
  const [chatMsgs, setChatMsgs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const chatMsgsBodyRef = useRef();

  useEffect(() => {
    const unsub = firestore
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((d) => {
        setChatMsgs(d.docs.map((msg) => ({ id: msg.id, ...msg.data() })));
        setIsLoading(false);
      });

    return unsub;
  }, []);

  const saveMsgInDB = (e) => {
    e.preventDefault();

    const userMsg = e.target.msg.value;

    if (!userMsg) return;

    firestore
      .collection("messages")
      .doc()
      .set({
        userMsg,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        // Msg saved

        console.log();
      })
      .catch((err) => console.error(err));

    e.target.reset();
  };

  useEffect(() => {
    chatMsgsBodyRef.current &&
      (chatMsgsBodyRef.current.scrollTop =
        chatMsgsBodyRef.current.scrollHeight);
  }, [chatMsgs]);

  return (
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
          <p key={chatMsg.id} className="chat__message">
            <span className="chat__name">Prakhar</span>
            {chatMsg.userMsg}
            <span className="chat__timestamp">
              {/* {console.log(chatMsg.timestamp)} */}
              {chatMsg.timestamp &&
                chatMsg.timestamp.toDate().toLocaleTimeString()}
            </span>
          </p>
        ))}

        <div className={`chat__body--loading${isLoading ? " showLoader" : ""}`}>
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
  );
}
