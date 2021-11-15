import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';

import authService from "../auth.service";


const Login = (props) => {

    const navigate = useNavigate();

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
            .then(user => {
                console.log('response Login: ', user)
                props.updateUser(user);
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

            {/* Login Passeport Local Strategy */}
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

            {/* Login Passeport Facebook Strategy */}
        </>
    );
}

export default Login;