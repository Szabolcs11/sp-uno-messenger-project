import React, { useEffect, useState } from 'react'
import { Api_Url } from '../GlobalVariables'
import axios from 'axios'
import { useCookies, Cookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { v4 as uuid } from 'uuid';

import io from 'socket.io-client';
import Chat from '../components/Chat'

import { toast } from 'react-toastify';



const socket = io.connect(Api_Url)

function Lobby() {
  const [Message, setMessage] = useState() // Simple variable for sending messages

  const [Roomkey, setRoomkey] = useState() // Simple variable for joining room
  const [CurrentLobbyKey, setCurrentLobbyKey] = useState() // Current Lobby Key
  const [MyUserDatas, setMyUserDatas] = useState({}) // My User datas [UserID, Name]

  const [Players, setPlayers] = useState([{}])

  const navigate = useNavigate()
  const [cookies, setCookie, removeCookie] = useCookies(['UNO']);


  useEffect(() => {
    const Token = cookies.UNOAuthToken || undefined
        axios.post(Api_Url + "GetLobby", {
            Token: Token
        }).then(res => {
            if (!res.data.succes) {
                if (res.data.debug) {
                    removeCookie("UNOAuthToken")
                }
                navigate('/auth')
            }
            if (res.data.succes) {
              // console.log(res.data.userdatas)
              setMyUserDatas(res.data.userdatas)
              socket.emit('createlobby', res.data.userdatas.UserID, res.data.userdatas.Name, cb => {
                // console.log(cb)
                if (cb.succes) {
                  setCurrentLobbyKey(cb.SocketRoom)
                  setPlayers(previousState => [...previousState, {"Name": res.data.userdatas.Name, "Tag": "(You)", "Owner": true}])
                }
              })
            }
        })
  }, [])



  function JoinLobby() {
    // console.log(Roomkey)
    if (Roomkey && Roomkey !== '') {
      if (CurrentLobbyKey == Roomkey) {
        toast.warning("You aleady in this room!")
      }
      else {
        socket.emit('joinlobby', Roomkey, MyUserDatas, cb => {
          if (cb.succes) {
            setCurrentLobbyKey(cb.roomkey)
            toast.success(cb.message)
            console.log(cb)
            setPlayers([{}])
            cb.clients.forEach(e => {
              if (e!=null) {
                if (e.Owner) {
                  setPlayers(previousState => [...previousState, {"Name": e.Name, "Owner": true}])
                } 
                else {
                  if (e.Name == MyUserDatas.Name) {
                    setPlayers(previousState => [...previousState, {"Name": e.Name, "Tag":"(You)", "Owner": false}])
                  }
                  else {
                    setPlayers(previousState => [...previousState, {"Name": e.Name, "Owner": false}])
                  }
                }
              }
            });
            // JoinMyLobbyMessage(MyUserDatas.Name)
          }
          else {
            toast.warning(cb.message)
            // console.log(cb.message)
          }
        }) 
      }
    }
    else {
      toast.warning("Fill the datas!")
    }
  }

  const PlayerList = Players.map((p) => {
    if (p.Name) {
      let tag = p.Tag || ""
      if (p.Name == MyUserDatas.Name) {
          tag = "(You)"
      }
      if (p.Owner) {
        return (
              <p key={uuid()}>{p.Name + " " + tag + " [Leader]"}</p>
            )
      }
      else {
        return (
          <p key={uuid()}>{p.Name + " " + tag}</p>
        )
      }
    }
  });



  useEffect(() => {
    if (socket == null) return
    
    socket.on("playerjoin", (Name) => 
      setPlayers(previousState => [...previousState, {"Name": Name, "Owner": false}])
    );
    
    return () => socket.off('playerjoin')
  }, [socket])

  useEffect(() => {
    if (socket == null) return
    
    socket.on("clientdisconnectfromlobby", (Name, onlineclients) => {
      console.log(onlineclients)
      setPlayers(onlineclients)
    });
    
    return () => socket.off('clientdisconnectfromlobby')
  }, [socket])

  const StartButton = Players.map((p) => {
    if (p.Name) {
      if (p.Name == MyUserDatas.Name) {
        if (p.Owner) {
          return (
            <button key={uuid()} onClick={StartGameButtonClick}>Start</button>
          )
        }
      }
    }
  });

  function StartGameButtonClick () {
    if (Players.length > 2) { // 2 Because IDK why but the Players array have default 1 element that is empty
      socket.emit('requirestartbytheleader', MyUserDatas, CurrentLobbyKey, cb => {
        if (cb.succes == false) {
          toast.error(cb.Message)
        }
        else {
          navigate('/game')
        }

      })
    }
    else {
      toast.error('You need minimum 2 players to start a game!')
    }
    console.log(Players)
  }

  useState(() => {
    socket.on('gamestartedbytheleader', (PlayerData, RoomKey, Players) => {
      navigate('/game')
    })
  }, [socket])

  return (
    <div>     
      <p>Roomkey: {CurrentLobbyKey}</p>
      <br></br>
      <p>Lobby</p>
      <input type="text" onChange={e=> {
        setRoomkey(e.target.value)
      }}/>
      <button onClick={JoinLobby}>Join</button>
      <br></br>
      <br></br>
      <br></br>
      <Chat Roomkey={CurrentLobbyKey} MyUserDatas={MyUserDatas} Socket={socket}/>
      <br></br>
      <br></br>
      <br></br>
      <p>Players:</p>
      {PlayerList}
      {StartButton}
    </div>
  )
}

export default Lobby