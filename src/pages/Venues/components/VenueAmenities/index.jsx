import React from 'react';
import PropTypes from 'prop-types';
import { WifiIcon, TruckIcon, HomeIcon, HeartIcon } from '@heroicons/react/24/outline';

/**
 * VenueAmenities displays a list of available amenities for a venue.
 * Shows icons and labels for wifi, parking, breakfast, and pet allowance if available.
 *
 * @param {Object} props
 * @param {Object} props.meta - Object containing boolean flags for each amenity.
 * @param {boolean} [props.meta.wifi] - Whether Wifi is available.
 * @param {boolean} [props.meta.parking] - Whether Parking is available.
 * @param {boolean} [props.meta.breakfast] - Whether Breakfast is included.
 * @param {boolean} [props.meta.pets] - Whether Pets are allowed.
 *
 * @returns {JSX.Element} Venue amenities section UI
 */
const VenueAmenities = ({ meta }) => {
  return (
    <div className="mb-8" role="region" aria-labelledby="amenities-heading">
      <h2 id="amenities-heading" className="text-xl font-semibold mb-4">What this place offers</h2>
      <div className="grid grid-cols-2 gap-4" role="list" aria-label="Available amenities">
        {meta.wifi && (
          <div className="flex items-center" role="listitem">
            <WifiIcon className="h-5 w-5 mr-2 text-text" aria-hidden="true" />
            <span>Wifi</span>
          </div>
        )}
        {meta.parking && (
          <div className="flex items-center" role="listitem">
            <TruckIcon className="h-5 w-5 mr-2 text-text" aria-hidden="true" />
            <span>Parking</span>
          </div>
        )}
        {meta.breakfast && (
          <div className="flex items-center" role="listitem">
            <HomeIcon className="h-5 w-5 mr-2 text-text" aria-hidden="true" />
            <span>Breakfast</span>
          </div>
        )}
        {meta.pets && (
          <div className="flex items-center" role="listitem">
            <HeartIcon className="h-5 w-5 mr-2 text-text" aria-hidden="true" />
            <span>Pets allowed</span>
          </div>
        )}
      </div>
    </div>
  );
};

VenueAmenities.propTypes = {
  meta: PropTypes.shape({
    wifi: PropTypes.bool,
    parking: PropTypes.bool,
    breakfast: PropTypes.bool,
    pets: PropTypes.bool
  }).isRequired
};

export default VenueAmenities;
