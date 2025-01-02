import React from 'react'

const Message = ({content, isSent, time}) => {
  return (
    <>
    <div className={`message ${isSent?"sent":"received"}`}>
        <div className='message-content'>{content}</div>
        <div className='message-time'>{time}</div>
    </div>
    </>
  )
}

export default Message