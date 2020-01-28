import React from 'react';

import './Modal.scss';

export const Modal = (props) => {
    return (
        <div className="modal">
            <i
                className="modal__close fas fa-times"
                onClick={() => props.closeModal()}
            />
            {props.children}
        </div>
    );
};
