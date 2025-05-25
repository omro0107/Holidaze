import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import Calendar from '../../../../components/common/Calendar';
import Button from '../../../../components/common/Button';
import { parseISO, isWithinInterval, differenceInDays } from 'date-fns';
import { useAuth } from '../../../../hooks/useAuth';
import { bookingService } from '../../../../API';

/**
 * VenueSidebar displays the booking sidebar on the venue page,
 * including price, availability calendar, guest selection, and booking button.
 * Handles booking logic, date validation, and UI states.
 *
 * @param {Object} props
 * @param {number} props.price - Price per night for the venue.
 * @param {Object} props.owner - Owner information of the venue.
 * @param {string} [props.owner.name] - Name of the venue owner.
 * @param {string} [props.owner.email] - Email of the venue owner.
 * @param {string} [props.owner.bio] - Bio of the venue owner.
 * @param {Object} [props.owner.avatar] - Avatar object with URL.
 * @param {string} [props.owner.avatar.url] - URL of the owner's avatar image.
 * @param {Array<Object>} [props.bookings] - Array of existing bookings for the venue.
 * @param {string} props.bookings[].dateFrom - Booking start date in ISO string format.
 * @param {string} props.bookings[].dateTo - Booking end date in ISO string format.
 * @param {Object} props.selectedDates - Selected date range by user for booking.
 * @param {Date} props.selectedDates.from - Check-in date.
 * @param {Date} props.selectedDates.to - Check-out date.
 * @param {Function} props.onSelectDates - Callback to update selected dates.
 * @param {string} props.venueId - Unique ID of the venue.
 * @param {string} props.venueName - Name of the venue.
 * @param {string} [props.venueImage] - Image URL of the venue.
 * @param {number} props.maxGuests - Maximum number of guests allowed.
 * @param {Function} [props.onBookingSuccess] - Optional callback triggered after a successful booking.
 *
 * @returns {JSX.Element} Booking sidebar component with calendar, guest selector, and booking button.
 */
