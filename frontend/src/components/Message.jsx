import React from 'react'

const Message = ({content, isSent, time}) => {
  
  const date = new Date(time);
  const formattedTime = date.toLocaleString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  return (
    <>
    <div className={`message ${isSent?"sent":"received"}`}>
        <div className='message-content'>{content}</div>
        <div className='message-time'>{formattedTime}</div>
    </div>
    </>
  )
}

export default Message