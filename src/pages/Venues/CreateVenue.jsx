import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { venueService } from '../../API';
import VenueForm from './components/VenueForm';

const CreateVenue = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    try {
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
      
      setLoading(true);
      const response = await venueService.create(venueData);
      navigate(`/venues/${response.id}`);
    } catch (error) {
      if (error.message.includes('Unauthorized') || error.message.includes('Authentication required')) {
        navigate('/login');
      } else {
        throw error;
      }
    } finally {
      setLoading(false);
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
      
      <VenueForm
        onSubmit={handleSubmit}
        loading={loading}
        submitLabel="Create Venue"
        onCancel={() => navigate('/venues')}
      />
    </div>
  );
};

export default CreateVenue;
