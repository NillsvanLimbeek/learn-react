import React from 'react';

import './Modal.scss';

export const Modal = ({ children, closeModal }) => {
    return (
        <div className="modal">
            <div className="modal__body">
                <i
                    className="modal__close fas fa-times"
                    onClick={() => closeModal()}
                />
                {children}
            </div>

            <div className="modal__background" />
        </div>
    );
};
