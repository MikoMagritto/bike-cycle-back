import React, { Component } from "react";
import { withScriptjs, withGoogleMap } from "react-google-maps";
import GgleMap from "./GgleMap";

const WrappedMap = withScriptjs(withGoogleMap(GgleMap));

export default class WrappedGgleMap extends Component {
  
  render() {
    return (
      <div style={{width:'100vw', height:'100%'}}>
        <WrappedMap
          googleMapURL={
            `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GMAPS_API_KEY}&callback=initMap`
          }
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}