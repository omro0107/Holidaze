import React, { useState } from 'react';
import Modal from '../Modal';
import Button from '../Button';
import StarRating from '../../StarRating';

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

  const handleAmenityChange = (amenity) => {
    setFilters(prev => ({
      ...prev,
      amenities: {
        ...prev.amenities,
        [amenity]: !prev.amenities[amenity]
      }
    }));
  };

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

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} showClose={false}>
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Filters</h2>

        {/* Price Range */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Price Range</h3>
          <div className="flex gap-4">
            <div>
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
            <div>
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
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Minimum Rating</h3>
          <StarRating
            rating={filters.rating}
            onChange={(rating) => setFilters(prev => ({ ...prev, rating }))}
            editable
          />
        </div>

        {/* Amenities */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Amenities</h3>
          <div className="space-y-3">
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
        <div className="flex gap-3">
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
