import React from 'react'
import profile from '../assets/profile.png';

const UserCard = ({_id, avatar = profile, firstname, lastname, openChatHandler}) => {
    
    const clickCardHandler = (e) => {
        e.preventDefault();
        openChatHandler(_id);
    }

  return (
    <div className='card' onClick={clickCardHandler}>
        <img src={avatar} className='avatar'/>
        <div>{firstname} {lastname}</div>
    </div>
  )
}

export default UserCard