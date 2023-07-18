import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../redux/actions/index';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import PageNavbar from './PageNavbar';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/reducers/AuthSliceReducer';
import Footer from './Footer';
import EditProfileModal from './EditProfileModal';
import editLogo from '../assets/svgs/editLogo.svg';
import logoutLogo from '../assets/svgs/logoutLogo.svg';
import likeLogo from '../assets/svgs/likeLogo.svg';
import profileLogo from '../assets/svgs/profileLogo.svg';
import SubmitArticle from './SubmitArticle';

const Profile = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.userReducer.currentUser);
    const navigate = useNavigate();
    const [showEditModal, setShowEditModal] = useState(false);
    const [activeTab, setActiveTab] = useState("profile");

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

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
            <Container className='profileTabs'>
                <ul className="nav nav-tabs">
                <li className="nav-item">
                    <button 
                        className={`nav-link active rounded-top border-bottom-0"${
                            activeTab === "profile" ? "active selectedTab" : ""
                                } customTabs `} 
                        onClick={() => handleTabClick("profile")}>
                            Profile
                    </button>
                </li>
                <li className="nav-item">
                    <button 
                        className={`nav-link active rounded-top border-bottom-0"${
                            activeTab === "yourArticles" ? "active selectedTab" : ""
                                } customTabs `} 
                        onClick={() => handleTabClick("yourArticles")}>
                            Your Articles
                    </button>
                </li>
                </ul>
            </Container>
            
            <Container className='pb-3 mt-0'>
                <div className={`${activeTab === 'profile' ? "" : "d-none"}`}>
                    <Card className='profilePage'>
                        <Card.Body>
                            <div className='d-flex justify-content-between align-items-center'>
                                <Card.Title className='fs-3 fw-bold'>Fellow Player, here is your profile!</Card.Title>
                                <Button onClick={() => setShowEditModal(true)} className='actionButton'>
                                    <img src={editLogo} alt="edit-logo" />
                                </Button>
                            </div>
                            
                            {currentUser && (
                                <Row>
                                    <Col>
                                    <div className='mt-4'>
                                        <p className='fw-bold'>Username:</p>
                                        <p>{currentUser.username}</p>
                                        <p className='fw-bold'>First Name:</p>
                                        <p>{currentUser.firstname}</p>
                                        <p className='fw-bold'>Last Name:</p>
                                        <p>{currentUser.lastname}</p>
                                        <p className='fw-bold'>Email:</p>
                                        <p>{currentUser.email}</p>
                                    </div>
                                    </Col>
                                    <Col>
                                        <img 
                                            src={currentUser && currentUser.profileImgUrl ? currentUser.profileImgUrl : profileLogo}
                                            alt="profile-img"
                                            width="150px" 
                                            height="150px" 
                                            className='object-fit-cover rounded-circle mt-5 border border-secondary profileImg'
                                            />
                                    </Col>
                                </Row>
                                
                            )}
                            <div className='d-flex justify-content-end'>
                                <Button variant='danger' onClick={handleLogout} className=''>
                                    Logout
                                    <img src={logoutLogo} alt="logout-logo" className='ms-2' />
                                </Button>
                            </div>
                            
                        </Card.Body>
                    </Card>
                </div>
                <div className={`${activeTab === 'yourArticles' ? "" : "d-none"}`}>
                    {currentUser && currentUser.articles && (
                    <>
                        <Container className='articlesProfilePage'>
                            <h4 className='fs-3 pb-3'>Your Articles:</h4>
                            {currentUser.articles.length === 0
                                ?
                                <>
                                <p>Oh, it looks like you're new here! Let us ear your voice!</p>
                                <SubmitArticle/>
                                </>
                                : 
                                currentUser.articles.map((article) => (
                                    <Link key={article.articleId} to={`/article/${article.articleId}`} className='text-decoration-none text-dark'>
                                        <Card className='my-2 profileArticleCard'>
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
                                ))
                            }
                            
                        </Container>
                        <EditProfileModal show={showEditModal} onHide={() => setShowEditModal(false)} user={currentUser}/>
                    </>
                    )}
                </div>
            </Container>
            <Footer/>
        </>
    );
};

export default Profile;
