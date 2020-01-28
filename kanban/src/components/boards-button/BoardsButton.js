import React, { useState } from 'react';

import './BoardsButton.scss';

import { Modal } from '../modals/Modal';

export const BoardsButton = () => {
    const [modal, setModal] = useState(false);

    return (
        <div className="boards-button">
            <i className="boards-button__icon fas fa-th" />
            <p className="boards-button__title" onClick={() => setModal(true)}>
                Boards
            </p>

            {modal && (
                <Modal closeModal={() => setModal(false)}>
                    <p>Modal</p>
                </Modal>
            )}
        </div>
    );
};
