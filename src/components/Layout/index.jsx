import React from 'react';
import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';
import Navigation from '../Header/Navigation';
import Footer from '../Footer';


/**
 * Layout component wraps the application UI with consistent
 * navigation, footer, and main content area for nested routes.
 *
 * @component
 * @returns {JSX.Element} The overall page layout with header, content, and footer
 */
const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
