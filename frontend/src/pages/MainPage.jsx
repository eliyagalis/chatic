import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/main.css';
import UserCard from '../components/UserCard';
import Message from '../components/Message';
import axios from 'axios';


const MainPage = () => {

  const users = [{_id: 1, firstname: "Eliya", lastname: "Galis"},{_id: 2, firstname: "Levi", lastname: "Galis"},
    {_id: 3, firstname: "Yakov", lastname: "Galis"},{_id: 4, firstname: "Eva", lastname: "Galis"},
  ];

  const [message, setMessage] = useState({_id: "", content: ""});

  const [messages, setMessages] = useState([{_id: 1, content: "new message", time: "10:35"},
    {_id: 2, content: "new message", time: "10:35"},{_id: 3, content: "new message", time: "10:35"},
    {_id: 4, content: "new message", time: "10:35"},{_id: 5, content: "new message", time: "10:35"}
  ]);
  
  const [isAuth, setIsAuth] = useState(false);

  

  // useEffect(() => {
  //     axios .post('/users/verifyToken',null,{withCredentials: true})
  //           .then((res)=> {
  //             console.log('success');
  //             setIsAuth(true);
  //             }).catch((error)=>console.log(error))
  //             .finally(()=> {
  //               isAuth? console.log('yay'): Navigate('/')});
  // }, [])
  

  const openChatHandler = (_id)=> {
    console.log(_id);
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
                  <UserCard key={u._id} _id={u._id} firstname={u.firstname} lastname={u.lastname} openChatHandler={openChatHandler}/>
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
                    <textarea name='textarea' className='message-textarea' placeholder='Type a message...'/>
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