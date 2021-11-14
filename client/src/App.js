import React, { useState, useEffect } from "react";
import { Routes, Route } from 'react-router-dom';

import Navbar from './Components/Navbar'
import Home from "./Components/Home";
import Login from "./Components/auth/Login";
import SignUp from "./Components/auth/SignUp";
import NewBike from "./Components/bike/NewBike";
import MyBikes from "./Components/bike/MyBikes";

import authService from "./Components/auth/auth.service";
import bikeService from "./Components/bike/bike.service";

const App = () => {

  const [user, setUser] = useState({});
  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    getUser();
    getBikes();
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

  const getBikes = (filter) => {
    console.log('filter: ',filter)
    bikeService.getBikes(filter)
      .then(bikes => {
        console.log('getBikes response: ', bikes)
        updateBikes(bikes)
      })
      .catch(err => console.log('err: ', err))
  }

  const updateBikes = (bikesArr) => {
    setBikes(bikesArr);
  }

  return (

    <div className='App'>
      <Navbar user={user} updateUser={updateUser} />
      <Routes>
        {/* HOMEPAGE */}
        <Route path="/" element={<Home bikes={bikes} getBikes={getBikes} />} />

        {/* LOGIN */}
        <Route path="/login" element={<Login user={user} updateUser={updateUser} />} />

        {/* SIGN UP */}
        <Route path="/signup" element={<SignUp user={user} updateUser={updateUser} />} />

        {/* NEW BIKE */}
        <Route path="/add-bike" element={<NewBike user={user} getBikes={getBikes}/>} />

        {/* MY BIKES */}
        <Route path="/my-bikes" element={<MyBikes user={user} bikes={bikes} getBikes={getBikes} />} />

      </Routes>
    </div>
  );
}

export default App;