import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../redux/actions/index';
import { Container, Card, Button } from 'react-bootstrap';
import PageNavbar from './PageNavbar';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/reducers/AuthSliceReducer';
import Footer from './Footer';

const Profile = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.userReducer.currentUser);
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/")
    };

    return (
        <>
            <PageNavbar/>
            <Container className='pb-3'>
                        <Card className='profilePage'>
                            <Card.Body>
                                <Card.Title className='fs-3'>Fellow Player, here is your profile!</Card.Title>
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
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-box-arrow-left ms-1" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>
                                        <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
                                    </svg>
                                </Button>
                            </Card.Body>
                        </Card>
                {currentUser && currentUser.articles && (
                    <>
                    <Container className='mt-4 profilePage border rounded'>
                        <h2>Articles</h2>
                        {currentUser.articles.map((article) => (
                            <Link key={article.articleId} to={`/article/${article.articleId}`} className='text-decoration-none text-dark'>
                                <Card>
                                    <Card.Body className='singleCommentBox rounded border shadow'>
                                        <Card.Title>{article.title}</Card.Title>
                                        <Card.Text className='text-muted font-monospace small'>Publication Date: {article.publicationDate}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Link>
                        ))}
                    </Container>
                </>
                )}
            </Container>
            <Footer/>
        </>
    );
};

export default Profile;
