import React, { useEffect } from "react";
import { HashLink as Link } from "react-router-hash-link";

import BikeDetails from "./BikeDetails";

const MyBikes = (props) => {

    useEffect(() => {
        props.getBikes({ bikeOwner: props.user._id });
        // eslint-disable-next-line
    }, [])

    return (
        <>
            {console.log('props: ', props)}

            {props.bikes.map((bike) => {
                return (
                    <BikeDetails key={bike._id} bike={bike} />
                )
            })}
            <Link to="/add-bike">
                <p>Ajouter un vélo</p>
            </Link>
        </>
    )
}

export default MyBikes;