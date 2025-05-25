import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Button from '../Button';
import Input from '../Input';

/**
 * A responsive search bar component that supports optional auto-search,
 * debouncing, and custom handlers.
 *
 * If `onSearch` is not provided, it defaults to navigating to `/venues?search=term`.
 *
 * @component
 * @example
 * // With custom search function
 * <SearchBar onSearch={(term) => handleSearch(term)} />
 *
 * // Default behavior (navigates to /venues)
 * <SearchBar />
 *
 * @param {Object} props
 * @param {function} [props.onSearch] - Optional custom function to handle search input
 * @param {string} [props.initialValue] - Default search input value
 * @param {string} [props.placeholder] - Placeholder text for the input
 * @param {string} [props.className] - Custom className for styling the outer container
 * @param {boolean} [props.showButton=true] - Whether to show the "Search" button
 * @param {boolean} [props.autoSearch=false] - Whether to search as the user types (with debounce)
 * @param {number} [props.minLength=2] - Minimum input length required before triggering search
 * @param {number} [props.debounceMs=300] - Milliseconds to wait before triggering auto search
 */
const SearchBar = ({
  onSearch,
  initialValue = '',
  placeholder = 'Search venues...',
  className = '',
  showButton = true,
  autoSearch = false,
  minLength = 2,
  debounceMs = 300,
}) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const navigate = useNavigate();

  let debounceTimer;

  const handleSearch = (term) => {
    if (term.length >= minLength) {
      if (onSearch) {
        onSearch(term);
      } else {
        // Default behavior: navigate to venues page with search query
        navigate(`/venues?search=${encodeURIComponent(term)}`);
      }
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (autoSearch) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        handleSearch(value);
      }, debounceMs);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className={`flex items-center gap-2 ${className}`}
    >
      <div className="relative flex-grow">
        <Input
          id="venue-search"
          type="search"
          value={searchTerm}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full pr-10"
          leftIcon={
            <MagnifyingGlassIcon 
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          }
        />
      </div>

      {showButton && (
        <Button
          type="submit"
          variant="primary"
          className="whitespace-nowrap"
          disabled={searchTerm.length < minLength}
        >
          Search
        </Button>
      )}
    </form>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func,
  initialValue: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  showButton: PropTypes.bool,
  autoSearch: PropTypes.bool,
  minLength: PropTypes.number,
  debounceMs: PropTypes.number,
};

export default SearchBar;
