import { createContext } from 'react';

/**
 * React context for authentication state and methods.
 * 
 * This context holds the current authentication information
 * and is intended to be provided by an AuthProvider component.
 * 
 * @type {React.Context<Object|null>}
 */
export const AuthContext = createContext(null);
