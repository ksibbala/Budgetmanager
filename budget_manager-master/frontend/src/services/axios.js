// src/services/axios.js
import axios from 'axios';

// Create an instance of axios with default configurations
const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:30017", // Replace with your backend API URL
  timeout: 10000, // Set a timeout for requests (optional)
  headers: {
    'Content-Type': 'application/json',
    // You can set Authorization header here if you use JWT tokens
    // 'Authorization': `Bearer ${localStorage.getItem('token')}`
  },
});

// Add an interceptor to handle requests before sending
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add token handling here if needed
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add an interceptor to handle responses
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle errors globally (e.g., show error messages, redirect to login, etc.)
    if (error.response && error.response.status === 401) {
      // Unauthorized error, handle it accordingly (like logging out user)
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
