import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import instagramLogo from '../assets/svgs/instagramLogo.svg';
import githubLogo from '../assets/svgs/githubLogo.svg';
import linkedinLogo from '../assets/svgs/linkedinLogo.svg';

const Footer = () => {
  return (
    <>
      <Container fluid className="text-center py-4 bg-dark">
        <p className="text-light mt-3">All rights reserved to Andrea Barocchi</p>
        <Container className='my-2'>
            <Link to="https://www.instagram.com/andrea.barocchi/">
                <img src={instagramLogo} alt="instagram-logo" className='mx-1'/>
            </Link>
            <Link to="https://github.com/AndreaBar94">
                <img src={githubLogo} alt="github-logo" className='mx-1'/>
            </Link>
            <Link to="https://www.linkedin.com/in/andrea-barocchi/">
                <img src={linkedinLogo} alt="linkedin-logo" className='mx-1'/>
            </Link>
        </Container>
        <Button variant="link" className="text-decoration-none text-light bg-dark border-0" onClick={() => window.scrollTo(0, 0)}>
          Back to Top
        </Button>
      </Container>
    </>
  );
};

export default Footer;
