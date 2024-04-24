import React from 'react';
import { Link } from 'react-router-dom';

function Navigation({ isLoggedIn, username, logout }) {
    return (
        <nav>
            {isLoggedIn ? (
                <>
                    <span>Welcome, {username}!</span>
                    <Link to="/" onClick={logout}>Logout</Link>
                </>
            ) : (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Signup</Link>
                </>
            )}
        </nav>
    );
}

export default Navigation;
