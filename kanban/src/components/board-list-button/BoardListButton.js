import React, { useContext } from 'react';

import BoardsContext from '../../context/boards/boardsContext';

import './BoardListButton.scss';

export const BoardListButton = ({ board, redirectTo }) => {
    const { removeBoard, favoriteBoard } = useContext(BoardsContext);

    return (
        <div className="board-list-button">
            <div
                className="board-list-button__main"
                onClick={() => redirectTo(board.id)}
            >
                <i
                    className="board-list-button__square fas fa-square"
                    style={{ color: `${board.color}` }}
                />
                <p className="board-list-button__title">{board.title}</p>
            </div>

            <div className="board-list-button__actions">
                <i
                    className="board-list-button__trash fas fa-trash"
                    onClick={() => removeBoard(board.title)}
                />
                <i
                    className={`board-list-button__star fas fa-star ${
                        board.favorite ? 'board-list-button__star--active' : ''
                    }`}
                    onClick={() => favoriteBoard(board.title)}
                />
            </div>
        </div>
    );
};
