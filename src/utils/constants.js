export const VALIDATION = {
  NAME_MIN_LENGTH: 3,
  PASSWORD_MIN_LENGTH: 8,
  DESCRIPTION_MIN_LENGTH: 10,
  MAX_IMAGES: 8,
  MIN_PRICE: 1,
  MIN_GUESTS: 1,
  MAX_GUESTS: 100,
};

export const ERROR_MESSAGES = {
  DEFAULT: 'Something went wrong. Please try again.',
  NETWORK: 'Network error. Please check your internet connection.',
  UNAUTHORIZED: 'Please log in to continue.',
  FORBIDDEN: 'You do not have permission to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION: 'Please check your input and try again.',
  LOGIN_FAILED: 'Invalid email or password.',
  REGISTRATION_FAILED: 'Registration failed. Please try again.',
  EMAIL_EXISTS: 'An account with this email already exists.',
  INVALID_EMAIL: 'Please enter a valid stud.noroff.no email address.',
  WEAK_PASSWORD: `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters long.`,
  VENUE_CREATE_FAILED: 'Failed to create venue. Please try again.',
  VENUE_UPDATE_FAILED: 'Failed to update venue. Please try again.',
  VENUE_DELETE_FAILED: 'Failed to delete venue. Please try again.',
  BOOKING_CREATE_FAILED: 'Failed to create booking. Please try again.',
  BOOKING_UPDATE_FAILED: 'Failed to update booking. Please try again.',
  BOOKING_DELETE_FAILED: 'Failed to delete booking. Please try again.',
  PROFILE_UPDATE_FAILED: 'Failed to update profile. Please try again.',
  DATES_UNAVAILABLE: 'Selected dates are not available.',
  MAX_GUESTS_EXCEEDED: `Cannot exceed ${VALIDATION.MAX_GUESTS} guests.`,
  INVALID_DATES: 'Please select valid dates.',
};

export const API_STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

export const USER_ROLES = {
  CUSTOMER: 'customer',
  VENUE_MANAGER: 'venue_manager',
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  VENUES: '/venues',
  VENUE_DETAILS: '/venues/:id',
  VENUE_CREATE: '/venues/create',
  VENUE_EDIT: '/venues/:id/edit',
  BOOKINGS: '/bookings',
  NOT_FOUND: '*',
};

export const LOCAL_STORAGE_KEYS = {
  AUTH_TOKEN: 'holidaze_auth_token',
  USER: 'holidaze_user',
};

export const DATE_FORMAT = {
  DISPLAY: 'MMM dd, yyyy',
  API: 'yyyy-MM-dd',
};

export const PLACEHOLDER_AVATAR = '/placeholder-avatar.png';
export const PLACEHOLDER_IMAGE = '/placeholder-image.png';
