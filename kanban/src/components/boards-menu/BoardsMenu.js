import React, { useState, useContext, useEffect } from 'react';

import './BoardsMenu.scss';

import BoardsContext from '../../context/boardsContext';

import { Search } from '../search/Search';
import { Modal } from '../modal/Modal';
import { BoardListButton } from '../board-list-button/BoardListButton';

export const BoardsMenu = ({ boards }) => {
    const { search } = useContext(BoardsContext);

    const [modal, setModal] = useState(false);
    const [filterBoards, setFilterBoards] = useState(boards);

    useEffect(() => {
        const searchBoards = boards.filter((x) => x.title.includes(search));
        if (searchBoards.length > 0) {
            setFilterBoards(searchBoards);
        }
    }, [boards, search]);

    return (
        <div className="boards-menu">
            <div className="boards-menu__button" onClick={() => setModal(true)}>
                <i className="boards-menu__icon fas fa-th" />
                <p className="boards-menu__title">Boards</p>
            </div>

            {modal && (
                <Modal closeModal={() => setModal(false)}>
                    <div className="boards-menu__modal">
                        <Search search={search} />

                        <h3>Boards</h3>

                        {boards.map((board) => (
                            <BoardListButton board={board} key={board.title} />
                        ))}

                        <h3>Search</h3>
                        {filterBoards &&
                            filterBoards.map((board) => board.title)}
                    </div>
                </Modal>
            )}
        </div>
    );
};
