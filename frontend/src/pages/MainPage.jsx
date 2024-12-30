import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import "../styles/main.css";
import UserCard from "../components/UserCard";
import Message from "../components/Message";
import axios from "axios";
import { useUserData } from "../context/userContext";
import { socket } from "../utils/socket.js";


const MainPage = () => {
  const { userData, setUserData } = useUserData();
  const navigate = useNavigate();
  
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState();
  // const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    axios
      .post("http://localhost:8080/api/v1/users/verifyToken", null, {
        withCredentials: true,
      })
      .then((res) => {
      })
      .catch((error) => {
        console.error("Token verification failed");
        navigate("/");
      });
  }, []);

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

  const openChatHandler = (chatUser) => {
    console.log(chatUser);
    setRoom(chatUser);
  };

  // const sendMessage = (formData)=>{
  //   e.preventDefault();
  //   const content = formData.get('textarea');
  //   if(!content)
  //   {
  //     return;
  //   }
  //   setMessages((prev)=>[...prev, {_id: prev.length, content}]);
  // }

  return (
    <div className="main page">
      <div className="panel">
        
        <div className="container">
          <div className="contacts-panel">
            <div className="users">
            <div className="panel-top-bar">
          <div className="username">{userData.username}</div>
          <Link className="btn">Log Out</Link>
        </div>
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
            {
              room?
              (
              <div className="chat-panel">
                <div className="room-name">{room.username}</div>
                <div className="chat-messages">
                  {messages.map((m) => (
                    <Message key={m._id} content={m.content} />
                  ))}
                </div>
    
                <div className="white-gradient">
                  <input
                    name="textarea"
                    className="message-textarea"
                    placeholder="Type a message..."
                  />
                  <button className="send-btn">Send</button>
                </div>
              </div>
              ):
              (<div className="chat-panel"></div>) 
            }
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainPage;
