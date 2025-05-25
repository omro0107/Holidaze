import React from 'react';
import PropTypes from 'prop-types';

/**
 * Loading spinner component with optional fullscreen overlay and text.
 *
 * @component
 * @example
 * <Loading size="lg" color="gray" text="Fetching data..." />
 *
 * @param {Object} props
 * @param {'xs'|'sm'|'md'|'lg'|'xl'} [props.size='md'] - Size of the spinner and text
 * @param {'primary'|'white'|'gray'|'success'|'error'} [props.color='primary'] - Color theme for spinner and text
 * @param {string} [props.className] - Additional custom classNames for container
 * @param {boolean} [props.fullScreen=false] - Renders the spinner centered on a semi-transparent fullscreen overlay
 * @param {string} [props.text='Loading...'] - Optional loading message shown under the spinner
 */
const Loading = ({ 
  size = 'md',
  color = 'primary',
  className = '',
  fullScreen = false,
  text = 'Loading...',
}) => {
  const sizes = {
    xs: 'h-4 w-4',
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  };

  const colors = {
    primary: 'text-primary-600',
    white: 'text-white',
    gray: 'text-gray-600',
    success: 'text-green-600',
    error: 'text-red-600',
  };

  const textSizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  };

  const Spinner = () => (
    <div 
      className={`inline-flex flex-col items-center ${className}`}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <svg
        className={`animate-spin ${sizes[size]} ${colors[color]}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        role="progressbar"
        aria-label="Loading"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      {text && (
        <span 
          className={`
            mt-2 ${textSizes[size]} ${colors[color]}
            animate-pulse
          `}
          aria-live="polite"
        >
          {text}
        </span>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div 
        className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50"
        role="dialog"
        aria-modal="true"
        aria-label="Loading overlay"
      >
        <Spinner />
      </div>
    );
  }

  return <Spinner />;
};

Loading.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  color: PropTypes.oneOf(['primary', 'white', 'gray', 'success', 'error']),
  className: PropTypes.string,
  fullScreen: PropTypes.bool,
  text: PropTypes.string,
};

export default Loading;
