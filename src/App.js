import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Route, Routes } from 'react-router-dom';
import Auth from "./Pages/Auth";
import Index from "./Pages/Index";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"

const client = new ApolloClient({
  // uri: "http://localhost:1337/graphql",
  uri: "http://localhost:8008/",
  cache: new InMemoryCache()
})

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
            setUser(res.data)
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
    <ApolloProvider client={client}>
      <div className="Main-Container">
        <Routes  location={user ? "/" : "/auth"}>
          {user ? 
            <Route path='/' element={<Index UserDatas={user}/>}></Route>
          : 
            <Route path="/auth" element={<Auth/>}></Route>
          }

        </Routes>
      </div>
    </ApolloProvider>
  );
}

export default App;
