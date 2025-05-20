import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { venueService } from '../../API';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Modal from '../../components/common/Modal';
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

const EditVenue = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [venue, setVenue] = useState(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    watch,
    reset,
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  });

  const mediaUrls = watch('media') || [''];

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        setLoading(true);
        const data = await venueService.getById(id);
        setVenue(data);
        
        // Pre-fill form with venue data
        reset({
          name: data.name,
          description: data.description,
          media: data.media.map(m => m.url),
          price: data.price,
          maxGuests: data.maxGuests,
          location: {
            address: data.location?.address || '',
            city: data.location?.city || '',
            zip: data.location?.zip || '',
            country: data.location?.country || '',
            continent: data.location?.continent || '',
          },
          meta: {
            wifi: data.meta?.wifi || false,
            parking: data.meta?.parking || false,
            breakfast: data.meta?.breakfast || false,
            pets: data.meta?.pets || false,
          },
        });
      } catch (error) {
        console.error('Failed to fetch venue:', error);
        setError('submit', {
          type: 'manual',
          message: 'Failed to load venue data',
        });
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchVenue();
    }
  }, [id, reset, setError]);

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
          lat: venue?.location?.lat || 0,
          lng: venue?.location?.lng || 0,
        }
      };

      console.log('Sending venue data:', venueData);
      
      setLoading(true);
      try {
        const response = await venueService.update(id, venueData);
        console.log('API Response:', response);
        navigate(`/venues/${id}`);
      } catch (error) {
        console.error('Failed to update venue:', error);
        if (error.message.includes('Unauthorized') || error.message.includes('Authentication required')) {
          navigate('/login');
        } else {
          setError('submit', {
            type: 'manual',
            message: error.message || 'Failed to update venue',
          });
        }
      } finally {
        setLoading(false);
      }
    } catch (error) {
      console.error('Failed to update venue:', error);
      setError('submit', {
        type: 'manual',
        message: error.message || 'Failed to update venue',
      });
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await venueService.delete(id);
      window.location.href = '/profile';
    } catch (error) {
      console.error('Failed to delete venue:', error);
      setError('submit', {
        type: 'manual',
        message: error.message || 'Failed to delete venue',
      });
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
    }
  };

  // Redirect if user is not authenticated or not a venue manager
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user?.venueManager) {
    return <Navigate to="/venues" replace />;
  }

  // Check if user owns this venue
  if (venue && venue.owner && venue.owner.name !== user.name) {
    return <Navigate to="/venues" replace />;
  }

  if (loading && !venue) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Edit Venue</h1>
        <Button
          type="button"
          variant="danger"
          onClick={() => setShowDeleteModal(true)}
        >
          Delete Venue
        </Button>
      </div>
      
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="space-y-6"
        noValidate
      >
        {/* Basic Information */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
          <div className="space-y-4">
            <Input
              id="venue-name"
              label="Venue Name"
              {...register('name')}
              error={errors.name?.message}
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
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
            <h2 className="text-xl font-semibold text-gray-900">Images</h2>
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
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Location</h2>
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
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Amenities</h2>
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
            onClick={() => navigate(`/venues/${id}`)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Venue"
      >
        <div className="p-6">
          <p className="mb-4">Are you sure you want to delete this venue? This action cannot be undone.</p>
          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="danger"
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? 'Deleting...' : 'Delete'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EditVenue;
