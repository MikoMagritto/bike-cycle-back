import React, { useState } from "react";

import authService from "./auth.service";


const Login = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        message: ""
    });

    const { email, password, message } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleFormSubmit = (e) => {
        e.preventDefault();
        authService.login(email, password)
            .then(response => {
                console.log('response: ',response)
                setFormData({ ...formData, message: response.message })
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

                <button>Login</button>
            </form>

            {message && (
                <p className="message">{message}</p>
            )}
        </>
    );
}

export default Login;