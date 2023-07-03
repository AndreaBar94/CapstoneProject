import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import logo from '../assets/imgs/logo.png';

const PageNavbar =() =>{
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
  
    if (scrollTop > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Navbar 
        expand="lg"
        className={`py-2 pageNavbar ${scrolled ? 'scrolled' : ''}`}
        fixed="top">
        <Container>
          <Link to="/HomePage" className="text-decoration-none ps-4">
            <Navbar.Brand > <img src={logo} alt="logo" /> BoardGameBlog</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Link className="text-decoration-none mx-5 text-dark" to="/Profile">Profile</Link>
              <Link className="text-decoration-none mx-5 text-dark" to="/HomePage">Home</Link>
              <Link className="text-decoration-none mx-5 text-dark" to="/Settings">Settings</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default PageNavbar;