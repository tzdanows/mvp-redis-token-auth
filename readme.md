# token-based authentication

---

a minimal redis token authentication system with a react frontend and a flask backend. a functional signup and login which upon authenticating through the sign in page, users will be able to access the api output from: https://softwium.com/api/books which consists of a list of books as shown below:

```json
[
  {
    "id":1,
    "title":"Unlocking Android",
    "isbn":"1933988673",
    "pageCount":416,
    "authors":["W. Frank Ableson","Charlie Collins","Robi Sen"]
  },
  {
    "id":2,
    "title":"Android in Action, Second Edition",
    "isbn":"1935182722",
    "pageCount":592,
    "authors":["W. Frank Ableson","Robi Sen"]
  }
]
```

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