import React, { useState, useContext } from 'react';

import BoardsContext from '../../context/boardsContext';

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

            <div className="navbar__logo">
                <div className="navbar__link">
                    <i className="fab fa-trello" /> Trello
                </div>
            </div>

            <UserButton />
            <NotificationsButton />
            <MenuButton />
        </nav>
    );
};
