import React from 'react';

import { BoardsButton } from '../boards-button/BoardsButton';
import { Search } from '../search/Search';

import './Navbar.scss';

const Navbar = () => {
    return (
        <nav className="navbar">
            <BoardsButton />
            <Search />
        </nav>
    );
};

export default Navbar;
