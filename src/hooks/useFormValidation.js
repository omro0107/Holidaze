import { useCallback } from 'react';
import * as schemas from '../utils/validationSchemas';

/**
 * Custom hook to provide validation schemas for various forms.
 *
 * Returns memoized functions that return validation schemas for:
 * - Registration
 * - Login
 * - Profile update
 * - Venue creation/update
 * - Booking
 *
 * @returns {Object} An object containing functions that return validation schemas:
 *  - registerSchema: () => Yup.Schema
 *  - loginSchema: () => Yup.Schema
 *  - profileUpdateSchema: () => Yup.Schema
 *  - venueSchema: () => Yup.Schema
 *  - bookingSchema: () => Yup.Schema
 */
const useFormValidation = () => {
  const registerSchema = useCallback(() => schemas.registerSchema, []);
  const loginSchema = useCallback(() => schemas.loginSchema, []);
  const profileUpdateSchema = useCallback(() => schemas.profileUpdateSchema, []);
  const venueSchema = useCallback(() => schemas.venueSchema, []);
  const bookingSchema = useCallback(() => schemas.bookingSchema, []);

  return {
    registerSchema,
    loginSchema,
    profileUpdateSchema,
    venueSchema,
    bookingSchema,
  };
};

export default useFormValidation;