const VenueSidebar = ({ 
  price, 
  owner, 
  bookings = [], 
  selectedDates, 
  onSelectDates, 
  venueId, 
  venueName, 
  venueImage,
  maxGuests,
  onBookingSuccess 
}) => {
  const { isAuthenticated, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [guests, setGuests] = useState(1);

  // Calculate number of nights and total price
  const bookingSummary = useMemo(() => {
    if (!selectedDates.from || !selectedDates.to) return null;

    const nights = differenceInDays(selectedDates.to, selectedDates.from);
    const totalPrice = nights * price;

    return {
      nights,
      totalPrice
    };
  }, [selectedDates, price]);
  
  /**
   * Checks if the selected date range overlaps with existing bookings.
   * @param {Date} selectedFrom - Selected check-in date.
   * @param {Date} selectedTo - Selected check-out date.
   * @param {Array<Object>} existingBookings - List of existing bookings.
   * @returns {boolean} True if overlap exists, false otherwise.
   */
  const hasDateOverlap = (selectedFrom, selectedTo, existingBookings) => {
    return existingBookings.some(booking => {
      const bookingFrom = parseISO(booking.dateFrom);
      const bookingTo = parseISO(booking.dateTo);

      return (
        isWithinInterval(selectedFrom, { start: bookingFrom, end: bookingTo }) ||
        isWithinInterval(selectedTo, { start: bookingFrom, end: bookingTo }) ||
        isWithinInterval(bookingFrom, { start: selectedFrom, end: selectedTo })
      );
    });
  };

  /**
   * Handles booking creation by validating dates, checking for overlaps,
   * and calling the booking service API.
   */
  const handleBooking = async () => {
    setError('');
    setLoading(true);

    if (!selectedDates.from || !selectedDates.to) {
      setError('Please select check-in and check-out dates');
      setLoading(false);
      return;
    }

    if (hasDateOverlap(selectedDates.from, selectedDates.to, bookings)) {
      setError('These dates are already booked. Please select different dates.');
      setLoading(false);
      return;
    }

    try {
      const bookingDetails = {
        venueImage,
        venueName,
        dateFrom: selectedDates.from,
        dateTo: selectedDates.to,
        guests,
        totalPrice: bookingSummary.totalPrice
      };

      await bookingService.create({
        dateFrom: selectedDates.from.toISOString(),
        dateTo: selectedDates.to.toISOString(),
        venueId: venueId,
        guests: guests
      });

      onSelectDates({ from: null, to: null });
      if (onBookingSuccess) {
        onBookingSuccess(bookingDetails);
      }
    } catch (error) {
      console.error('Booking error:', error);
      setError('Failed to create booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Convert booking dates to Date objects and sort them
  const bookedDates = bookings
    .map(booking => ({
      from: parseISO(booking.dateFrom),
      to: parseISO(booking.dateTo)
    }))
    .sort((a, b) => a.from - b.from);

  // Create array of guest options from 1 to maxGuests
  const guestOptions = Array.from({ length: maxGuests }, (_, i) => i + 1);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg sticky top-8">
      {/* Price */}
      <div className="mb-6">
        <p className="text-3xl font-bold text-primary-900">${price}</p>
        <p className="text-primary-500">per night</p>
      </div>

      {/* Calendar */}
      <div className="mt-6 border-t pt-6">
        <h3 className="text-lg font-normal mb-4">Check Availability and Book Your Stay</h3>
        
        <Calendar
          mode="range"
          selected={selectedDates}
          onSelect={onSelectDates}
          disabledDates={bookedDates}
          minDate={new Date()}
          numberOfMonths={1}
        />

        {/* Guest Selection */}
        <div className="mt-4">
          <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">
            Number of guests (max {maxGuests})
          </label>
          <select
            id="guests"
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          >
            {guestOptions.map(num => (
              <option key={num} value={num}>
                {num} {num === 1 ? 'guest' : 'guests'}
              </option>
            ))}
          </select>
        </div>

        {/* Booking Summary */}
        {bookingSummary && (
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <h4 className="font-medium text-gray-900 mb-2">Booking Summary</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <p>Nights: {bookingSummary.nights}</p>
              <p>Guests: {guests}</p>
              <div className="pt-2 border-t">
                <p className="text-sm text-gray-600">
                  ${price} × {bookingSummary.nights} nights
                </p>
                <p className="text-base font-medium text-gray-900 mt-1">
                  Total: ${bookingSummary.totalPrice}
                </p>
              </div>
            </div>
          </div>
        )}

        {isAuthenticated ? (
          user?.name !== owner?.name ? (
            <div className="mt-4">
              {error && (
                <p className="text-red-500 text-sm mb-2 text-center">
                  {error}
                </p>
              )}
              <Button
                onClick={handleBooking}
                disabled={loading || !selectedDates.from || !selectedDates.to}
                className="w-full"
              >
                {loading ? 'Creating Booking...' : 'Book Now'}
              </Button>
            </div>
          ) : (
            <p className="mt-4 text-sm text-gray-500 text-center">
              You cannot book your own venue
            </p>
          )
        ) : (
          <p className="mt-4 text-sm text-gray-500 text-center">
            Please log in to make a booking
          </p>
        )}
      </div>
    </div>
  );
};

VenueSidebar.propTypes = {
  price: PropTypes.number.isRequired,
  maxGuests: PropTypes.number.isRequired,
  owner: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    bio: PropTypes.string,
    avatar: PropTypes.shape({
      url: PropTypes.string
    })
  }),
  bookings: PropTypes.arrayOf(
    PropTypes.shape({
      dateFrom: PropTypes.string,
      dateTo: PropTypes.string
    })
  ),
  selectedDates: PropTypes.shape({
    from: PropTypes.instanceOf(Date),
    to: PropTypes.instanceOf(Date)
  }),
  onSelectDates: PropTypes.func.isRequired,
  venueId: PropTypes.string.isRequired,
  venueName: PropTypes.string.isRequired,
  venueImage: PropTypes.string,
  onBookingSuccess: PropTypes.func
};

export default VenueSidebar;
