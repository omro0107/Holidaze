import React, { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { FaUmbrellaBeach } from 'react-icons/fa';
import { useAuth } from '../../../hooks/useAuth';
import Avatar from '../../Avatar';
import Button from '../../common/Button';

/**
 * Main navigation component for the Holidaze application.
 * Displays navigation links, user profile menu, and handles mobile responsiveness.
 * Adapts based on authentication state.
 *
 * @component
 * @returns {JSX.Element} Navigation bar element
 */
const Navigation = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  /**
   * Static navigation links available to all users.
   * @type {Array<{ name: string, href: string }>}
   */
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Venues', href: '/venues' },
    { name: 'Contact', href: '/contact' },
    { name: 'About', href: '/about' },
  ];

  /**
   * User-specific navigation links shown when logged in.
   * Includes 'Create Venue' for venue managers.
   * @type {Array<{ name: string, href: string }>}
   */
  const userNavigation = [
    { name: 'My Profile', href: '/profile' },
    ...(user?.venueManager ? [{ name: 'Create Venue', href: '/venues/create' }] : []),
  ];

  /**
   * Checks if the given path matches the current URL pathname.
   *
   * @param {string} path - The path to compare with the current location
   * @returns {boolean} True if path matches the current location pathname
   */
  const isCurrentPath = (path) => {
    return location.pathname === path;
  };

  return (
    <Disclosure as="nav" className="bg-background" role="navigation" aria-label="main">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              {/* Logo */}
              <div className="flex-shrink-0 flex items-center w-1/4">
                <Link to="/" className="flex items-center gap-3">
                  <FaUmbrellaBeach className="h-6 w-6 text-primary-600" aria-hidden="true" />
                  <span className="text-xl font-heading font-bold text-primary-600">
                    Holidaze
                  </span>
                </Link>
              </div>

              {/* Centered Navigation */}
              <div className="hidden sm:flex flex-1 justify-center items-center">
                <div className="flex space-x-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`
                        inline-flex items-center px-1 pt-1 border-b-2
                        text-sm font-menu
                        ${isCurrentPath(item.href)
                          ? 'border-primary-500 text-gray-900'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                        }
                      `}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* User Navigation */}
              <div className="hidden sm:flex items-center justify-end w-1/4">
                {isAuthenticated ? (
                  <Menu as="div" className="ml-3 relative">
                    <Menu.Button className="flex rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                      <Avatar
                        src={user?.avatar?.url}
                        alt={user?.name}
                        size="md"
                      />
                    </Menu.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <Link
                                to={item.href}
                                className={`
                                  block px-4 py-2 text-sm text-gray-700
                                  ${active ? 'bg-gray-100' : ''}
                                `}
                              >
                                {item.name}
                              </Link>
                            )}
                          </Menu.Item>
                        ))}
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={logout}
                              className={`
                                block w-full text-left px-4 py-2 text-sm text-gray-700
                                ${active ? 'bg-gray-100' : ''}
                              `}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="outline"
                      to="/login"
                    >
                      Sign in
                    </Button>
                    <Button
                      variant="primary"
                      to="/register"
                    >
                      Sign up
                    </Button>
                  </div>
                )}
              </div>

              {/* Mobile menu button */}
              <div className="flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <Disclosure.Panel className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  to={item.href}
                  className={`
                    block pl-3 pr-4 py-2 border-l-4 text-base font-medium
                    ${isCurrentPath(item.href)
                      ? 'border-primary-500 text-primary-700 bg-primary-50'
                      : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                    }
                  `}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            {isAuthenticated ? (
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <Avatar
                      src={user?.avatar?.url}
                      alt={user?.name}
                      size="md"
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">
                      {user?.name}
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                      {user?.email}
                    </div>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  {userNavigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as={Link}
                      to={item.href}
                      className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                  <Disclosure.Button
                    as="button"
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                  >
                    Sign out
                  </Disclosure.Button>
                </div>
              </div>
            ) : (
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="space-y-1">
                  <Disclosure.Button
                    as={Link}
                    to="/login"
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                  >
                    Sign in
                  </Disclosure.Button>
                  <Disclosure.Button
                    as={Link}
                    to="/register"
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                  >
                    Sign up
                  </Disclosure.Button>
                </div>
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navigation;
