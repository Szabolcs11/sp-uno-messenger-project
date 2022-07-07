import React, { useState, useRef, useEffect } from 'react'
import Style from './../style/ChatStyle.css'
import axios from 'axios'
import MessageComponent from './Message'
import { v4 as uuid } from 'uuid'

function Chat() {
    const [Message, setMessage] = useState([])
    const mess = useRef()

    const SendMessage = () => {
      if (mess.current.value) {
        axios.post('http://localhost:1337/api/messages', {
          "data": {
              "Message": mess.current.value,
          },
        }).then(res=> {
            setMessage([...Message, res.data.data])
        })
      }
    }
    
    useEffect(() => {
        axios.get('http://localhost:1337/api/messages').then(res => {
            setMessage(res.data.data)
        })
    }, [])

    const MessageList = Message.map((p) => {
        if (p) {
            return (
                <MessageComponent key={uuid()} Date={p.attributes.createdAt} MessageText={p.attributes.Message}/>
            )
        }
    });

    return (
        <div className='Chat-Container'>
            <div className='Chat-Messages'>
                {MessageList}
            </div>
            <div className='Chat-Control'>
                <input type="text" className='Chat-Input' ref={mess}/>
                <div className='Chat-Button' onClick={SendMessage}>
                    Send
                </div>
            </div>
        </div>
    )
}

export default Chat