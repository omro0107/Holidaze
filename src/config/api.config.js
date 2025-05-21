export const API_CONFIG = {
  headers: {
    'Content-Type': 'application/json'
  }
};

// Add API key at runtime instead of build time
export const addApiKey = (headers) => {
  if (typeof window !== 'undefined' && window.ENV && window.ENV.VITE_NOROFF_API_KEY) {
    headers['X-Noroff-API-Key'] = window.ENV.VITE_NOROFF_API_KEY;
  }
  return headers;
};
