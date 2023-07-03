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
        <Container className="articlesContainer mb-3">
            <h4 className="fw-bold mt-4">Our Reader's articles:</h4>
            <Row className="mt-4 g-3">
            {articles &&
                articles.map((article) => (
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
        </Container>
        </>
        
    );
};

export default ArticlesResultPage;
