import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ChatPage from "./components/ChatPage";
import socketIO from "socket.io-client";
import { useState } from "react";

const socket = socketIO.connect(
  `https://port-0-my-chat-back-3vw25lcfwkphp.gksl2.cloudtype.app/`,
  {
    cors: { origin: "*" },
  }
);
function App() {
  const [nameData, setNameData] = useState("");
  const parentFunction = (x) => {
    setNameData(x);
  };
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div>
        <Routes>
          <Route
            path="/"
            element={<Home socket={socket} parentFunction={parentFunction} />}
          ></Route>
          <Route
            path="/chat"
            element={<ChatPage socket={socket} nameData={nameData} />}
          ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
