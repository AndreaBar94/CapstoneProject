import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PageNavbar from './PageNavbar';

const ArticlesResultPage = () => {
    const articles = useSelector((state) => state.articlesReducer.articles);

    return (
        <>
        <PageNavbar />
        <Container className="articlesContainer artResBox mb-3 pb-3">
            <h4 className="fw-bold mt-4">Our Reader's articles:</h4>
            {articles.length === 0 ? (
                <Container className="text-center mt-5 p-5 profilePage fs-2 border border-warning rounded">Oh no, no articles found here!</Container>
            ) : (
                <Row className="mt-4 g-3">
                    {articles.map((article) => (
                        <Col key={article.articleId} xs={12}>
                            <Link
                                to={`/article/${article.articleId}`}
                                className="text-decoration-none text-dark"
                            >
                                <Card className="article-card pb-2">
                                    <Card.Body>
                                        <Card.Title className="fw-bold">{article.title}</Card.Title>
                                        <Card.Text className="article-preview">
                                            {article.content.substring(0, 100)}...
                                        </Card.Text>
                                        <Container className="text-end">Read more...</Container>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
        </>
        
    );
};

export default ArticlesResultPage;
