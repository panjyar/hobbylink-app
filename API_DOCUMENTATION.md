# API Documentation

## Base URL
```
http://localhost:3000/api
```

## Authentication
No authentication required for this application.

## Endpoints

### 1. Get All Users
```http
GET /api/users
```

**Response:**
```json
[
  {
    "id": "uuid-string",
    "username": "john_doe",
    "age": 25,
    "hobbies": ["reading", "gaming"],
    "friends": ["friend-uuid-1", "friend-uuid-2"],
    "createdAt": "2024-01-01T00:00:00.000Z",
    "popularityScore": 3.5
  }
]
```

### 2. Create User
```http
POST /api/users
Content-Type: application/json

{
  "username": "john_doe",
  "age": 25,
  "hobbies": ["reading", "gaming"]
}
```

**Response:**
```json
{
  "id": "uuid-string",
  "username": "john_doe",
  "age": 25,
  "hobbies": ["reading", "gaming"],
  "friends": [],
  "createdAt": "2024-01-01T00:00:00.000Z",
  "popularityScore": 0
}
```

**Error Responses:**
- `400`: Validation errors
- `500`: Internal server error

### 3. Update User
```http
PUT /api/users/:id
Content-Type: application/json

{
  "username": "john_doe_updated",
  "age": 26,
  "hobbies": ["reading", "gaming", "cooking"]
}
```

**Response:**
```json
{
  "id": "uuid-string",
  "username": "john_doe_updated",
  "age": 26,
  "hobbies": ["reading", "gaming", "cooking"],
  "friends": [],
  "createdAt": "2024-01-01T00:00:00.000Z",
  "popularityScore": 0
}
```

**Error Responses:**
- `400`: Validation errors
- `404`: User not found
- `500`: Internal server error

### 4. Delete User
```http
DELETE /api/users/:id
```

**Response:**
```json
{
  "message": "User deleted successfully"
}
```

**Error Responses:**
- `404`: User not found
- `409`: Cannot delete user with active friendships
- `500`: Internal server error

### 5. Link Users (Create Friendship)
```http
POST /api/users/:id/link
Content-Type: application/json

{
  "friendId": "friend-uuid"
}
```

**Response:**
```json
{
  "message": "Users linked successfully"
}
```

**Error Responses:**
- `400`: Friend ID is required
- `404`: User or friend not found
- `409`: Users are already friends / Cannot link user to themselves
- `500`: Internal server error

### 6. Unlink Users (Remove Friendship)
```http
DELETE /api/users/:id/unlink
Content-Type: application/json

{
  "friendId": "friend-uuid"
}
```

**Response:**
```json
{
  "message": "Users unlinked successfully"
}
```

**Error Responses:**
- `400`: Friend ID is required
- `404`: User or friend not found
- `500`: Internal server error

### 7. Get Graph Data
```http
GET /api/graph
```

**Response:**
```json
{
  "nodes": [
    {
      "id": "uuid-string",
      "username": "john_doe",
      "age": 25,
      "popularityScore": 3.5
    }
  ],
  "edges": [
    {
      "source": "user-uuid-1",
      "target": "user-uuid-2"
    }
  ]
}
```

### 8. Health Check
```http
GET /health
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "development"
}
```

## Error Response Format

All error responses follow this format:

```json
{
  "success": false,
  "error": "Error message",
  "stack": "Error stack trace (development only)"
}
```

## HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request - Validation errors |
| 404 | Not Found - Resource doesn't exist |
| 409 | Conflict - Business rule violation |
| 500 | Internal Server Error |

## Business Rules

### Popularity Score Calculation
```
popularityScore = number of unique friends + (total hobbies shared with friends × 0.5)
```

### Deletion Rules
- Users cannot be deleted while still connected as friends to others
- Must unlink all friendships before deletion

### Friendship Rules
- Users cannot be friends with themselves
- Mutual friendships are treated as single relationships
- Circular friendships are prevented

## Rate Limiting
No rate limiting implemented in this version.

## CORS
CORS is enabled for frontend URL (configurable via environment variables).

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 3000 |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/user-network |
| `FRONTEND_URL` | Frontend URL for CORS | http://localhost:3000 |
| `NODE_ENV` | Environment | development |
