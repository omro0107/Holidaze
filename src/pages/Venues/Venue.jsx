import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { venueService } from '../../API';
import useDynamicPageTitle from '../../hooks/useDynamicPageTitle';
import Loading from '../../components/common/Loading';
import ImageGallery from './components/ImageGallery';
import VenueHeader from './components/VenueHeader';
import VenueDescription from './components/VenueDescription';
import VenueAmenities from './components/VenueAmenities';
import VenueSidebar from './components/VenueSidebar';
import SuccessModal from '../../components/common/SuccessModal';

/**
 * Venue page component.
 * Fetches and displays detailed information about a venue,
 * including images, description, amenities, and booking sidebar.
 * Handles image gallery navigation and booking success modal.
 * 
 * @component
 * @returns {JSX.Element} The Venue page UI
 */
const Venue = () => {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  useDynamicPageTitle('Venue', { dynamicPart: venue?.name, isLoading: loading });
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedDates, setSelectedDates] = useState({ from: null, to: null });
  const [modalState, setModalState] = useState({
    isOpen: false,
    details: null
  });

   /**
   * Fetches venue data from API by ID.
   * Updates state accordingly.
   * Handles loading and error states.
   */
  const fetchVenue = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await venueService.getById(id);
      setVenue(response);
    } catch (error) {
      console.error('Failed to fetch venue:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

   /**
   * Effect hook to fetch venue data on component mount or when ID changes.
   */
  useEffect(() => {
    if (id) {
      fetchVenue();
    }
  }, [id, fetchVenue]);

   /**
   * Handler to update selected booking dates.
   * @param {{ from: Date|null, to: Date|null }} dates - Selected date range
   */
  const handleDateSelect = (dates) => {
    setSelectedDates(dates);
  };

   /**
   * Handler called after a successful booking.
   * Opens success modal and refreshes venue data.
   * @param {Object} bookingDetails - Details of the successful booking
   */
  const handleBookingSuccess = async (bookingDetails) => {
    setModalState({
      isOpen: true,
      details: bookingDetails
    });
    // Refresh venue data to get updated bookings
    await fetchVenue();
  };

  
  /**
   * Closes the success modal and clears its state.
   */
  const handleCloseModal = () => {
    setModalState({
      isOpen: false,
      details: null
    });
  };

   /**
   * Advances to the next image in the gallery.
   * Wraps around to the first image if currently at the last.
   */
  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === venue.media.length - 1 ? 0 : prev + 1
    );
  };

   /**
   * Moves to the previous image in the gallery.
   * Wraps around to the last image if currently at the first.
   */
  const handlePreviousImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? venue.media.length - 1 : prev - 1
    );
  };

  if (loading && !venue) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );
  }

  if (error || !venue) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error || 'Venue not found'}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ImageGallery
        images={venue.media}
        currentIndex={currentImageIndex}
        onNext={handleNextImage}
        onPrevious={handlePreviousImage}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <VenueHeader
            id={venue.id}
            name={venue.name}
            city={venue.location?.city}
            country={venue.location?.country}
            rating={venue.rating}
            owner={venue.owner}
          />

          <VenueDescription
            description={venue.description}
            maxGuests={venue.maxGuests}
            owner={venue.owner}
            location={venue.location}
          />

          <VenueAmenities meta={venue.meta} />
        </div>

        <div className="lg:col-span-1">
          <VenueSidebar
            price={venue.price}
            owner={venue.owner}
            bookings={venue.bookings || []}
            selectedDates={selectedDates}
            onSelectDates={handleDateSelect}
            venueId={venue.id}
            venueName={venue.name}
            venueImage={venue.media?.[0]?.url}
            maxGuests={venue.maxGuests}
            onBookingSuccess={handleBookingSuccess}
          />
        </div>
      </div>

      {/* Success Modal */}
      <SuccessModal 
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        bookingDetails={modalState.details}
      />
    </div>
  );
};

export default Venue;
