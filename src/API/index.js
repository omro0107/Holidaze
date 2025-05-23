import api from './client';
import {
  API_AUTH_URL,
  API_VENUES_URL,
  API_PROFILES_URL,
  API_BOOKINGS_URL
} from './config';

// Auth services
export const authService = {
  login: async (email, password) => {
    const response = await api.post(`${API_AUTH_URL}/login`, {
      email,
      password,
    });
    return response;
  },

  register: async (userData) => {
    const response = await api.post(`${API_AUTH_URL}/register`, userData);
    return response;
  },
};

// Venue services
export const venueService = {
  getAll: async (params) => {
    const response = await api.get(API_VENUES_URL, { params });
    return response;
  },

  getById: async (id) => {
    const response = await api.get(`${API_VENUES_URL}/${id}`);
    return response;
  },

  create: async (venueData) => {
    const response = await api.post(API_VENUES_URL, venueData);
    return response;
  },

  update: async (id, venueData) => {
    const response = await api.put(`${API_VENUES_URL}/${id}`, venueData);
    return response;
  },

  delete: async (id) => {
    const response = await api.delete(`${API_VENUES_URL}/${id}`);
    return response;
  },
};

// Profile services
export const profileService = {
  getProfile: async (name) => {
    const response = await api.get(`${API_PROFILES_URL}/${name}?_bookings=true`);
    return response;
  },

  updateProfile: async (name, profileData) => {
    const response = await api.put(`${API_PROFILES_URL}/${name}`, profileData);
    return response;
  },

  getBookings: async (name) => {
    const response = await api.get(`${API_PROFILES_URL}/${name}/bookings`);
    return response;
  },

  getVenues: async (name) => {
    const response = await api.get(`${API_PROFILES_URL}/${name}/venues?_bookings=true&_customer=true`);
    return response;
  },
};

// Booking services
export const bookingService = {
  create: async (bookingData) => {
    const response = await api.post(API_BOOKINGS_URL, bookingData);
    return response;
  },

  getById: async (id) => {
    const response = await api.get(`${API_BOOKINGS_URL}/${id}`);
    return response;
  },

  update: async (id, bookingData) => {
    const response = await api.put(`${API_BOOKINGS_URL}/${id}`, bookingData);
    return response;
  },

  delete: async (id) => {
    const response = await api.delete(`${API_BOOKINGS_URL}/${id}`);
    return response;
  },
};

export default {
  auth: authService,
  venues: venueService,
  profiles: profileService,
  bookings: bookingService,
};
