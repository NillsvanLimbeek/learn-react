import React from 'react';

import './Navbar.scss';

const Navbar = ({ name, setName }) => {
    const links = ['Nills', 'Charlie', 'Kay'];

    const handleCLick = (link) => {
        console.log(link);
        setName(link);
    };

    return (
        <nav className="navbar">
            Navigation {name}
            <ul>
                {links.map((link) => (
                    <button key={link} onClick={() => handleCLick(link)}>
                        {link}
                    </button>
                ))}
            </ul>
        </nav>
    );
};

export default Navbar;
