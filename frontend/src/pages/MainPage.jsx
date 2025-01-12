import React, { useState, useEffect, useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/main.css";
import RoomCard from "../components/RoomCard.jsx";
import Message from "../components/Message.jsx";
import axios from "axios";
import { useUserData } from "../context/userContext.jsx";
import { socket } from "../utils/socket.js";
import UserCard from "../components/UserCard.jsx";
import { chatReducer, initialState } from "../reducers/chatReducer.js";
import ChatPanel from "../components/ChatPanel.jsx";

const MainPage = () => {
  const navigate = useNavigate();
  const { userData } = useUserData();
  const [state, dispatch] = useReducer(chatReducer, initialState);
  const [messageText, setMessageText] = useState("");

  useEffect(() => {
    axios
      .post("users/verifyToken", null, {
        withCredentials: true,
      })
      .then((res) => {})
      .catch((error) => {
        navigate("/login");
      });

    axios
      .get(`rooms/roomByUser/${userData._id}`)
      .then((res) => {
        dispatch({ type: "SET_CHATS", payload: res.data });
        socket.emit(
          "JoinRooms",
          res.data.map((room) => room._id)
        );
      })
      .catch((error) => console.log(error));
  }, [state.room]);

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

    dispatch({ type: "SET_IS_NEW_CHATS", payload: true });
  };

  const openChatHandler = async (chatUser) => {
    try {
      const participants = [userData._id, chatUser._id];
      const roomResponse = await axios.post("/rooms", participants);
      const room = roomResponse.data;
  
      dispatch({ type: "SET_ROOM", payload: room });
  
      socket.emit("JoinRoom", room._id);
      const prevNotifications = {...state.notifications};
      if (prevNotifications[room._id] > 0) {
        prevNotifications[room._id] = 0;
        dispatch({ type: "SET_NOTIFICATIONS", payload: prevNotifications });
      }
      const messagesResponse = await axios.get(`/rooms/${room._id}`);
      dispatch({ type: "SET_MESSAGES", payload: messagesResponse.data });
  
    } catch (error) {
      console.error("Error in openChatHandler:", error);
    }
  };  

  const sendMessage = (e) => {
    e.preventDefault();

    if (!messageText.trim()) return;

    const newMessage = {
      _id: state.messages.length + 1,
      senderId: userData._id,
      content: messageText,
      sentAt: new Date().toISOString()
    };

    axios
      .post(`/rooms/${state.room._id}`, newMessage)
      .then((res) => {
        socket.emit("SendMessage", state.room._id, newMessage);
        setMessageText("");
      })
      .catch((error) => console.log(error));
  };
useEffect(() => {
  socket.on("ReceiveMessage", ({ room, messageObject }) => {
    if (!state.room || room !== state.room._id) {
      console.log(state.notifications);
      dispatch({
        type: "SET_NOTIFICATIONS",
        payload: {
          ...state.notifications,
          [room]: ((state.notifications[room] || 0) + 1),
        },
      });
    } else {

      dispatch({
        type: "SET_MESSAGES",
        payload: (prevMessages) => [...prevMessages, messageObject],
      });
    }
  });

  return () => {
    socket.off("ReceiveMessage");
  };
}, [state.room]);

  return (
    <div className="main page">
      {state.isNewChats && (
        <div className="find-users-background"
          onClick={() => dispatch({ type: "SET_IS_NEW_CHATS", payload: !state.isNewChats })}>

          <div className="find-users-panel">
            <div className="title">Start a new conversation</div>
            {state.users.map((u) =>
                u._id !== userData._id && (
                  <UserCard key={u._id} _id={u._id}
                    username={u.username} openChatHandler={openChatHandler}/>
                ))}
          </div>
        </div>
      )}
      <div className="panel">
        <div className="panel-top-bar">
          <div className="contacts-panel">
            <div className="user-bar">
              <div className="username">{userData.username}</div>
              <div>
                <button className="logout" onClick={logout}>
                  Log Out
                </button>
              </div>
            </div>
          </div>
          <div className="chat-panel">
            {state.room && (
              <div className="room-name">
                {state.room.participantsUsernames.find(
                  (username) => username !== userData.username
                )}
                <Link to={"/challange"} className="send-btn">Challange</Link>
              </div>
            )}
          </div>
        </div>
        <div className="container">
          <div className="contacts-panel">
            <div className="users">
              {state.chats.map((u) => (
                <RoomCard
                  key={u._id}
                  _id={u.participants.find((_id) => _id !== userData._id)}
                  username={u.participantsUsernames.find(
                    (username) => username !== userData.username
                  )}
                  notifications={state.notifications[u._id] || 0}
                  isActive={state.room ? state.room._id === u._id : null}
                  openChatHandler={openChatHandler}
                />
              ))}
            </div>
            <button className="send-btn add" onClick={startNewChat}>
              Start a new conversation
            </button>
          </div>
          {state.room ? (
            <div className="chat-panel">
              <div className="chat-messages">
                {state.messages.map((m) => (
                  <Message
                    key={m._id}
                    isSent={m.senderId === userData._id}
                    content={m.content}
                    time={m.sentAt}
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
