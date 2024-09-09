import unittest
import json
from app import app, redis_client

class TestApp(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True
        redis_client.flushall()  # Clear Redis database before each test

    def test_login_success(self):
        response = self.app.post('/api/login', json={'username': 'admin', 'password': 'password'})
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertIn('token', data)

    def test_login_failure(self):
        response = self.app.post('/api/login', json={'username': 'wrong', 'password': 'wrong'})
        self.assertEqual(response.status_code, 401)

    def test_books_with_valid_token(self):
        # First, login to get a token
        login_response = self.app.post('/api/login', json={'username': 'admin', 'password': 'password'})
        token = json.loads(login_response.data)['token']

        # Then, use the token to access books
        books_response = self.app.get('/api/books', headers={'Authorization': token})
        self.assertEqual(books_response.status_code, 200)
        books = json.loads(books_response.data)
        self.assertIsInstance(books, list)

    def test_books_with_invalid_token(self):
        response = self.app.get('/api/books', headers={'Authorization': 'invalid_token'})
        self.assertEqual(response.status_code, 401)

    def test_books_without_token(self):
        response = self.app.get('/api/books')
        self.assertEqual(response.status_code, 401)

if __name__ == '__main__':
    unittest.main()

# successful login test
# failed login test
# book access with a valid token
# book access with an invalid token
# book access without a token