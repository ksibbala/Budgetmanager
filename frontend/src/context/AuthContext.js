import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '../services/axios';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isLoggedIn: true,
    user: null
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      axios.get('/api/users/me', {
        headers: { 'x-auth-token': token }
      })
      .then(response => {
        setAuthState({
          isLoggedIn: true,
          user: response.data
        });
      })
      .catch(() => {
        localStorage.removeItem('token');
        setAuthState({
          isLoggedIn: false,
          user: null
        });
      });
    } else {
      setAuthState({
        isLoggedIn: false,
        user: null
      });
    }
  }, []);

  const login = async (token) => {
    localStorage.setItem('token', token);
    try {
      const response = await axios.get('/api/users/me', {
        headers: { 'x-auth-token': token }
      });
      
      setAuthState({
        isLoggedIn: true,
        user: response.data
      });
      
      return true;
    } catch (error) {
      localStorage.removeItem('token');
      setAuthState({
        isLoggedIn: false,
        user: null
      });
      
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthState({
      isLoggedIn: false,
      user: null
    });
  };

  return (
    <AuthContext.Provider value={{ 
      isLoggedIn: authState.isLoggedIn, 
      login, 
      logout, 
      user: authState.user
    }}>
      {children}
    </AuthContext.Provider>
  );
};