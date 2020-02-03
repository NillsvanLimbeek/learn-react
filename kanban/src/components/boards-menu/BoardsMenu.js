import React, { useState, useEffect } from 'react';

import './BoardsMenu.scss';

import { Search } from '../search/Search';
import { Modal } from '../modal/Modal';
import { BoardListButton } from '../board-list-button/BoardListButton';

export const BoardsMenu = ({ boards }) => {
    const [modal, setModal] = useState(false);
    const [search, setSearch] = useState('');
    const [filtererdBoards, setFilteredBoards] = useState(boards);

    useEffect(() => {
        setFilteredBoards(
            boards.filter((board) => board.title.includes(search)),
        );
    }, [search, boards]);

    return (
        <div className="boards-menu">
            <div className="boards-menu__button" onClick={() => setModal(true)}>
                <i className="boards-menu__icon fas fa-th" />
                <p className="boards-menu__title">Boards</p>
            </div>

            {modal && (
                <Modal closeModal={() => setModal(false)}>
                    <div className="boards-menu__modal">
                        <Search search={search} onSearch={setSearch} />

                        <h3>Boards</h3>

                        {filtererdBoards.map((board) => (
                            <BoardListButton board={board} key={board.title} />
                        ))}
                    </div>
                </Modal>
            )}
        </div>
    );
};
