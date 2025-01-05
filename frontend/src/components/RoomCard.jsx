import React from 'react'
import profile from '../assets/profile.png';

const RoomCard = ({_id, avatar = profile, isActive, username, openChatHandler}) => {
    const clickCardHandler = (e) => {
        e.preventDefault();
        openChatHandler({_id, username});
    }

  return (
    <div className={isActive? "card active":"card"} onClick={clickCardHandler}>
        <img src={avatar} className='avatar'/>
        <div>{username}</div>
    </div>
  )
}

export default RoomCard