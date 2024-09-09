import uuid
from functools import wraps
from flask import request, current_app
from services.redis_service import get_redis_client

def generate_token():
    return str(uuid.uuid4())

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return {'message': 'Token is missing'}, 401
        try:
            token = token.split(' ')[1] if token.startswith('Bearer ') else token
            redis_client = get_redis_client()
            if not redis_client or not redis_client.exists(token):
                return {'message': 'Invalid or expired token'}, 401
        except Exception as e:
            current_app.logger.error(f"Token validation error: {str(e)}")
            return {'message': 'Token validation failed'}, 401
        return f(*args, **kwargs)
    return decorated
