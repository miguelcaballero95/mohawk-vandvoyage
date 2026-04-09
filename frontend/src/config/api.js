import axios from 'axios';

// Create axios instance with base URL from environment variable
// Falls back to empty string so Vite proxy handles /api routes in development
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || ''
});

export default api;
