import React from 'react'
import profile from '../assets/profile.png';

const UserCard = ({_id, username, openChatHandler}) => {
  
  const handler = (e)=> {
    e.preventDefault();
    openChatHandler({_id, username});
  }
  
  return (
    <div className='user-card' onClick={handler}>
        <img className='avatar' src={profile}/>
        <div className='title'>{username}</div>
    </div>
  )
}

export default UserCard