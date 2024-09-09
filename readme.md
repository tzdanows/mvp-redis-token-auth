# token-based authentication

* react frontend mvp [axios/react-router-dom]
* redis token storage
* python [Flask]

main focuses:
* redis token storage with expiration time
* react app w/ axios for api calls
* /api/books endpoint (requires auth to view)
* 
* main functional flow
  * login with credentials
  * validates credentials and generates token
  * token stored in redis
  * token sent to frontend
  * frontend stores the token in local storage
  * subsequent api calls include the token in header
* optional improvements:
  * salt & hashing + password storage
  * genuine user registration
  * token refresh
  * logout = clear tokens from redis
  * better error handling
  * HTTPS / rate limiting for security


requirements in requirements.txt

### redis quick ref
```
brew install redis

brew services start redis

redis-cli ping
```