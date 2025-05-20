import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import useApi from '../hooks/useApi';
import { API_AUTH_URL, API_PROFILES_URL } from '../API/apiURL';
import { LOCAL_STORAGE_KEYS } from '../utils/constants';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN));
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const api = useApi();
  const initializeAuthCalled = useRef(false);

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
          const response = await api.get(`${API_PROFILES_URL}/${storedUserData.name}`);
          if (response.data) {
            setUser(response.data);
            localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(response.data));
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
  }, []); // Remove api from dependencies

  // Login handler
  const login = useCallback(async (email, password) => {
    try {
      console.log('Attempting login with API URL:', `${API_AUTH_URL}/login`);
      const response = await api.post(`${API_AUTH_URL}/login`, {
        email,
        password,
      });

      console.log('Login response:', response);
      const { accessToken, ...userData } = response;
      localStorage.setItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN, accessToken);
      setToken(accessToken);

      // Fetch complete user profile after login
      const profileResponse = await api.get(`${API_PROFILES_URL}/${userData.name}`);
      const completeUserData = profileResponse.data;
      
      localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(completeUserData));
      setUser(completeUserData);

      // Navigate to home after successful login
      navigate('/', { replace: true });

      return response;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }, [api, navigate]);

  // Register handler
  const register = useCallback(async (userData) => {
    try {
      // Ensure venueManager flag is properly set
      const registrationData = {
        ...userData,
        venueManager: !!userData.venueManager // Convert to boolean
      };

      const response = await api.post(`${API_AUTH_URL}/register`, registrationData);
      
      // Auto-login after successful registration
      await login(userData.email, userData.password);
      
      return response;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  }, [api, login]);

  // Logout handler
  const logout = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.USER);
    setToken(null);
    setUser(null);
    navigate('/login');
  }, [navigate]);

  // Update profile handler
  const updateProfile = useCallback(async (profileData) => {
    try {
      const response = await api.put(`${API_PROFILES_URL}/${user.name}`, profileData);
      const updatedUser = { ...user, ...response.data[0] };
      setUser(updatedUser);
      localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(updatedUser));
      return response;
    } catch (error) {
      console.error('Profile update failed:', error);
      throw error;
    }
  }, [api, user]);

  // Avatar update handler
  const updateAvatar = useCallback(async (avatarData) => {
    try {
      const response = await api.put(`${API_PROFILES_URL}/${user.name}`, {
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
  }, [api, user]);

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

export default AuthProvider;
