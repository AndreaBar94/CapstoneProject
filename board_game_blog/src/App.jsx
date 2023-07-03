import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import SignUpPage from './components/SignUpPage';
import Profile from './components/Profile';
import Article from './components/Article';
import { Container } from 'react-bootstrap';

const App = () => {
  return (
    <>
      <Container className='app'>
        <Provider store={store}>
          <Router>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/SignUp" element={<SignUpPage />} />
              <Route path="/HomePage" element={<HomePage />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/article/:articleId" element={<Article />} />
            </Routes>
          </Router>
        </Provider>
      </Container>
    </>
    
  );
};

export default App;
