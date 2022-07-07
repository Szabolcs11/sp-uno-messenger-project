import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Route, Routes } from 'react-router-dom';
import Auth from "./Pages/Auth";
import Index from "./Pages/Index";

function App() {
  const [user, setUser] = useState(null)
  const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);

  useEffect(() => {
    const {token} = cookies

    if(token) {
      axios.get('http://localhost:1337/api/users/me', {
        headers: {
          Authorization: "Bearer " + token,
        },
      }).then(res=> {
        // console.log(res.data)
          if (res.data) {
            setUser(true)
          }
          else {
            setUser(false)
          }
      })
    }
    setUser(false)
  }, [])

  if (user==null) {
    return (null)
  }

  return (
    <div className="Main-Container">
      <Routes  location={user ? "/" : "/auth"}>
        {user ? 
          <Route path='/' element={<Index/>}></Route>
        : 
          <Route path="/auth" element={<Auth/>}></Route>
        }

      </Routes>
    </div>
  );
}

export default App;
