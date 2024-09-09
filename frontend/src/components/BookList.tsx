import React, { useState, useEffect } from 'react';
import { getBooks } from '../services/api';
import { Book } from '../types';

interface BookListProps {
  onLogout: () => void;
}

const BookList: React.FC<BookListProps> = ({ onLogout }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const fetchedBooks = await getBooks();
        setBooks(fetchedBooks);
      } catch (err) {
        setError('Failed to fetch books');
      }
    };
    fetchBooks();
  }, []);

  return (
    <div>
      <h1>Books</h1>
      {error ? (
        <p data-testid="error-message">{error}</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book.id}>{book.title} by {book.authors.join(', ')}</li>
          ))}
        </ul>
      )}
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default BookList;
