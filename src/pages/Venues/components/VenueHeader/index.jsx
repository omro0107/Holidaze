import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MapPinIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../hooks/useAuth';
import StarRating from '../../../../components/StarRating';
import Button from '../../../../components/common/Button';
import Modal from '../../../../components/common/Modal';
import { venueService } from '../../../../API';


/**
 * VenueHeader displays the venue's name, location, rating, and owner controls for editing/deleting.
 * Only the owner can see edit and delete buttons.
 *
 * @param {Object} props
 * @param {string} props.id - Unique identifier of the venue.
 * @param {string} props.name - Venue name.
 * @param {string} [props.city] - City where the venue is located.
 * @param {string} [props.country] - Country where the venue is located.
 * @param {number} [props.rating=0] - Average rating of the venue.
 * @param {Object} [props.owner] - Venue owner details.
 * @param {string} props.owner.name - Name of the venue owner.
 *
 * @returns {JSX.Element} Venue header section with name, location, rating, and owner controls.
 */
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

  /**
   * Handles deletion of the venue by calling the API,
   * then navigates to the profile page on success.
   */
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
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
        <div>
          <h1 className="text-3xl font-bold text-[#70533A]">{name}</h1>
          {location && (
            <p className="mt-1 flex items-center text-[#70533A]">
              <MapPinIcon className="h-5 w-5 mr-2" />
              {location}
            </p>
          )}
        </div>
        <div className="flex flex-col sm:flex-row items-start gap-4 w-full sm:w-auto">
          <StarRating rating={rating} size="lg" />
          {isOwner && (
            <div className="flex gap-2 w-full sm:w-auto">
              <Button
                variant="secondary"
                onClick={() => navigate(`/venues/${id}/edit`)}
                className="flex-1 sm:flex-initial"
              >
                Edit
              </Button>
              <Button
                variant="danger"
                onClick={() => setShowDeleteModal(true)}
                className="flex-1 sm:flex-initial"
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
