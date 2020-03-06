import React from 'react';

import './BoardCard.scss';

export const BoardCard = ({ board }: any) => {
    return (
        <div
            className="board-card"
            style={{ border: `1px solid ${board.color}` }}
        >
            <p className="board-card__title">{board.title}</p>

            {board.favorite && <i className="boards-card__star fas fa-star" />}
        </div>
    );
};
