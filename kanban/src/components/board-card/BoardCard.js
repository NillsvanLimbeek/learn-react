import React from 'react';

import './BoardCard.scss';

export const BoardCard = ({ board }) => {
    return (
        <div
            className="board-card"
            style={{ border: `1px solid ${board.color}` }}
        >
            {board.title}
        </div>
    );
};
