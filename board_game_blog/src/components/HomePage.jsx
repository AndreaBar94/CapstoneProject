import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col, Pagination } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getArticles } from "../redux/actions";
import SubmitArticle from "./SubmitArticle";
import HeroSection from "./HeroSection";
import PageNavbar from "./PageNavbar";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import likeLogo from "../assets/svgs/likeLogo.svg";
import submitLogo from "../assets/svgs/submitLogo.svg";

const HomePage = () => {
  const articles = useSelector((state) => state.articlesReducer.articles);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const articlesPerPage = 10;
  const [selectedSortOption, setSelectedSortOption] = useState('likes');
  const [sortedArticles, setSortedArticles] = useState();

  useEffect(() => {
    dispatch(getArticles(currentPage, articlesPerPage, selectedSortOption));
  }, [dispatch, currentPage, articlesPerPage, selectedSortOption]);
  
  useEffect(() => {
    if (articles && articles.content && Array.isArray(articles.content)) {
      let sortedArticles = [...articles.content];
      if (currentPage === 0) {
        if (selectedSortOption === 'publicationDate') {
          sortedArticles.sort((a, b) => new Date(b.publicationDate) - new Date(a.publicationDate));
        } else if (selectedSortOption === 'likes') {
          sortedArticles.sort((a, b) => b.likes.length - a.likes.length);
        }
      }
      setSortedArticles(sortedArticles);
    }
  }, [articles, selectedSortOption, currentPage]);
  
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    if (pageNumber !== 0) {
      dispatch(getArticles(pageNumber, articlesPerPage, selectedSortOption));
    }
  };
  
  const handleSortByChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedSortOption(selectedValue);
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
              <Container className="d-column d-lg-flex align-items-center justify-content-between">
                <h4 className='fw-bold'>Our Reader's articles:</h4>
                <div>
                  <span className='fw-bold'>Sort by: </span>
                  <select className="rounded p-1" value={selectedSortOption} onChange={handleSortByChange}>
                    <option value="publicationDate">More Recent</option>
                    <option value="likes">Popularity</option>
                  </select>
                </div>
              </Container>
              

{/* -------------------------------------------------------------PAGINATION TOP--------------------------------------------------------------------- */}
              <Pagination className="mt-3">
                <Pagination.Prev
                  onClick={() => handlePageChange(currentPage - 1)}
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
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === (articles && articles.totalPages) - 1}
                />
              </Pagination>
{/*--------------------------------------------------------------ARTICLE CARD------------------------------------------------------------- */}

              <Row className="mt-4 g-3">
              {sortedArticles && sortedArticles.map((article) => (
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
                              <img src={likeLogo} alt="like-logo" className='me-2' />
                              {article.likes.length}
                              <img src={submitLogo} alt="submit-logo" className='mx-2' />
                              {article.comments.length}
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
{/* -------------------------------------------------------------PAGINATION BOTTOM--------------------------------------------------------------------- */}
              <Pagination className="mt-3">
                <Pagination.Prev
                  onClick={() => handlePageChange(currentPage - 1)}
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
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === (articles && articles.totalPages) - 1}
                />
              </Pagination>
            </Container>
          </Col>
        </Row>
      </Container>
      <Footer/>
    </>
  );
};

export default HomePage;
