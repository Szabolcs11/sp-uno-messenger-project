import React, { useState, useRef, useEffect } from 'react'
import Style from './../style/ChatStyle.css'
import axios from 'axios'
import MessageComponent from './Message'
import { v4 as uuid } from 'uuid'
import { useQuery, gql, useMutation } from "@apollo/client"


// const ALLMESSAGE = gql`
// query GetMessages {
//     messages {
//       data {
//         id
//         attributes {
//           Message
//           createdAt
//           sender {
//             data {
//               id
//               attributes {
//                 username
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `

// const SENDMESSAGE = gql`
    // mutation createMessage($Message: String!, $sender: ID!) {
    //     createMessage(data: { Message: $Message, sender: $sender}) {
    //         data {
    //             id
    //             attributes {
    //                 Message
    //                 sender {
    //                     data {
    //                         id
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }
// `

const GETALLMESSAGEFROMEXPRESS = gql`
query {
    messages {
      id
      message
      date
      sender {
        id
        username
      }
    }
}
`

const SENDMESSAGETOEXPRESS = gql`
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


function Chat(props) {

    const [Message, setMessage] = useState([])
    const mess = useRef()
    // Strapi and GraphQL Egyben
    // const [mutateFunction, { sdata, sloading, serror }] = useMutation(SENDMESSAGE)
    // const { loading, error, data, refetch } = useQuery(ALLMESSAGE)
    

    // UI --(graphqp)--> EXPRESS -> Strapi
    const { loading, error, data, refetch } = useQuery(GETALLMESSAGEFROMEXPRESS)

    const [smutateFunction, { sdata, sloading, serror }] = useMutation(SENDMESSAGETOEXPRESS)
    // console.log(sdata)


    const SendMessage = () => {
        console.log(mess.current.value)
        smutateFunction({ variables: { message: mess.current.value, sender: props.UserDatas.id}})
        refetch()
        // mutateFunction({ variables: { Message: mess.current.value, sender: props.UserDatas.id}})
    }

            
    return (
        <div className='Chat-Container'>
            <div className='Chat-Messages'>
                { data ?
                data.messages.map((d) => {
                    return (
                        <MessageComponent key={d.id} MessageText={d.message} Date={d.date} SenderName={d.sender.username} />
                    )
                })
                :
                <p>Error loading message!</p>
                }
                {/* {data ? 
                    data.messages.data.map((d) => {
                        return (
                            <MessageComponent key={d.id} MessageText={d.attributes.Message} Date={d.attributes.createdAt} SenderName={d.attributes.sender.data.attributes.username}/>
                        )
                    })
                :
                <p>Error loading message!</p>
                } */}
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