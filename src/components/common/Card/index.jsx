import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { MapPinIcon} from '@heroicons/react/24/outline';
import { useAuth } from '../../../hooks/useAuth';
import { venueService } from '../../../API';
import StarRating from '../../StarRating';
import Button from '../Button';
import Modal from '../Modal';

/**
 * Card component for displaying a venue or item summary.
 *
 * This component is used to show a card with an image, title, description, price,
 * location, rating, and meta information. It also handles owner-specific actions
 * like editing and deleting a venue.
 *
 * @component
 * @example
 * return (
 *   <Card
 *     id="123"
 *     title="Beachfront Villa"
 *     description="A beautiful place to relax"
 *     media={[{ url: 'villa.jpg', alt: 'Villa' }]}
 *     price={200}
 *     rating={4.5}
 *     location="Malibu"
 *     meta={<Tag label="Popular" />}
 *     actions={<Button>Book</Button>}
 *     href="/venues/123"
 *     owner={{ name: 'John Doe' }}
 *   />
 * )
 */

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

  // Check if current user is the owner and a venue manager
  const isOwner = user?.venueManager && owner?.name === user.name;

    /**
   * Handles venue deletion through API and redirects on success.
   * Shows a modal for confirmation.
   *
   * @async
   * @function
   * @returns {Promise<void>}
   */
  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await venueService.delete(id);
      if (response) {
        alert('Venue deleted successfully');
        window.location.href = '/profile';
      }
    } catch (error) {
      alert('Failed to delete venue. Please try again.');
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
    }
  };

  
  /**
   * Wrapper for either clickable card (`<Link>`) or static div.
   */
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
          aria-label={`View details for ${title}`}
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
      <div className="relative aspect-w-16 aspect-h-9" role="img" aria-label={media?.[0]?.alt || `Image of ${title}`}>
          <img
            src={media?.[0]?.url || '/images/placeholder-venue.jpg'}
            alt={media?.[0]?.alt || `Image of ${title}`}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200"
          />
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-lg font-semibold text-text group-hover:text-primary-600 truncate" id={`venue-title-${id}`}>
              {title}
            </h3>
            {location && (
              <p className="mt-0.5 sm:mt-1 flex items-center text-xs sm:text-sm text-secondary-500" aria-label={`Location: ${location}`}>
                <MapPinIcon 
                  className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" 
                  aria-hidden="true"
                />
                <span className="truncate">{location}</span>
              </p>
            )}
          </div>
          {rating !== undefined && (
            <div className="flex-shrink-0" aria-label={`Rating: ${rating} stars`}>
              <StarRating rating={rating} size="sm" aria-hidden="true" />
            </div>
          )}
        </div>

        {description && (
          <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-secondary-600 line-clamp-2" aria-label={`Description: ${description}`}>
            {description}
          </p>
        )}

        {/* Meta Information */}
          <div className="mt-3 sm:mt-4 flex items-center justify-between" role="group" aria-label="Venue details">
          {price && (
            <div className="flex items-center text-sm text-secondary-500">
              <span 
                className="font-semibold text-primary-600 whitespace-nowrap"
                aria-label={`Price: ${price} dollars per night`}
              >
                ${price}
                <span className="text-xs text-secondary-600">/night</span>
              </span>
            </div>
          )}
          {meta}
        </div>

        {/* Actions */}
        {(actions || isOwner) && (
          <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-2" role="group" aria-label="Venue actions">
            {actions}
            {isOwner && (
              <div className="flex gap-2 w-full sm:w-auto" role="group" aria-label="Owner actions">
                <Button
                  variant="secondary"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/venues/${id}/edit`);
                  }}
                  className="flex-1 sm:flex-initial text-sm py-1.5"
                  aria-label={`Edit ${title}`}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowDeleteModal(true);
                  }}
                  className="flex-1 sm:flex-initial text-sm py-1.5"
                  aria-label={`Delete ${title}`}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          title="Delete Venue"
        >
          <div className="p-4 sm:p-6">
            <p className="mb-4 text-sm sm:text-base">
              Are you sure you want to delete this venue? This action cannot be undone.
            </p>
            <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setShowDeleteModal(false)}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="danger"
                onClick={handleDelete}
                disabled={loading}
                className="w-full sm:w-auto"
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
