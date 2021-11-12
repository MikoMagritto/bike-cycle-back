import React from "react";
import { HashLink as Link } from "react-router-hash-link";

const Navbar = () => {

    return (
        <div className='navbar'>
            <Link to="/">
                <p>Home</p>
            </Link>
            <Link to="/login">
                <p>Login</p>
            </Link>
            <Link to="/signup">
                <p>Sign Up</p>
            </Link>
        </div>
    )
}

export default Navbar;