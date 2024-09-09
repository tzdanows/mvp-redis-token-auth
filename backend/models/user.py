from werkzeug.security import generate_password_hash, check_password_hash
from services.redis_service import get_redis_client

class User:
    def __init__(self, username, password_hash):
        self.username = username
        self.password_hash = password_hash

    @staticmethod
    def create_user(username, password):
        print(f"Attempting to create user: {username}")
        password_hash = generate_password_hash(password)
        redis_client = get_redis_client()
        if redis_client.hexists('users', username):
            print(f"User {username} already exists")
            return None  # User already exists
        redis_client.hset('users', username, password_hash)
        print(f"User {username} created successfully")
        return User(username, password_hash)

    @staticmethod
    def get_user(username):
        redis_client = get_redis_client()
        password_hash = redis_client.hget('users', username)
        if password_hash:
            return User(username, password_hash.decode('utf-8'))
        return None

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
