import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import App from './App';

jest.mock('axios');

describe('App Integration Tests', () => {
  beforeEach(() => {
    (axios.post as jest.Mock).mockResolvedValue({ data: { token: 'fake-token' } });
    (axios.get as jest.Mock).mockResolvedValue({ data: [{ id: 1, title: 'Test Book', author: 'Test Author' }] });
  });

  test('login flow', async () => {
    render(<App />);

    // Check if login form is displayed
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();

    // Fill in login form
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'testpass' } });

    // Submit login form
    fireEvent.click(screen.getByText('Login'));

    // Wait for books to be displayed
    await waitFor(() => {
      expect(screen.getByText('Books')).toBeInTheDocument();
      expect(screen.getByText('Test Book by Test Author')).toBeInTheDocument();
    });

    // Verify API calls
    expect(axios.post).toHaveBeenCalledWith('http://localhost:5000/api/login', { username: 'testuser', password: 'testpass' });
    expect(axios.get).toHaveBeenCalledWith('http://localhost:5000/api/books', { headers: { Authorization: 'fake-token' } });
  });
});

// mocks axios calls
// renders main app component
// checks if login form is displayed
// fills in login form
// submits login form
// checks if books are displayed
// verifies axios calls