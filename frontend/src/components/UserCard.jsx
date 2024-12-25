import React from 'react'
import profile from '../assets/profile.png';

const UserCard = ({avatar = profile, firstname, lastname}) => {
  return (
    <div className='card'>
        <img src={avatar} className='avatar'/>
        <div>{firstname} {lastname}</div>
    </div>
  )
}

export default UserCard