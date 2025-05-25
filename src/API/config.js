/**
 * @fileoverview Configuration file for all API-related constants such as
 * base URLs, endpoint paths, API key, and request headers.
 *
 * @module API/config
 */

/**
 * Public API key for authenticating with the Noroff API.
 * @type {string}
 */
export const API_KEY = '140f2610-00d2-4340-ae4b-ae109ee190dc';

/**
 * Default headers used in all API requests.
 * Includes Content-Type and the required Noroff API key.
 * @type {{ headers: { 'Content-Type': string, 'X-Noroff-API-Key': string } }}
 */
export const API_CONFIG = {
  headers: {
    'Content-Type': 'application/json',
    'X-Noroff-API-Key': API_KEY
  }
};

/**
 * Base URL for the Noroff API.
 * @type {string}
 */
export const API_URL = 'https://v2.api.noroff.dev';

/**
 * Base URL for authentication-related endpoints.
 * @type {string}
 */
export const API_AUTH_URL = `${API_URL}/auth`;

/**
 * Endpoint for user registration.
 * @type {string}
 */
export const API_REGISTER_URL = `${API_AUTH_URL}/register`;

/**
 * Endpoint for user login.
 * @type {string}
 */
export const API_LOGIN_URL = `${API_AUTH_URL}/login`;

/**
 * Endpoint for venue-related operations.
 * @type {string}
 */
export const API_VENUES_URL = `${API_URL}/holidaze/venues`;

/**
 * Endpoint for profile-related operations.
 * @type {string}
 */
export const API_PROFILES_URL = `${API_URL}/holidaze/profiles`;

/**
 * Endpoint for booking-related operations.
 * @type {string}
 */
export const API_BOOKINGS_URL = `${API_URL}/holidaze/bookings`;
