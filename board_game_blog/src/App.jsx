import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import SignUpPage from './components/SignUpPage';
import Profile from './components/Profile';

// // Funzione di autenticazione per verificare se l'utente è autenticato
// const useRequireLogin = (to, from, next) => {
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
//   useEffect(() => {
//     if (to.meta.auth && !isAuthenticated) {
//       next.redirect('/login'); // L'utente non è autenticato, reindirizza alla pagina di login
//     } else {
//       next(); // L'utente è autenticato o la rotta non richiede autenticazione, permetti l'accesso
//     }
//   }, [isAuthenticated, next, to.meta.auth]);
//   return null; // Non restituiamo alcun componente, poiché questa è solo una custom Hook
// };

const App = () => {
  return (
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
  );
};

export default App;