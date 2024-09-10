# token-based authentication

a minimal redis token authentication system with a react frontend and a flask backend. a lightweight register/login which upon authenticating, users will be able to access the api output from: https://softwium.com/api/books which consists of a book list, with each book structured as shown below:

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
* tailwindcss + [dracula colors](https://draculatheme.com/contribute)
* redis (tokens)
* python (with flask)
* requirements.txt in both `/frontend` and `/backend`

### main focuses:
* redis token storage with expiration time
* react app w/ axios for api calls
* /api/books endpoint (requires auth to view)
* main functional flow 
  * register with user/pass
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
  * user registration additions [TODO]
  * token refresh [DONE]
  * logout = clear tokens from redis [DONE]
  * better error handling [TODO]
  * HTTPS / rate limiting for security [TODO]
  * frontend css improvements [DONE]
  * book object styling [DONE]
  * shift user data storage from redis(lightweight) to postgresql(heavyweight) [TODO]
  * email field currently serves no purpose, add password recovery [TODO]
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

#### interesting reads
* [B trees effective for building wikis & more](https://news.ycombinator.com/item?id=41489832)
* [side quests, this project was also a side quest](https://cassidoo.co/post/side-quests/)
* while document databases often claim to be "schema-less," in practice, there's usually an implicit schema assumed by the application. This can lead to challenges when evolving the data model over time, as changes need to be carefully managed to ensure compatibility with existing documents. the importance of carefully considering data relationships and future scalability when choosing a database model for your application is genuine. This also emphasizes that while document databases offer flexibility, they still require thoughtful design and management of data structures. {chapter 2 of Designing Data-Intensive Applications}