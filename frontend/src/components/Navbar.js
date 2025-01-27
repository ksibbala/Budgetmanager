import React from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate
import { useAuth } from '../context/AuthContext'; // Use the Auth context

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth(); // Get the isLoggedIn state and logout function
  const navigate = useNavigate(); // Create navigate hook

  const handleLogout = () => {
    logout(); // Call logout from context
    navigate('/');  // Redirect to the login page after logout
  };

  return (
    <nav className="bg-indigo-800 p-4 text-white">
      <div className="flex justify-between items-center">
        <Link
          to="/"
          className="text-xl font-semibold text-white hover:text-indigo-300"
        >
          Budget Manager
        </Link>
        <div>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-white px-4 py-2 rounded-md hover:bg-white-700 text-indigo-600 font-bold transition duration-200"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 rounded-md text-indigo-600 transition duration-200"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;