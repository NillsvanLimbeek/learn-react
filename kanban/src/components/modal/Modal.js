import React from 'react';

import './Modal.scss';

export const Modal = ({ children, closeModal }) => {
    return (
        <div className="modal">
            <i
                className="modal__close fas fa-times"
                onClick={() => closeModal()}
            />
            {children}
        </div>
    );
};
