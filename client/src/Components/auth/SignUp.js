import React, { useState } from "react";
import authService from "./auth.service";

const SignUp = () => {

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
            .then(response => {
                setFormData({...formData, message: response.message })
            })
            .catch(err => console.log(err))
    }

    return (
        <>
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