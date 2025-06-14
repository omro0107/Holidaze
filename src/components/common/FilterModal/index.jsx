import React, { useState } from 'react';
import Modal from '../Modal';
import Button from '../Button';
import StarRating from '../../StarRating';

/**
 * Modal for applying filters like price range, rating, and amenities.
 *
 * @component
 * @example
 * return (
 *   <FilterModal
 *     isOpen={isModalOpen}
 *     onClose={() => setModalOpen(false)}
 *     onApply={(filters) => console.log(filters)}
 *     initialFilters={{
 *       minPrice: 100,
 *       maxPrice: 500,
 *       rating: 4,
 *       amenities: { wifi: true }
 *     }}
 *   />
 * )
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {Function} props.onClose - Function to close the modal
 * @param {Function} props.onApply - Function to apply filters
 * @param {Object} [props.initialFilters={}] - Initial filter values
 */
const FilterModal = ({ isOpen, onClose, onApply, initialFilters = {} }) => {
  const [filters, setFilters] = useState({
    minPrice: initialFilters.minPrice || '',
    maxPrice: initialFilters.maxPrice || '',
    rating: initialFilters.rating || 0,
    amenities: {
      wifi: initialFilters.amenities?.wifi || false,
      parking: initialFilters.amenities?.parking || false,
      breakfast: initialFilters.amenities?.breakfast || false,
      pets: initialFilters.amenities?.pets || false,
    }
  });

  /**
   * Toggles an amenity checkbox value.
   * @param {string} amenity - The amenity key to toggle (e.g., 'wifi')
   */
  const handleAmenityChange = (amenity) => {
    setFilters(prev => ({
      ...prev,
      amenities: {
        ...prev.amenities,
        [amenity]: !prev.amenities[amenity]
      }
    }));
  };

  /**
   * Clears all filters and applies the cleared values.
   */
  const handleClear = () => {
    const clearedFilters = {
      minPrice: '',
      maxPrice: '',
      rating: 0,
      amenities: {
        wifi: false,
        parking: false,
        breakfast: false,
        pets: false
      }
    };
    setFilters(clearedFilters);
    onApply(clearedFilters); // Apply the cleared filters
    onClose(); // Close the modal after clearing
  };

  
  /**
   * Applies the current filter values.
   */
  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} showClose={false}>
      <div className="p-4 sm:p-6 w-full" role="dialog" aria-labelledby="filter-heading">
        <h2 id="filter-heading" className="text-xl font-semibold text-gray-900 mb-6">Filters</h2>

        {/* Price Range */}
        <div className="mb-6" role="group" aria-labelledby="price-range-heading">
          <h3 id="price-range-heading" className="text-sm font-medium text-gray-900 mb-2">Price Range</h3>
          <div className="flex gap-4">
            <div className="w-full">
              <label htmlFor="minPrice" className="sr-only">Minimum Price</label>
              <input
                type="number"
                id="minPrice"
                min="1"
                placeholder="Min"
                value={filters.minPrice}
                onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>
            <div className="w-full">
              <label htmlFor="maxPrice" className="sr-only">Maximum Price</label>
              <input
                type="number"
                id="maxPrice"
                max="999999"
                placeholder="Max"
                value={filters.maxPrice}
                onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className="mb-6" role="group" aria-labelledby="rating-heading">
          <h3 id="rating-heading" className="text-sm font-medium text-gray-900 mb-2">Minimum Rating</h3>
          <StarRating
            rating={filters.rating}
            onChange={(rating) => setFilters(prev => ({ ...prev, rating }))}
            editable
          />
        </div>

        {/* Amenities */}
        <div className="mb-6" role="group" aria-labelledby="amenities-heading">
          <h3 id="amenities-heading" className="text-sm font-medium text-gray-900 mb-2">Amenities</h3>
          <div className="space-y-3" role="group" aria-label="Amenity options">
            {Object.entries({
              wifi: 'WiFi',
              parking: 'Parking',
              breakfast: 'Breakfast',
              pets: 'Pets Allowed'
            }).map(([key, label]) => (
              <label key={key} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.amenities[key]}
                  onChange={() => handleAmenityChange(key)}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3" role="group" aria-label="Filter actions">
          <Button onClick={handleApply} variant="primary" className="flex-1">
            Show Results
          </Button>
          <Button onClick={handleClear} variant="secondary">
            Clear
          </Button>
          <Button onClick={onClose} variant="secondary">
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default FilterModal;
