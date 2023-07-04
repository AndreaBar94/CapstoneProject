import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { store } from './redux/store';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import SignUpPage from './components/SignUpPage';
import Profile from './components/Profile';
import Article from './components/Article';
import { Container } from 'react-bootstrap';
import ArticlesResultPage from './components/ArticlesResultPage';

const App = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <Container className='app'>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='/signUp' element={<SignUpPage />} />
            {isAuthenticated && (
              <Route path='/home' element={<HomePage />} />
            )}
            {isAuthenticated && (
              <Route path='/profile' element={<Profile />} />
            )}
            {isAuthenticated && (
              <Route path='/articles' element={<ArticlesResultPage />} />
            )}
            {isAuthenticated && (
              <Route path='/article/:articleId' element={<Article />} />
            )}
          </Routes>
        </Router>
      </Provider>
    </Container>
  );
};

export default App;
