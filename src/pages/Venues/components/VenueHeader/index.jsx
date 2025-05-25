import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MapPinIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../hooks/useAuth';
import StarRating from '../../../../components/StarRating';
import Button from '../../../../components/common/Button';
import Modal from '../../../../components/common/Modal';
import { venueService } from '../../../../API';

const VenueHeader = ({ 
  id,
  name, 
  city = '', 
  country = '', 
  rating = 0,
  owner
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = [city, country].filter(Boolean).join(', ');

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await venueService.delete(id);
      if (response) {
        // Show success message or handle success case
        alert('Venue deleted successfully');
        window.location.href = '/profile';
      }
    } catch (error) {
      console.error('Failed to delete venue:', error);
      // Show error message to user
      alert('Failed to delete venue. Please try again.');
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
    }
  };

  const isOwner = user?.venueManager && owner?.name === user.name;

  return (
    <>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-3xl font-bold text-[#70533A]">{name}</h1>
          {location && (
            <p className="mt-1 flex items-center text-[#70533A]">
              <MapPinIcon className="h-5 w-5 mr-2" />
              {location}
            </p>
          )}
        </div>
        <div className="flex items-start gap-4">
          <StarRating rating={rating} size="lg" />
          {isOwner && (
            <div className="flex gap-2">
              <Button
                variant="secondary"
                onClick={() => navigate(`/venues/${id}/edit`)}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                onClick={() => setShowDeleteModal(true)}
              >
                Delete
              </Button>
            </div>
          )}
        </div>
      </div>

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
    </>
  );
};

VenueHeader.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  city: PropTypes.string,
  country: PropTypes.string,
  rating: PropTypes.number,
  owner: PropTypes.shape({
    name: PropTypes.string.isRequired,
  })
};

export default VenueHeader;
