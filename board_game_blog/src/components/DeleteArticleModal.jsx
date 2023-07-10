import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteArticleModal = ({ show, onHide, confirmArticleDelete }) => {
    return (
        <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>Are you sure you want to delete this article?</p>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
            Cancel
            </Button>
            <Button variant="danger" onClick={confirmArticleDelete}>
            Delete
            </Button>
        </Modal.Footer>
        </Modal>
    );
};

export default DeleteArticleModal;
