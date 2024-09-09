import axios from 'axios';
import { LoginCredentials, Book } from '../types';

const API_URL = 'http://localhost:5003/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && typeof token === 'string') {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export const login = async (credentials: LoginCredentials): Promise<string> => {
  try {
    const response = await api.post('/login', credentials);
    const token = response.data.token;
    localStorage.setItem('token', token);
    return token;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  try {
    await api.post('/logout');
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    localStorage.removeItem('token');
  }
};

export const getBooks = async (): Promise<Book[]> => {
  const response = await api.get('/books');
  return response.data;
};
