import React, { useEffect } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getArticles } from "../redux/actions";
import SubmitArticle from "./SubmitArticle";
import HeroSection from "./HeroSection";
import PageNavbar from "./PageNavbar";
import { Link } from "react-router-dom";

const HomePage = () => {
  const articles = useSelector((state) => state.articlesReducer.articles);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArticles());
  }, [dispatch]);

  return (
    <>
      <PageNavbar/>
      <Container>
        <Row>
          <Col >
            <HeroSection />
            <Container className="submitArticleSection rounded-2">
              <p>Want to share your passion with us? Write your first article!</p>
            <SubmitArticle />
            </Container>
            <Container className="articlesContainer mb-3">
              <h4 className='fw-bold mt-4'>Our Reader's articles:</h4>
              <Row className="mt-4 g-3">
                {/* article card */}
                {articles &&
                  articles.content &&
                  Array.isArray(articles.content) &&
                  articles.content.map((article) => (
                    <Col key={article.articleId} xs={12}>
                      <Link to={`/article/${article.articleId}`} className="text-decoration-none text-dark">
                        <Card className="article-card pb-2">
                          <Card.Body>
                            <Card.Title className="fw-bold">{article.title}</Card.Title>
                            <Card.Text className="article-preview">
                              {article.content.substring(0, 100)}...
                            </Card.Text>
                            <Container className="text-end">
                              Read more...
                            </Container>
                          </Card.Body>
                        </Card>
                      </Link>
                    </Col>
                  ))}
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
