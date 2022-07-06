import React, { useState, useEffect, useRef } from 'react'
import Style from '../styles/ChatStyle.css'
import Message from './Message'
import { Api_Url } from '../GlobalVariables'

import io from 'socket.io-client';


export default function Chat(props) {
    
    const MyMessageRef = useRef() //Simple variable for sending messages

    const [message, setMessage] = useState([])

    function SendMessage (e) {
        const message = MyMessageRef.current.value
        if (message === '') return
        props.Socket.emit('sendmessage', message, props.Roomkey, props.MyUserDatas.Name)
        setMessage(previousState => [...previousState, <Message Name={props.MyUserDatas.Name} Date={getTime()} Message={message} MessageType="PlayerMessage" />])
        MyMessageRef.current.value = null
    }

    function getTime() {
        var today = new Date();
        return today.getHours() + ":" + today.getMinutes();
    }


    useEffect(() => {
      setMessage([])
      setMessage(previousState => [...previousState, <Message Name={props.MyUserDatas.Name} MessageType="Join" />])
    }, [props.Roomkey])



    useEffect(() => {
        if (props.Socket == null) return
        props.Socket.on("recivemessage", (message, sendername, date) =>
            setMessage(previousState => [...previousState, <Message Name={sendername} Date={date} Message={message} MessageType="PlayerMessage" />])
        );

        return () => props.Socket.off('recivemessage')
        
    }, [props.Socket])



    useEffect(() => {
      if (props.Socket == null) return
      
      props.Socket.on("playerjoin", (Name) => 
        setMessage(previousState => [...previousState, <Message Name={Name} MessageType="Join" />])
      );
      
      return () => props.Socket.off('playerjoin')
    }, [props.Socket])


    useEffect(() => {
      if (props.Socket == null) return
      
      props.Socket.on("clientdisconnectfromlobby", (Name) =>
        setMessage(previousState => [...previousState, <Message Name={Name} MessageType="Leave" />])
      );
      
      return () => props.Socket.off('clientdisconnectfromlobby')
    }, [props.Socket])



    return (
      <div className="ChatBg">
        <div className="ChatContainer">
          <div className="ChatTitle">
            <p>Chat</p>
          </div>
          {message.map((item, index) => (
            <React.Fragment key={`message-${index}`}>{item}</React.Fragment>
          ))}
          
        </div>
        <div className="ChatControls">
            <input type="text" ref={MyMessageRef}/>
            <button onClick={SendMessage}>Send</button>
          </div>
      </div>
    );
}