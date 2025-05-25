import React, { useState, useCallback, useEffect, useRef } from 'react';
import { AuthContext } from './AuthContext';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { API_AUTH_URL } from '../API/config';
import { LOCAL_STORAGE_KEYS } from '../utils/constants';
import { authService, profileService } from '../API';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN));
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const initializeAuthCalled = useRef(false);

  // Login handler
  const login = useCallback(async (email, password) => {
    try {
      console.log('Attempting login with API URL:', `${API_AUTH_URL}/login`);
      const response = await authService.login(email, password);

      console.log('Login response:', response);
      const { accessToken, ...userData } = response;
      
      // First store the user data and token
      localStorage.setItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN, accessToken);
      localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(userData));
      setToken(accessToken);
      setUser(userData);

      // Then fetch complete profile data
      try {
        const completeUserData = await profileService.getProfile(userData.name);
        localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(completeUserData));
        setUser(completeUserData);
      } catch (profileError) {
        console.error('Failed to fetch complete profile:', profileError);
        // Don't fail the login if profile fetch fails
      }

      // Navigate to home after successful login
      navigate('/', { replace: true });

      return response;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }, [navigate]);

  // Register handler
  const register = useCallback(async (userData) => {
    try {
      // Ensure venueManager flag is properly set
      const registrationData = {
        ...userData,
        venueManager: !!userData.venueManager // Convert to boolean
      };

      const response = await authService.register(registrationData);
      
      // Auto-login after successful registration
      await login(userData.email, userData.password);
      
      return response;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  }, [login]);

  // Logout handler
  const logout = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.USER);
    setToken(null);
    setUser(null);
    navigate('/login');
  }, [navigate]);

    // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      if (initializeAuthCalled.current) return;
      initializeAuthCalled.current = true;

      const storedToken = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
      const storedUser = localStorage.getItem(LOCAL_STORAGE_KEYS.USER);
      if (storedToken) {
        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser));
          } catch {
            localStorage.removeItem(LOCAL_STORAGE_KEYS.USER);
          }
        }
        try {
          // Get the stored user data to get the username
          const storedUserData = JSON.parse(storedUser);
          
          // Fetch complete profile data
          const profileData = await profileService.getProfile(storedUserData.name);
          if (profileData) {
            setUser(profileData);
            localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(profileData));
          } else if (!storedUser) {
            // If API returns generic profile and no stored user, logout
            logout();
          }
        } catch (error) {
          console.error('Failed to fetch user profile:', error);
          if (error.message.includes('Too many requests')) {
            // Don't logout on rate limit, just set loading to false
            setIsLoading(false);
            return;
          }
          logout();
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, [logout]); // Remove api from dependencies

  // Update profile handler
  const updateProfile = useCallback(async (profileData) => {
    try {
      const response = await profileService.updateProfile(user.name, profileData);
      const updatedUser = { ...user, ...response };
      setUser(updatedUser);
      localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(updatedUser));
      return response;
    } catch (error) {
      console.error('Profile update failed:', error);
      throw error;
    }
  }, [user]);

  // Avatar update handler
  const updateAvatar = useCallback(async (avatarData) => {
    try {
      const response = await profileService.updateProfile(user.name, {
        avatar: avatarData
      });
      const updatedUser = { ...user, avatar: avatarData };
      setUser(updatedUser);
      localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(updatedUser));
      return response;
    } catch (error) {
      console.error('Avatar update failed:', error);
      throw error;
    }
  }, [user]);

  const value = {
    user,
    token,
    isAuthenticated: !!token,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
    updateAvatar,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
