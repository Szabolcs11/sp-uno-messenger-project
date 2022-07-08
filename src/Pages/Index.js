import axios from 'axios'
import React, { useState, useRef } from 'react'
import Style from './../style/IndexStyle.css'
import Chat from '../Components/Chat'
import { useQuery, gql } from "@apollo/client"


function Index(props) {
  return (
      <div className='Index-Container'>
          <div className='Index-Header'>
              <label>User ID:</label>
              <input type="text" />
          </div>
          <Chat UserDatas={props.UserDatas}/>
      </div>
  )
}

export default Index