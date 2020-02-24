import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import './BoardsList.scss';

import BoardsContext from '../../context/boards/boardsContext';

import { BoardCard } from '../board-card/BoardCard';

export const BoardsList = () => {
    const { boards } = useContext(BoardsContext);

    return (
        <div className="boards-list">
            {boards.map((board) => (
                <Link to={`/board/${board.id}`} key={board.id}>
                    <BoardCard board={board} key={board.id} />
                </Link>
            ))}

            {boards.map((board) =>
                board.favorite ? (
                    <BoardCard board={board} key={board.id} />
                ) : null,
            )}
        </div>
    );
};
