import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Form } from 'react-bootstrap';
import { deleteArticle, deleteComment, editArticle, editedComment, getArticleById, postComment, setLikes } from '../redux/actions';
import PageNavbar from './PageNavbar';
import LikeButton from './LikeButton';
import Footer from './Footer';
import EditArticleModal from './EditArticleModal';
import DeleteArticleModal from './DeleteArticleModal';
import EditCommentModal from './EditCommentModal';
import DeleteCommentModal from './DeleteCommentModal';

const Article = () => {

  const { articleId } = useParams();

  // State for article data
  const [articleData, setArticleData] = useState({
    title: '',
    content: '',
    imageUrl: '',
  });

  // State for comments
  const [comments, setComments] = useState([]);

  // State for comment input
  const [commentContent, setCommentContent] = useState('');

  // States for modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteArticleModalOpen, setDeleteArticleModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteCommentModalOpen, setDeleteCommentModalOpen] = useState(false);

  // States for comments edit actions
  const [editComment, setEditComment] = useState(null);
  const [commentToDelete, setCommentToDelete] = useState(null);

  // Selectors
  const currentUser = useSelector((state) => state.userReducer.currentUser);
  const article = useSelector((state) => state.articlesReducer.currentArticle);
  const isAuthor = article && currentUser && article.user && article.user.userId === currentUser.userId;
  const isAdmin = currentUser && currentUser.role === 'ADMIN';

  // Utils
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
//----------------------------------------------------------------HANDLE LIKE SECTION----------------------------------------------------------------//
  //state for likes
  const likeCount = article && article.likes ? article.likes.length : 0;

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

      } catch (error) {
        console.log(error);
      }
  };
//----------------------------------------------------------------HANDLE COMMENT SECTION----------------------------------------------------------------//
useEffect(() => {
    dispatch(getArticleById(articleId));
  }, [dispatch, articleId]);

  useEffect(() => {
    if (article) {
      setArticleData({
        title: article.title,
        content: article.content,
        imageUrl: article.imageUrl,
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
    if (commentContent.trim() === '') {
      return alert('Please enter a comment');
    }
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
        setCommentContent("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEditComment = (comment) => {
    setEditComment(comment);
    setEditModalOpen(true);
  };
  
  const handleCommentUpdate = () => {
    if (editComment) {
      const updatedComment = {
        content: editComment.content,
        user: currentUser.userId
      };
  
      dispatch(editedComment(editComment.commentId, updatedComment))
        .then(() => {
          dispatch(getArticleById(articleId));
          setEditComment(null);
          setEditModalOpen(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleCommentDelete = (commentId) => {
    setDeleteCommentModalOpen(true);
    setCommentToDelete(commentId);
  };

  const confirmCommentDelete = () => {
    try {
      dispatch(deleteComment(commentToDelete, articleId));
      setDeleteCommentModalOpen(false);
    } catch (error) {
      console.log(error)
    }
    
  };
//----------------------------------------------------------------HANDLE ARTICLE SECTION----------------------------------------------------------------//
  const handleInputChange = (event) => {
    setArticleData({
      ...articleData,
      [event.target.name]: event.target.value,
    });
  };

  const handleArticleEdit = () => {
    setIsModalOpen(true);
  };

  const handleArticleDelete = () => {
    setDeleteArticleModalOpen(true);
  };

  const confirmArticleDelete = () => {
    try {
      dispatch(deleteArticle(articleId, navigate));
      setDeleteArticleModalOpen(false);
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
    <Container className='pb-3'>
      <Container className='articlePage rounded p-4'>
        {/* ARTICLE DETAIL BOX */}
        <h4 className='fw-bold'>{article && article.title}</h4>
        <p className='text-muted font-monospace small'>Author: {article && article.user && article.user.username}</p>
        <img src={article && article.imageUrl} alt="article-img" className='mb-3 img-fluid img-thumbnail'/>
        <p>{article && article.content}</p>
        <p className='text-muted font-monospace small'>Category: {article && article.category && article.category.categoryName}</p>
        <p className='text-muted font-monospace small'>Publication Date: {article && article.publicationDate}</p>
        <Container className='d-flex align-items-center my-2 p-0'>
          <LikeButton articleId={article && article.articleId} handleLike={handleLike} likes={likeCount}/>
        </Container>
        {/* IF YOYU ARE THE AUTHOR OR AN ADMIN CHECK FOR EDIT/DELETE ACTION */}
        {(isAuthor || isAdmin ) && (
          <>
          <Container className='d-flex justify-content-between p-0'>
            <Button onClick={handleArticleEdit} className='actionButton'>
              Edit Article
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-pencil ms-2" viewBox="0 0 16 16">
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
              </svg>
            </Button>
            <Button onClick={handleArticleDelete} className="bg-danger border-danger">
              Delete Article
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-trash ms-2" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
              </svg>
            </Button>
          </Container>
          </>
        )}
      </Container>
      {/* COMMENT SUBMIT BOX */}
      <Container className='commentSection rounded p-4 mt-3'>
        <Form.Group controlId="formComment">
          <Form.Label className='fw-bold'>Add your Comment</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            required
            value={commentContent}
            onChange={handleCommentInputChange}
          />
        </Form.Group>
        <Button className='actionButton mt-2' onClick={handleCommentSubmit}>
          Submit Comment
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-chat-left-text ms-2" viewBox="0 0 16 16">
            <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
            <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
          </svg>
        </Button>
        {/* COMMENT MAP SECTION */}
        {comments.map((comment) => (
            <div key={comment.commentId} className='singleCommentBox rounded p-3 m-2'>
              <p>"{comment.content}"</p>
              <p className='text-muted font-monospace small'>Author: {comment.user.username}</p>
              {comment.user.userId === currentUser.userId && (
                <div className='d-flex justify-content-between'>
                  <Button onClick={() => handleEditComment(comment)} className='actionButton'>
                    Edit
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-pencil ms-2" viewBox="0 0 16 16">
                      <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                    </svg>
                  </Button>
                  <Button onClick={() => handleCommentDelete(comment.commentId)} className="bg-danger border-danger align-items-center">
                    Delete
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-trash ms-2" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                    </svg>
                  </Button>
                </div>
              )}
            </div>
          ))}
      </Container>
{/* //----------------------------------------------------------------EDIT ARTICLE MODAL----------------------------------------------------------------// */}
<EditArticleModal
        show={isModalOpen}
        onHide={() => setIsModalOpen(false)}
        articleData={articleData}
        handleInputChange={handleInputChange}
        handleArticleUpdate={handleArticleUpdate}
      />
{/* //----------------------------------------------------------------DELETE ARTICLE MODAL----------------------------------------------------------------// */}
<DeleteArticleModal
        show={deleteArticleModalOpen}
        onHide={() => setDeleteArticleModalOpen(false)}
        confirmArticleDelete={confirmArticleDelete}
      />
{/* //----------------------------------------------------------------EDIT COMMENT MODAL----------------------------------------------------------------// */}
<EditCommentModal
        show={editModalOpen}
        onHide={() => setEditModalOpen(false)}
        editComment={editComment}
        handleCommentUpdate={handleCommentUpdate}
        setEditComment={setEditComment}
      />
{/* //----------------------------------------------------------------DELETE COMMENT MODAL----------------------------------------------------------------// */}
<DeleteCommentModal
        show={deleteCommentModalOpen}
        onHide={() => setDeleteCommentModalOpen(false)}
        confirmCommentDelete={confirmCommentDelete}
      />
    </Container>
    <Footer/>
    </>
  );
};

export default Article;
