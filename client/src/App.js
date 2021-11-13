import React, { useState, useEffect } from "react";
import { Routes, Route } from 'react-router-dom';

import Navbar from './Components/Navbar'
import Home from "./Components/Home";
import Login from "./Components/auth/Login";
import SignUp from "./Components/auth/SignUp";
import BikeDetails from "./Components/bike/BikeDetails";
import NewBike from "./Components/bike/NewBike";

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

        {/* LOGIN */}
        <Route path="/login" element={<Login user={user} updateUser={updateUser} />} />

        {/* SIGN UP */}
        <Route path="/signup" element={<SignUp user={user} updateUser={updateUser} />} />

        {/* NEW BIKE */}
        <Route path="/add-bike" element={<NewBike user={user}/>} />

        {/* BIKE DETAILS */}
        {/* <Route path="/bikes/:id" element={<BikeDetails />} /> */}
      </Routes>
    </div>
  );

}

export default App;