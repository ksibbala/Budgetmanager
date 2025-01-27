// src/services/apiService.js
import axios from 'axios';

const apiService = axios.create({
  baseURL: "http://127.0.0.1:30017",
});

export default apiService;
