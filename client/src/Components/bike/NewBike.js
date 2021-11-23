import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import bikeService from "./bike.service";

const NewBike = (props) => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        brand: "",
        size: "",
        address: "",
        availabilty: "",
        message: ""
    });

    const { name, brand, size, address, availability, message } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleFormSubmit = (e) => {
        e.preventDefault();
        bikeService.addNewBike(name, brand, size, address, availability)
            .then(response => {
                console.log('response add bike element ', response)
                navigate('/my-bikes');
            })
            .catch(err => {
                console.log('err: ', err)
                setFormData({ ...formData, message: err.response.data.message });
            })
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

                <label>Disponibilité:
                    <select
                        name="availability"
                        value={availability}
                        onChange={onChange}
                    >
                        <option value="" selected disabled hidden>Choose here</option>
                        <option value="Oui">Oui</option>
                        <option value="Non">Non</option>
                    </select>
                </label>

                <label>Adresse:
                    <input type="text" name="address" value={address} onChange={onChange} />
                </label>

                <div className="bikeAdress">
                    <label>
                        <span>Enter adresse</span>
                        <input
                            id="ship-address"
                            name="ship-address"
                            required
                            autocomplete="off"
                        />
                    </label>
                    <label>
                        <span>City*</span>
                        <input
                            id="locality"
                            name="locality"
                            required />
                    </label>
                    <label for="postal_code">
                        <span>Postal code*</span>
                        <input
                            id="postcode"
                            name="postcode"
                            required />
                    </label>
                </div>

                <button>Ajouter</button>
            </form>

            {message && (
                <p className="message">{message}</p>
            )}
        </>
    )
}

export default NewBike;