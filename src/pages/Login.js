import React, { useEffect, useState } from 'react'
import { Api_Url } from '../GlobalVariables'
import axios from 'axios'
import { useCookies, Cookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify';

function Login() {

    const navigate = useNavigate()
    const [cookies, setCookie, removeCookie] = useCookies(['UNO']);
    const [Name, SetName] = useState();

    useEffect(() => {
        const Token = cookies.UNOAuthToken || undefined
        axios.post(Api_Url + "GetAuth", {
            Token: Token
        }).then(res => {
            // console.log(res.data.succes)
            if (!res.data.succes) {
                if (res.data.debug) {
                    removeCookie("UNOAuthToken")
                }
                navigate('/lobby')
            }
        })
    }, [])

    function Authenticaiton() {
        axios.post(Api_Url + "Auth", {
            Name: Name
        }).then(res => {
            // console.log(res.data)
            if (res.data.succes) {
                setCookie("UNOAuthToken", res.data.token)
                toast.success("Succesful authentication!")
                navigate('/Lobby')
            }
            else {  
                if (res.data.debug) {
                    removeCookie("UNOAuthToken")
                    toast.error(res.data.message)
                    navigate('/')
                }
                else {
                    toast.warn(res.data.message)
                }
            }
        })
    }

    return (
        <div>
            <p>Type your name here!</p>
            <br></br>
            <input type="text" onChange={e=> {
                SetName(e.target.value)
            }}/>
            <br></br>
            <br></br>
            <button onClick={Authenticaiton}>Next!</button>
        </div>
    )
}

export default Login