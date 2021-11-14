import React from "react";
import WrappedGgleMap from "./WrappedGgleMap";
import BikeDetails from "./bike/BikeDetails";

const Home = (props) => {

    return (
        <div>
            Home
            <WrappedGgleMap />
            {props.bikes.map((bike) => {
                console.log('bike: ', bike)
                return (
                    <BikeDetails key={bike._id} bike={bike} />
                )
            })}
        </div>
    );
}

export default Home;