import logo from './logo.svg';
import './App.css';
import React, { Component } from "react";
import { Routes, Route } from "react-router";
import Home from "./Components/Home"

function App() {
  return (
        <Home/>
  );
}

export default App;



/*render={(props) => (
  <DetailGame {...props} userInSession={this.state.user} />

*/