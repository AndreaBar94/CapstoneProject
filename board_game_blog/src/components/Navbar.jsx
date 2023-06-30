import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const PageNavbar =() =>{
  return (
    <>
      <Navbar expand="lg" className="text-bg-info">
        <Container>
          <Navbar.Brand href="#home">BoardGameBlog</Navbar.Brand>
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