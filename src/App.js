import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ChatPage from "./components/ChatPage";
import socketIO from "socket.io-client";
import { useState } from "react";

const socket = socketIO.connect("http://localhost:4000");
function App() {
  const [nameData, setNameData] = useState("");
  const parentFunction = (x) => {
    setNameData(x);
  };
  return (
    <BrowserRouter>
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
