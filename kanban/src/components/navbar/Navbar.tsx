import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Navbar.scss';

import {
    useBoardsState,
    useBoardsDispatch,
} from '../../context/boards/boardsContext';

import { BoardsMenu } from '../boards-menu/BoardsMenu';
import { Search } from '../search/Search';
import { UserButton } from '../user-button/UserButton';
import { NotificationsButton } from '../notifications-button/NotificationsButton';
import { MenuButton } from '../menu-button/MenuButton';

export const Navbar = () => {
    // boards context
    const { boards } = useBoardsState();
    const boardsDispatch = useBoardsDispatch();

    const [search, setSearch] = useState('');

    const removeBoard = (id: string) => {
        boardsDispatch({ type: 'REMOVE_BOARD', payload: id });
    };

    const favoriteBoard = (id: string) => {
        const board = boards.find((board) => board.id === id);

        if (board) {
            boardsDispatch({
                type: 'UPDATE_BOARD',
                payload: { ...board, favorite: !board.favorite },
            });
        }
    };

    return (
        <nav className="navbar">
            <BoardsMenu
                boards={boards}
                removeBoard={removeBoard}
                favoriteBoard={favoriteBoard}
            />
            <Search
                withModal
                search={search}
                onChange={(e) => setSearch(e.currentTarget.value)}
            />

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
