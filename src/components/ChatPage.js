import React, { useEffect, useState, useRef } from "react";
import ChatBar from "./ChatBar";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";

const ChatPage = ({
  socket,
  nameData,
  setNameData,
  changeName,
  setChangeName,
}) => {
  const [messages, setMessages] = useState([]);
  const [typingStatus, setTypingStatus] = useState("");
  const lastMessageRef = useRef(null);

  useEffect(() => {
    socket.on("messageResponse", (data) => setMessages([...messages, data]));
  });

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" }, [messages]);
  });

  useEffect(() => {
    socket.on("typingResponse", (data) => setTypingStatus(data));
  }, [socket]);
  return (
    <div className="chat">
      <ChatBar socket={socket} />
      <div className="chat__main">
        <ChatBody
          socket={socket}
          messages={messages}
          lastMessageRef={lastMessageRef}
          typingStatus={typingStatus}
          setNameData={setNameData}
          changeName={changeName}
          setChangeName={setChangeName}
        />
        <ChatFooter socket={socket} nameData={nameData} />
      </div>
    </div>
  );
};

export default ChatPage;
