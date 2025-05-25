import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate, useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { venueService } from '../../API';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import VenueForm from './components/VenueForm';

const EditVenue = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [venue, setVenue] = useState(null);
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        setLoading(true);
        const data = await venueService.getById(id);
        setVenue(data);
        
        // Format data for the form
        setInitialData({
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
        console.error('Failed to load venue:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchVenue();
    }
  }, [id]);

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
      
      setLoading(true);
      await venueService.update(id, venueData);
      navigate(`/venues/${id}`);
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

  const handleDelete = async () => {
    try {
      setLoading(true);
      await venueService.delete(id);
      window.location.href = '/profile';
    } catch (error) {
      console.error('Failed to delete venue:', error);
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

  const deleteButton = (
    <Button
      type="button"
      variant="danger"
      onClick={() => setShowDeleteModal(true)}
    >
      Delete Venue
    </Button>
  );

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-text mb-8">Edit Venue</h1>
      
      {initialData && (
        <VenueForm
          onSubmit={handleSubmit}
          initialData={initialData}
          loading={loading}
          submitLabel="Save Changes"
          onCancel={() => navigate(`/venues/${id}`)}
          extraButton={deleteButton}
        />
      )}

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
