import React from 'react';
import PropTypes from 'prop-types';
import { StarIcon as StarOutline } from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';

const StarRating = ({ 
  rating, 
  size = 'md',
  interactive = false,
  onChange,
  className = '',
}) => {
  const totalStars = 5;
  const roundedRating = Math.round(rating * 2) / 2; // Round to nearest 0.5

  const sizes = {
    xs: 'h-3 w-3',
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
    xl: 'h-7 w-7',
  };

  const handleStarClick = (selectedRating) => {
    if (interactive && onChange) {
      onChange(selectedRating);
    }
  };

  const renderStar = (index) => {
    const starValue = index + 1;
    const isHalfStar = roundedRating === index + 0.5;
    const isFilledStar = roundedRating >= starValue;
    const starSize = sizes[size];
    
    const StarComponent = isFilledStar ? StarSolid : StarOutline;
    
    return (
      <button
        key={index}
        type="button"
        onClick={() => handleStarClick(starValue)}
        className={`
          ${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'}
          transition-transform duration-200
        `}
        disabled={!interactive}
        aria-label={`Rate ${starValue} out of ${totalStars} stars`}
      >
        <StarComponent
          className={`
            ${starSize}
            ${isFilledStar || isHalfStar ? 'text-primary-400' : 'text-primary-300'}
          `}
        />
      </button>
    );
  };

  return (
    <div 
      className={`inline-flex gap-0.5 ${className}`}
      role="img" 
      aria-label={`Rating: ${rating} out of ${totalStars} stars`}
    >
      {[...Array(totalStars)].map((_, index) => renderStar(index))}
      {rating > 0 && (
        <span className="sr-only">
          {rating} out of {totalStars} stars
        </span>
      )}
    </div>
  );
};

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  interactive: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string,
};

export default StarRating;
