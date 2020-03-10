import ReactDOM from 'react-dom';
import { useEffect } from 'react';

const modalRoot = document.getElementById('portal');

type Props = {
    children: React.ReactNode;
};

export const Modal = ({ children }: Props) => {
    const el = document.createElement('div');

    useEffect(() => {
        modalRoot?.appendChild(el);

        return () => {
            modalRoot?.removeChild(el);
        };
    }, [el]);

    return ReactDOM.createPortal(children, el);
};
