import React from 'react';
import PropTypes from 'prop-types';
import { UserGroupIcon, MapPinIcon } from '@heroicons/react/24/outline';
import placeholderProfile from '../../../../assets/placeholder-profile.png';

const VenueDescription = ({ 
  description, 
  maxGuests, 
  owner,
}) => {
  return (
    <>
      {/* Host Information */}
      <div className="flex items-center mb-6">
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
      <div className="prose max-w-none mb-8 text-[#70533A]">
        <h2 className="text-xl font-semibold mb-2 text-[#70533A]">About this place</h2>
        <p>{description}</p>
      </div>
      
      {/* Max Guests */}
      <div className="flex items-center text-[#70533A] mb-8">
        <UserGroupIcon className="h-6 w-6 mr-2" />
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
