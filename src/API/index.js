import {
  API_AUTH_URL,
  API_VENUES_URL,
  API_PROFILES_URL,
  API_BOOKINGS_URL,
} from './apiURL';
import api from '../utils/api';

// Auth services
export const authService = {
  login: async (email, password) => {
    const response = await api.post(`${API_AUTH_URL}/login`, {
      email,
      password,
    });
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post(`${API_AUTH_URL}/register`, userData);
    return response.data;
  },
};

// Venue services
export const venueService = {
  getAll: async (params) => {
    const response = await api.get(API_VENUES_URL, { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`${API_VENUES_URL}/${id}`);
    return response.data;
  },

  create: async (venueData) => {
    const response = await api.post(API_VENUES_URL, venueData);
    return response.data;
  },

  update: async (id, venueData) => {
    const response = await api.put(`${API_VENUES_URL}/${id}`, venueData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`${API_VENUES_URL}/${id}`);
    return response.data;
  },
};

// Profile services
export const profileService = {
  getProfile: async (name) => {
    const response = await api.get(`${API_PROFILES_URL}/${name}?_bookings=true`);
    return response.data;
  },

  updateProfile: async (name, profileData) => {
    const response = await api.put(`${API_PROFILES_URL}/${name}`, profileData);
    return response.data;
  },

  getBookings: async (name) => {
    const response = await api.get(`${API_PROFILES_URL}/${name}/bookings`);
    return response.data;
  },

  getVenues: async (name) => {
    const response = await api.get(`${API_PROFILES_URL}/${name}/venues?_bookings=true&_customer=true`);
    return response.data;
  },
};

// Booking services
export const bookingService = {
  create: async (bookingData) => {
    const response = await api.post(API_BOOKINGS_URL, bookingData);
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`${API_BOOKINGS_URL}/${id}`);
    return response.data;
  },

  update: async (id, bookingData) => {
    const response = await api.put(`${API_BOOKINGS_URL}/${id}`, bookingData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`${API_BOOKINGS_URL}/${id}`);
    return response.data;
  },
};

export default {
  auth: authService,
  venues: venueService,
  profiles: profileService,
  bookings: bookingService,
};
