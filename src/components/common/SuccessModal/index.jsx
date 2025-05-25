import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import Button from '../Button';
import { 
  CheckCircleIcon, 
  CalendarIcon, 
  UserGroupIcon, 
  CurrencyDollarIcon,
  HomeIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

/**
 * Displays a success modal with confirmation details after a successful booking.
 *
 * Includes venue name, dates, number of nights, guests, total price,
 * and an image if available.
 *
 * @component
 * @example
 * const booking = {
 *   venueImage: "https://example.com/image.jpg",
 *   venueName: "Seaside Villa",
 *   dateFrom: new Date("2025-06-01"),
 *   dateTo: new Date("2025-06-05"),
 *   guests: 2,
 *   totalPrice: 500
 * };
 * 
 * <SuccessModal isOpen={true} onClose={() => {}} bookingDetails={booking} />
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the modal is visible
 * @param {function} props.onClose - Function to close the modal
 * @param {Object} props.bookingDetails - The booking information to display
 * @param {string} [props.bookingDetails.venueImage] - Optional image of the venue
 * @param {string} props.bookingDetails.venueName - Name of the booked venue
 * @param {Date} props.bookingDetails.dateFrom - Start date of the booking
 * @param {Date} props.bookingDetails.dateTo - End date of the booking
 * @param {number} props.bookingDetails.guests - Number of guests
 * @param {number} props.bookingDetails.totalPrice - Total price of the booking
 */
const SuccessModal = ({ isOpen, onClose, bookingDetails }) => {
  if (!bookingDetails) return null;

  const {
    venueImage,
    venueName,
    dateFrom,
    dateTo,
    guests,
    totalPrice
  } = bookingDetails;

  const nights = Math.ceil((dateTo - dateFrom) / (1000 * 60 * 60 * 24));

  const formatDate = (date) => {
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      showClose={true}
      size="md"
      closeOnOverlayClick={true}
    >
      <div className="p-6 text-center">
        <CheckCircleIcon className="mx-auto h-12 w-12 text-green-500" />
        <h2 className="mt-4 text-xl font-semibold text-gray-900">
          Your booking is confirmed!
        </h2>
        <p className="mt-2 text-gray-700">Thank you for booking with Holidaze.</p>

        <div className="mt-6 flex flex-col items-center space-y-4">
          {venueImage && (
            <div className="relative w-full max-w-md h-48 rounded-lg overflow-hidden">
              <img
                src={venueImage}
                alt={venueName}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="w-full max-w-md text-left space-y-3 bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-3">
              <HomeIcon className="h-5 w-5 text-gray-500" />
              <span className="font-medium">{venueName}</span>
            </div>
            <div className="flex items-center space-x-3">
              <CalendarIcon className="h-5 w-5 text-gray-500" />
              <span>{formatDate(dateFrom)} - {formatDate(dateTo)}</span>
            </div>
            <div className="flex items-center space-x-3">
              <ClockIcon className="h-5 w-5 text-gray-500" />
              <span>{nights} {nights === 1 ? 'night' : 'nights'}</span>
            </div>
            <div className="flex items-center space-x-3">
              <UserGroupIcon className="h-5 w-5 text-gray-500" />
              <span>{guests} {guests === 1 ? 'guest' : 'guests'}</span>
            </div>
            <div className="flex items-center space-x-3 font-medium">
              <CurrencyDollarIcon className="h-5 w-5 text-gray-500" />
              <span>Total price: ${totalPrice}</span>
            </div>
          </div>
        </div>

        <p className="mt-6 text-sm text-gray-500">
          The booking is added to your profile
        </p>

        <div className="mt-6">
          <Button onClick={onClose} variant="primary" className="w-full">
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};

SuccessModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  bookingDetails: PropTypes.shape({
    venueImage: PropTypes.string,
    venueName: PropTypes.string.isRequired,
    dateFrom: PropTypes.instanceOf(Date).isRequired,
    dateTo: PropTypes.instanceOf(Date).isRequired,
    guests: PropTypes.number.isRequired,
    totalPrice: PropTypes.number.isRequired
  })
};

export default SuccessModal;
