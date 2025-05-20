import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';

const Input = forwardRef(({
  label,
  type = 'text',
  error,
  helper,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = '',
  containerClassName = '',
  required = false,
  placeholder,
  ...props
}, ref) => {
  const inputClasses = `
    block rounded-md shadow-sm
    ${error
      ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
      : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'
    }
    ${leftIcon ? 'pl-10' : ''}
    ${rightIcon ? 'pr-10' : ''}
    ${fullWidth ? 'w-full' : 'w-auto'}
    disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200
    placeholder-gray-500
    ${className}
  `.trim();

  const containerClasses = `
    ${fullWidth ? 'w-full' : 'w-auto'}
    ${containerClassName}
  `.trim();

  // Use label as placeholder if no placeholder is provided
  const inputPlaceholder = placeholder || label;

  return (
    <div className={containerClasses}>
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {leftIcon}
          </div>
        )}
        
        <input
          ref={ref}
          type={type}
          className={inputClasses}
          aria-invalid={error ? 'true' : 'false'}
          aria-label={label}
          placeholder={inputPlaceholder}
          aria-required={required}
          aria-describedby={
            error ? `${props.id}-error` : helper ? `${props.id}-helper` : undefined
          }
          {...props}
        />

        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            {rightIcon}
          </div>
        )}

        {error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
      </div>

      {(error || helper) && (
        <p
          className={`mt-2 text-sm ${
            error ? 'text-red-600' : 'text-gray-500'
          }`}
          id={error ? `${props.id}-error` : `${props.id}-helper`}
        >
          {error || helper}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.string,
  helper: PropTypes.string,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
  containerClassName: PropTypes.string,
  required: PropTypes.bool,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

export default Input;
