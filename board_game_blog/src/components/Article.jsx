import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Form, Modal } from 'react-bootstrap';
import { deleteArticle, editArticle, getArticleById, postComment, setLikes } from '../redux/actions';
import PageNavbar from './PageNavbar';
import LikeButton from './LikeButton';

const Article = () => {
  const { articleId } = useParams();
  // State for article data
  const [articleData, setArticleData] = useState({
    title: '',
    content: '',
  });

  // State for comments
  const [comments, setComments] = useState([]);

  // State for comment input
  const [commentContent, setCommentContent] = useState('');

  // States for modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // Selectors
  const currentUser = useSelector((state) => state.userReducer.currentUser);
  const article = useSelector((state) => state.articlesReducer.currentArticle);
  const isAuthor = article && currentUser && article.user.userId === currentUser.userId;

  // Utils
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //state for likes
  const [likes, setArticleLikes] = useState(article.likes);

  const getCurrentDate = () => {
    return new Date();
  };

  const handleLike = async (articleId) => {
    const currentDate = getCurrentDate();
    const interactionDate = `${currentDate.getFullYear()}-${(
      currentDate.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
  
    const likeData = {
      user: currentUser.userId,
      article: articleId,
      date: interactionDate,
    };
  
    try {
      dispatch(setLikes(likeData));
      setArticleLikes(likes + 1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(getArticleById(articleId));
  }, [dispatch, articleId]);

  useEffect(() => {
    if (article) {
      setArticleData({
        title: article.title,
        content: article.content,
      });
      if (article.comments) {
        setComments(article.comments);
      }
    }
  }, [article]);

  const handleCommentInputChange = (event) => {
    setCommentContent(event.target.value);
  };

  const handleCommentSubmit = () => {
    const commentData = {
      content: commentContent,
      userId: currentUser.userId,
    };
    dispatch(postComment(articleId, commentData))
      .then(() => {
        dispatch(getArticleById(articleId))
          .then((article) => {
            if (article && article.comments) {
              setComments(article.comments);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
      console.log('Error trying to update article:', error);
    }
  };

  return (
    <>
    <PageNavbar />
    <Container >
      <Container className='articlePage rounded p-4'>
        <h4 className='fw-bold'>{article && article.title}</h4>
        <p className='text-muted font-monospace small'>Author: {article && article.user.username}</p>
        <p>{article && article.content}</p>
        <p className='text-muted font-monospace small'>Category: {article && article.category && article.category.categoryName}</p>
        <p className='text-muted font-monospace small'>Publication Date: {article && article.publicationDate}</p>
        <LikeButton articleId={article.articleId} handleLike={handleLike} />
        <p>{article && article.likes && article.likes.length}</p>
        {isAuthor && (
          <>
          <Container className='d-flex justify-content-between'>
            <Button onClick={handleEdit} className='actionButton'>Edit Article</Button>
            <Button onClick={handleDelete} className="bg-danger border-danger">
              Delete Article
            </Button>
          </Container>
          </>
        )}
      </Container>
      <Container className='commentSection rounded p-4 mt-3'>
        <Form.Group controlId="formComment">
          <Form.Label className='fw-bold'>Add your Comment</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={commentContent}
            onChange={handleCommentInputChange}
          />
        </Form.Group>
        <Button className='actionButton mt-2' onClick={handleCommentSubmit}>
          Submit Comment
        </Button>
        {comments.map((comment) => (
          <div key={comment.commentId} className='singleCommentBox rounded p-3 m-2'>
            <p>"{comment.content}"</p>
            <p className='text-muted font-monospace small'>Author: {comment.user.username}</p>
          </div>
        ))}
      </Container>

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
    </Container>
    </>
    
  );
};

export default Article;
