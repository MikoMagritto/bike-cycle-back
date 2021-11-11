import React, { useState } from "react";
import authService from "./auth.service";

const SignUp = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: ""
    });

    const { email, password, firstName, lastName } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log('HELLLO WORLD', email, password, firstName, lastName);
        authService.signup(email, password, firstName, lastName)
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
        </>
    );
}

export default SignUp;