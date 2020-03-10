import React from 'react';

import './BoardListButton.scss';

import { IBoard } from '../../data/types/Board';

type Props = {
    board: IBoard;
    redirectTo: (id: string) => void;
    removeBoard: (id: string) => void;
    favoriteBoard: (id: string) => void;
};

export const BoardListButton = ({
    board,
    redirectTo,
    removeBoard,
    favoriteBoard,
}: Props) => {
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
                    onClick={() => removeBoard(board.id)}
                />
                <i
                    className={`board-list-button__star fas fa-star ${
                        board.favorite ? 'board-list-button__star--active' : ''
                    }`}
                    onClick={() => favoriteBoard(board.id)}
                />
            </div>
        </div>
    );
};
