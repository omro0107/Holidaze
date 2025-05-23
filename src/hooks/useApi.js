import { useState, useCallback } from 'react';
import api from '../API/client';

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
