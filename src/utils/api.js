import axios from 'axios';
import { API_URL } from '../API/apiURL';
import { LOCAL_STORAGE_KEYS } from './constants';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add API key to all requests
    config.headers['X-Noroff-API-Key'] = import.meta.env.VITE_API_KEY;

    // Add auth token if it exists
    const token = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Unwrap the data from the response
    return response.data;
  },
  async (error) => {
    if (error.response) {
      // Handle rate limiting (429)
      if (error.response.status === 429) {
        const retryAfter = error.response.headers['retry-after'] || 5; // Default to 5 seconds if no header
        console.log(`Rate limited. Retrying after ${retryAfter} seconds...`);
        
        // Wait for the specified time
        await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
        
        // Retry the request
        return api(error.config);
      }

      // Handle 401 Unauthorized errors
      if (error.response.status === 401) {
        // Only remove token if it's not a rate limit error
        if (!error.response.data.message?.includes('Too many requests')) {
          localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
          // Redirect to login if needed
          if (window.location.pathname !== '/login') {
            window.location.href = '/login';
          }
        }
      }

      // Extract error message from API response
      const message = 
        error.response.data.errors?.[0]?.message ||
        error.response.data.message ||
        'An error occurred';

      throw new Error(message);
    }

    throw error;
  }
);

export default api;
