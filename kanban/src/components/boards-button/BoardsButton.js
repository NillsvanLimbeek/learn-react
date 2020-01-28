import React, { useState } from 'react';

import './BoardsButton.scss';

import { Modal } from '../modal/Modal';
import { BoardListButton } from '../board-list-button/BoardListButton';

export const BoardsButton = ({ boards }) => {
    const [modal, setModal] = useState(false);

    return (
        <div className="boards-button">
            <i className="boards-button__icon fas fa-th" />
            <p className="boards-button__title" onClick={() => setModal(true)}>
                Boards
            </p>

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
