/**
 * @fileoverview Avatar component for displaying user profile images with optional
 * size, status indicator, and click interaction.
 */

import React from 'react';
import PropTypes from 'prop-types';

const placeholderAvatar = '/images/placeholder-profile.png';

/**
 * Renders a circular user avatar with optional status indicator and interactivity.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} [props.src] - Image source URL. Falls back to a placeholder if not provided or fails to load.
 * @param {string} [props.alt] - Alternative text for the image.
 * @param {'xs'|'sm'|'md'|'lg'|'xl'|'2xl'} [props.size='md'] - Size of the avatar.
 * @param {'online'|'offline'|'busy'|'away'} [props.status] - Status indicator to show on the avatar.
 * @param {string} [props.className] - Optional additional Tailwind CSS classes.
 * @param {function} [props.onClick] - Optional click handler. Makes the avatar interactive if provided.
 * @returns {JSX.Element} The rendered avatar component.
 */
const Avatar = ({
  src,
  alt,
  size = 'md',
  status,
  className = '',
  onClick,
}) => {
  const sizes = {
    xs: 'h-6 w-6',
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
    '2xl': 'h-20 w-20',
  };

  const statusColors = {
    online: 'bg-green-400',
    offline: 'bg-gray-400',
    busy: 'bg-red-400',
    away: 'bg-yellow-400',
  };

  const statusSize = {
    xs: 'h-1.5 w-1.5',
    sm: 'h-2 w-2',
    md: 'h-2.5 w-2.5',
    lg: 'h-3 w-3',
    xl: 'h-4 w-4',
    '2xl': 'h-5 w-5',
  };

  const containerClasses = `
    relative inline-block ${sizes[size]} ${className}
    ${onClick ? 'cursor-pointer' : ''}
  `.trim();

  const imageClasses = 'rounded-full object-cover w-full h-full';

  return (
    <div 
      className={containerClasses}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <img
        src={src || placeholderAvatar}
        alt={alt || 'Profile picture'}
        className={imageClasses}
        onError={(e) => {
          e.target.src = placeholderAvatar;
        }}
      />

      {/* Status Indicator */}
      {status && (
        <span
          className={`
            absolute bottom-0 right-0 block rounded-full ring-2 ring-white
            ${statusColors[status]} ${statusSize[size]}
          `}
        />
      )}
    </div>
  );
};

Avatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', '2xl']),
  status: PropTypes.oneOf(['online', 'offline', 'busy', 'away']),
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default Avatar;
