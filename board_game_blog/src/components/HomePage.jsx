import React, { useEffect } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getArticles } from "../redux/actions";
import Navbar from "./Navbar";
import SubmitArticle from "./SubmitArticle";
import HeroSection from "./HeroSection";
import Article from "./Article";

const HomePage = () => {
  const articles = useSelector((state) => state.articlesReducer.articles);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArticles());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Container>
        <Row>
          <Col className="text-bg-success" xs={2}>
            <div>LEFT COLUMN</div>
          </Col>
          <Col xs={8}>
            <p>Share your passions!</p>
            <HeroSection />
            <SubmitArticle />
            <Container className="text-bg-info">
              <Row className="mt-4 g-3">
                {articles &&
                  articles.content &&
                  articles.content.map((article) => (
                    <Col key={article.articleId} xs={4}>
                      <Card className="article-card">
                        <Card.Body>
                          <Card.Title>{article.title}</Card.Title>
                          <Card.Text className="article-preview">
                            {article.content.substring(0, 100)}...
                          </Card.Text>
                          <Card.Link href={`/article/${article.articleId}`}>
                            Read More
                          </Card.Link>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
              </Row>
            </Container>
          </Col>
          <Col className="text-bg-success" xs={2}>
            <div>RIGHT COLUMN</div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
