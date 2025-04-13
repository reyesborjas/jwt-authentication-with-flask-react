// src/front/hooks/useAuth.jsx
import { useCallback } from 'react';
import { Navigate } from 'react-router-dom';
import useGlobalReducer from './useGlobalReducer';

export const useAuth = () => {
  const { store, dispatch } = useGlobalReducer();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const signup = useCallback(async (email, password) => {
    try {
      const response = await fetch(`${backendUrl}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.msg || 'Failed to signup');
      return { success: true };
    } catch (error) {
      dispatch({ type: 'auth_error', payload: error.message });
      return { success: false, message: error.message };
    }
  }, [backendUrl, dispatch]);

  const login = useCallback(async (email, password) => {
    try {
      const response = await fetch(`${backendUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.msg || 'Failed to login');
      dispatch({ 
        type: 'auth_login_success', 
        payload: { user: data.user, token: data.token } 
      });
      return { success: true };
    } catch (error) {
      dispatch({ type: 'auth_error', payload: error.message });
      return { success: false, message: error.message };
    }
  }, [backendUrl, dispatch]);

  const logout = useCallback(() => {
    dispatch({ type: 'auth_logout' });
  }, [dispatch]);

  // Auth Guard component - use this to protect routes
  const AuthGuard = ({ children }) => {
    if (!store.auth.token) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return {
    user: store.auth.user,
    token: store.auth.token,
    error: store.auth.error,
    isAuthenticated: !!store.auth.token,
    signup,
    login,
    logout,
    AuthGuard
  };
};

// Export the Auth Guard component for direct use in routes
export const AuthGuard = () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return null;
};