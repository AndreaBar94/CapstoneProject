import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import SignUpPage from './components/SignUpPage';
import Profile from './components/Profile';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/SignUp" element={<SignUpPage />} />
            <Route path="/HomePage" element={<HomePage />} />
            <Route path="/Profile" element={<Profile />} />
          </Routes>
        </Router>
      </Provider>
    </>
    
  );
};

export default App;
