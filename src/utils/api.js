import axios from 'axios';
import { API_URL } from '../API/apiURL';
import { LOCAL_STORAGE_KEYS } from './constants';

// Log environment information
console.log('Environment:', {
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
  mode: import.meta.env.MODE,
  baseUrl: API_URL
});

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
    const apiKey = import.meta.env.VITE_API_KEY;
    if (!apiKey) {
      console.error('API Key is missing! Available env vars:', {
        VITE_API_KEY: import.meta.env.VITE_API_KEY,
        // Log other env vars without exposing sensitive data
        envKeys: Object.keys(import.meta.env).filter(key => key.startsWith('VITE_'))
      });
    }
    config.headers['X-Noroff-API-Key'] = apiKey;

    // Add auth token if it exists
    const token = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log request details
    console.log('API Request:', {
      url: config.url,
      method: config.method,
      headers: {
        'X-Noroff-API-Key': 'present',
        Authorization: token ? 'present' : 'not present'
      }
    });

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

  // Response interceptor
api.interceptors.response.use(
  (response) => {
    // Log successful responses in production
    if (import.meta.env.PROD) {
      console.log('API Response:', {
        url: response.config.url,
        status: response.status,
        data: response.data
      });
    }
    return response.data;
  },
  async (error) => {
    // Always log errors, even in production
    const errorDetails = {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message: error.message,
      response: error.response?.data
    };
    console.error('API Error:', errorDetails);

    if (error.response) {
      // Handle rate limiting (429)
      if (error.response.status === 429) {
        const retryAfter = error.response.headers['retry-after'] || 5;
        console.error(`Rate limited. Retrying after ${retryAfter} seconds...`);
        
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
