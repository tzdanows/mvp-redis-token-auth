import React, { useState } from 'react';
import { LoginCredentials } from '../types';
import { Link, useNavigate } from 'react-router-dom';

interface RegisterProps {
  onRegister: (credentials: LoginCredentials) => Promise<void>;
}

const Register: React.FC<RegisterProps> = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await onRegister({ username, password });
      navigate('/'); // redirect to login after registration
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Register</button>
      {error && <p data-testid="error-message">{error}</p>}
      <p>Already have an account? <Link to="/">Login here</Link></p>
    </form>
  );
};

export default Register;
