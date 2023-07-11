import React from 'react';
import { useLocation } from 'react-router';

const NotFoundPage = () => {
  const location = useLocation();

  return (
    <div className="notFound">
      <div className="textNotFound">
        <h3>404 - Page Not Found</h3>
        <p>UUUPS! Seems like you don't have to be here!</p>
        <p>The requested URL <code>{location.pathname}</code> was not found.</p>
      </div>
    </div>
  );
};

export default NotFoundPage;
