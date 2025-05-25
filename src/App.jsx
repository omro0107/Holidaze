/**
 * Main app routing configuration and entry point.
 * 
 * Defines all routes, including public, protected, and layout-wrapped routes.
 * Wraps routes with authentication context and protection where needed.
 */

import React from 'react';
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import { ROUTES } from './utils/constants';

// Layout
import Layout from './components/Layout';

// Pages
import Home from './components/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import VenueList from './pages/Venues/VenueList';
import Venue from './pages/Venues/Venue';
import CreateVenue from './pages/Venues/CreateVenue';
import EditVenue from './pages/Venues/EditVenue';
import Profile from './pages/Profile';
import Bookings from './pages/Bookings';
import NotFound from './components/NotFound';
import Contact from './pages/Contact';
import About from './pages/About';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';

// Components
import ProtectedRoute from './components/common/ProtectedRoute';

/**
 * Wrapper component that provides authentication context to its children routes.
 * Used as a root wrapper for all routes that require auth state.
 */
const AuthLayout = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AuthLayout />}>
      {/* Auth Routes */}
      <Route
        path={ROUTES.LOGIN}
        element={
          <ProtectedRoute requireAuth={false}>
            <Login />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.REGISTER}
        element={
          <ProtectedRoute requireAuth={false}>
            <Register />
          </ProtectedRoute>
        }
      />

      {/* Main Layout Routes */}
      <Route element={<Layout />}>
        <Route path={ROUTES.HOME} element={<Home />} />
        
            <Route path={ROUTES.VENUES} element={<VenueList />} />
            <Route path={ROUTES.VENUE_DETAILS} element={<Venue />} />
            <Route path={ROUTES.CONTACT} element={<Contact />} />
            <Route path={ROUTES.ABOUT} element={<About />} />
            <Route path={ROUTES.TERMS} element={<Terms />} />
            <Route path={ROUTES.PRIVACY} element={<Privacy />} />
        
        {/* Protected Routes */}
        <Route
          path={ROUTES.VENUE_CREATE}
          element={
            <ProtectedRoute requireAuth requireVenueManager>
              <CreateVenue />
            </ProtectedRoute>
          }
        />
        
        <Route
          path={ROUTES.VENUE_EDIT}
          element={
            <ProtectedRoute requireAuth requireVenueManager>
              <EditVenue />
            </ProtectedRoute>
          }
        />
        
        <Route
          path={ROUTES.PROFILE}
          element={
            <ProtectedRoute requireAuth>
              <Profile />
            </ProtectedRoute>
          }
        />
        
        <Route
          path={ROUTES.BOOKINGS}
          element={
            <ProtectedRoute requireAuth>
              <Bookings />
            </ProtectedRoute>
          }
        />

        {/* 404 Route */}
        <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
      </Route>
    </Route>
  ),
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true
    },
  }
);

/**
 * Main app component.
 * Provides routing via React Router's RouterProvider with predefined routes.
 */
function App() {
  return <RouterProvider router={router} />;
}

export default App;
