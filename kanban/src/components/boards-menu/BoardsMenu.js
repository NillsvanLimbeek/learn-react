import React, { useState } from 'react';

import './BoardsMenu.scss';

import { Modal } from '../modal/Modal';
import { BoardListButton } from '../board-list-button/BoardListButton';

export const BoardsMenu = ({ boards }) => {
    const [modal, setModal] = useState(false);

    return (
        <div className="boards-menu">
            <div className="boards-menu__button" onClick={() => setModal(true)}>
                <i className="boards-menu__icon fas fa-th" />
                <p className="boards-menu__title">Boards</p>
            </div>

            {modal && (
                <Modal closeModal={() => setModal(false)}>
                    <h2>Workspaces</h2>

                    {boards.map((board) => (
                        <BoardListButton board={board} key={board.title} />
                    ))}
                </Modal>
            )}
        </div>
    );
};
