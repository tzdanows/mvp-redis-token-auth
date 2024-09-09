import redis
import os

redis_client = None

def init_redis(app):
    global redis_client
    redis_url = app.config.get('REDIS_URL', 'redis://localhost:6379/0')
    redis_client = redis.Redis.from_url(redis_url)

def get_redis_client():
    return redis_client
