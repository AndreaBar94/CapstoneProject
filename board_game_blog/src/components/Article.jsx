import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Modal } from 'react-bootstrap';
import { editArticle, getArticleById, getArticles } from '../redux/actions';

const Article = () => {
  const { articleId } = useParams();
  const articles = useSelector((state) => state.articlesReducer.articles);
  const currentUser = useSelector((state) => state.userReducer.currentUser);
  const [articleData, setArticleData] = useState({
    title: '',
    content: '',
  });
  const dispatch = useDispatch();
  const article = useSelector((state) => state.articlesReducer.currentArticle);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isAuthor =
    article && currentUser && article.user.userId === currentUser.userId;

  useEffect(() => {
    dispatch(getArticleById(articleId));
  }, [dispatch, articleId]);

  useEffect(() => {
    if (article) {
      setArticleData({
        title: article.title,
        content: article.content,
      });
    }
  }, [article]);

  const handleInputChange = (event) => {
    setArticleData({
      ...articleData,
      [event.target.name]: event.target.value,
    });
  };

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    // Implementa la logica per eliminare l'articolo
  };

  const handleArticleUpdate = async () => {
    try {
      await dispatch(editArticle(articleId, articleData));
      setIsModalOpen(false);
      dispatch(getArticleById(articleId));
    } catch (error) {
      console.log('Error trying update article:', error);
    }
  };

  return (
    <div>
      <h1>Title: {article && article.title}</h1>
      <p>Content: {article && article.content}</p>
      <p>Author: {article && article.user.username}</p>
      <p>Date: {article && article.publicationDate}</p>

      {isAuthor && (
        <>
          <Button onClick={handleEdit}>Edit Article</Button>
          <Button onClick={handleDelete} className="bg-danger border-danger">
            Delete Article
          </Button>
        </>
      )}

      <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
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
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleArticleUpdate}>
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Article;
