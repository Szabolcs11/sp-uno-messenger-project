import React from 'react'

function Message(props) {
  const Type = props.MessageType
  if (Type == "PlayerMessage") {
    return (
      <div className='Message'>
          <p>{props.Name} [{props.Date}]: {props.Message}</p>
      </div>
    )
  }
  else if (Type == "Join") {
    return (
      <div className='Message'>
          <p>{props.Name} Joined the lobby!</p>
      </div>
    )
  }
  else if (Type == "Leave") {
    return (
      <div className='Message'>
          <p>{props.Name} Leaved the lobby!</p>
      </div>
    )
  }
  else if (Type == "Broadcast") {
    <div className='Message'>
          <p>{props.Message}</p>
    </div>
  }
}

export default Message