import React from 'react';
import { Modal, Button, Container } from 'react-bootstrap';

const DeleteArticleModal = ({ show, onHide, confirmArticleDelete }) => {
    return (
        <Modal show={show} onHide={onHide}  className='customModalShadow'>
            <Container className="p-5 customModal">
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        ARE YOU SURE YOU WANT TO DELETE THIS ARTICLE?
                        <br />
                        (This will delete all article's comments and all the likes you have earned.)
                    </p>
                </Modal.Body>
                <Modal.Footer className='justify-content-between'>
                    <Button variant="danger" onClick={confirmArticleDelete}>
                    Delete
                    </Button>
                    <Button variant="secondary" onClick={onHide}>
                    Cancel
                    </Button>
                </Modal.Footer>
            </Container>
        
        </Modal>
    );
};

export default DeleteArticleModal;
