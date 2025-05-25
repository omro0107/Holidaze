import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { MapPinIcon} from '@heroicons/react/24/outline';
import { useAuth } from '../../../hooks/useAuth';
import { venueService } from '../../../API';
import StarRating from '../../StarRating';
import Button from '../Button';
import Modal from '../Modal';

const Card = ({
  id,
  title,
  description,
  media,
  price,
  rating,
  location,
  meta,
  actions,
  href,
  owner,
  className = '',
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const isOwner = user?.venueManager && owner?.name === user.name;

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await venueService.delete(id);
      if (response) {
        alert('Venue deleted successfully');
        window.location.href = '/profile';
      }
    } catch (error) {
      console.error('Failed to delete venue:', error);
      alert('Failed to delete venue. Please try again.');
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
    }
  };

  const CardWrapper = ({ children }) => {
    if (href) {
      return (
        <Link
          to={href}
          className={`
            block group rounded-lg overflow-hidden bg-white shadow-md
            hover:shadow-lg transition-shadow duration-200
            ${className}
          `}
        >
          {children}
        </Link>
      );
    }

    return (
      <div
        className={`
          rounded-lg overflow-hidden bg-white shadow-md
          ${className}
        `}
      >
        {children}
      </div>
    );
  };

  return (
    <CardWrapper>
      {/* Image */}
      <div className="relative aspect-w-16 aspect-h-9">
        <img
          src={media?.[0]?.url || '/images/placeholder-venue.png'}
          alt={media?.[0]?.alt || title}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-text group-hover:text-primary-600">
              {title}
            </h3>
            {location && (
              <p className="mt-1 flex items-center text-sm text-secondary-500">
                <MapPinIcon className="h-4 w-4 mr-1 flex-shrink-0" />
                {location}
              </p>
            )}
          </div>
          {rating !== undefined && (
            <StarRating rating={rating} size="sm" />
          )}
        </div>

        {description && (
          <p className="mt-2 text-sm text-secondary-600 line-clamp-2">
            {description}
          </p>
        )}

        {/* Meta Information */}
        <div className="mt-4 flex items-center space-x-4">
          {price && (
            <div className="flex items-center text-sm text-secondary-500">
              <span className="font-semibold text-primary-600 whitespace-nowrap">
                ${price}
                <span className="text-xs text-secondary-600">/night</span>
              </span>
            </div>
          )}
          {meta}
        </div>

        {/* Actions */}
        <div className="mt-4 flex items-center space-x-2">
          {actions}
          {isOwner && (
            <div className="flex gap-2 mt-2">
              <Button
                variant="secondary"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/venues/${id}/edit`);
                }}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                onClick={(e) => {
                  e.preventDefault();
                  setShowDeleteModal(true);
                }}
              >
                Delete
              </Button>
            </div>
          )}
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
      </div>
    </CardWrapper>
  );
};

Card.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  media: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      alt: PropTypes.string
    })
  ),
  price: PropTypes.number,
  rating: PropTypes.number,
  location: PropTypes.string,
  meta: PropTypes.node,
  actions: PropTypes.node,
  href: PropTypes.string,
  owner: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  className: PropTypes.string,
};

export default Card;
