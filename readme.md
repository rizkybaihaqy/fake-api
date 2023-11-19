# FAKE API

Opinionated fake REST API for testing purposes.

## The Routes

### Response

#### Success

```json
{
  "data": {
    /* ... */
  },
  "ok": false,
  "timeStamp": "2023-11-19T19:03:17.793Z"
}
```

#### Error

```json
{
  "error": {
    "status": 400,
    "message": "..."
  },
  "ok": false,
  "timeStamp": "2023-11-19T19:03:17.793Z"
}
```

### User

#### GET `/users/:id`

```json
{
  "id": "t7k5lqkD_0kw8A5eG8har",
  "username": "john_doe",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john_doe@mail.com",
  "password": "try_admin",
  "avatar": "https://.../avatar/240.jpg",
  "createdAt": "2023-04-02T00:29:10.380Z"
}
```

#### GET `/users?limit=10&page=1&username=''`

```json
{
  "users": [
    {
      /* ... */
    }
    /* ... */
  ],
  "limit": 10,
  "total": 9007199254740991,
  "page": {
    "total": 900719925474100,
    "current": 1
  }
}
```

#### POST `/users`

#### Request

```json
{
  "username": "john_doe",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john_doe@mail.com",
  "password": "try_admin",
  "avatar": "https://.../avatar/240.jpg"
}
```

#### Response

```json
{
  "id": "tLcLj2JbPUGk0j0cm8CUu",
  "username": "john_doe",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john_doe@mail.com",
  "password": "try_admin",
  "avatar": "https://.../avatar/240.jpg",
  "createdAt": "2023-11-19T15:18:38.154Z"
}
```

#### PUT `/users/:id`

#### Request

```json
{
  "username": "john_doe",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john_doe@mail.com",
  "password": "try_admin",
  "avatar": "https://.../avatar/240.jpg"
}
```

#### Response

```json
{
  "id": "mjd0kwv0tr0wy_rub2kwv",
  "username": "john_doe",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john_doe@mail.com",
  "password": "try_admin",
  "avatar": "https://.../avatar/240.jpg",
  "createdAt": "2023-11-19T15:18:38.154Z"
}
```

#### DELETE `/users/:id`

```json
{
  "id": "aO0HW82V8J6hiGUwEv9yA"
}
```

### Note

#### GET `/users/:userId/notes/:notesId`

```json
{
  "note": {
    "id": "6SL_RKG6ks4DAfT2FXOqI",
    "note": "If we hack the program...",
    "userId": "CFiMBMmDSD3BReO3Tg8jU",
    "createdAt": "2023-08-19T21:11:28.214Z"
  },
  "user": {
    /* ... */
  }
}
```

#### GET `/users/:userId/notes?limit=10&page=1&note=''`

```json
{
  "user": {
    /* ... */
  },
  "notes": [
    {
      /* ... */
    }
  ],
  "limit": 10,
  "total": 9007199254740991,
  "page": {
    "total": 900719925474100,
    "current": 1
  }
}
```

#### GET `/notes?limit=10&page=1&note=''`

```json
{
  "notes": [
    {
      /* ... */
    }
  ],
  "limit": 10,
  "total": 9007199254740991,
  "page": {
    "total": 900719925474100,
    "current": 1
  }
}
```
