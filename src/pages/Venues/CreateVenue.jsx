import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { venueService } from '../../API';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { VALIDATION } from '../../utils/constants';

const schema = yup.object().shape({
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
    .of(yup.string().url('Must be a valid URL'))
    .required('At least one image is required'),
  price: yup
    .number()
    .required('Price is required')
    .min(VALIDATION.MIN_PRICE, 'Price must be greater than 0'),
  maxGuests: yup
    .number()
    .required('Maximum guests is required')
    .min(VALIDATION.MIN_GUESTS, 'Must allow at least 1 guest')
    .max(VALIDATION.MAX_GUESTS, `Cannot exceed ${VALIDATION.MAX_GUESTS} guests`),
  location: yup.object().shape({
    address: yup.string(),
    city: yup.string().required('City is required'),
    zip: yup.string(),
    country: yup.string().required('Country is required'),
    continent: yup.string(),
    lat: yup.number(),
    lng: yup.number(),
  }),
  meta: yup.object().shape({
    wifi: yup.boolean(),
    parking: yup.boolean(),
    breakfast: yup.boolean(),
    pets: yup.boolean(),
  }),
});

const CreateVenue = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    watch,
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
    defaultValues: {
      meta: {
        wifi: false,
        parking: false,
        breakfast: false,
        pets: false,
      },
      location: {
        address: '',
        city: '',
        zip: '',
        country: '',
        continent: '',
      },
      media: [''],
    },
  });

  const mediaUrls = watch('media') || [''];

  const handleAddMediaUrl = () => {
    setValue('media', [...mediaUrls, '']);
  };

  const handleRemoveMediaUrl = (index) => {
    setValue('media', mediaUrls.filter((_, i) => i !== index));
  };

  const onSubmit = async (formData) => {
    try {
      console.log('Form submitted with data:', formData);
      
      // Transform media URLs to expected format
      const filteredMedia = formData.media
        .filter(url => url?.trim() !== '')
        .map(url => ({ url, alt: '' }));

      // Prepare the data according to API requirements
      const venueData = {
        name: formData.name,
        description: formData.description,
        media: filteredMedia,
        price: Number(formData.price),
        maxGuests: Number(formData.maxGuests),
        rating: 0,
        meta: {
          wifi: !!formData.meta?.wifi,
          parking: !!formData.meta?.parking,
          breakfast: !!formData.meta?.breakfast,
          pets: !!formData.meta?.pets,
        },
        location: {
          address: formData.location.address || '',
          city: formData.location.city,
          zip: formData.location.zip || '',
          country: formData.location.country,
          continent: formData.location.continent || '',
          lat: 0,
          lng: 0,
        }
      };

      console.log('Sending venue data:', venueData);
      
      setLoading(true);
      try {
        const response = await venueService.create(venueData);
        console.log('API Response:', response);
        navigate(`/venues/${response.id}`);
      } catch (error) {
        console.error('Failed to create venue:', error);
        // Check if error is due to authentication
        if (error.message.includes('Unauthorized') || error.message.includes('Authentication required')) {
          navigate('/login');
        } else {
          setError('submit', {
            type: 'manual',
            message: error.message || 'Failed to create venue',
          });
        }
      } finally {
        setLoading(false);
      }
    } catch (error) {
      console.error('Failed to create venue:', error);
      setError('submit', {
        type: 'manual',
        message: error.message || 'Failed to create venue',
      });
    }
  };

  // Redirect if user is not authenticated or not a venue manager
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user?.venueManager) {
    return <Navigate to="/venues" replace />;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-normal text-text mb-8">Create New Venue</h1>
      
      <form 
        onSubmit={handleSubmit(
          (data) => {
            console.log('Form submitted, calling onSubmit');
            onSubmit(data);
          },
          (errors) => {
            console.log('Form validation errors:', errors);
          }
        )} 
        className="space-y-6"
        noValidate
      >
        {/* Basic Information */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-text mb-4">Basic Information</h2>
          <div className="space-y-4">
            <Input
              id="venue-name"
              label="Venue Name"
              {...register('name')}
              error={errors.name?.message}
            />
            
            <div>
              <label className="block text-sm font-medium text-text">
                Description
              </label>
              <textarea
                {...register('description')}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                id="venue-price"
                label="Price per night"
                type="number"
                {...register('price')}
                error={errors.price?.message}
              />
              
              <Input
                id="venue-max-guests"
                label="Maximum guests"
                type="number"
                {...register('maxGuests')}
                error={errors.maxGuests?.message}
              />
            </div>
          </div>
        </div>

        {/* Media */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-text">Images</h2>
            <Button
              type="button"
              variant="secondary"
              onClick={handleAddMediaUrl}
            >
              Add Image URL
            </Button>
          </div>
          
          <div className="space-y-4">
            {mediaUrls.map((_, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  id={`media-${index}`}
                  placeholder="Image URL"
                  {...register(`media.${index}`)}
                  error={errors.media?.[index]?.message}
                />
                {mediaUrls.length > 1 && (
                  <Button
                    type="button"
                    variant="danger"
                    onClick={() => handleRemoveMediaUrl(index)}
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Location */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-text mb-4">Location</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              id="venue-address"
              label="Address"
              {...register('location.address')}
              error={errors.location?.address?.message}
            />
            <Input
              id="venue-city"
              label="City"
              {...register('location.city')}
              error={errors.location?.city?.message}
            />
            <Input
              id="venue-zip"
              label="ZIP Code"
              {...register('location.zip')}
              error={errors.location?.zip?.message}
            />
            <Input
              id="venue-country"
              label="Country"
              {...register('location.country')}
              error={errors.location?.country?.message}
            />
          </div>
        </div>

        {/* Amenities */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-text mb-4">Amenities</h2>
          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register('meta.wifi')}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span>WiFi</span>
            </label>
            
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register('meta.parking')}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span>Parking</span>
            </label>
            
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register('meta.breakfast')}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span>Breakfast</span>
            </label>
            
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register('meta.pets')}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span>Pets Allowed</span>
            </label>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end space-x-3">
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate('/venues')}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Venue'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateVenue;
