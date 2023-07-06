import React from 'react'
import { Container } from 'react-bootstrap'

const HeroSection = () => {
  return (
    <>
      <Container fluid className='heroSection'>
        <h1 className='fw-bold p-4'>Welcome to BoardGameBlog!</h1>
        <p className='fs-5 p-4'>
        BoardGameBlog is a platform for board game enthusiasts to share and discuss articles about various tabletop games.<br/>
        Whether you're into strategy games, card games, or role-playing adventures, this is the place to dive deep into the world of board gaming.
        </p>
        
      </Container>
    </>
    
  )
}

export default HeroSection