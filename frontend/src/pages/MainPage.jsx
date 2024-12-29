import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/main.css";
import UserCard from "../components/UserCard";
import Message from "../components/Message";
import axios from "axios";
import { useUserData } from "../context/userContext";

const MainPage = () => {
  const userData = useUserData();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  // const [message, setMessage] = useState({ _id: "", content: "" });
  // const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    axios
      .post("http://localhost:8080/api/v1/users/verifyToken", null, {
        withCredentials: true
      })
      .then((res) => {
        console.log("Token is valid:", res.data);
      })
      .catch((error) => {
        console.error(
          "Token verification failed:",
          error.response?.data || error
        );
        navigate("/");
      });

    axios
      .get("/users")
      .then((res) => setUsers(res.data))
      .catch((error) => console.log(error));
  }, []);

  const openChatHandler = (_id) => {
    setMessages();
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
      <Header>
        {/* <div>{userData}</div> */}
        <Link>Log Out</Link>
      </Header>
      <br />
      <div className="panel">
        <div className="panel-top-bar"></div>
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
          <div className="chat-panel">
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
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainPage;
