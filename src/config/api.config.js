const apiKey = import.meta.env.VITE_NOROFF_API_KEY;

if (!apiKey) {
  console.error('API Key is missing! Make sure VITE_NOROFF_API_KEY is set in your environment variables.');
}

export const API_CONFIG = {
  headers: {
    'Content-Type': 'application/json',
    'X-Noroff-API-Key': apiKey
  }
};

// Log config in development
if (import.meta.env.DEV) {
  console.log('API Config:', {
    hasApiKey: !!apiKey,
    baseHeaders: Object.keys(API_CONFIG.headers)
  });
}
