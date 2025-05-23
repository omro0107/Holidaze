import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { venueService } from '../../API';
import { ROUTES } from '../../utils/constants';
import SearchBar from '../../components/common/SearchBar';
import Card from '../../components/common/Card';
import Loading from '../../components/common/Loading';
import Button from '../../components/common/Button';
import FilterModal from '../../components/common/FilterModal';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';

const VenueList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    rating: parseInt(searchParams.get('rating')) || 0,
    amenities: {
      wifi: searchParams.get('wifi') === 'true',
      parking: searchParams.get('parking') === 'true',
      breakfast: searchParams.get('breakfast') === 'true',
      pets: searchParams.get('pets') === 'true',
    }
  });

  const hasActiveFilters = useMemo(() => {
    return filters.minPrice || 
           filters.maxPrice || 
           filters.rating > 0 || 
           Object.values(filters.amenities).some(value => value);
  }, [filters]);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        setLoading(true);
        setError(null);
        const params = new URLSearchParams();
        if (filters.search) params.append('search', filters.search);
        if (filters.minPrice) params.append('minPrice', filters.minPrice);
        if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);

        const response = await venueService.getAll(params);
        let filteredVenues = response || [];
        
        // Apply all filters
        filteredVenues = filteredVenues.filter(venue => {
          // Search filter
          if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            const matchesSearch = 
              (venue.name?.toLowerCase() || '').includes(searchTerm) ||
              (venue.location?.city?.toLowerCase() || '').includes(searchTerm) ||
              (venue.location?.country?.toLowerCase() || '').includes(searchTerm);
            if (!matchesSearch) return false;
          }

          // Price range filter
          if (filters.minPrice && venue.price < parseInt(filters.minPrice)) return false;
          if (filters.maxPrice && venue.price > parseInt(filters.maxPrice)) return false;

          // Rating filter
          if (filters.rating && venue.rating < filters.rating) return false;

          // Amenities filter
          if (filters.amenities.wifi && !venue.meta?.wifi) return false;
          if (filters.amenities.parking && !venue.meta?.parking) return false;
          if (filters.amenities.breakfast && !venue.meta?.breakfast) return false;
          if (filters.amenities.pets && !venue.meta?.pets) return false;

          return true;
        });

        // Sort by creation date
        const sortedVenues = filteredVenues.sort((a, b) => {
          return new Date(b.created) - new Date(a.created);
        });
        
        setVenues(sortedVenues);
      } catch (error) {
        console.error('Failed to fetch venues:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, [filters]);

  const handleSearch = (searchTerm) => {
    setFilters(prev => ({ ...prev, search: searchTerm }));
    setSearchParams(prev => {
      if (searchTerm) {
        prev.set('search', searchTerm);
      } else {
        prev.delete('search');
      }
      return prev;
    });
  };

  const handleApplyFilters = (newFilters) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
    
    // Update URL params
    setSearchParams(prev => {
      if (newFilters.minPrice) prev.set('minPrice', newFilters.minPrice);
      else prev.delete('minPrice');
      
      if (newFilters.maxPrice) prev.set('maxPrice', newFilters.maxPrice);
      else prev.delete('maxPrice');
      
      if (newFilters.rating) prev.set('rating', newFilters.rating.toString());
      else prev.delete('rating');
      
      Object.entries(newFilters.amenities).forEach(([key, value]) => {
        if (value) prev.set(key, 'true');
        else prev.delete(key);
      });
      
      return prev;
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold text-[#70533A]">Search stays that feel like you</h1>
        <div className="w-full md:w-96">
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search by venue name, city or country..."
            initialValue={filters.search}
          />
        </div>
      </div>

      <div className="mb-6">
        <Button
          onClick={() => setIsFilterModalOpen(true)}
          variant="secondary"
          className="flex items-center gap-2"
        >
          <FunnelIcon className="h-5 w-5" />
          Filters
          {hasActiveFilters && (
            <span className="ml-1 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
              Active
            </span>
          )}
        </Button>
      </div>

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApply={handleApplyFilters}
        initialFilters={filters}
      />

      {loading ? (
        <div className="flex justify-center py-12">
          <Loading />
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-600">{error}</p>
        </div>
      ) : venues.length === 0 ? (
        <div className="text-center py-12">
          <MagnifyingGlassIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No venues found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filter criteria
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {venues.map((venue) => (
            <Card
              key={venue.id}
              id={venue.id}
              href={ROUTES.VENUE_DETAILS.replace(':id', venue.id)}
              title={venue.name}
              description={venue.description}
              media={venue.media}
              price={venue.price}
              rating={venue.rating}
              location={`${venue.location.city}, ${venue.location.country}`}
              maxGuests={venue.maxGuests}
              owner={venue.owner}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default VenueList;
