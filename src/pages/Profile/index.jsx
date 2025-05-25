import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import useApi from '../../hooks/useApi';
import { bookingService, profileService } from '../../API';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Avatar from '../../components/Avatar';
import Loading from '../../components/common/Loading';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Tabs from '../../components/common/Tabs';

/**
 * Profile page component.
 * Shows user profile info, venues (if venue manager), bookings, and venue bookings.
 * Allows updating avatar and canceling bookings.
 *
 * @component
 * @returns {JSX.Element} Profile page UI
 */
const Profile = () => {
  const navigate = useNavigate();
  const { user, updateAvatar } = useAuth();
  const { loading } = useApi();

  const [venues, setVenues] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [venueBookings, setVenueBookings] = useState([]);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [error, setError] = useState(null);
  const [loadingData, setLoadingData] = useState(true);
  const [avatarKey, setAvatarKey] = useState(0);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [cancellingBooking, setCancellingBooking] = useState(false);
  const [activeTab, setActiveTab] = useState('venues');

  /**
   * Fetches profile-related data including venues, bookings, and venue bookings.
   * Sets corresponding state variables.
   * Handles errors and loading state.
   */
  const fetchUserData = React.useCallback(async () => {
    try {
      // Get venues with bookings and customer info
      const venuesResponse = await profileService.getVenues(user.name);
      const bookingsResponse = await profileService.getProfile(user.name);

      setVenues(venuesResponse || []);
      setBookings(bookingsResponse?.bookings || []);

      // Get all bookings from venues and include customer info
      const allVenueBookings = venuesResponse?.reduce((acc, venue) => {
        const bookingsWithVenue = (venue.bookings || []).map(booking => ({
          ...booking,
          venue: {
            ...venue,
            bookings: undefined // Remove nested bookings to avoid circular reference
          }
        }));
        return [...acc, ...bookingsWithVenue];
      }, []);

      // Sort by date, keeping only upcoming bookings
      const now = new Date();

      const upcomingBookings = (allVenueBookings || [])
        .filter(booking => {
          const bookingDate = new Date(booking.dateFrom);
          // Reset time part for date comparison
          const bookingDateOnly = new Date(bookingDate.getFullYear(), bookingDate.getMonth(), bookingDate.getDate());
          const nowDateOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          return bookingDateOnly >= nowDateOnly;
        })
        .sort((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom));

      setVenueBookings(upcomingBookings || []);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      setError(error.message);
    } finally {
      setLoadingData(false);
    }
  }, [user]);

  useEffect(() => {
    if (user?.name) {
      fetchUserData();
    }
  }, [user?.name, fetchUserData]);

  
  /**
   * Handles cancelling a booking by calling API and refreshing data.
   * Shows loading and error states.
   */
  const handleCancelBooking = async () => {
    if (!selectedBooking) return;

    try {
      setCancellingBooking(true);
      await bookingService.delete(selectedBooking.id);

      // Refresh bookings list
      await fetchUserData();

      setShowCancelModal(false);
      setSelectedBooking(null);
    } catch (error) {
      console.error('Failed to cancel booking:', error);
      setError(error.message);
    } finally {
      setCancellingBooking(false);
    }
  };

  /**
   * Handles avatar update by calling updateAvatar from auth context.
   * Validates input URL and manages error state.
   */
  const handleUpdateAvatar = async () => {
    try {
      setError(null);
      if (!avatarUrl.trim()) {
        setError('Avatar URL is required');
        return;
      }

      const avatarData = {
        url: avatarUrl,
        alt: user.name
      };

      await updateAvatar(avatarData);
      setShowAvatarModal(false);
      setAvatarKey(prev => prev + 1); // Force Avatar component to re-render
    } catch (error) {
      console.error('Failed to update avatar:', error);
      setError(error.message);
    }
  };

  if (loadingData) {
    return (
      <div className="flex justify-center py-12">
        <Loading />
      </div>
    );
  }

  const tabs = [
    { id: 'venues', label: 'My Venues' },
    { id: 'bookings', label: 'My Bookings' },
    { id: 'venueBookings', label: 'Venue Reservations' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <Avatar
              key={avatarKey}
              src={user.avatar?.url}
              alt={user.name}
              size="2xl"
              fallbackInitial={user.name.charAt(0)}
            />
            <button
              onClick={() => setShowAvatarModal(true)}
              className="absolute bottom-0 right-0 bg-primary-600 text-white p-2 rounded-full shadow-lg hover:bg-primary-700"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </button>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-text">{user.name}</h1>
            <p className="text-secondary">{user.email}</p>
            <p className="text-sm font-medium mt-1">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full ${
                user.venueManager 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {user.venueManager ? 'Venue Manager' : 'Customer'}
              </span>
            </p>
          </div>
        </div>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'venues' && user.venueManager && (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-text">My Venues</h2>
            <Button onClick={() => navigate('/venues/create')}>
              Create New Venue
            </Button>
          </div>
          
          {venues.length === 0 ? (
            <p className="text-gray-500">You haven't created any venues yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {venues.map((venue) => (
                <Card
                  key={venue.id}
                  id={venue.id}
                  title={venue.name}
                  description={venue.description}
                  media={venue.media}
                  price={venue.price}
                  rating={venue.rating}
                  location={`${venue.location.city}, ${venue.location.country}`}
                  maxGuests={venue.maxGuests}
                  href={`/venues/${venue.id}`}
                  owner={venue.owner || { name: user.name }}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'bookings' && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-text mb-4">My Bookings</h2>
          {bookings.length === 0 ? (
            <p className="text-gray-500">You don't have any bookings yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookings.map((booking) => (
                <Card
                  key={booking.id}
                  id={booking.venue?.id}
                  title={booking.venue?.name}
                  description={`Check-in: ${new Date(booking.dateFrom).toLocaleDateString()}\nCheck-out: ${new Date(booking.dateTo).toLocaleDateString()}\nGuests: ${booking.guests}`}
                  media={booking.venue?.media}
                  location={booking.venue?.location ? `${booking.venue.location.city}, ${booking.venue.location.country}` : ''}
                  href={`/venues/${booking.venue?.id}`}
                  actions={
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedBooking(booking);
                        setShowCancelModal(true);
                      }}
                      variant="danger"
                      fullWidth
                    >
                      Cancel Booking
                    </Button>
                  }
                />
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'venueBookings' && user.venueManager && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-text mb-4">Upcoming Bookings on My Venues</h2>
          {venueBookings.length === 0 ? (
            <p className="text-gray-500">No upcoming bookings on your venues.</p>
          ) : (
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">Arrival</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Nights</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Departure</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Guests</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Total Price</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Venue</th>
                </tr>
              </thead>
              <tbody>
                {venueBookings.map((booking) => {
                  const arrivalDate = new Date(booking.dateFrom);
                  const departureDate = new Date(booking.dateTo);
                  const nights = Math.round((departureDate - arrivalDate) / (1000 * 60 * 60 * 24));
                  const totalPrice = booking.venue?.price * nights;
                  return (
                    <tr key={booking.id} className="border border-gray-300 hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">{arrivalDate.toLocaleDateString()}</td>
                      <td className="border border-gray-300 px-4 py-2">{nights}</td>
                      <td className="border border-gray-300 px-4 py-2">{departureDate.toLocaleDateString()}</td>
                      <td className="border border-gray-300 px-4 py-2">{booking.guests}</td>
                      <td className="border border-gray-300 px-4 py-2">${totalPrice}</td>
                      <td className="border border-gray-300 px-4 py-2">
                        {(() => {
                          const now = new Date();
                          const arrival = new Date(booking.dateFrom);
                          const departure = new Date(booking.dateTo);
                          
                          let status;
                          let colorClass;
                          
                          if (now < arrival) {
                            status = 'Upcoming';
                            colorClass = 'bg-blue-100 text-blue-800';
                          } else if (now >= arrival && now <= departure) {
                            status = 'In-house';
                            colorClass = 'bg-green-100 text-green-800';
                          } else {
                            status = 'Checked out';
                            colorClass = 'bg-gray-100 text-gray-800';
                          }
                          
                          return (
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
                              {status}
                            </span>
                          );
                        })()}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <a href={`/venues/${booking.venue?.id}`} className="text-blue-600 hover:underline">
                          {booking.venue?.name}
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Avatar Update Modal */}
      <Modal
        isOpen={showAvatarModal}
        onClose={() => {
          setShowAvatarModal(false);
          setAvatarUrl('');
          setError(null);
        }}
        title="Update Profile Picture"
      >
        <div className="space-y-4">
          <Input
            id="avatar-url-input"
            label="Image URL"
            value={avatarUrl}
            onChange={(e) => {
              setAvatarUrl(e.target.value);
              setError(null);
            }}
            placeholder="Enter image URL"
            error={error}
          />
          
          {/* Preview */}
          {avatarUrl && (
            <div className="mt-4">
              <p className="text-sm text-gray-500 mb-2">Preview:</p>
              <div className="flex justify-center">
                <img
                  src={avatarUrl}
                  alt="Avatar preview"
                  className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                  onError={() => {
                    setError('Invalid image URL');
                  }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <Button
            variant="secondary"
            onClick={() => {
              setShowAvatarModal(false);
              setAvatarUrl('');
              setError(null);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpdateAvatar}
            disabled={loading || !avatarUrl}
          >
            {loading ? 'Updating...' : 'Update'}
          </Button>
        </div>
      </Modal>

      {/* Cancel Booking Modal */}
      <Modal
        isOpen={showCancelModal}
        onClose={() => {
          setShowCancelModal(false);
          setSelectedBooking(null);
          setError(null);
        }}
        title="Cancel Booking"
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            Are you sure you want to cancel your booking at{' '}
            <span className="font-semibold">{selectedBooking?.venue?.name}</span>?
          </p>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <Button
            variant="secondary"
            onClick={() => {
              setShowCancelModal(false);
              setSelectedBooking(null);
              setError(null);
            }}
          >
            Keep Booking
          </Button>
          <Button
            variant="danger"
            onClick={handleCancelBooking}
            disabled={cancellingBooking}
          >
            {cancellingBooking ? 'Cancelling...' : 'Yes, Cancel Booking'}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Profile;
