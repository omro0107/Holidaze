import { useState, useCallback } from 'react';
import api from '../API/client';

/**
 * Custom hook to perform HTTP API requests with loading and error state management.
 *
 * Provides convenient methods for GET, POST, PUT, PATCH, and DELETE requests.
 *
 * @returns {Object} - API request state and methods
 * @property {boolean} loading - Indicates if a request is currently loading
 * @property {string|null} error - Error message from the last request or null if no error
 * @property {function(string, Object=): Promise} get - Perform a GET request with optional query params
 * @property {function(string, Object): Promise} post - Perform a POST request with request body
 * @property {function(string, Object): Promise} put - Perform a PUT request with request body
 * @property {function(string, Object): Promise} patch - Perform a PATCH request with request body
 * @property {function(string): Promise} delete - Perform a DELETE request
 */
const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Generic request handler.
   *
   * @async
   * @param {string} method - HTTP method (GET, POST, PUT, PATCH, DELETE)
   * @param {string} endpoint - API endpoint URL
   * @param {Object|null} [data=null] - Request payload for non-GET requests or query params for GET
   * @returns {Promise<Object>} - Resolves with response data
   * @throws Throws error on request failure
   */
  const request = useCallback(async (method, endpoint, data = null) => {
    try {
      setLoading(true);
      setError(null);

      const response = await api({
        method,
        url: endpoint,
        data: method !== 'GET' ? data : undefined,
        params: method === 'GET' ? data : undefined,
      });

      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const get = useCallback((endpoint, params) => {
    return request('GET', endpoint, params);
  }, [request]);

  const post = useCallback((endpoint, data) => {
    return request('POST', endpoint, data);
  }, [request]);

  const put = useCallback((endpoint, data) => {
    return request('PUT', endpoint, data);
  }, [request]);

  const patch = useCallback((endpoint, data) => {
    return request('PATCH', endpoint, data);
  }, [request]);

  const del = useCallback((endpoint) => {
    return request('DELETE', endpoint);
  }, [request]);

  return {
    loading,
    error,
    get,
    post,
    put,
    patch,
    delete: del,
  };
};

export default useApi;
