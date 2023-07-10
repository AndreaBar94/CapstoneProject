import React from 'react';
import { Modal, Button, Container } from 'react-bootstrap';

const DeleteCommentModal = ({ show, onHide, confirmCommentDelete }) => {
    return (
        <Modal show={show} onHide={onHide} className='customModalShadow'>
            <Container className="p-5 customModal">
                <Modal.Header closeButton>
                <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this comment?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>
                    Cancel
                    </Button>
                    <Button variant="danger" onClick={confirmCommentDelete}>
                    Delete
                    </Button>
                </Modal.Footer>
            </Container>
        
        </Modal>
    );
};

export default DeleteCommentModal;
