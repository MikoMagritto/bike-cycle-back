import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';

import authService from "./auth.service";

const SignUp = (props) => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        message: ""
    });

    const { email, password, firstName, lastName , message} = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleFormSubmit = (e) => {
        e.preventDefault();
        authService.signup(email, password, firstName, lastName)
            .then(user => {
                console.log('response Sign Up: ', user)
                props.updateUser(user)
                navigate('/');
            })
            .catch(err => {
                setFormData({ ...formData, message: err.response.data.message })
            })
    }

    return (
        <>
            {/* If user is logged in -> redirect to '/'*/}
            {props.user && navigate('/')}
            
            <form onSubmit={handleFormSubmit}>
                <label>Email:
                    <input type="email" name="email" value={email} onChange={onChange} />
                </label>

                <label>Password:
                    <input type="password" name="password" value={password} onChange={onChange} />
                </label>

                <label>Firstname:
                    <input type="text" name="firstName" value={firstName} onChange={onChange} />
                </label>

                <label>Lastname:
                    <input type="text" name="lastName" value={lastName} onChange={onChange} />
                </label>

                <button>Sign Up</button>
            </form>

            {message && (
                <p className="message">{message}</p>
            )}
        </>
    );
}

export default SignUp;