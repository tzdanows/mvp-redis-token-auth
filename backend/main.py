from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from api.auth import Login, Logout, RefreshToken
from api.books import Books
from services.redis_service import init_redis

app = Flask(__name__)
app.config['REDIS_URL'] = 'redis://localhost:6379/0'
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3003"}}, supports_credentials=True)
app.config['SECRET_KEY'] = 'your-secret-key'  # Use environment variable in production

# Remove this line as we've already set up CORS
# CORS(app)
api = Api(app)

# Initialize Redis
init_redis(app)

# Register resources
api.add_resource(Login, '/api/login')
api.add_resource(Logout, '/api/logout')
api.add_resource(RefreshToken, '/api/refresh')
api.add_resource(Books, '/api/books')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5003)
