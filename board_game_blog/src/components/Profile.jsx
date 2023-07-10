import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../redux/actions/index';
import { Container, Card, Button } from 'react-bootstrap';
import PageNavbar from './PageNavbar';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/reducers/AuthSliceReducer';
import Footer from './Footer';
import EditProfileModal from './EditProfileModal';
import editLogo from '../assets/svgs/editLogo.svg';
import logoutLogo from '../assets/svgs/logoutLogo.svg';
import likeLogo from '../assets/svgs/likeLogo.svg';

const Profile = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.userReducer.currentUser);
    const navigate = useNavigate();
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
    dispatch(getUser());
    }, [dispatch]);

    const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    };


    return (
        <>
            <PageNavbar/>
            <Container className='pb-3'>
                        <Card className='profilePage'>
                            <Card.Body>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <Card.Title className='fs-3'>Fellow Player, here is your profile!</Card.Title>
                                    <Button onClick={() => setShowEditModal(true)} className='actionButton'>
                                        Edit
                                        <img src={editLogo} alt="edit-logo" className='ms-2' />
                                    </Button>
                                </div>
                                
                                {currentUser && (
                                    <div className='mt-5'>
                                    <p className='fw-bold'>Username:</p>
                                    <p>{currentUser.username}</p>
                                    <p className='fw-bold'>First Name:</p>
                                    <p>{currentUser.firstname}</p>
                                    <p className='fw-bold'>Last Name:</p>
                                    <p>{currentUser.lastname}</p>
                                    <p className='fw-bold'>Email:</p>
                                    <p>{currentUser.email}</p>
                                </div>
                                )}
                                <Button variant='danger' onClick={handleLogout}>
                                    Logout
                                    <img src={logoutLogo} alt="logout-logo" className='ms-2' />
                                </Button>
                            </Card.Body>
                        </Card>
                {currentUser && currentUser.articles && (
                    <>
                    <Container className='mt-4 profilePage border rounded'>
                        <h4 className='fs-3 pb-3'>Your Articles:</h4>
                        {currentUser.articles.map((article) => (
                            <Link key={article.articleId} to={`/article/${article.articleId}`} className='text-decoration-none text-dark'>
                                <Card className='my-2'>
                                    <Card.Body className='singleCommentBox rounded border shadow'>
                                        <Card.Title>{article.title}</Card.Title>
                                        <Card.Text className='text-muted font-monospace small'>Publication Date: {article.publicationDate}</Card.Text>
                                        <Card.Text className='text-muted font-monospace small'>
                                            <img src={likeLogo} alt="like-logo" className='me-2' />
                                            {article.likes.length}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Link>
                        ))}
                    </Container>
                    <EditProfileModal show={showEditModal} onHide={() => setShowEditModal(false)} user={currentUser}/>
                </>
                )}
            </Container>
            <Footer/>
        </>
    );
};

export default Profile;
