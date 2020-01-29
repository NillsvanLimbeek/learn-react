import React, { useContext } from 'react';

import './BoardsList.scss';

import BoardsContext from '../../context/boardsContext';

import { BoardCard } from '../board-card/BoardCard';

export const BoardsList = () => {
    const { boards } = useContext(BoardsContext);

    return (
        <div className="boards-list">
            {boards.map((board) => (
                <BoardCard board={board} key={board.title} />
            ))}
        </div>
    );
};
