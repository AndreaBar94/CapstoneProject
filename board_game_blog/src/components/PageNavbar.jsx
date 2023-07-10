import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/imgs/logo.png';
import profileLogo from '../assets/svgs/profileLogo.svg';
import homeLogo from '../assets/svgs/homeLogo.svg';
import searchLogo from '../assets/svgs/searchLogo.svg';
import { Button, Form } from 'react-bootstrap';
import { searchArticleWithFilter } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

const PageNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('title');
  const filterOptions = ['title', 'user', 'category'];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.userReducer.currentUser);

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
              <img src={logo} alt="logo" /> <span>BoardGameBlog</span>
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Container className='d-column d-lg-flex align-items-center'>
              <Nav className="mx-auto align-items-center ">
                <Link className="d-none d-lg-block text-decoration-none mx-5 text-dark d-flex align-items-center homeBtn" to="/home">
                  <span>
                    Home
                  </span>
                  <img src={homeLogo} alt="home-logo" className='ms-2' />
                </Link>
                <Form className="d-column d-lg-flex align-items-center mx-5" onSubmit={handleSearchSubmit}>
                  <Form.Select className="my-2 me-2" value={selectedFilter} onChange={handleFilterChange}>
                    {filterOptions.map((filter) => (
                      <option key={filter} value={filter}>
                        {capitalizeFirstLetter(filter)}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control
                    className="my-2 me-2"
                    type="search"
                    placeholder="Type here..."
                    aria-label="Search"
                    value={searchKeyword}
                    onChange={handleSearchInputChange}
                    />
                  <Button variant="dark" type="submit" className='d-flex align-items-center'>
                    Search
                    <img src={searchLogo} alt="search-logo" className='ms-2' />
                  </Button>
                </Form>
              </Nav>
              <div className='p-0 my-2 text-center'>
                <Link className="text-decoration-none text-dark profileBtn" to="/profile">
                  <span className='d-none d-lg-inline'>Welcome back, {currentUser && currentUser.username}</span>
                  <img 
                    src={currentUser && currentUser.profileImgUrl ? currentUser.profileImgUrl : profileLogo}
                    alt="profileImg" 
                    width="40px" 
                    height="40px" 
                    className='object-fit-contain rounded-circle ms-1 border border-secondary profileImg'/>
                </Link>
              </div>
            </Container>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default PageNavbar;
