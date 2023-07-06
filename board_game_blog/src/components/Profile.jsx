import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../redux/actions/index';
import { Container, Card, Button } from 'react-bootstrap';
import PageNavbar from './PageNavbar';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/reducers/AuthSliceReducer';
import Footer from './Footer';
import EditProfileModal from './EditProfileModal';

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
                                    <Button onClick={() => setShowEditModal(true)}>
                                        Edit
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-pencil ms-2" viewBox="0 0 16 16">
                                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                                        </svg>
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
                        <h4 className='fs-3 pb-3'>Your Articles:</h4>
                        {currentUser.articles.map((article) => (
                            <Link key={article.articleId} to={`/article/${article.articleId}`} className='text-decoration-none text-dark'>
                                <Card className='my-2'>
                                    <Card.Body className='singleCommentBox rounded border shadow'>
                                        <Card.Title>{article.title}</Card.Title>
                                        <Card.Text className='text-muted font-monospace small'>Publication Date: {article.publicationDate}</Card.Text>
                                        <Card.Text className='text-muted font-monospace small'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-hand-thumbs-up me-1" viewBox="0 0 16 16">
                                                <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
                                            </svg>
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
