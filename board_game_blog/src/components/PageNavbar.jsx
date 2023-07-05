import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/imgs/logo.png';
import { Button, Form } from 'react-bootstrap';
import { searchArticleWithFilter } from '../redux/actions';
import { useDispatch } from 'react-redux';

const PageNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('title');
  const filterOptions = ['title', 'user', 'category'];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleScroll = () => {
    const scrollTop = window.scrollY;

    if (scrollTop > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(searchArticleWithFilter(selectedFilter, searchKeyword, navigate));
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const capitalizeFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  return (
    <>
      <Navbar expand="lg" className={`py-2 pageNavbar ${scrolled ? 'scrolled' : ''}`} fixed="top">
        <Container fluid>
          <Link to="/home" className="text-decoration-none ps-4">
            <Navbar.Brand>
              <img src={logo} alt="logo" /> BoardGameBlog
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto align-items-center">
              <Link className="text-decoration-none mx-5 text-dark" to="/home">
                Home
              </Link>
              <Form className="d-flex align-items-center mx-5" onSubmit={handleSearchSubmit}>
                <Form.Select className="me-2" value={selectedFilter} onChange={handleFilterChange}>
                  {filterOptions.map((filter) => (
                    <option key={filter} value={filter}>
                      {capitalizeFirstLetter(filter)}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control
                  className="me-2"
                  type="search"
                  placeholder="Type here..."
                  aria-label="Search"
                  value={searchKeyword}
                  onChange={handleSearchInputChange}
                  />
                <Button variant="dark" type="submit" className='d-flex align-items-center'>
                  Search
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search ms-2" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                  </svg>
                </Button>
              </Form>
            </Nav>
              <Link className="text-decoration-none mx-3 text-dark" to="/profile">
                Profile
              </Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default PageNavbar;
