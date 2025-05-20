import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Button from '../Button';
import Input from '../Input';

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
