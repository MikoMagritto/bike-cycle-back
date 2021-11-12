import React, { useState, useEffect } from "react";
import { Routes, Route } from 'react-router-dom';

import Navbar from './Components/Navbar'
import Home from "./Components/Home";
import Login from "./Components/auth/Login";
import SignUp from "./Components/auth/SignUp";

import authService from "./Components/auth/auth.service";

const App = () => {

  const [user, setUser] = useState({});

  useEffect(() => {
    getUser();
  })

  const getUser = () => {
    authService.getUser()
      .then(response => {
        console.log('getUser response: ', response.user)
        // updateUser(response.user)
        
      })
      .catch(err => console.log(err))
  }

  const updateUser = (userObj) => {
    setUser({ user : userObj })
  }

  return (

    <div className='App'>
      <Navbar />
      <Routes>
        {/* HOMEPAGE */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );

}

export default App;