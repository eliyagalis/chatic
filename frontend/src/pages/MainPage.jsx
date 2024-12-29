import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/main.css';
import UserCard from '../components/UserCard';
import Message from '../components/Message';
import axios from 'axios';


const MainPage = () => {
  const [users, setUsers] = useState([]);
  
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState({_id: "", content: ""});
  const [isAuth, setIsAuth] = useState(false);


  

  useEffect(() => {
    axios.get('/users').then((res) => setUsers(res.data)).catch((error)=> console.log(error));  
    
    axios .post('/users/verifyToken',null,{withCredentials: true})
            .then((res)=> { console.log('success');
              }).catch((error)=> console.log(error));
  }, []);
  

  const openChatHandler = (_id)=> {
    
    setMessages()
  }

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
  <div className='main page'>
    <Header>
      <Link>Log Out</Link>
    </Header>
    <br />
      <div className='panel'>
        <div className='panel-top-bar'></div>
        <div className='container'>
          <div className='contacts-panel'>
            <div className='users'>
              {
                users.map((u)=>(
                  <UserCard key={u._id} _id={u._id} username={u.username} openChatHandler={openChatHandler}/>
                ))
              }
            </div>
          </div>
          <div className='chat-panel'>
              <div className='chat-messages'>
                {
                  messages.map((m)=> (
                    <Message key={m._id} content={m.content}/>
                  ))
                }
              </div>

                <div className='white-gradient'>  
                    <input name='textarea' className='message-textarea' placeholder='Type a message...'/>
                    <button className='send-btn' >Send</button>
                </div>
          </div>
        </div>
      </div>
    <Footer/>
  </div>
  )
}

export default MainPage