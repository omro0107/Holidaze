import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

/**
 * Custom hook to access authentication context.
 *
 * Must be used within an AuthProvider.
 *
 * @throws {Error} Throws error if used outside of AuthProvider
 * @returns {Object} Auth context value including user, token, auth methods, and status flags
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

