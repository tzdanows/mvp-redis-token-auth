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
    <div className="min-h-screen bg-dracula-background text-dracula-foreground">
      <header className="bg-dracula-currentLine shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-dracula-purple">Books</h1>
          <button
            onClick={onLogout}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-dracula-background bg-dracula-pink hover:bg-dracula-purple focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dracula-purple"
          >
            Logout
          </button>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {error ? (
              <p className="text-dracula-red text-center" data-testid="error-message">{error}</p>
            ) : (
              <ul className="divide-y divide-dracula-comment border-4 border-dashed border-dracula-comment rounded-lg">
                {books.map((book) => (
                  <li key={book.id} className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-dracula-cyan truncate">{book.title}</p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-dracula-green text-dracula-background">
                          {book.authors.join(', ')}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-dracula-orange">
                          ISBN: {book.isbn}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-dracula-yellow sm:mt-0">
                        Pages: {book.pageCount}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookList;
