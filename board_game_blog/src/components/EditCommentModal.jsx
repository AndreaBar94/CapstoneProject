import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditCommentModal = ({ show, onHide, editComment, handleCommentUpdate, setEditComment }) => {
    const handleCommentContentChange = (event) => {
        setEditComment({ ...editComment, content: event.target.value });
    };

    const handleUpdateClick = () => {
        handleCommentUpdate(editComment);
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
            <Modal.Title>Edit Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
            <Form.Group controlId="formCommentContent">
                <Form.Label>Content</Form.Label>
                <Form.Control
                as="textarea"
                rows={3}
                name="content"
                value={editComment ? editComment.content : ''}
                onChange={handleCommentContentChange}
                required
                />
            </Form.Group>
            <Button variant="secondary" onClick={onHide}>
                Cancel
            </Button>
            <Button variant="primary" onClick={handleUpdateClick}>
                Save Changes
            </Button>
            </Form>
        </Modal.Body>
        </Modal>
    );
};

export default EditCommentModal;
