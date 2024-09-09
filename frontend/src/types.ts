export interface LoginCredentials {
  username: string;
  password: string;
}

export interface Book {
  id: number;
  title: string;
  authors: string[];
  isbn: string;
  pageCount: number;
}