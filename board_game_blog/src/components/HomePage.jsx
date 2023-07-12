import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col, Pagination } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getArticles } from "../redux/actions";
import SubmitArticle from "./SubmitArticle";
import HeroSection from "./HeroSection";
import PageNavbar from "./PageNavbar";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const HomePage = () => {
  const articles = useSelector((state) => state.articlesReducer.articles);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const articlesPerPage = 10;
  const [sortBy, setSortBy] = useState('publicationDate');

  useEffect(() => {
    dispatch(getArticles(currentPage, articlesPerPage, sortBy));
  }, [dispatch, currentPage, articlesPerPage, sortBy]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };  

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
              {/* ------------------------------------------------------------ARTICLES MAIN SECTION---------------------------------------------------------- */}
              <h4 className='fw-bold mt-4'>Our Reader's articles:</h4>
              <p>Sort by:</p>
              <select value={sortBy} onChange={handleSortByChange}>
                <option value="publicationDate">Sort by Publication Date</option>
                <option value="likes">Sort by Likes</option>
              </select>
              <Pagination>
                <Pagination.Prev
                  onClick={() => handlePageChange(currentPage)}
                  disabled={currentPage === 0}
                />
                {Array.from({ length: articles && articles.totalPages }, (_, index) => (
                  <Pagination.Item
                    key={index + 1}
                    active={currentPage === index}
                    onClick={() => handlePageChange(index)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  onClick={() => handlePageChange(currentPage)}
                  disabled={currentPage === (articles && articles.totalPages) -1}
                />
              </Pagination>
              <Row className="mt-4 g-3">
                {/*--------------------------------------------------------------article card------------------------------------------------------------- */}
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
                            <Container className="d-flex ps-0 justify-content-between">
                              <Card.Text className='text-muted font-monospace small'>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-hand-thumbs-up me-1" viewBox="0 0 16 16">
                                  <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
                              </svg>
                              {article.likes.length}
                            </Card.Text>
                            <span className="text-end">
                              Read more...
                            </span>
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
      <Footer/>
    </>
  );
};

export default HomePage;
