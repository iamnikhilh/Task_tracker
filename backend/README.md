# Task Tracker Backend

A NestJS backend API for the Fast Secure Task Tracker application with MongoDB integration.

## Features

- 🔐 JWT Authentication
- 👤 User Registration & Login
- 📝 Task CRUD Operations
- 🛡️ Protected Routes
- 📊 MongoDB Integration
- ✅ Input Validation
- 🔒 Password Hashing

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Configuration

1. Copy `.env.example` to `.env`
2. Update the MongoDB connection string:
   - Sign up for [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a new cluster
   - Get your connection string
   - Replace the `MONGODB_URI` in `.env`

3. Update JWT secret:
   - Change `JWT_SECRET` to a secure random string

### 3. MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a free account
3. Create a new project
4. Build a database (choose free tier)
5. Create a database user
6. Add your IP address to the IP Access List
7. Get your connection string and update `.env`

### 4. Start the Server

```bash
# Development mode
npm run start:dev

# Production mode
npm run start:prod
```

The server will run on `http://localhost:3001`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user

### Tasks (Protected Routes)
- `GET /api/tasks` - Get all user tasks
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/:id` - Get a specific task
- `PATCH /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Request Examples

### Signup
```json
POST /api/auth/signup
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

### Login
```json
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Create Task
```json
POST /api/tasks
Authorization: Bearer <your-jwt-token>
{
  "title": "Complete project",
  "description": "Finish the task tracker application",
  "priority": "high",
  "status": "pending"
}
```

## Project Structure

```
backend/
├── src/
│   ├── auth/           # Authentication module
│   ├── tasks/          # Tasks module
│   ├── users/          # Users module
│   ├── app.module.ts   # Main app module
│   └── main.ts         # Application entry point
├── .env                # Environment variables
└── package.json        # Dependencies
```

## Technologies Used

- **NestJS** - Node.js framework
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Passport** - Authentication middleware
- **class-validator** - Input validation