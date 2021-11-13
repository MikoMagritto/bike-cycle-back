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
    // eslint-disable-next-line
  }, [])

  const getUser = () => {
    authService.getUser()
      .then(user => {
        console.log('getUser response: ', user)
        updateUser(user)
      })
      .catch(err => console.log('err: ', err))
  }

  const updateUser = (userObj) => {
    setUser(userObj)
  }

  return (

    <div className='App'>
      <Navbar user={user} updateUser={updateUser} />
      <Routes>
        {/* HOMEPAGE */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login user={user} updateUser={updateUser} />} />
        <Route path="/signup" element={<SignUp user={user} updateUser={updateUser} />} />
      </Routes>
    </div>
  );

}

export default App;