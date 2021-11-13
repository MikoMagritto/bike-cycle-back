import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import bikeService from "./bike.service";

const NewBike = (props) => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        brand: "",
        size: "",
        adress:"",
        availabilty:""
    });

    const { name, brand, size , adress, availabilty} = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleFormSubmit = (e) => {
        e.preventDefault();
        bikeService.addNewBike(name, brand, size , adress, availabilty)
            .then(response => {
                console.log('response add bike element ', response)

            })
            .catch(err => console.log('err: ',err.response))
    }

    return (
        <>
            {/* If user is not logged in -> redirect to '/'*/}
            {!props.user && navigate('/')}

            <form onSubmit={handleFormSubmit}>
                <label>Nom:
                    <input type="text" name="name" value={name} onChange={onChange} />
                </label>

                <label>Marque:
                    <input type="text" name="brand" value={brand} onChange={onChange} />
                </label>

                <label>Size:
                    <select
                        name="size"
                        value={size}
                        onChange={onChange}
                    >
                        <option value="" selected disabled hidden>Choose here</option>
                        <option value="XS">XS</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                    </select>
                </label>

                <label>Adresse:
                    <input type="text" name="adress" value={adress} onChange={onChange} />
                </label>

                <label>Disponibilité:
                    <select
                        name="availabilty"
                        value={availabilty}
                        onChange={onChange}
                    >
                        <option value="" selected disabled hidden>Choose here</option>
                        <option value="XS">Oui</option>
                        <option value="S">Non</option>
                    </select>
                </label>

                <button>Ajouter</button>
            </form>
        </>
    )
}

export default NewBike;