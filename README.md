# CRUD API

## Overview 🔍
🌐 Web application to work with users. Designed with Node.js (http package) with horizontal scaling
(starts multiple instances of application equal to the number of logical processor cores on the host machine with a load balancer that distributes requests across them using Round-robin algorithm.

## 🏗️ Install & Run🏃

Download or copy repository:

```bash
git clone https://github.com/AlexLevus/node-crud-api.git
```

Run service:
```bash
npm run start:prod
```

## API Doc 📚

Service allow to work with ``User`` entity.

### List of API endpoints:

1. `/api/users (GET)` - retrieve all users;
2. `/api/users/:id (GET)` - retrieve user by id;
3. `/api/users (POST)` - create new user;
4. `/api/users/:id (PUT)` - update user info;
5. `/api/users/:id (DELETE)` - delete user;

### Some examples of usage

#### `/api/users` (GET) - response example:
```json
[
    {
        "id": "8291f467-db9a-419d-b870-458c8c294aba",
        "username": "Aleksandr",
        "age": 23,
        "hobbies": [
            "football",
            "bear"
        ]
    },
    {
        "id": "6f8cbc02-8a8e-4368-83fe-e0fe6aa8c1db",
        "username": "Petr",
        "age": 34,
        "hobbies": [
            "photography",
            "gym"
        ]
    },
    {
        "id": "0fd855aa-c33d-4430-bfd3-7d8f607c420e",
        "username": "Ivan",
        "age": 20,
        "hobbies": [
            "auto",
            "travelling"
        ]
    }
]
```

#### `/api/users/:id` (GET) - response example:
```json
{
    "id": "6f8cbc02-8a8e-4368-83fe-e0fe6aa8c1db",
    "username": "Petr",
    "age": 34,
    "hobbies": [
        "photography",
        "gym"
    ]
}
```

#### `/api/users` (POST):
Request example:
```json
{
    "username": "semen",
    "age": 100,
    "hobbies": ["drink", "eat"]
}
```

Response example:
```json
true
```

#### `/api/users/:id` (PUT):
Request example:
```json
{
    "username": "semen",
    "age": 100,
    "hobbies": ["drink", "eat"]
}
```

Response example:
```json
true
```

#### `/api/users/:id` (DELETE) - response example:
```json
true
```

## License

[MIT](https://choosealicense.com/licenses/mit/)