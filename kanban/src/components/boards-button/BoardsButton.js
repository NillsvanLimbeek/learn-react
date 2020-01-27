import React, { useState } from 'react';

import './BoardsButton.scss';

export const BoardsButton = () => {
    const [modal, setModal] = useState(false);

    return (
        <div className="boards-button" onClick={() => setModal(true)}>
            <i className="boards-button__icon fas fa-th" />
            <p className="boards-button__title">Boards</p>

            {modal && <p>Modal Open</p>}
        </div>
    );
};
