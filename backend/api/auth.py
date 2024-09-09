from flask import request
from flask_restful import Resource
from services.redis_service import get_redis_client
from utils.token_utils import generate_token, token_required
import bcrypt

class Login(Resource):
    def post(self):
        print("Login attempt received")
        data = request.json
        print("Login data:", data)
        if 'username' not in data or 'password' not in data:
            return {'message': 'Missing username or password'}, 400
        username = data.get('username')
        password = data.get('password')
        
        # In a real application, you would fetch the hashed password from a database
        #hashed_password = bcrypt.hashpw('password'.encode('utf-8'), bcrypt.gensalt())
        
        ##if username == 'admin' and bcrypt.checkpw(password.encode('utf-8'), hashed_password):
        if username == 'admin' and password == 'password':
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
        username = redis_client.get(old_token).decode('utf-8')
        new_token = generate_token()
        redis_client.setex(new_token, 7200, username)  # New token expires in 2 hours
        redis_client.delete(old_token)
        return {'token': new_token}, 200
