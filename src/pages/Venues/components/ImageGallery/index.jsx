import React from 'react';
import PropTypes from 'prop-types';

/**
 * ImageGallery component displays a gallery of images with navigation controls.
 * Shows the current image and buttons to navigate to the previous or next image.
 *
 * @param {Object} props
 * @param {Array<{url: string, alt?: string}>} props.images - Array of image objects with URL and optional alt text.
 * @param {number} props.currentIndex - Index of the currently displayed image.
 * @param {function} props.onNext - Callback to go to the next image.
 * @param {function} props.onPrevious - Callback to go to the previous image.
 *
 * @returns {JSX.Element} Image gallery UI
 */
const ImageGallery = ({ images, currentIndex, onNext, onPrevious }) => {
  return (
    <div className="relative aspect-w-16 aspect-h-9 mb-8 bg-gray-100 rounded-lg overflow-hidden">
      {images.length > 0 && (
        <>
          <img
            src={images[currentIndex].url}
            alt={images[currentIndex].alt}
            className="object-cover w-full h-full"
          />
          {images.length > 1 && (
            <div className="absolute inset-0 flex items-center justify-between p-4">
              <button
                onClick={onPrevious}
                className="p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75"
              >
                ←
              </button>
              <button
                onClick={onNext}
                className="p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75"
              >
                →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      alt: PropTypes.string
    })
  ).isRequired,
  currentIndex: PropTypes.number.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired
};

export default ImageGallery;
