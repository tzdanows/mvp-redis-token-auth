from flask_restful import Resource
from flask import current_app, make_response
from utils.token_utils import token_required
import requests

class Books(Resource):
    @token_required
    def get(self):
        try:
            response = requests.get('https://softwium.com/api/books')
            response.raise_for_status()
            books = response.json()
            return make_response(books, 200)
        except requests.RequestException as e:
            current_app.logger.error(f"Error fetching books: {str(e)}")
            return make_response({'message': 'Failed to fetch books'}, 500)
