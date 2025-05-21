import axios from 'axios';
import { API_URL } from '../API/apiURL';
import { API_CONFIG, addApiKey } from '../config/api.config';
import { LOCAL_STORAGE_KEYS } from './constants';

const api = axios.create({
  baseURL: API_URL,
  headers: API_CONFIG.headers,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add API key to headers at runtime
    config.headers = addApiKey(config.headers);

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
  (response) => response.data,
  async (error) => {
    if (error.response) {
      // Handle 401 Unauthorized errors
      if (error.response.status === 401) {
        localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      }

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
