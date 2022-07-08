import React, { useState, useRef, useEffect } from 'react'
import Style from './../style/ChatStyle.css'
import axios from 'axios'
import MessageComponent from './Message'
import { v4 as uuid } from 'uuid'
import { useQuery, gql, useMutation } from "@apollo/client"


const ALLMESSAGE = gql`
query GetMessages {
    messages {
      data {
        id
        attributes {
          Message
          createdAt
          sender {
            data {
              id
              attributes {
                username
              }
            }
          }
        }
      }
    }
  }
`

const SENDMESSAGE = gql`
    mutation createMessage($Message: String!, $sender: ID!) {
        createMessage(data: { Message: $Message, sender: $sender}) {
            data {
                id
                attributes {
                    Message
                    sender {
                        data {
                            id
                        }
                    }
                }
            }
        }
    }
`
    // query GetMessages($id: ID!) {
    //     messages(id: $id) {


function Chat(props) {

    // console.log(props.UserDatas.id)

    const [Message, setMessage] = useState([])
    const mess = useRef()
    const [mutateFunction, { sdata, sloading, serror }] = useMutation(SENDMESSAGE)
    // mutateFunction()
    // console.log(sdata)

    const { loading, error, data, refetch } = useQuery(ALLMESSAGE)
    // if (data) {
    //     console.log(data.messages.data)
    // }
    // if (data) {
    //     setMessage(data)
    //     console.log(data)
    // }



    const SendMessage = () => {
        mutateFunction({ variables: { Message: mess.current.value, sender: props.UserDatas.id}})
        refetch()
        // mutateFunction({ variables: { Message: mess.current.value, sender: "2"}})
    //   if (mess.current.value) {
    //     axios.post('http://localhost:1337/api/messages', {
    //       "data": {
    //           "Message": mess.current.value,
    //       },
    //     }).then(res=> {
    //         setMessage([...Message, res.data.data])
    //     })
    //   }
    }
    
    useEffect(() => {
        // if (data) {
        //     // setMessage(data)
        // } else {console.log("no data")}
        // axios.get('http://localhost:1337/api/messages').then(res => {
        //     // setMessage(data)
        //     setMessage(res.data.data)
        // })
    }, [])

    // const MessageList = Message.map((p) => {
    // const MessageList = Message.map((p) => {
    // const MessageList = data.messages.data.map((p) => {
    // if (p) {
    //     var date = new Date(p.attributes.createdAt)
    //     let shorterdate = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
    //     return (
    //         <MessageComponent key={uuid()} Date={shorterdate} MessageText={p.attributes.Message}/>
    //         )
    //     }
    // });
            
    return (
        <div className='Chat-Container'>
            <div className='Chat-Messages'>
                {/* {MessageList} */}
                {data ? 
                    data.messages.data.map((d) => {
                        return (
                            <MessageComponent key={d.id} MessageText={d.attributes.Message} Date={d.attributes.createdAt} SenderName={d.attributes.sender.data.attributes.username}/>
                        )
                    })
                :
                <p>Error loading message!</p>
                }
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