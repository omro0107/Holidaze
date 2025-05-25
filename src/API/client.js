/**
 * Axios instance configured with base URL and default headers.
 *
 * Interceptors:
 * - Automatically attaches auth token from localStorage to every request.
 * - Returns `response.data.data` if present, otherwise `response.data`.
 * - Handles 401 errors by removing auth token and redirecting to login page.
 *
 * @module api
 */

import axios from 'axios';
import { API_URL, API_CONFIG } from './config';
import { LOCAL_STORAGE_KEYS } from '../utils/constants';

/**
 * Axios instance for making HTTP requests to the backend API.
 * @type {import('axios').AxiosInstance}
 */
const api = axios.create({
  baseURL: API_URL,
  headers: API_CONFIG.headers,
});

// Request interceptor
api.interceptors.request.use(
  /**
   * Adds Authorization header to outgoing requests if a token exists.
   *
   * @param {import('axios').InternalAxiosRequestConfig} config - The Axios request configuration.
   * @returns {import('axios').InternalAxiosRequestConfig} - Modified request config.
   */
  (config) => {
    // Add auth token if it exists
    const token = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  /**
   * Handles request errors.
   *
   * @param {any} error - The request error object.
   * @returns {Promise<never>} - A rejected promise with the error.
   */
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
   /**
   * Processes successful responses from the API.
   *
   * @param {import('axios').AxiosResponse} response - The Axios response object.
   * @returns {any} - `response.data.data` if available, otherwise `response.data`.
   */
  (response) => {
    if (response.data && response.data.data !== undefined) {
      return response.data.data;
    }
    return response.data;
  },
   /**
   * Processes API errors. Removes auth token and redirects to login on 401 errors.
   *
   * @param {any} error - The error object from Axios.
   * @throws {Error} - A new Error with a parsed or default error message.
   */
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
