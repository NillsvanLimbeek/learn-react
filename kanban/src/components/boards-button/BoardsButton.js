import React from 'react';

import './BoardsButton.scss';

export const BoardsButton = () => {
    return (
        <div className="boards-button">
            <i className="boards-button__icon fas fa-th" />
            <p className="boards-button__title">Boards</p>
        </div>
    );
};
