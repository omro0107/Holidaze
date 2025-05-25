/**
 * @fileoverview Provides service objects for handling API requests related to
 * authentication, venues, user profiles, and bookings using a centralized Axios client.
 *
 * @module API/services
 */

import api from './client';
import {
  API_AUTH_URL,
  API_VENUES_URL,
  API_PROFILES_URL,
  API_BOOKINGS_URL
} from './config';

/**
 * Service for authentication-related API requests.
 * @namespace authService
 */
export const authService = {
   /**
   * Logs in a user using email and password.
   * @async
   * @param {string} email - User's email address.
   * @param {string} password - User's password.
   * @returns {Promise<Object>} API response with user data and token.
   */
  login: async (email, password) => {
    const response = await api.post(`${API_AUTH_URL}/login`, {
      email,
      password,
    });
    return response;
  },

     /**
   * Registers a new user.
   * @async
   * @param {Object} userData - Data for the new user.
   * @returns {Promise<Object>} API response with created user.
   */
  register: async (userData) => {
    const response = await api.post(`${API_AUTH_URL}/register`, userData);
    return response;
  },
};

/**
 * Service for venue-related API requests.
 * @namespace venueService
 */
export const venueService = {
   /**
   * Fetches all venues with optional query parameters.
   * @async
   * @param {Object} [params] - Query parameters for filtering/pagination.
   * @returns {Promise<Object[]>} List of venues.
   */
  getAll: async (params) => {
    const response = await api.get(`${API_VENUES_URL}?_owner=true`, { params });
    return response;
  },

   /**
   * Fetches a single venue by ID.
   * @async
   * @param {string} id - Venue ID.
   * @returns {Promise<Object>} Venue data.
   */
  getById: async (id) => {
    const response = await api.get(`${API_VENUES_URL}/${id}?_owner=true`);
    return response;
  },

   /**
   * Creates a new venue.
   * @async
   * @param {Object} venueData - Data for the new venue.
   * @returns {Promise<Object>} Created venue.
   */
  create: async (venueData) => {
    const response = await api.post(API_VENUES_URL, venueData);
    return response;
  },

   /**
   * Updates an existing venue.
   * @async
   * @param {string} id - Venue ID.
   * @param {Object} venueData - Updated venue data.
   * @returns {Promise<Object>} Updated venue.
   */
  update: async (id, venueData) => {
    const response = await api.put(`${API_VENUES_URL}/${id}`, venueData);
    return response;
  },

    /**
   * Deletes a venue by ID.
   * @async
   * @param {string} id - Venue ID.
   * @returns {Promise<Object>} API response.
   */
  delete: async (id) => {
    const response = await api.delete(`${API_VENUES_URL}/${id}`);
    return response;
  },
};

/**
 * Service for profile-related API requests.
 * @namespace profileService
 */
export const profileService = {
   /**
   * Retrieves profile data for a user.
   * @async
   * @param {string} name - User's name (username).
   * @returns {Promise<Object>} User profile with bookings.
   */
  getProfile: async (name) => {
    const response = await api.get(`${API_PROFILES_URL}/${name}?_bookings=true`);
    return response;
  },

   /**
   * Updates user profile data.
   * @async
   * @param {string} name - User's name.
   * @param {Object} profileData - Updated profile fields.
   * @returns {Promise<Object>} Updated profile.
   */
  updateProfile: async (name, profileData) => {
    const response = await api.put(`${API_PROFILES_URL}/${name}`, profileData);
    return response;
  },

  /**
   * Gets bookings associated with a user.
   * @async
   * @param {string} name - User's name.
   * @returns {Promise<Object[]>} List of bookings.
   */
  getBookings: async (name) => {
    const response = await api.get(`${API_PROFILES_URL}/${name}/bookings`);
    return response;
  },

  /**
   * Gets venues owned by a user.
   * @async
   * @param {string} name - User's name.
   * @returns {Promise<Object[]>} List of venues.
   */
  getVenues: async (name) => {
    const response = await api.get(`${API_PROFILES_URL}/${name}/venues?_bookings=true&_customer=true`);
    return response;
  },
};

/**
 * Service for booking-related API requests.
 * @namespace bookingService
 */
export const bookingService = {
   /**
   * Creates a new booking.
   * @async
   * @param {Object} bookingData - Booking details.
   * @returns {Promise<Object>} Created booking.
   */
  create: async (bookingData) => {
    const response = await api.post(API_BOOKINGS_URL, bookingData);
    return response;
  },

   /**
   * Retrieves a booking by ID.
   * @async
   * @param {string} id - Booking ID.
   * @returns {Promise<Object>} Booking data.
   */
  getById: async (id) => {
    const response = await api.get(`${API_BOOKINGS_URL}/${id}`);
    return response;
  },

  /**
   * Updates an existing booking.
   * @async
   * @param {string} id - Booking ID.
   * @param {Object} bookingData - Updated booking data.
   * @returns {Promise<Object>} Updated booking.
   */
  update: async (id, bookingData) => {
    const response = await api.put(`${API_BOOKINGS_URL}/${id}`, bookingData);
    return response;
  },

    /**
   * Deletes a booking by ID.
   * @async
   * @param {string} id - Booking ID.
   * @returns {Promise<Object>} API response.
   */
  delete: async (id) => {
    const response = await api.delete(`${API_BOOKINGS_URL}/${id}`);
    return response;
  },
};

/**
 * Exported object containing all API service namespaces.
 */
export default {
  auth: authService,
  venues: venueService,
  profiles: profileService,
  bookings: bookingService,
};
