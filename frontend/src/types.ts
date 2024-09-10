export interface LoginCredentials {
  username: string;
  password: string;
  email?: string;
}

export interface Book {
  id: number;
  title: string;
  authors: string[];
  isbn: string;
  pageCount: number;
}