# FAKE API

Opinionated fake REST API for testing purposes.

## The Routes

- [Base URL](#base-url)
- [Response](#response)
  - [Success](#success)
  - [Error](#error)
- [User](#user)
  - [GET `/users/:id`](#get-usersid)
  - [GET `/users?limit=10&page=1&username=''`](#get-userslimit10page1username)
  - [POST `/users`](#post-users)
  - [PUT `/users/:id`](#put-usersid)
  - [DELETE `/users/:id`](#delete-usersid)
- [Note](#note)
  - [GET `/users/:userId/notes/:id`](#get-usersuseridnotesid)
  - [GET `/users/:id/notes?limit=10&page=1&note=''`](#get-usersidnoteslimit10page1note)
  - [POST `/users/:id/notes`](#post-usersidnotes)
  - [PUT `/users/:userId/notes/:id`](#put-usersuseridnotesid)
  - [DELETE `/users/:userId/notes/:id`](#delete-usersuseridnotesid)
  - [GET `/notes?limit=10&page=1&note=''`](#get-noteslimit10page1note)

### Base URL

`https://fakeapi-1-o3918279.deta.app/api/:seed/`

Set the `:seed` to any string you want. It will be used to generate the data. Change the `:seed` to get different data.

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

#### GET `/users/:userId/notes/:id`

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

#### GET `/users/:id/notes?limit=10&page=1&note=''`

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

#### POST `/users/:id/notes`

#### Request

```json
{
  "note": "He paved the way, we walk through it."
}
```

#### Response

```json
{
  "id": "tLcLj2JbPUGk0joCm8CUu",
  "note": "He paved the way, we walk through it.",
  "userId": "mJdj087htRBwy_rub2kwv",
  "createdAt": "2023-11-20T11:56:33.583Z"
}
```

#### PUT `/users/:userId/notes/:id`

#### Request

```json
{
  "note": "He paved the way, we'll walk through it."
}
```

#### Response

```json
{
  "id": "tLcLj2JbPUGk0j6cm8CUU",
  "note": "He paved the way, we'll walk through it.",
  "userId": "mjDjk22htGTwy_rub2kwv",
  "createdAt": "2023-05-27T21:33:21.902Z"
}
```

#### DELETE `/users/:userId/notes/:id`

```json
{
  "id": "tLcLj2JbPUGk0j0cm8CUU"
}
```

#### GET `/notes?limit=10&page=1&note=''`

```json
{
  "notes": [
    {
      /* ... */
      "user": {
        /* ... */
      }
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
