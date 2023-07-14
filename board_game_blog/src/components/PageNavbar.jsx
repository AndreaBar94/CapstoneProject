import React, { useState } from 'react';
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
import verticalPipeLogo from '../assets/svgs/verticalPipeLogo.svg';

const PageNavbar = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('title');
  const filterOptions = ['title', 'user', 'category'];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.userReducer.currentUser);

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

  const capitalizeFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  return (
    <>
      <Navbar expand="lg" className="py-2 pageNavbar" fixed="top">
        <Container fluid className=' justify-content-between'>
          <Link to="/home" className="text-decoration-none ps-4">
            <Navbar.Brand className='d-flex align-items-center'>
              <img src={logo} alt="logo"/>
              <span className='ms-1'>BoardGameBlog</span>
              <img src={verticalPipeLogo} alt="verticalPipe-logo" className='ms-2 d-none d-lg-block' />
              <div className="d-none d-lg-block text-decoration-none ms-2 text-dark d-flex align-items-center homeBtn">
                <img src={homeLogo} alt="home-logo" className='me-2' />
                <span>
                  Home
                </span>
              </div>
            </Navbar.Brand>
          </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Container className='d-column d-lg-flex align-items-center px-0'>
                <Nav className="mx-auto align-items-center ">
                  <Form className="d-column d-lg-flex align-items-center" onSubmit={handleSearchSubmit}>
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
              </Container>
              <div className='p-0 my-2 text-center'>
                <Link className="text-decoration-none text-dark profileBtn" to="/profile">
                  <span className='d-none d-lg-inline me-1'>Welcome back, {currentUser && currentUser.username}!</span>
                  <span className='d-inline d-lg-none me-1'>Profile</span>
                  <img 
                    src={currentUser && currentUser.profileImgUrl ? currentUser.profileImgUrl : profileLogo}
                    alt="profileImg" 
                    width="40px" 
                    height="40px" 
                    className='object-fit-cover rounded-circle ms-1 border border-secondary profileImg'/>
                </Link>
              </div>
            </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default PageNavbar;
