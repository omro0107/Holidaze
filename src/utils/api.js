import axios from 'axios';
import { API_URL } from '../API/apiURL';
import { API_CONFIG } from '../config/api.config';
import { LOCAL_STORAGE_KEYS } from './constants';

const api = axios.create({
  baseURL: API_URL,
  headers: API_CONFIG.headers,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if it exists
    const token = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log request details in development
    if (import.meta.env.DEV) {
      console.log('API Request:', {
        url: config.url,
        method: config.method,
        headers: {
          'X-Noroff-API-Key': config.headers['X-Noroff-API-Key'] ? 'present' : 'missing',
          Authorization: token ? 'present' : 'missing'
        }
      });
    }

    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Log successful responses in development
    if (import.meta.env.DEV) {
      console.log('API Response:', {
        url: response.config.url,
        status: response.status,
        hasData: !!response.data
      });
    }
    return response.data;
  },
  async (error) => {
    // Log error details
    const errorDetails = {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message: error.message,
      data: error.response?.data
    };
    console.error('API Error:', errorDetails);

    if (error.response) {
      // Handle 401 Unauthorized errors
      if (error.response.status === 401) {
        localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      }

      // Handle 403 Forbidden errors (likely API key issues)
      if (error.response.status === 403) {
        console.error('API Key validation failed. Check your VITE_NOROFF_API_KEY environment variable.');
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
