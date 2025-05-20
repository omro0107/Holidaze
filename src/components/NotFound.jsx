import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon } from '@heroicons/react/24/outline';
import Button from './common/Button';

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-max mx-auto text-center">
        <div className="sm:flex items-center">
          <p className="text-4xl font-bold text-primary-600 sm:text-5xl">404</p>
          <div className="sm:ml-6">
            <div className="sm:border-l sm:border-gray-200 sm:pl-6">
              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                Page not found
              </h1>
              <p className="mt-2 text-base text-gray-500">
                Sorry, we couldn't find the page you're looking for.
              </p>
            </div>
            <div className="mt-8 flex justify-center space-x-4">
              <Button
                variant="primary"
                to="/"
                className="inline-flex items-center"
              >
                <HomeIcon className="h-5 w-5 mr-2" />
                Go home
              </Button>
              <Button
                variant="outline"
                to="/venues"
              >
                Browse venues
              </Button>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500">
                Looking for something specific?{' '}
                <Link
                  to="/contact"
                  className="font-medium text-primary-600 hover:text-primary-500"
                >
                  Contact us
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
