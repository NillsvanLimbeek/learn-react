import React from 'react';

import { BoardsButton } from '../boards-button/BoardsButton';
import { Search } from '../search/Search';
import { UserButton } from '../user-button/UserButton';
import { NotificationsButton } from '../notifications-button/NotificationsButton';
import { MenuButton } from '../menu-button/MenuButton';

import './Navbar.scss';

export const Navbar = ({ boards }) => {
    const state = {
        search: '',
    };

    return (
        <nav className="navbar">
            <BoardsButton boards={boards} />
            <Search search={state.search} />

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
