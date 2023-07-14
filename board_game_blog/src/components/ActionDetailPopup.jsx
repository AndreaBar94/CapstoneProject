import React, { useEffect } from 'react'
import { Modal } from 'react-bootstrap'

const ActionDetailPopup = ({message, onClose, isSuccess}) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 1500);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const popupClass = isSuccess ? 'popup-success' : 'popup-failure';
    
    return (
    <Modal show={true} onHide={() => {}} backdrop="static" keyboard={false} >
        <Modal.Body className={`action-popup ${popupClass}`}>
            {message}
        </Modal.Body>
    </Modal>
    )
}

export default ActionDetailPopup;