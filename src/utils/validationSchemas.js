import * as yup from 'yup';
import { VALIDATION } from './constants';

const mediaSchema = yup.object().shape({
  url: yup.string().url('Must be a valid URL').required('Image URL is required'),
  alt: yup.string().default('')
});

const locationSchema = yup.object().shape({
  address: yup.string().required('Address is required'),
  city: yup.string().required('City is required'),
  zip: yup.string().required('ZIP code is required'),
  country: yup.string().required('Country is required'),
  continent: yup.string().required('Continent is required'),
  lat: yup.number().nullable(),
  lng: yup.number().nullable()
});

const metaSchema = yup.object().shape({
  wifi: yup.boolean().default(false),
  parking: yup.boolean().default(false),
  breakfast: yup.boolean().default(false),
  pets: yup.boolean().default(false)
});

export const registerSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .min(VALIDATION.NAME_MIN_LENGTH, `Name must be at least ${VALIDATION.NAME_MIN_LENGTH} characters`),
  
  email: yup
    .string()
    .required('Email is required')
    .matches(
      /^[A-Z0-9._%+-]+@stud\.noroff\.no$/i,
      'Must be a valid stud.noroff.no email'
    ),
  
  password: yup
    .string()
    .required('Password is required')
    .min(VALIDATION.PASSWORD_MIN_LENGTH, `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters`),
  
  bio: yup.string().nullable(),
  
  avatar: yup.string().url('Must be a valid URL').nullable(),
  banner: yup.string().url('Must be a valid URL').nullable(),
  
  venueManager: yup.boolean().default(false)
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .matches(
      /^[A-Z0-9._%+-]+@stud\.noroff\.no$/i,
      'Must be a valid stud.noroff.no email'
    ),
  
  password: yup
    .string()
    .required('Password is required')
    .min(VALIDATION.PASSWORD_MIN_LENGTH, `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters`)
});

export const venueSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .min(VALIDATION.NAME_MIN_LENGTH, `Name must be at least ${VALIDATION.NAME_MIN_LENGTH} characters`),
  
  description: yup
    .string()
    .required('Description is required')
    .min(VALIDATION.DESCRIPTION_MIN_LENGTH, `Description must be at least ${VALIDATION.DESCRIPTION_MIN_LENGTH} characters`),
  
  media: yup
    .array()
    .of(mediaSchema)
    .max(VALIDATION.MAX_IMAGES, `Maximum ${VALIDATION.MAX_IMAGES} images allowed`),
  
  price: yup
    .number()
    .required('Price is required')
    .min(VALIDATION.MIN_PRICE, `Minimum price is ${VALIDATION.MIN_PRICE}`),
  
  maxGuests: yup
    .number()
    .required('Maximum guests is required')
    .min(VALIDATION.MIN_GUESTS, `Minimum guests is ${VALIDATION.MIN_GUESTS}`)
    .max(VALIDATION.MAX_GUESTS, `Maximum guests is ${VALIDATION.MAX_GUESTS}`),
  
  rating: yup.number().nullable().default(0),
  meta: metaSchema.default(undefined),
  location: locationSchema.default(undefined)
});

export const bookingSchema = yup.object().shape({
  dateFrom: yup.date().required('Start date is required'),
  dateTo: yup.date().required('End date is required'),
  guests: yup
    .number()
    .required('Number of guests is required')
    .min(VALIDATION.MIN_GUESTS, `Minimum guests is ${VALIDATION.MIN_GUESTS}`)
    .max(VALIDATION.MAX_GUESTS, `Maximum guests is ${VALIDATION.MAX_GUESTS}`),
  venue: yup.object().shape({
    id: yup.string().required(),
    name: yup.string().required(),
    description: yup.string(),
    media: yup.array().of(mediaSchema),
    price: yup.number(),
    maxGuests: yup.number(),
    rating: yup.number(),
    meta: metaSchema,
    location: locationSchema,
    owner: yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email(),
      avatar: mediaSchema,
      banner: mediaSchema
    })
  }),
  customer: yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email(),
    avatar: mediaSchema,
    banner: mediaSchema
  })
});

export const profileUpdateSchema = yup.object().shape({
  avatar: mediaSchema.nullable(),
  banner: mediaSchema.nullable(),
  bio: yup.string()
});
