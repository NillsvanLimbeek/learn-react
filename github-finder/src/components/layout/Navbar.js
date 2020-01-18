import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Navbar = ({ icon, title }) => {
    return (
        <nav className="navbar bg-primary">
            <h1>
                <Link to="/">
                    <i className={icon} /> {title}
                </Link>
            </h1>
            <ul>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
            </ul>
        </nav>
    );
};

Navbar.defaultProps = {
    title: 'GitHub finder',
    icon: 'fab fa-github',
};

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
};

export default Navbar;
