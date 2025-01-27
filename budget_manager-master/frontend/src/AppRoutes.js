import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Dashboard from './components/Dashboard';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import NotFound from './components/NotFound';
import AllTransactions from './components/AllTransactions';

const AppRoutes = () => {
  const { isLoggedIn, loading } = useAuth();

  // Show loading screen while checking authentication status
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <>
      {isLoggedIn && <Navbar />}
      <div
        className="relative min-h-screen"
        style={{
          backgroundImage: `url('/background.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            zIndex: 0,
          }}
        ></div>
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Routes>
            <Route 
              path="/" 
              element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <LoginForm />} 
            />
            <Route 
              path="/login" 
              element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <LoginForm />} 
            />
            <Route path="/register" element={<RegistrationForm />} />
            <Route 
              path="/dashboard" 
              element={<PrivateRoute><Dashboard /></PrivateRoute>} 
            />
            <Route 
              path="/all-transactions" 
              element={<PrivateRoute><AllTransactions /></PrivateRoute>} 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default AppRoutes;