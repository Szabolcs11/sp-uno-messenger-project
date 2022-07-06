import React from "react";
import { Route, Routes } from 'react-router-dom';
import Lobby from "./pages/Lobby.js";
import Login from "./pages/Login.js";
import Game from "./pages/Game.js";
import LandingPage from "./pages/LandingPage.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    <Routes>
      <Route path="/" element={<LandingPage/>}></Route>
      <Route path='/auth' element={<Login/>}></Route>
      <Route path='/lobby' element={<Lobby/>}></Route>
      <Route path='/game' element={<Game/>}></Route>
    </Routes>
    </>
  );
}

export default App;
