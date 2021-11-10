import React, { Component } from "react";
import Map from "./Map";
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default class Home extends Component {
  render() {
    return (
      <div style={{width:'100vw', height:'100%'}}>
        <WrappedMap
          googleMapURL={
            "https://maps.googleapis.com/maps/api/js?key=AIzaSyASiotkwT34s1TQrCk0GWDCcGFrF6OCrOQ&callback=initMap"
          }
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}
