import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/main.css';
import UserCard from '../components/UserCard';


const MainPage = () => {

  const users = [{_id: 1, firstname: "Eliya", lastname: "Galis"},{_id: 2, firstname: "Levi", lastname: "Galis"},
    {_id: 3, firstname: "Yakov", lastname: "Galis"},{_id: 4, firstname: "Eva", lastname: "Galis"},
    {_id: 1, firstname: "Eliya", lastname: "Galis"},{_id: 2, firstname: "Levi", lastname: "Galis"},
    {_id: 3, firstname: "Yakov", lastname: "Galis"},{_id: 4, firstname: "Eva", lastname: "Galis"},
    {_id: 1, firstname: "Eliya", lastname: "Galis"},{_id: 2, firstname: "Levi", lastname: "Galis"},
    {_id: 3, firstname: "Yakov", lastname: "Galis"},{_id: 4, firstname: "Eva", lastname: "Galis"},
    {_id: 1, firstname: "Eliya", lastname: "Galis"},{_id: 2, firstname: "Levi", lastname: "Galis"},
    {_id: 3, firstname: "Yakov", lastname: "Galis"},{_id: 4, firstname: "Eva", lastname: "Galis"},
  ]

  return (
  <div className='main page'>
    <Header>
      <Link>Log Out</Link>
    </Header>
    <div className='panel'>
      <div className='container'>
        <div className='contacts-panel'>
          <div className='users'>
            {
              users.map((u)=>(
                <UserCard key={u._id} firstname={u.firstname} lastname={u.lastname}/>
              ))
            }
          </div>
        </div>
        <div className='chat-panel'>
          Chat
        </div>
      </div>
    </div>
  </div>
  )
}

export default MainPage