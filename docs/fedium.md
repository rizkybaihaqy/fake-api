# Fedium

Platform where your ideas meet the world.

## ERD

```mermaid
erDiagram
  USER {
    string id PK
    string firstName
    string lastName
    string email
    string password
    string avatar
    date createdAt
  }

  ARTICLE {
    string id PK
    string title
    string subtitle
    string body
    string image
    array[string] topics
    array[string] tags
    array[string] claps
    array[string] responses FK
    string author PK, FK
    date lastModifiedAt
  }

  RESPONSE {
    string id PK
    string body
    string author PK,FK
    date lastModifiedAt
  }

  USER ||--o{ ARTICLE : writes
  USER ||--o{ RESPONSE : writes
```

## End Points

- `GET /user/` - Get all users
- `GET /user/:id` - Get a user
- `GET /user/:id/articles` - Get all articles by user
- `GET /user/:id/articles/:id` - Get a article by user
