import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import BoardsContext from '../../context/boards/boardsContext';

import { BoardsMenu } from '../boards-menu/BoardsMenu';
import { Search } from '../search/Search';
import { UserButton } from '../user-button/UserButton';
import { NotificationsButton } from '../notifications-button/NotificationsButton';
import { MenuButton } from '../menu-button/MenuButton';

import './Navbar.scss';

export const Navbar = () => {
    const { boards } = useContext(BoardsContext);

    const [search, setSearch] = useState('');

    return (
        <nav className="navbar">
            <BoardsMenu boards={boards} />
            <Search withModal search={search} onSearch={setSearch} />

            <Link to="/" className="navbar__logo">
                <div className="navbar__link">
                    <i className="fab fa-trello" /> Trello
                </div>
            </Link>

            <UserButton />
            <NotificationsButton />
            <MenuButton />
        </nav>
    );
};
