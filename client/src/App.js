import React, { Component } from "react";
import { Routes, Route } from 'react-router-dom';

import Navbar from './Components/Navbar'
import Home from "./Components/Home";
import Login from "./Components/auth/Login";
import SignUp from "./Components/auth/SignUp";

class App extends Component {

  render() {

    return (

      <div className='App'>
        <Navbar />
        <Routes>
          {/* HOMEPAGE */}
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<SignUp/>} />
        </Routes>
      </div>
    );
  }
}

export default App;



/*render={(props) => (
  <DetailGame {...props} userInSession={this.state.user} />

*/