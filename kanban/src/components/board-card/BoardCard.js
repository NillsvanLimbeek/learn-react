import React from 'react';

import './BoardCard.scss';

export const BoardCard = ({ board }) => {
    return <div className="board-card">{board.title}</div>;
};
