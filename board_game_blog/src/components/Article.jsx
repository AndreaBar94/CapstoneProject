import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Form } from 'react-bootstrap';
import { blameComment, deleteArticle, deleteComment, editArticle, editedComment, getArticleById, postComment, setLikes } from '../redux/actions';
import PageNavbar from './PageNavbar';
import LikeButton from './LikeButton';
import Footer from './Footer';
import EditArticleModal from './EditArticleModal';
import DeleteArticleModal from './DeleteArticleModal';
import EditCommentModal from './EditCommentModal';
import DeleteCommentModal from './DeleteCommentModal';
import submitLogo from '../assets/svgs/submitLogo.svg';
import editLogo from '../assets/svgs/editLogo.svg';
import deleteLogo from '../assets/svgs/deleteLogo.svg';
import blameLogo  from '../assets/svgs/blameLogo.svg';
import profileLogo from '../assets/svgs/profileLogo.svg';


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
      return alert('You cannot submit an empty comment');
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
  
  const handleBlameComment = (comment) => {
    dispatch(blameComment(comment.commentId))
    .then(() => {
      dispatch(getArticleById(articleId));
    })
    .catch((error) => {
      console.log(error);
    })
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
      dispatch(editArticle(articleId, articleData))
        .then(() => {
        dispatch(getArticleById(articleId));
        setIsModalOpen(false)
      }).catch(error => {
        console.log(error);
      });
      
    } catch (error) {
      console.log('Error trying to update article:', error);
    }
  };

  return (
    <>
    <PageNavbar />
    <Container className='pb-3'>
      <Container className='articlePage rounded p-4'>
        {/*------------------------------------------------------------- ARTICLE DETAIL BOX -------------------------------------------------------------*/}
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
              <img src={editLogo} alt="edit-logo" className='ms-2' />
            </Button>
            <Button onClick={handleArticleDelete} className="bg-danger border-danger">
              Delete Article
              <img src={deleteLogo} alt="delete-logo" className='ms-2' />
            </Button>
          </Container>
          </>
        )}
      </Container>
      {/*------------------------------------------------------------- COMMENT SUBMIT BOX -------------------------------------------------------------*/}
      <Container className='commentSection rounded p-4 mt-3'>
        <Form.Group controlId="formComment">
          <Form.Label className='fw-bold'>Add your Comment:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            required
            value={commentContent}
            onChange={handleCommentInputChange}
          />
        </Form.Group>
        <div className='d-flex justify-content-end mb-4'>
          <Button className='actionButton mt-2' onClick={handleCommentSubmit}>
            Submit Comment
            <img src={submitLogo} alt="submit-logo" className='ms-2' />
          </Button>
        </div>
        {/*------------------------------------------------------------- COMMENT MAP SECTION -------------------------------------------------------------*/}
        {comments.map((comment) => (
            <div key={comment.commentId} className='singleCommentBox rounded p-3 m-2'>
              <img src={comment.user && comment.user.profileImgUrl ? comment.user.profileImgUrl : profileLogo}
                    alt="user-img"
                    width="40px" 
                    height="40px"
                    className='object-fit-cover rounded-circle me-3 border border-secondary'/>
              {comment && comment.censored ? (
                <span>*** Censored ***</span>
              ) : (
                <span>"{comment.content}"</span>
              )}
              <p className='mt-2 text-muted font-monospace small'>Author: {comment.user && comment.user.username}</p>
              {currentUser.role === 'ADMIN' &&(
                    <Button variant="warning" className='my-2 d-block' onClick={() => handleBlameComment(comment)}>
                      Blame!
                      <img src={blameLogo} alt="blame-logo" className='ms-2' />
                      </Button>
                  )}
              {((comment.user && comment.user.userId) === currentUser.userId || currentUser.role === 'ADMIN') && (
                <div className='d-flex justify-content-between'>
                  <Button onClick={() => handleEditComment(comment)} className='actionButton'>
                    Edit
                    <img src={editLogo} alt="edit-logo" className='ms-2' />
                  </Button>
                  <Button onClick={() => handleCommentDelete(comment.commentId)} className="bg-danger border-danger align-items-center">
                    Delete
                    <img src={deleteLogo} alt="delete-logo" className='ms-2' />
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
