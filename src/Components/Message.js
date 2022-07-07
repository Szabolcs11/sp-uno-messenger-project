import React from 'react'
import Style from './../style/MessageStyle.css'

function Message(props) {
  return (
    <div className='Chat-Message-Container'>
        <div className='Chat-Message'>
            [{props.Date}]: {props.MessageText}
        </div>
    </div>
  )
}

export default Message