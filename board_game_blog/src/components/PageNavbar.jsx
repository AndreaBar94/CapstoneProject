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
            <Nav className="mx-auto">
              <Link className="text-decoration-none mx-3 text-dark" to="/profile">
                Profile
              </Link>
              <Link className="text-decoration-none mx-3 text-dark" to="/home">
                Home
              </Link>
            </Nav>
            <Form className="d-flex align-items-center" onSubmit={handleSearchSubmit}>
              <span className="me-2">
                Search:
              </span>
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
                placeholder="Search"
                aria-label="Search"
                value={searchKeyword}
                onChange={handleSearchInputChange}
              />
              <Button variant="dark" type="submit">
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default PageNavbar;
