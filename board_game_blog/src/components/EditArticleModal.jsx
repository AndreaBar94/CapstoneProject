import React from 'react';
import { Modal, Button, Form, Container } from 'react-bootstrap';

const EditArticleModal = ({ show, onHide, articleData, handleInputChange, handleArticleUpdate }) => {
  const { title, content, imageUrl } = articleData;
  
  return (
    <Modal show={show} onHide={onHide} className='customModalShadow'>
      <Container className="p-5 customModal">
        <Modal.Header closeButton>
          <Modal.Title>Edit Article</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Title:</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={title}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formContent">
              <Form.Label>Content:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="content"
                value={content}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formImageUrl" className="pb-3">
              <Form.Label>Image URL:</Form.Label>
              <Form.Control
                type="text"
                name="imageUrl"
                value={imageUrl}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Modal.Footer className='justify-content-between'>
              <Button variant="success" onClick={handleArticleUpdate}>
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

export default EditArticleModal;
