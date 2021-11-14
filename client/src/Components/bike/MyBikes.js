import React, { useState } from "react";
import { HashLink as Link } from "react-router-hash-link";
import { useNavigate } from 'react-router-dom';

import bikeService from "./bike.service";

const MyBikes = () => {

    return (
        <>

            <Link to="/add-bike">
                <p>Ajouter un vélo</p>
            </Link>
        </>
    )
}

export default MyBikes;