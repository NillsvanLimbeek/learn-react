import React from 'react';

import './BoardListButton.scss';

export const BoardListButton = ({ board }) => {
    return (
        <div className="board-list-button">
            <div className="board-list-button__main">
                <i
                    className="board-list-button__square fas fa-square"
                    style={{ color: `${board.color}` }}
                />
                <p className="board-list-button__title">{board.title}</p>
            </div>

            <div className="board-list-button__actions">
                <i className="board-list-button__trash fas fa-trash" />
                <i className="board-list-button__star fas fa-star" />
            </div>
        </div>
    );
};
