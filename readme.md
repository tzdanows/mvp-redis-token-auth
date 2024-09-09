# token-based authentication

a minimal redis token authentication system with a react frontend and a flask backend. a functional register and login which upon authenticating through the sign in page, users will be able to access the api output from: https://softwium.com/api/books which consists of a fulllist of books, structured as shown below:

---

```json
[
  {
    "id":1,
    "title":"Unlocking Android",
    "isbn":"1933988673",
    "pageCount":416,
    "authors":
    [
      "W. Frank Ableson",
      "Charlie Collins",
      "Robi Sen"
      ]
  },
  {
    "id":2,
    "title":"Android in Action, Second Edition",
    "isbn":"1935182722",
    "pageCount":592,
    "authors":
    [
      "W. Frank Ableson",
      "Robi Sen"
      ]
  }
]
```

### tech used
* react (axios/react-router-dom)
* shadcn (ui components)
* redis (tokens)
* python (with flask)
* [api](https://softwium.com/fake-api/)

requirements in requirements.txt

main focuses:
* redis token storage with expiration time
* react app w/ axios for api calls
* /api/books endpoint (requires auth to view)
* main functional flow
  * login with credentials
  * validates credentials and generates token
  * token stored in redis
  * token sent to frontend
  * frontend stores the token in local storage
  * subsequent api calls include the token in header
  * logout = clear tokens from redis
  * refresh token = generate new token
* optional improvements:
  * salt & hashing + password storage [TODO]
  * genuine user registration [partially TODO?]
  * token refresh [DONE]
  * logout = clear tokens from redis [DONE]
  * better error handling [TODO?]
  * HTTPS / rate limiting for security [TODO]
  * frontend css improvements [TODO]
  * book object styling [TODO]

### redis quick ref | [docs](https://redis.io/docs/latest/develop/connect/)
```
brew install redis

brew services start redis

redis-cli ping
```

### running the application
```bash
python3 backend/main.py

# keep main.py running, then:

cd frontend

npm start
```