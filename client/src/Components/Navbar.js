import React from "react";
import { HashLink as Link } from "react-router-hash-link";

import authService from "./auth/auth.service";

const Navbar = (props) => {

    const logout = () => {
        authService.logout()
            .then(response => {
                console.log('response navbar: ', response)
                props.updateUser(response.user)
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='navbar'>
            <Link to="/">
                <p>Home</p>
            </Link>

            {console.log('props: ', props)}
            {/* If user is not logged in -> display login & sign up link*/}
            {!props.user && (
                <>
                    <Link to="/login">
                        <p>Login</p>
                    </Link>
                    <Link to="/signup">
                        <p>Sign Up</p>
                    </Link>
                </>
            )}

            {/* If user is logged in -> display logout button*/}
            {props.user && (
                <>
                    <Link to="/courses">
                        <p>Mes trajets</p>
                    </Link>
                    <Link to="/my-bikes">
                        <p>Mes vélos</p>
                    </Link>
                    <button className="btn logout" onClick={logout}>
                        Log out
                    </button>
                </>
            )}

        </div>
    )
}

export default Navbar;