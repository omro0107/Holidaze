import React from 'react';
import PropTypes from 'prop-types';
import { UserGroupIcon, MapPinIcon } from '@heroicons/react/24/outline';
const placeholderProfile = '/images/placeholder-profile.png';

/**
 * VenueDescription shows details about a venue including host info, description, and guest capacity.
 *
 * @param {Object} props
 * @param {string} props.description - Text describing the venue.
 * @param {number} props.maxGuests - Maximum number of guests allowed.
 * @param {Object} [props.owner] - Information about the venue owner/host.
 * @param {string} [props.owner.name] - Owner's name.
 * @param {string|Object} [props.owner.avatar] - Owner's avatar image URL or object with URL.
 *
 * @returns {JSX.Element} Venue description section UI
 */
const VenueDescription = ({ 
  description, 
  maxGuests, 
  owner,
}) => {
  return (
    <>
      {/* Host Information */}
      <div className="flex items-center mb-6" role="region" aria-label="Host information">
        <div className="flex items-center">
          <img
            src={typeof owner?.avatar === 'string' ? owner.avatar : (owner?.avatar?.url || placeholderProfile)}
            alt={owner?.name || 'Profile'}
            className="h-12 w-12 rounded-full mr-4 object-cover"
          />
          <div>
            <p className="text-sm text-gray-600">Hosted by</p>
            <p className="font-medium text-[#70533A]">{owner?.name || 'Anonymous'}</p>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="prose max-w-none mb-8 text-[#70533A]" role="region" aria-labelledby="about-heading">
        <h2 id="about-heading" className="text-xl font-semibold mb-2 text-[#70533A]">About this place</h2>
        <p>{description}</p>
      </div>
      
      {/* Max Guests */}
      <div className="flex items-center text-[#70533A] mb-8" role="region" aria-label="Guest capacity">
        <UserGroupIcon className="h-6 w-6 mr-2" aria-hidden="true" />
        <span>Maximum {maxGuests} guests</span>
      </div>
    </>
  );
};

VenueDescription.propTypes = {
  description: PropTypes.string.isRequired,
  maxGuests: PropTypes.number.isRequired,
  owner: PropTypes.shape({
    name: PropTypes.string,
    avatar: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object  // API might return avatar as an object
    ])
  }),
  location: PropTypes.shape({
    city: PropTypes.string,
    country: PropTypes.string
  })
};

export default VenueDescription;
