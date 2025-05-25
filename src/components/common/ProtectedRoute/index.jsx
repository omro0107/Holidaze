import React from 'react';
import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import Loading from '../Loading';

/**
 * Protects routes based on authentication and role.
 *
 * Redirects users based on their authentication status and optionally
 * their `venueManager` role.
 *
 * - Redirects to `/login` if authentication is required and user is not logged in.
 * - Redirects to `/` if venue manager access is required but user lacks the role.
 * - Redirects to `/` if route does *not* require auth but the user is already authenticated (e.g. login/register).
 *
 * @component
 * @example
 * <ProtectedRoute requireAuth={true} requireVenueManager={true}>
 *   <VenueDashboard />
 * </ProtectedRoute>
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - The content to render if access is allowed
 * @param {boolean} [props.requireAuth=true] - Whether authentication is required
 * @param {boolean} [props.requireVenueManager=false] - Whether venue manager role is required
 */
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
