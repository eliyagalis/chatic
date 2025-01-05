import React, { useState, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/main.css";
import RoomCard from "../components/RoomCard.jsx";
import Message from "../components/Message";
import axios from "axios";
import { useUserData } from "../context/userContext";
import { socket } from "../utils/socket.js";
import UserCard from "../components/UserCard.jsx";

const initialState = {
  users: [],
  chats: [],
  room: null,
  messages: [],
  messageText: "",
  newChats: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USERS":
      return { ...state, users: action.payload };
    case "SET_CHATS":
      return { ...state, chats: action.payload };
    case "SET_ROOM":
      return { ...state, room: action.payload };
    case "SET_MESSAGES":
      return { ...state, messages: action.payload };
    case "SET_MESSAGE_TEXT":
      return { ...state, messageText: action.payload };
    case "SET_NEW_CHATS":
      return { ...state, newChats: action.payload };
    default:
      return state;
  }
};

const MainPage = () => {
  const navigate = useNavigate();
  const { userData } = useUserData();
  const [state, dispatch] = useReducer(reducer, initialState);

  const [messageText, setMessageText] = useState("");

  useEffect(() => {
    // Verify user session
    axios
      .post("users/verifyToken", null, {
        withCredentials: true,
      })
      .then((res) => {})
      .catch((error) => {
        navigate("/login");
      });

    // Get list of users to start new chats
    axios
      .get("/users")
      .then((res) => {
        dispatch({ type: "SET_CHATS", payload: res.data });
      })
      .catch((error) => console.log(error));
  }, [navigate]);

  const logout = (e) => {
    e.preventDefault();
    axios
      .post("/users/logout")
      .then((res) => console.log("You've logged out."))
      .catch((error) => console.log(error));

    localStorage.clear();
    navigate("/login");
  };

  const startNewChat = (e) => {
    axios
      .get("/users")
      .then((res) => {
        dispatch({ type: "SET_USERS", payload: res.data });
      })
      .catch((error) => console.log(error));

    dispatch({ type: "SET_NEW_CHATS", payload: true });
  };

  const openChatHandler = (chatUser) => {
    const participants = [userData._id, chatUser._id];
    console.log(participants);

    axios
      .post("/rooms", participants)
      .then((res) => {
        console.log(res.data);
        dispatch({ type: "SET_ROOM", payload: res.data });
        socket.emit("JoinRoom", res.data._id);
      })
      .catch((error) => console.log(error));
    
    // Optionally update chat list here if needed
    // dispatch({ type: "SET_CHATS", payload: [...state.chats, chatUser] });
  };

  const sendMessage = (e) => {
    e.preventDefault();

    if (!messageText.trim()) return;

    const newMessage = {
      _id: state.messages.length + 1,
      senderId: userData._id,
      content: messageText,
      time: `${new Date().getHours()}:${new Date().getMinutes()}`,
    };

    // Emit the message to the room
    socket.emit("SendMessage", state.room._id, newMessage);
    setMessageText(""); // Reset message input
  };

  useEffect(() => {
    // Handle received messages
    socket.on("ReceiveMessage", (msgObj) => {
      dispatch({
        type: "SET_MESSAGES",
        payload: [...state.messages, msgObj], // Use the previous state to update messages
      });
    });
  }, [state.messages]); // Run when messages state changes

  return (
    <div className="main page">
      {state.newChats ? (
        <div
          className="find-users-background"
          onClick={() =>
            dispatch({ type: "SET_NEW_CHATS", payload: !state.newChats })
          }>
          <div className="find-users-panel">
            {state.users.map((u) => (
              <UserCard
                key={u._id}
                _id={u._id}
                username={u.username}
                openChatHandler={openChatHandler}
              />
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className="panel">
        <div className="panel-top-bar">
          <div className="contacts-panel">
            <div className="user-bar">
              <div className="username">{userData.username}</div>
              <div>
                <button className="send-btn" onClick={startNewChat}>
                  +
                </button>
                <button className="logout" onClick={logout}>
                  Log Out
                </button>
              </div>
            </div>
          </div>
          <div className="chat-panel">
            {state.room ? <div className="room-name">{state.room._id}</div> : null}
          </div>
        </div>
        <div className="container">
          <div className="contacts-panel">
            <div className="users">
              {state.chats.map((u) => (
                <RoomCard
                  key={u._id}
                  _id={u._id}
                  username={u.username}
                  openChatHandler={openChatHandler}
                />
              ))}
            </div>
          </div>
          {state.room ? (
            <div className="chat-panel">
              <div className="chat-messages">
                {state.messages.map((m) => (
                  <Message
                    key={m._id}
                    isSent={m.senderId === userData._id}
                    content={m.content}
                    time={m.time}
                  />
                ))}
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
