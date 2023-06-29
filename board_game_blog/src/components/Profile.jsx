import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../redux/actions/index';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Profile = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.userReducer.currentUser);
    //console.log(currentUser);
    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    return (
        <>
            <Container>
                <Row>
                    <Col>
                    <Card>
                        <Card.Body>
                        <Card.Title>Fellow Player, here is your profile!</Card.Title>
                        {currentUser && (
                            <div>
                                <p>Username: {currentUser.username}</p>
                                <p>First Name: {currentUser.firstname}</p>
                                <p>Last Name: {currentUser.lastname}</p>
                                <p>Email: {currentUser.email}</p>
                            </div>
                        )}
                        </Card.Body>
                    </Card>
                    </Col>
                </Row>
            </Container>
        </>
        
    );
};

export default Profile;
