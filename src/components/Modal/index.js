import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

const modalRoot = document.getElementById('modal');
const app = document.getElementById('root');
const className = 'blur-bg-modal';

const ModalLayout = ({
    content
}) => {
    return (
        <div className="modal-wrapper">
            <div className="modal-content">
                { content }
            </div>
        </div>
    )
}


export function Modal({
    show,
    children
}) {

    useEffect(() => {
        app.classList.add(className);
        return () => {
            app.classList.remove(className);
        }
    }, [show]);

    return ReactDOM.createPortal(
        show ? <ModalLayout content={children}/> : null,
        modalRoot
    );
}