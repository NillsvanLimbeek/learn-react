import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import './BoardsMenu.scss';

import { SideMenu } from '../side-menu/SideMenu';
import { Search } from '../search/Search';
import { BoardListButton } from '../board-list-button/BoardListButton';

export const BoardsMenu = ({ boards }) => {
    const [sideMenu, setSideMenu] = useState(false);
    const [search, setSearch] = useState('');
    const [filtererdBoards, setFilteredBoards] = useState(boards);

    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        return setFilteredBoards(
            boards.filter((board) => board.title.includes(search)),
        );
    }, [search, boards]);

    const redirectTo = (id) => {
        location.pathname.includes('board')
            ? history.push(`${id}`)
            : history.push(`board/${id}`);

        setSideMenu(false);
        setSearch('');
    };

    return (
        <div className="boards-menu">
            <div
                className="boards-menu__button"
                onClick={() => setSideMenu(true)}
            >
                <i className="boards-menu__icon fas fa-th" />
                <p className="boards-menu__title">Boards</p>
            </div>

            {sideMenu && (
                <SideMenu closeSideMenu={() => setSideMenu(false)}>
                    <div className="boards-menu__menu">
                        <Search search={search} onSearch={setSearch} />

                        <h3>Boards</h3>

                        {filtererdBoards.map((board) => (
                            <BoardListButton
                                board={board}
                                key={board.title}
                                redirectTo={redirectTo}
                            />
                        ))}

                        <div className="boards-menu__add">
                            <i className="fas fa-plus"></i> Add Board
                        </div>
                    </div>
                </SideMenu>
            )}
        </div>
    );
};
