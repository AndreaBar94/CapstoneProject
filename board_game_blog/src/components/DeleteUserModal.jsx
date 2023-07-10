import React, { useState } from 'react';
import { Modal, Button, Container, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const DeleteUserModal = ({ show, onHide, onConfirmDelete }) => {
    const [username, setUsername] = useState('');
    const currentUser = useSelector((state) => state.userReducer.currentUser);
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleConfirmDelete = () => {
        if (username === currentUser.username) {
        onConfirmDelete();
        } else {
        alert('Invalid username. Deletion not allowed.');
        }
    };

    return (
        <Modal show={show} onHide={onHide} className='customModalShadow'>
        <Container className="p-5 customModal">
            <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Form.Group>
                <Form.Label>Enter Your Username To Confirm Deletion</Form.Label>
                <Form.Control
                    type="text"
                    value={username}
                    onChange={handleUsernameChange}
                />
                </Form.Group>
            </Form>
            </Modal.Body>
            <Modal.Footer className="flex-column">
            <Button variant="danger" onClick={handleConfirmDelete}>
                Confirm Delete
            </Button>
            <Button variant="secondary" onClick={onHide}>
                Cancel
            </Button>
            </Modal.Footer>
        </Container>
        </Modal>
    );
};

export default DeleteUserModal;
