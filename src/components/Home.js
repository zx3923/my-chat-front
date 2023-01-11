import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ socket, parentFunction }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    parentFunction(userName);
    socket.emit("newUser", { userName, socketID: socket.id });
    navigate("/chat");
  };
  return (
    <form className="home__container" onSubmit={handleSubmit}>
      <h2 className="home__header">익명 채팅 방</h2>
      <label htmlFor="username">이름</label>
      <input
        type="text"
        minLength={3}
        name="username"
        id="username"
        className="username__input"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button className="home__cta">들어가기</button>
    </form>
  );
};

export default Home;
