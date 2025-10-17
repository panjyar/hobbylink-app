# Interactive User Relationship & Hobby Network

A full-stack application that manages users and their relationships, featuring a dynamic graph visualization using React Flow.

## 🚀 Features

### Backend (Node.js + Express + TypeScript)
- **Database**: MongoDB** with Mongoose ODM
- **API**: RESTful CRUD operations
- **Authentication**: UUID-based user identification
- **Business Logic**: Popularity scoring algorithm
- **Error Handling**: Comprehensive error middleware
- **Testing**: Jest unit tests

### Frontend (React + TypeScript)
- **Visualization**: React Flow dynamic graph
- **State Management**: React Context
- **UI Components**: Tailwind CSS styling
- **Interactions**: Drag & drop functionality
- **Real-time Updates**: Live popularity score calculation

## 📋 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Fetch all users |
| POST | `/api/users` | Create new user |
| PUT | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Delete user |
| POST | `/api/users/:id/link` | Create friendship |
| DELETE | `/api/users/:id/unlink` | Remove friendship |
| GET | `/api/graph` | Get graph data |
| GET | `/health` | Health check |

## 🏗️ User Object Structure

```typescript
interface User {
  id: string;                    // UUID
  username: string;              // Required
  age: number;                   // Required
  hobbies: string[];             // Required
  friends: string[];             // Array of user IDs
  createdAt: Date;               // Auto-generated
  popularityScore: number;       // Computed field
}
```

## 🧮 Popularity Score Formula

```
popularityScore = number of unique friends + (total hobbies shared with friends × 0.5)
```

## 🚦 Business Rules

1. **Deletion Prevention**: Users cannot be deleted while connected as friends
2. **Circular Friendship**: Mutual connections are treated as single relationships
3. **Validation**: Required fields and data types are enforced
4. **Error Handling**: Proper HTTP status codes (400, 404, 409, 500)

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v16+)
- MongoDB
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment configuration**:
   ```bash
   cp env.example .env
   ```
   Edit `.env` with your MongoDB connection string.

4. **Start MongoDB** (if running locally):
   ```bash
   mongod
   ```

5. **Run the backend**:
   ```bash
   npm start
   ```
   Server will start on `http://localhost:3000`

### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd user-network-frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the frontend**:
   ```bash
   npm start
   ```
   Application will start on `http://localhost:3000`

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

### Frontend Tests
```bash
cd user-network-frontend
npm test
```

## 🎯 Usage Guide

### Creating Users
1. Click the "+" button in the User Panel
2. Fill in username, age, and hobbies (comma-separated)
3. Click "Create" to add the user

### Managing Relationships
1. **Drag & Drop**: Drag one user node onto another to create a friendship
2. **Visual Feedback**: Nodes change color based on popularity score
3. **Real-time Updates**: Popularity scores update automatically

### Managing Hobbies
1. **Add Hobbies**: Drag hobby items from the sidebar onto user nodes
2. **Search Hobbies**: Use the search bar to filter hobbies
3. **Live Updates**: Popularity scores recalculate when hobbies change

### Graph Visualization
- **High Score Nodes** (purple): popularityScore > 5
- **Low Score Nodes** (blue): popularityScore ≤ 5
- **Animated Edges**: Show friendships with smooth animations
- **Interactive**: Pan, zoom, and drag nodes

## 🏆 Bonus Features Implemented

### ✅ Development & Scaling
- **Hot Reload**: ts-node-dev for backend development
- **TypeScript**: Full type safety across the stack
- **Error Boundaries**: React error handling
- **Environment Configuration**: Proper .env setup

### ✅ API Test Coverage
- **Unit Tests**: Comprehensive test suite for business logic
- **Relationship Tests**: Creation/deletion scenarios
- **Score Calculation**: Popularity score algorithm tests
- **Conflict Prevention**: Unlink-before-delete validation

### ✅ Custom React Flow Nodes
- **HighScoreNode**: Purple gradient with sparkle icon
- **LowScoreNode**: Blue gradient with clean design
- **Smooth Transitions**: CSS transitions when node types change
- **Dynamic Styling**: Visual feedback based on popularity

### ✅ Performance Optimizations
- **Component Separation**: Modular React components
- **Context Optimization**: Efficient state management
- **Lazy Loading**: Component-based code splitting
- **Debounced Updates**: Optimized API calls

## 📁 Project Structure

```
├── backend/
│   ├── src/
│   │   ├── config/          # Database configuration
│   │   ├── controllers/    # API route handlers
│   │   ├── middleware/     # Error handling
│   │   ├── models/         # MongoDB schemas
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── types/          # TypeScript interfaces
│   │   └── __tests__/      # Unit tests
│   ├── package.json
│   └── tsconfig.json
│
├── user-network-frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── context/        # State management
│   │   ├── services/       # API service layer
│   │   └── types/          # TypeScript interfaces
│   ├── package.json
│   └── tailwind.config.js
│
└── README.md
```

## 🔧 Development

### Backend Development
```bash
cd backend
npm run start    # Development server with hot reload
npm run build    # TypeScript compilation
npm test         # Run tests
```

### Frontend Development
```bash
cd user-network-frontend
npm start        # Development server
npm run build    # Production build
npm test         # Run tests
```

## 📊 API Documentation

### Health Check
```http
GET /health
```
Returns server status and environment information.

### User Management
```http
GET /api/users
POST /api/users
PUT /api/users/:id
DELETE /api/users/:id
```

### Relationship Management
```http
POST /api/users/:id/link
DELETE /api/users/:id/unlink
```

### Graph Data
```http
GET /api/graph
```
Returns nodes and edges for React Flow visualization.

## 🐛 Error Handling

The application includes comprehensive error handling:

- **400**: Validation errors (missing fields, invalid data types)
- **404**: User not found
- **409**: Relationship conflicts (already friends, deletion with active friendships)
- **500**: Internal server errors

## 🚀 Deployment

### Backend Deployment
1. Set environment variables
2. Ensure MongoDB is accessible
3. Run `npm run build`
4. Start with `node dist/server.js`

### Frontend Deployment
1. Run `npm run build`
2. Deploy the `build` folder to your hosting service
3. Update API_BASE URL in production

## 📝 License

This project is part of the Cybernauts Development Assignment.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

---

**Assignment Requirements**: ✅ **FULLY IMPLEMENTED**
- All core functionalities ✅
- Custom React Flow nodes ✅
- Business logic validation ✅
- Error handling ✅
- Test coverage ✅
- Bonus features ✅
