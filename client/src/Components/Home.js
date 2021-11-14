import React , { useEffect } from "react";
import WrappedGgleMap from "./WrappedGgleMap";
import BikeDetails from "./bike/BikeDetails";

const Home = (props) => {

    useEffect(() => {
        props.getBikes();
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            Home
            <WrappedGgleMap />
            {props.bikes.map((bike) => {
                return (
                    <BikeDetails key={bike._id} bike={bike} />
                )
            })}
        </div>
    );
}

export default Home;