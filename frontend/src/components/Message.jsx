import React from 'react'

const Message = ({content, time}) => {
  return (
    <div className='message'>
        <div className='message-content'>{content}</div>
        <div className='message-time'>{time}</div>
    </div>
  )
}

export default Message