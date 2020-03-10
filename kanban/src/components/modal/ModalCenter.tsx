import React from 'react';

import './Modal.scss';

type Props = {
    children: React.ReactNode;
    closeModal: () => void;
};

export const ModalCenter = ({ children, closeModal }: Props) => {
    return (
        <div className="modal">
            <div className="modal__body">
                <i
                    className="modal__close fas fa-times"
                    onClick={() => closeModal()}
                />
                {children}
            </div>

            <div className="modal__background" onClick={() => closeModal()} />
        </div>
    );
};
