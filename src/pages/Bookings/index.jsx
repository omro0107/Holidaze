import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import useApi from '../../hooks/useApi';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import Loading from '../../components/common/Loading';
import Modal from '../../components/common/Modal';
import {
  CalendarIcon,
  UserGroupIcon,
  MapPinIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';

/**
 * Bookings component displays upcoming and past bookings for the user.
 * Venue managers see bookings on their venues; regular users see their personal bookings.
 *
 * Features:
 * - Fetch bookings from API on mount.
 * - Show loading and error states.
 * - Display upcoming and past bookings.
 * - Allow regular users to cancel upcoming bookings with confirmation modal.
 * 
 * @component
 * @returns {JSX.Element} Rendered bookings UI.
 */
const Bookings = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { get, del, loading } = useApi();
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [error, setError] = useState(null);
  const [loadingData, setLoadingData] = useState(true);

  /**
   * Fetch bookings data from API depending on user role.
   * Venue managers get all venue bookings.
   * Regular users get their own bookings.
   *
   * This effect runs on component mount or when user/get changes.
   */
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        let endpoint = user.venueManager
          ? `/venues/bookings`
          : `/profiles/${user.name}/bookings`;
        
        const response = await get(endpoint);
        setBookings(response.data || []);
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
        setError(error.message);
      } finally {
        setLoadingData(false);
      }
    };

    fetchBookings();
  }, [user, get]);

  
  /**
   * Handle cancellation of a selected booking.
   * Calls API to delete booking and updates state on success.
   *
   * @async
   * @function
   * @returns {Promise<void>}
   */
  const handleCancelBooking = async () => {
    if (!selectedBooking) return;

    try {
      const response = await del(`/bookings/${selectedBooking.id}`);
      if (response.data) {
        setBookings(bookings.filter(booking => booking.id !== selectedBooking.id));
        setShowCancelModal(false);
        setSelectedBooking(null);
      }
    } catch (error) {
      console.error('Failed to cancel booking:', error);
      setError(error.message);
    }
  };

  /**
   * Open the cancellation confirmation modal and set the booking to cancel.
   *
   * @param {Object} booking - The booking object selected for cancellation.
   */
  const openCancelModal = (booking) => {
    setSelectedBooking(booking);
    setShowCancelModal(true);
  };

  if (loadingData) {
    return (
      <div className="flex justify-center py-12">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  const sortedBookings = [...bookings].sort((a, b) => {
    return new Date(a.dateFrom) - new Date(b.dateFrom);
  });

  const upcomingBookings = sortedBookings.filter(
    booking => new Date(booking.dateFrom) >= new Date()
  );

  const pastBookings = sortedBookings.filter(
    booking => new Date(booking.dateFrom) < new Date()
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        {user.venueManager ? 'Venue Bookings' : 'My Bookings'}
      </h1>

      {/* Upcoming Bookings */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Upcoming Bookings
        </h2>
        {upcomingBookings.length === 0 ? (
          <p className="text-gray-500">No upcoming bookings.</p>
        ) : (
          <div className="space-y-4">
            {upcomingBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white shadow rounded-lg overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900">
                        {booking.venue.name}
                      </h3>
                      
                      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-center text-gray-600">
                          <MapPinIcon className="h-5 w-5 mr-2" />
                          <span>
                            {booking.venue.location.city}, {booking.venue.location.country}
                          </span>
                        </div>
                        
                        <div className="flex items-center text-gray-600">
                          <UserGroupIcon className="h-5 w-5 mr-2" />
                          <span>{booking.guests} guests</span>
                        </div>
                        
                        <div className="flex items-center text-gray-600">
                          <CalendarIcon className="h-5 w-5 mr-2" />
                          <span>
                            {format(new Date(booking.dateFrom), 'MMM d, yyyy')} -{' '}
                            {format(new Date(booking.dateTo), 'MMM d, yyyy')}
                          </span>
                        </div>
                        
                        <div className="flex items-center text-gray-600">
                          <CurrencyDollarIcon className="h-5 w-5 mr-2" />
                          <span>${booking.venue.price} per night</span>
                        </div>
                      </div>
                    </div>

                    <div className="ml-4 flex flex-col space-y-2">
                      <Button
                        variant="secondary"
                        onClick={() => navigate(`/venues/${booking.venue.id}`)}
                      >
                        View Venue
                      </Button>
                      {!user.venueManager && (
                        <Button
                          variant="danger"
                          onClick={() => openCancelModal(booking)}
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Past Bookings */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Past Bookings
        </h2>
        {pastBookings.length === 0 ? (
          <p className="text-gray-500">No past bookings.</p>
        ) : (
          <div className="space-y-4">
            {pastBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white shadow rounded-lg overflow-hidden opacity-75"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900">
                        {booking.venue.name}
                      </h3>
                      
                      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-center text-gray-600">
                          <MapPinIcon className="h-5 w-5 mr-2" />
                          <span>
                            {booking.venue.location.city}, {booking.venue.location.country}
                          </span>
                        </div>
                        
                        <div className="flex items-center text-gray-600">
                          <UserGroupIcon className="h-5 w-5 mr-2" />
                          <span>{booking.guests} guests</span>
                        </div>
                        
                        <div className="flex items-center text-gray-600">
                          <CalendarIcon className="h-5 w-5 mr-2" />
                          <span>
                            {format(new Date(booking.dateFrom), 'MMM d, yyyy')} -{' '}
                            {format(new Date(booking.dateTo), 'MMM d, yyyy')}
                          </span>
                        </div>
                        
                        <div className="flex items-center text-gray-600">
                          <CurrencyDollarIcon className="h-5 w-5 mr-2" />
                          <span>${booking.venue.price} per night</span>
                        </div>
                      </div>
                    </div>

                    <Button
                      variant="secondary"
                      onClick={() => navigate(`/venues/${booking.venue.id}`)}
                    >
                      View Venue
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cancel Booking Modal */}
      <Modal
        isOpen={showCancelModal}
        onClose={() => {
          setShowCancelModal(false);
          setSelectedBooking(null);
        }}
        title="Cancel Booking"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to cancel your booking at{' '}
            <span className="font-medium">{selectedBooking?.venue.name}</span>?
          </p>
          <p className="text-sm text-gray-500">
            This action cannot be undone.
          </p>
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <Button
            variant="secondary"
            onClick={() => {
              setShowCancelModal(false);
              setSelectedBooking(null);
            }}
          >
            Keep Booking
          </Button>
          <Button
            variant="danger"
            onClick={handleCancelBooking}
            disabled={loading}
          >
            {loading ? 'Cancelling...' : 'Cancel Booking'}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Bookings;
