import axios from 'axios'
import React, { useState, useRef } from 'react'
import Style from './../style/IndexStyle.css'
import Chat from '../Components/Chat'

function Index() {


  return (
    <div className='Index-Container'>
        <div className='Index-Header'>
            <label>User ID:</label>
            <input type="text" />
        </div>
        <Chat />
    </div>
  )
}

export default Index