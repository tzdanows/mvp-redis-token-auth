from flask import request
from flask_restful import Resource
from services.redis_service import get_redis_client
from utils.token_utils import generate_token, token_required
from models.user import User

class Login(Resource):
    def post(self):
        data = request.json
        if 'username' not in data or 'password' not in data:
            return {'message': 'Missing username or password'}, 400
        username = data.get('username')
        password = data.get('password')
        
        user = User.get_user(username)
        if user and user.check_password(password):
            token = generate_token()
            redis_client = get_redis_client()
            if redis_client:
                redis_client.setex(token, 7200, username)  # Token expires in 2 hours
                return {'token': token}, 200
            else:
                return {'message': 'Redis connection error'}, 500
        return {'message': 'Invalid credentials'}, 401

class Logout(Resource):
    @token_required
    def post(self):
        token = request.headers.get('Authorization')
        if token.startswith('Bearer '):
            token = token.split(' ')[1]
        redis_client = get_redis_client()
        if redis_client:
            redis_client.delete(token)
        return {'message': 'Logged out successfully'}, 200

class RefreshToken(Resource):
    @token_required
    def post(self):
        old_token = request.headers.get('Authorization')
        if old_token.startswith('Bearer '):
            old_token = old_token.split(' ')[1]
        redis_client = get_redis_client()
        if redis_client:
            username = redis_client.get(old_token)
            if username:
                username = username.decode('utf-8')
                new_token = generate_token()
                redis_client.setex(new_token, 7200, username)  # New token expires in 2 hours
                redis_client.delete(old_token)
                return {'token': new_token}, 200
        return {'message': 'Invalid or expired token'}, 401

class Register(Resource):
    def post(self):
        data = request.json
        print("Received registration data:", data)
        if 'username' not in data or 'password' not in data:
            print("Missing username or password")
            return {'message': 'Missing username or password'}, 400
        username = data.get('username')
        password = data.get('password')
        
        user = User.create_user(username, password)
        if user:
            print("User created successfully")
            return {'message': 'User created successfully'}, 201
        else:
            print("Username already exists")
            return {'message': 'Username already exists'}, 400

