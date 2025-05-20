import { useCallback } from 'react';
import * as schemas from '../utils/validationSchemas';

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
