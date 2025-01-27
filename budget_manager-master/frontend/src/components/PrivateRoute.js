// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useAuth(); // Get the isLoggedIn state from context

  // If the user is not logged in, redirect to the login page
  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  // If logged in, return the protected route (children)
  return children;
};

export default PrivateRoute;