import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import Navbar from "./Navbar";

const HomePage = () => {
  const [articleData, setArticleData] = useState({
    title: "",
    content: "",
  });

  const handleInputChange = (event) => {
    setArticleData({
      ...articleData,
      [event.target.name]: event.target.value,
    });
  };

  const handleArticleSubmit = async (event) => {
    event.preventDefault();
    // Effettua la richiesta POST al backend per pubblicare l'articolo
    try {
      const response = await fetch("API_URL/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(articleData),
      });
      if (response.ok) {
        // Articolo pubblicato con successo
        console.log("Articolo pubblicato");
        // Resetta i dati dell'articolo
        setArticleData({
          title: "",
          content: "",
        });
      } else {
        console.log("Errore nella pubblicazione dell'articolo");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <Container>
        <p>Share your passions!</p>
        <Form onSubmit={handleArticleSubmit}>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={articleData.title}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formContent">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="content"
              value={articleData.content}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Publish Article
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default HomePage;
