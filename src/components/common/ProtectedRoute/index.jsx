import React from 'react';
import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import Loading from '../Loading';

const ProtectedRoute = ({ 
  children, 
  requireAuth = true,
  requireVenueManager = false,
}) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading size="xl" />
      </div>
    );
  }

  // If authentication is required and user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If venue manager access is required and user is not a venue manager
  if (requireVenueManager && (!user?.venueManager)) {
    return <Navigate to="/" replace />;
  }

  // If user is authenticated but tries to access auth pages (login/register)
  if (!requireAuth && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  requireAuth: PropTypes.bool,
  requireVenueManager: PropTypes.bool,
};

export default ProtectedRoute;
