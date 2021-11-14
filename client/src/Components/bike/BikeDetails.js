import React from "react";

const BikeDetails = (props) => {

    return (
        <div className="bike-container">
            <img src='https://via.placeholder.com/150' alt='bike-pict'/>
            <p><span>Nom:</span>{props.bike.name}</p>
            <p><span>Marque:</span>{props.bike.brand}</p>
            <p><span>Size:</span>{props.bike.size}</p>
            <p><span>Adresse:</span>{props.bike.address}</p>
        </div>
    )
}

export default BikeDetails;