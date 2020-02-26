import ReactDOM from 'react-dom';
import { useEffect } from 'react';

const modalRoot = document.getElementById('portal');

export const Modal = ({ children }) => {
    const el = document.createElement('div');

    useEffect(() => {
        modalRoot.appendChild(el);

        return () => modalRoot.removeChild(el);
    }, [el]);

    return ReactDOM.createPortal(children, el);
};
