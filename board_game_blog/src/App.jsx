import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './redux/store';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import SignUpPage from './components/SignUpPage';
import Profile from './components/Profile';
import Article from './components/Article';
import { Container } from 'react-bootstrap';
import ArticlesResultPage from './components/ArticlesResultPage';
import NotFoundPage from './components/NotFoundPage';
import { hideActionPopup } from './redux/actions';
import ActionDetailPopup from './components/ActionDetailPopup';
import GoogleCallback from './components/GoogleCallback';

const App = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const showPopup = useSelector(state => state.popupReducer.showPopup);
  const popupMessage = useSelector(state => state.popupReducer.popupMessage);
  const isSuccess = useSelector((state) => state.popupReducer.isSuccess);
  const dispatch = useDispatch();

  const closeActionPopup = () => {
    dispatch(hideActionPopup());
  };

  return (
    <Container fluid className='app px-0'>
      <Provider store={store}>
      {showPopup && (
        <ActionDetailPopup
          message={popupMessage}
          onClose={closeActionPopup}
          isSuccess={isSuccess}
        />
      )}
        <Router>
          <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='/signUp' element={<SignUpPage />} />
            <Route path='/google/callback' element={<GoogleCallback />} />
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
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </Router>
      </Provider>
    </Container>
  );
};

export default App;
