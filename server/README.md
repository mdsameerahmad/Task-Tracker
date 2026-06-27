# Task Tracker Backend

Express + MongoDB backend for the Task Tracker application.

## Features
- REST API for tasks
- MongoDB persistence with Mongoose
- CORS support
- HTTP request logging with Morgan
- Security headers via Helmet
- Centralized error handling

## Requirements
- Node.js 18+ recommended
- npm
- MongoDB connection string

## Install
```bash
cd server
npm install
```

## Configuration
Create a `.env` file in the `server/` directory with the following contents:

```env
MONGODB_URI=mongodb://localhost:27017/task-tracker
PORT=5000
```

Alternatively, use `server/.env.example` as a template.

## Run locally
```bash
cd server
npm run dev
```

## Start production server
```bash
cd server
npm start
```

## API Endpoints
- `GET /api/tasks` - list tasks
- `POST /api/tasks` - create a task
- `GET /api/tasks/:id` - get task details
- `PUT /api/tasks/:id` - update a task
- `DELETE /api/tasks/:id` - delete a task

## Project structure
- `server.js` - entry point
- `app.js` - Express app configuration and middleware
- `routes/` - Express route definitions
- `controllers/` - request handlers
- `models/` - Mongoose schemas
- `config/` - database and environment configuration helpers
- `middleware/` - custom middleware for error handling and request validation
- `services/` - application logic and data services
- `validators/` - request validation logic

## Notes
- The server expects `MONGODB_URI` to be provided when it starts.
- If startup fails with `MONGODB_URI is required`, confirm `.env` exists and is loaded correctly.
- The API server defaults to port `5000` when `PORT` is not set.
