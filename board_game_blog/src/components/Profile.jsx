import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../redux/actions/index';
import { Container, Card, Button } from 'react-bootstrap';
import PageNavbar from './PageNavbar';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/reducers/AuthSliceReducer';

const Profile = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.userReducer.currentUser);
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    const handleLogout = () => {
        // Esegui le operazioni necessarie per il logout dell'utente
        // ad esempio, pulisci il token di autenticazione o elimina i dati utente dallo stato
        dispatch(logout());
        navigate("/")
      };

    return (
        <>
            <PageNavbar/>
            <Container >
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
                                <Button variant='warning' onClick={handleLogout}>
                                    Logout
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
                                    <Card.Body className='singleCommentBox rounded shadow'>
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
        </>
    );
};

export default Profile;
