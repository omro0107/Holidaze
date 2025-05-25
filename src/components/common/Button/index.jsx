/**
 * @fileoverview Reusable Button component supporting multiple styles, sizes,
 * loading state, and rendering as a <button>, <a>, or <Link>.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * A flexible button component that supports variants, sizes, loading state,
 * routing with `react-router-dom`, and standard button/link behavior.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - Button content.
 * @param {'primary'|'secondary'|'outline'|'danger'|'success'} [props.variant='primary'] - Visual style of the button.
 * @param {'xs'|'sm'|'md'|'lg'|'xl'} [props.size='md'] - Size of the button.
 * @param {'button'|'submit'|'reset'} [props.type='button'] - Type attribute (only when rendered as <button>).
 * @param {boolean} [props.fullWidth=false] - Whether the button should span full width.
 * @param {boolean} [props.disabled=false] - Whether the button is disabled.
 * @param {boolean} [props.loading=false] - Whether the button is in loading state (disables interaction).
 * @param {string} [props.href] - If provided, renders the button as an anchor tag.
 * @param {string} [props.to] - If provided, renders the button as a React Router <Link>.
 * @param {function} [props.onClick] - Click event handler.
 * @param {string} [props.className] - Additional custom CSS classes.
 * @returns {JSX.Element} Rendered button element.
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  fullWidth = false,
  disabled = false,
  loading = false,
  href,
  to,
  onClick,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200';

  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-primary-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
  };

  const sizes = {
    xs: 'px-2.5 py-1.5 text-xs',
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-4 py-2 text-base',
    xl: 'px-6 py-3 text-base',
  };

  const disabledStyles = 'opacity-50 cursor-not-allowed';
  const loadingStyles = 'relative !text-transparent transition-none hover:!text-transparent';
  const widthStyles = fullWidth ? 'w-full' : '';

  const combinedClassName = `
    ${baseStyles}
    ${variants[variant]}
    ${sizes[size]}
    ${disabled ? disabledStyles : ''}
    ${loading ? loadingStyles : ''}
    ${widthStyles}
    ${className}
  `.trim();

  const loadingSpinner = loading && (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg
        className="animate-spin h-5 w-5 text-current"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        role="status"
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
    </div>
  );

  if (to) {
    return (
      <Link
        to={to}
        className={combinedClassName}
        aria-disabled={disabled || loading}
        {...props}
      >
        {children}
        {loadingSpinner}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={combinedClassName}
        aria-disabled={disabled || loading}
        {...props}
      >
        {children}
        {loadingSpinner}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={combinedClassName}
      aria-busy={loading}
      {...props}
    >
      {children}
      {loadingSpinner}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'danger', 'success']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  href: PropTypes.string,
  to: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default Button;
