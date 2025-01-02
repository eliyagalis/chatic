import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/main.css";
import UserCard from "../components/UserCard";
import Message from "../components/Message";
import axios from "axios";
import { useUserData } from "../context/userContext";
import { socket } from "../utils/socket.js";


const MainPage = () => {
  useEffect(() => {
    axios
      .post("users/verifyToken", null, {
        withCredentials: true,
      })
      .then((res) => {})
      .catch((error) => {
        navigate("/login");
      });
  }, []);

  const { userData } = useUserData();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [room, setRoom] = useState();
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState();

  useEffect(() => {
    axios
      .get("/users")
      .then((res) => {
        const filteredUsers = res.data.filter(
          (user) => user._id !== userData._id
        );
        setUsers(filteredUsers);
      })
      .catch((error) => console.log(error));
  }, []);

  const logout = (e)=> {
    e.preventDefault();
    axios.post('/users/logout').then((res)=>console.log("You've logged out.")).catch((error)=>console.log(error))

    localStorage.clear();
    navigate("/login");
  }

  const openChatHandler = (chatUser) => {
    
    setRoom(chatUser);
    setMessages([
      {
        _id: 1,
        senderId: "67726f2d04f144733bc6b4ad",
        content: "hello",
        time: `${new Date().getHours()}:${new Date().getMinutes()}`,
      },
      {
        _id: 2,
        senderId: "67726f2d04f144733bc6b4ad",
        content: "Just making sure you didn't forget mom's birthday",
        time: `${new Date().getHours()}:${new Date().getMinutes()}`,
      },
      {
        _id: 3,
        senderId: userData._id,
        content: "Ahhhh dang it... thanks for reminding",
        time: `${new Date().getHours()}:${new Date().getMinutes()}`,
      },
    ]);
  };

  const sendMessage = (e) => {
    e.preventDefault();

    if (!messageText.trim()) return;

    const newMessage = {
      _id: messages.length + 1,
      senderId: userData._id,
      content: messageText,
      time: `${new Date().getHours()}:${new Date().getMinutes()}`,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessageText("");
  };

  return (
    <div className="main page">
      <div className="panel">
        <div className="panel-top-bar">
          <div className="contacts-panel">
            <div className="user-bar">
              <div className="username">{userData.username}</div>
              <button className="logout" onClick={logout}>Log Out</button>
            </div>
          </div>
          <div className="chat-panel">
            {room ? <div className="room-name">{room.username}</div> : <></>}
          </div>
        </div>
        <div className="container">
          <div className="contacts-panel">
            <div className="users">
              {users.map((u) => (
                <UserCard
                  key={u._id}
                  _id={u._id}
                  username={u.username}
                  openChatHandler={openChatHandler}
                />
              ))}
            </div>
          </div>
          {room ? (
            <div className="chat-panel">
              <div className="chat-messages">
                {messages ? (
                  messages.map((m) => (
                    <Message
                      key={m._id}
                      isSent={m.senderId === userData._id}
                      content={m.content}
                      time={m.time}
                    />
                  ))
                ) : (
                  <></>
                )}
              </div>

              <div className="white-gradient">
                <form className="chat-controllers">
                  <input
                    name="textarea"
                    className="message-textarea"
                    placeholder="Type a message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                  />
                  <button className="send-btn" onClick={sendMessage}>
                    Send
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="chat-panel">
              <div className="blank-chat"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
