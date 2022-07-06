import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useCookies, Cookies } from 'react-cookie'
import { Api_Url } from '../GlobalVariables'
import { useNavigate } from 'react-router-dom'
import io from 'socket.io-client';

const socket = io.connect(Api_Url)

function Game() {
    const navigate = useNavigate()
    const [cookies, setCookie, removeCookie] = useCookies(['UNO']);
    const [MyUserDatas, setMyUserDatas] = useState({}) // My User datas [UserID, Name]
    const [CurrentLobbyKey, setCurrentLobbyKey] = useState() // Current Lobby Key


    useEffect(() => {
        socket.on('dealingcards', (CardDatas) => {
            // console.log("0")
        })
    }, [socket])



    useEffect(() => {
        const token = cookies.UNOAuthToken || undefined
        axios.post(Api_Url + "getGame", {
            Token: token
        }).then(res => {
            console.log(res.data)
            if (res.data.succes) {
                socket.emit('joingame', res.data.Roomkey, res.data.MyPlayerData, cb => {
                    if (cb.succes) {
                        setMyUserDatas(res.data.MyPlayerData)
                        setCurrentLobbyKey(res.data.Roomkey)
                    }
                    else {
                        navigate('/lobby')
                    }
                })
            }
            else {
                navigate('/lobby')
            }
        })
    }, [])

    return (
        <div>Game</div>
    )
}

export default Game