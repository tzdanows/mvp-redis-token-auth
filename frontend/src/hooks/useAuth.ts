import { useState, useCallback } from 'react';
import { login as apiLogin, logout as apiLogout, register as apiRegister } from '../services/api';
import { LoginCredentials } from '../types';

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      const newToken = await apiLogin(credentials);
      localStorage.setItem('token', newToken);
      setToken(newToken);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await apiLogout();
      localStorage.removeItem('token');
      setToken(null);
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  }, []);

  const register = useCallback(async (credentials: LoginCredentials & { email: string }) => {
    try {
      await apiRegister(credentials);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  }, []);

  return { token, login, logout, register };
};
