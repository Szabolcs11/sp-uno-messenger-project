import React from 'react'
import Style from './../style/MessageStyle.css'

function Message(props) {
  var date = new Date(props.Date)
  let normaldate = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
  let datetime = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
  return (
    <div className='Chat-Message-Container'>
        <div className='Chat-Message'>
            {props.SenderName}: [{datetime}]: {props.MessageText}
        </div>
    </div>
  )
}

export default Message