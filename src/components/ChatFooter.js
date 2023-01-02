import React, { useState } from "react";

const ChatFooter = ({ socket, nameData }) => {
  const [message, setMessage] = useState("");

  const handleTyping = () => {
    socket.emit("typing", `${nameData} is typing`);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && nameData) {
      socket.emit("message", {
        text: message,
        name: nameData,
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
    setMessage("");
  };
  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleTyping}
        />
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;
