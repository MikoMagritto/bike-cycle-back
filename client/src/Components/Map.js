import React, { Component } from "react";
import { GoogleMap } from "react-google-maps";

export default class Map extends Component {

    
  
    render() {
    
    return (
      <div>
        <GoogleMap
          defaultZoom={10}
          defaultCenter={{ lat: 48.856613, lng: 2.352222 }}
        />
      </div>
    );
  }
}
