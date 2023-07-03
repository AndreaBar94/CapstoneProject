import React, { useState } from 'react';
import { Button, Container, Form, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { getArticles, postArticle } from '../redux/actions';

const SubmitArticle = () => {
    const [showModal, setShowModal] = useState(false);
    const [articleData, setArticleData] = useState({
        title: '',
        content: '',
    });
    const dispatch = useDispatch();   

    const handleInputChange = (event) => {
        setArticleData({
        ...articleData,
        [event.target.name]: event.target.value,
        });
    };

    const getCurrentDate = () => {
        return new Date();
    };

    const handleArticleSubmit = (event) => {
        event.preventDefault();
        const currentDate = getCurrentDate();
        const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
            .toString()
            .padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
            dispatch(postArticle({ ...articleData, publicationDate: formattedDate }))
            .then(() => {
                dispatch(getArticles());
                setArticleData({
                title: '',
                content: '',
                });
                setShowModal(false);
            })
            .catch((error) => {
                console.log("Error posting article:", error);
            });
    };
    

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleModalOpen = () => {
        setShowModal(true);
    };

    return (
        <Container>
            <Button className='bg-dark border-dark' onClick={handleModalOpen}>
                Add Article
            </Button>
            <Modal show={showModal} onHide={handleModalClose} className='p-5'>
                <Container className='p-5 publishArticleModal'>
                    <Modal.Header closeButton>
                    <Modal.Title className='fw-bold'>Add Your Article!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleArticleSubmit}>
                        <Form.Group controlId="formTitle" className='pb-3'>
                            <Form.Label>Title:</Form.Label>
                            <Form.Control
                            type="text"
                            name="title"
                            value={articleData.title}
                            onChange={handleInputChange}
                            required
                            />
                        </Form.Group>
                        <Form.Group controlId="formContent" className='pb-3'>
                            <Form.Label>Content:</Form.Label>
                            <Form.Control
                            as="textarea"
                            rows={3}
                            name="content"
                            value={articleData.content}
                            onChange={handleInputChange}
                            required
                            />
                        </Form.Group>
                        <Button variant="dark" type="submit">
                            Publish Article!
                        </Button>
                    </Form>
                </Modal.Body>
                </Container>
                
            </Modal>
        </Container>
        
    );
};

export default SubmitArticle;
