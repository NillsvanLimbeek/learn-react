import React from 'react';

import { BoardsButton } from '../boards-button/BoardsButton';
import { Search } from '../search/Search';

import './Navbar.scss';

export const Navbar = () => {
    const state = {
        search: '',
    };

    return (
        <nav className="navbar">
            <BoardsButton />
            <Search search={state.search} />
        </nav>
    );
};
