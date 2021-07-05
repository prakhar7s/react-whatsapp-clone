import React, { useEffect, useState } from "react";
import "./SidebarChat.css";
import { Avatar } from "@material-ui/core";
import { firestore } from "../../firebase/firebase";
export default function SidebarChat() {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    firestore.collection("users").onSnapshot((d) => {
      setConversations(
        d.docs.map((conversation) => ({
          id: conversation.id,
          ...conversation.data(),
        }))
      );
    });
  }, []);

  return (
    <div className="sidebar__chats">
      {conversations.map(({ id, username }) => (
        <div key={id} className="sidebarChat">
          <Avatar />
          <div className="sidebarChat__info">
            <h2>{username}</h2>
            <p>This is the last message.</p>
          </div>
        </div>
      ))}
    </div>
  );
}
