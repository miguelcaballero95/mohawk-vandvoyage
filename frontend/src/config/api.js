import axios from 'axios';

// Base URL for the backend API.
// In development: empty string → Vite proxy forwards /api/* to localhost:5000
// In production: set VITE_API_URL in Netlify env vars to the deployed backend URL
export const API_BASE = import.meta.env.VITE_API_URL || '';

// Helper to build full API URLs
export const apiUrl = (path) => `${API_BASE}${path}`;

// Axios instance for any axios-based calls
const api = axios.create({ baseURL: API_BASE });

export default api;
