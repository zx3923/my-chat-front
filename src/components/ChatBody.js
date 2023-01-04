import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const ChatBody = ({
  socket,
  messages,
  lastMessageRef,
  typingStatus,
  setNameData,
  changeName,
  setChangeName,
}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleLeaveChat = () => {
    navigate("/");
    window.location.reload();
  };

  const nameChange = () => {
    if (changeName === "") {
      alert("1자 이상");
    } else {
      socket.emit("nameChange", { changeName, socketID: socket.id });
      handleClose();
      socket.on("updateName", (data) => {
        setNameData(data);
      });
    }
  };

  return (
    <>
      <header className="chat__mainHeader">
        <p>Hangout with Colleagues</p>
        <button className="leaveChat__btn" onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
        <div>
          <Button onClick={handleOpen}>닉변</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <input
                type="text"
                minLength={3}
                name="username"
                id="username"
                className="username__input"
                value={changeName}
                onChange={(e) => setChangeName(e.target.value)}
              />
              <button onClick={nameChange}>변경</button>
              <button onClick={handleClose}>닫기</button>
            </Box>
          </Modal>
        </div>
      </header>

      <div className="message__container">
        {messages.map((message) =>
          message.socketID === socket.id ? (
            <div className="message__chats" key={message.id}>
              <p className="sender__name">You</p>
              <div className="message__sender">
                <p>{message.text}</p>
              </div>
            </div>
          ) : (
            <div className="message__chats" key={message.id}>
              <p>{message.name}</p>
              <div className="message__recipient">
                <p>{message.text}</p>
              </div>
            </div>
          )
        )}

        <div className="message__status">
          <p>{typingStatus}</p>
        </div>
        <div ref={lastMessageRef} />
      </div>
    </>
  );
};

export default ChatBody;
