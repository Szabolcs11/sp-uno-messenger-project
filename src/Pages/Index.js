import axios from 'axios'
import React, { useState, useRef } from 'react'
import Style from './../style/IndexStyle.css'
import Chat from '../Components/Chat'
import { useQuery, gql } from "@apollo/client"



// const MESSAGES = gql`
//   query GetMessages($id: ID!) {
//     messages(id: $id) {
//       data {
//         id
//         attributes {
//           Message
//         }
//       }
//     }
//   }

// `

// const ALLMESSAGE = gql`
// query GetMessages {
//   messages {
//     data {
//       id
//       attributes {
//         Message
//       }
//     }
//   }
// }
// `


function Index(props) {

  // console.log(props.UserDatas)

  // const { loading, error, data } = useQuery(ALLMESSAGE)
  // const { loading, error, data } = useQuery(MESSAGES, {
  //   variables: { id: 44 }
  // })
  // console.log(data)

  return (
      <div className='Index-Container'>
        {/* <button onClick={graphqltest}>TEST</button> */}
          <div className='Index-Header'>
              <label>User ID:</label>
              <input type="text" />
          </div>
          <Chat UserDatas={props.UserDatas}/>
      </div>
  )
}

export default Index