import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Modal } from 'react-bootstrap';
import { deleteArticle, editArticle, getArticleById, postComment } from '../redux/actions';

const Article = () => {
    const { articleId } = useParams();
    //state for article datas
    const [articleData, setArticleData] = useState({
      title: '',
      content: '',
    });

    //state for comments
    const [commentContent, setCommentContent] = useState('');

    //states for modals
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    //selectors
    const currentUser = useSelector((state) => state.userReducer.currentUser);
    const article = useSelector((state) => state.articlesReducer.currentArticle);
    const isAuthor =
        article && currentUser && article.user.userId === currentUser.userId;

    //utils
    const navigate = useNavigate();
    const dispatch = useDispatch();
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

    //----------------------------------------------------------------Comments section
    const handleCommentInputChange = (event) => {
      setCommentContent(event.target.value);
    };

    const handleCommentSubmit = () => {
      const commentData = {
        content: commentContent,
      };
      dispatch(postComment(articleId, commentData));
      dispatch(getArticleById(articleId));
    };
    //----------------------------------------------------------------Articles section      
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
        setDeleteModalOpen(true);
      };
    
      const confirmDelete = () => {
        try {
          dispatch(deleteArticle(articleId, navigate));
          setDeleteModalOpen(false);
        } catch (error) {
          console.log(error);
        }
      };

    const handleArticleUpdate = () => {
        try {
        dispatch(editArticle(articleId, articleData));
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
        <Form.Group controlId="formComment">
          <Form.Label>Add a Comment</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={commentContent}
            onChange={handleCommentInputChange}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleCommentSubmit}>
          Submit Comment
        </Button>
        {article &&
          article.comments.map((comment) => (
            <div key={comment.commentId}>
              <p>Author: {comment.user.username}</p>
              <p>Comment: {comment.content}</p>
            </div>
        ))}
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

        <Modal show={deleteModalOpen} onHide={() => setDeleteModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this article?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDeleteModalOpen(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
    );
};

export default Article;
