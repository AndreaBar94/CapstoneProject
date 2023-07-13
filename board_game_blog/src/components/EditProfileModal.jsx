import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { deleteUser, updateUser } from '../redux/actions';
import { useNavigate } from 'react-router';
import DeleteUserModal from './DeleteUserModal';

const EditProfileModal = ({ show, onHide, user }) => {
    const [editedUser, setEditedUser] = useState({});
    const [confirmDelete, setConfirmDelete] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(() => {
        setEditedUser(user);
    }, [user]);

    const handleChange = (event) => {
    setEditedUser({
        ...editedUser,
        [event.target.name]: event.target.value,
    });
    };
    

    const handleUserSave = () => {
        const isEmpty = Object.values(editedUser).some((value) => value === "");
        if (isEmpty) {
            alert("Empty fields are not allowed.");
            return;
            }
        dispatch(updateUser(editedUser, user.userId));
        onHide();
    };

    const handleDeleteUser = () => {    
        setConfirmDelete(true);
    };

    const handleConfirmDelete = () => {
        dispatch(deleteUser(user.userId, navigate));
        onHide();
    };

    const handleCancelDelete = () => {
    setConfirmDelete(false);
    };

    return (
        <>
        <Modal show={show} onHide={onHide} className='customModalShadow'>
            <Container className="p-5 customModal">
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                    <Form.Group className="mb-2">
                    <Form.Label>Profile Image URL:</Form.Label>
                    <Form.Control
                        type="text"
                        name="profileImgUrl"
                        value={editedUser.profileImgUrl}
                        onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control
                        required
                        type="text"
                        name="username"
                        value={editedUser.username}
                        onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>First Name:</Form.Label>
                        <Form.Control
                        required
                        type="text"
                        name="firstname"
                        value={editedUser.firstname}
                        onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Last Name:</Form.Label>
                        <Form.Control
                        required
                        type="text"
                        name="lastname"
                        value={editedUser.lastname}
                        onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                        required
                        type="email"
                        name="email"
                        value={editedUser.email}
                        onChange={handleChange}
                        />
                    </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className='flex-column'>
                    <Button variant="success" onClick={handleUserSave}>
                    Save Changes
                    </Button>
                    <Button variant="secondary" onClick={onHide} className=''>
                    Close
                    </Button>
                </Modal.Footer>
                <Modal.Footer className='flex-column pb-0'>
                    <Button variant="danger"  onClick={handleDeleteUser}>
                        <span>
                            Delete User (irreversible)
                        </span>
                    </Button>
                </Modal.Footer>
            </Container>
        </Modal>
        <DeleteUserModal
        show={confirmDelete}
        onHide={handleCancelDelete}
        onConfirmDelete={handleConfirmDelete}
        />
        </>
        
    );
};

export default EditProfileModal;
