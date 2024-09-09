import os
from flask import Flask, request, jsonify
from flask_restful import Api, Resource
from flask_cors import CORS
import redis
import uuid
import requests

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'your-secret-key')

CORS(app)
api = Api(app)

# redis connection
redis_client = redis.Redis.from_url(os.environ.get('REDIS_URL', 'redis://localhost:6379/0'))

class Login(Resource):
    def post(self):
        username = request.json.get('username')
        password = request.json.get('password')
        
        if username == 'admin' and password == 'password':
            token = str(uuid.uuid4())
            redis_client.setex(token, 7200, username)  # Token expires in 2 hours
            return {'token': token}, 200
        return {'message': 'Invalid credentials'}, 401

class Books(Resource):
    def get(self):
        token = request.headers.get('Authorization')
        if not token or not redis_client.exists(token):
            return {'message': 'Unauthorized'}, 401
        
        response = requests.get('https://softwium.com/api/books')
        return response.json(), 200

api.add_resource(Login, '/api/login')
api.add_resource(Books, '/api/books')

if __name__ == '__main__':
    app.run(debug=True)