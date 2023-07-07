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
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-house mx-2" viewBox="0 0 16 16">
                    <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z"/>
                  </svg>
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search ms-2" viewBox="0 0 16 16">
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                    </svg>
                  </Button>
                </Form>
              </Nav>
              <div className='p-0 my-2 text-center'>
                <Link className="text-decoration-none text-dark profileBtn" to="/profile">
                  Profile
                  <img src="https://us.123rf.com/450wm/tarasdubov/tarasdubov2211/tarasdubov221100361/194637445-dadi-d20-per-giocare-a-dnd-gioco-da-tavolo-dungeon-e-draghi-tesori-spada-del-paladino.jpg?ver=6" alt="profileImg" width="40px" className='img-fluid rounded-circle mx-1'/>
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
