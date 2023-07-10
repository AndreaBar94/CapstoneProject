import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditArticleModal = ({ show, onHide, articleData, handleInputChange, handleArticleUpdate }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Article</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={articleData.title}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formContent">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="content"
              value={articleData.content}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formImageUrl" className="pb-3">
            <Form.Label>Image URL:</Form.Label>
            <Form.Control
              type="text"
              name="imageUrl"
              value={articleData.imageUrl}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleArticleUpdate}>
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditArticleModal;
