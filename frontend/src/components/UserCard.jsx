import React from 'react'
import profile from '../assets/profile.png';

const UserCard = ({_id, avatar = profile, username, openChatHandler}) => {
    const clickCardHandler = (e) => {
        e.preventDefault();
        openChatHandler({_id, avatar, username});
    }

  return (
    <div className='card' onClick={clickCardHandler}>
        <img src={avatar} className='avatar'/>
        <div>{username}</div>
    </div>
  )
}

export default UserCard