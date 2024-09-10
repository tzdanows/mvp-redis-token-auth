import React, { useState } from 'react';
import { LoginCredentials } from '../types';
import { Link } from 'react-router-dom';

interface LoginProps {
  onLogin: (credentials: LoginCredentials) => Promise<void>;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await onLogin({ username, password });
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-dracula-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-dracula-purple">Sign in to your account</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-dracula-currentLine py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-dracula-cyan">
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-dracula-comment rounded-md shadow-sm placeholder-dracula-comment text-dracula-foreground focus:outline-none focus:ring-dracula-purple focus:border-dracula-purple sm:text-sm bg-dracula-background"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-dracula-cyan">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-dracula-comment rounded-md shadow-sm placeholder-dracula-comment text-dracula-foreground focus:outline-none focus:ring-dracula-purple focus:border-dracula-purple sm:text-sm bg-dracula-background"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-dracula-background bg-dracula-pink hover:bg-dracula-purple focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dracula-purple"
              >
                Sign in
              </button>
            </div>
          </form>
          {error && <p className="mt-2 text-center text-sm text-dracula-red" data-testid="error-message">{error}</p>}
          <p className="mt-2 text-center text-sm text-dracula-foreground">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-dracula-cyan hover:text-dracula-green">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

