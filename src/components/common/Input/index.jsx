import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';

/**
 * A customizable and accessible input field component.
 *
 * Supports error and helper text, optional icons, full-width layout, and forwarded refs.
 *
 * @component
 * @example
 * <Input
 *   id="email"
 *   label="Email address"
 *   type="email"
 *   placeholder="you@example.com"
 *   error="Invalid email"
 *   helper="We'll never share your email."
 *   required
 *   fullWidth
 * />
 *
 * @param {Object} props
 * @param {string} props.label - The label for accessibility (used as aria-label and default placeholder)
 * @param {string} [props.type='text'] - The input type
 * @param {string} [props.error] - Error message (renders in red and applies error styles)
 * @param {string} [props.helper] - Helper text (renders in gray under the input)
 * @param {React.ReactNode} [props.leftIcon] - Optional icon rendered on the left
 * @param {React.ReactNode} [props.rightIcon] - Optional icon rendered on the right
 * @param {boolean} [props.fullWidth=false] - Whether the input should take full width
 * @param {string} [props.className] - Additional classes for the input element
 * @param {string} [props.containerClassName] - Additional classes for the outer container
 * @param {boolean} [props.required=false] - Marks the field as required (sets aria-required)
 * @param {string} [props.placeholder] - Custom placeholder (defaults to `label` if not set)
 * @param {string} props.id - ID of the input, required for aria-describedby and accessibility
 * @param {string} [props.autoComplete] - HTML autocomplete attribute value (e.g., 'name', 'email', 'off')
 * @param {Object} ref - Forwarded ref for the input element
 */
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
  autoComplete,
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
      {label && (
        <label
          htmlFor={props.id}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
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
          placeholder={inputPlaceholder}
          aria-required={required}
          aria-describedby={
            error ? `${props.id}-error` : helper ? `${props.id}-helper` : undefined
          }
          autoComplete={autoComplete}
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
  autoComplete: PropTypes.string,
};

export default Input;
