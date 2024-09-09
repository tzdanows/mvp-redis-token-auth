import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import BookList from './components/BookList';
import { useAuth } from './hooks/useAuth';

const App: React.FC = () => {
  const { token, login, logout } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={token ? <Navigate to="/books" replace /> : <Login onLogin={login} />} />
        <Route path="/books" element={token ? <BookList onLogout={logout} /> : <Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
