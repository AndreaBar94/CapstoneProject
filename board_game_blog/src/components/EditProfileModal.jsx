import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { deleteUser, updateUser } from '../redux/actions';
import { useNavigate } from 'react-router';

const EditProfileModal = ({ show, onHide, user }) => {
    const [editedUser, setEditedUser] = useState({});
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
            // Mostra un avviso all'utente o gestisci il caso dei campi vuoti come preferisci
            alert("Empty fields are not allowed.");
            return;
            }
        dispatch(updateUser(editedUser, user.userId));
        onHide();
    };

    const handleDeleteUser = () => {    
        dispatch(deleteUser(user.userId, navigate));
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
            <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
            <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                required
                type="text"
                name="username"
                value={editedUser.username}
                onChange={handleChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                required
                type="text"
                name="firstname"
                value={editedUser.firstname}
                onChange={handleChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                required
                type="text"
                name="lastname"
                value={editedUser.lastname}
                onChange={handleChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Email</Form.Label>
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
        <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
            Close
            </Button>
            <Button variant="primary" onClick={handleUserSave}>
            Save Changes
            </Button>
            <Button variant="danger"  onClick={handleDeleteUser}>
                <span>
                    Delete User (irreversible)
                </span>
            </Button>
        </Modal.Footer>
        </Modal>
    );
};

export default EditProfileModal;
