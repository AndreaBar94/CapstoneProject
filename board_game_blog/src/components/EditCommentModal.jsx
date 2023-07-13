import React from 'react';
import { Modal, Button, Form, Container } from 'react-bootstrap';

const EditCommentModal = ({ show, onHide, editComment, handleCommentUpdate, setEditComment }) => {
    const handleCommentContentChange = (event) => {
        setEditComment({ ...editComment, content: event.target.value });
    };

    const handleUpdateClick = () => {
        handleCommentUpdate(editComment);
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} className='customModalShadow'>
            <Container className="p-5 customModal">
                <Modal.Header closeButton>
                <Modal.Title>Edit Comment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                    <Form.Group controlId="formCommentContent">
                        <Form.Label>Content:</Form.Label>
                        <Form.Control
                        as="textarea"
                        rows={3}
                        name="content"
                        value={editComment ? editComment.content : ''}
                        onChange={handleCommentContentChange}
                        required
                        />
                    </Form.Group>
                    <Modal.Footer className='justify-content-between'>
                        <Button variant="success" onClick={handleUpdateClick}>
                            Save Changes
                        </Button>
                        <Button variant="secondary" onClick={onHide}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                    
                    </Form>
                </Modal.Body>
            </Container>
        
        </Modal>
    );
};

export default EditCommentModal;
