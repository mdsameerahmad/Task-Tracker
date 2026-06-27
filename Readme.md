# 🚀 Task Tracker - MERN Stack Application

<div align="center">

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-darkgreen?logo=mongodb)
![Vite](https://img.shields.io/badge/Vite-Latest-purple?logo=vite)
![License](https://img.shields.io/badge/License-MIT-blue)

A modern **Full Stack Task Management Application** built using the **MERN Stack** that enables users to efficiently create, manage, update, search, filter, and organize tasks with a responsive and user-friendly interface.

</div>

---

# 📑 Table of Contents

* Project Overview
* Features
* Technology Stack
* System Architecture
* Application Workflow
* Folder Structure
* Frontend Architecture
* Backend Architecture
* Database Schema
* REST API Endpoints
* Installation
* Environment Variables
* Running the Project
* Build for Production
* Screenshots
* Future Improvements
* License

---

# 📖 Project Overview

Task Tracker is a production-ready full-stack application built using the MERN Stack.

The application allows users to

* Create Tasks
* Edit Tasks
* Delete Tasks
* View Tasks
* Filter Tasks
* Sort Tasks
* Search Tasks
* Track Task Status
* Manage Task Priority
* Set Due Dates

The project follows modern software engineering practices including

* Modular Architecture
* RESTful APIs
* Reusable Components
* Responsive Design
* MongoDB Data Persistence
* Clean Folder Structure
* Scalable Codebase

---

# ✨ Features

## Core Features

* Create Task
* Read Tasks
* Update Task
* Delete Task
* Responsive UI
* Dynamic Updates without Page Refresh
* REST API Integration
* MongoDB Storage
* Form Validation
* Error Handling
* Loading Indicators

## Advanced Features

* Search Tasks
* Filter by Status
* Filter by Priority
* Sort Tasks
* Statistics Dashboard
* Toast Notifications
* Confirmation Dialogs
* Reusable Components
* Environment Variables

---

# 🛠 Technology Stack

## Frontend

* React.js
* Vite
* React Router DOM
* Axios
* CSS

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Helmet
* Morgan
* CORS
* dotenv

---

# 🏗 System Architecture

```text
                    +-----------------------+
                    |       User            |
                    +-----------+-----------+
                                |
                                |
                        HTTP Requests
                                |
                                ▼
                 +----------------------------+
                 |     React Frontend         |
                 |        (Vite)              |
                 +-------------+--------------+
                               |
                        Axios REST API
                               |
                               ▼
                 +----------------------------+
                 |      Express Server        |
                 |      Node.js Backend       |
                 +-------------+--------------+
                               |
                    Mongoose ODM
                               |
                               ▼
                 +----------------------------+
                 |        MongoDB             |
                 |      Task Collection       |
                 +----------------------------+
```

---

# 🔄 Application Workflow

```text
User
 │
 ▼
React UI
 │
 ▼
Form Validation
 │
 ▼
Axios API Request
 │
 ▼
Express Route
 │
 ▼
Controller
 │
 ▼
Validation
 │
 ▼
MongoDB Model
 │
 ▼
Database
 │
 ▼
API Response
 │
 ▼
Frontend Update
 │
 ▼
UI Refresh (Without Reload)
```

---

# 📂 Project Structure

```text
Task-Tracker
│
├── client
│   ├── public
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── pages
│   │   ├── hooks
│   │   ├── services
│   │   ├── utils
│   │   ├── constants
│   │   ├── styles
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── .env.example
│
├── server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── validators
│   ├── services
│   ├── utils
│   ├── constants
│   ├── app.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── README.md
└── .gitignore
```

---

# 🎨 Frontend Architecture

```text
Pages
 │
 ▼
Reusable Components
 │
 ▼
React Hooks
 │
 ▼
Axios Service Layer
 │
 ▼
REST API
```

---

# ⚙ Backend Architecture

```text
Express Server
 │
 ▼
Routes
 │
 ▼
Controllers
 │
 ▼
Validation
 │
 ▼
Business Logic
 │
 ▼
MongoDB Model
 │
 ▼
Database
```

---

# 🗄 Database Schema

```text
Task
│
├── _id
├── title
├── description
├── status
├── priority
├── dueDate
├── createdAt
└── updatedAt
```

---

# 🌐 REST API

| Method | Endpoint       | Description    |
| ------ | -------------- | -------------- |
| GET    | /api/tasks     | Get all tasks  |
| GET    | /api/tasks/:id | Get task by ID |
| POST   | /api/tasks     | Create task    |
| PUT    | /api/tasks/:id | Update task    |
| DELETE | /api/tasks/:id | Delete task    |

---

# 🔐 Environment Variables

## Backend

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=development
```

## Frontend

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

# 💻 Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/task-tracker.git
cd task-tracker
```

---

## Backend Setup

```bash
cd server
npm install
```

Run

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd client
npm install
```

Run

```bash
npm run dev
```

---

# 🚀 Production Build

Frontend

```bash
cd client
npm run build
```

Backend

```bash
cd server
npm start
```

---

# 📸 Screenshots

```
Home Dashboard

Task List

Create Task Modal

Edit Task Modal

Delete Confirmation

Responsive Mobile View
```

(Add screenshots here)

---

# 📈 Future Improvements

* User Authentication
* JWT Authorization
* Dark Mode
* Task Categories
* Drag & Drop
* Calendar View
* Email Notifications
* File Attachments
* Team Collaboration
* Activity Logs
* Pagination
* Docker Support
* Unit Testing
* CI/CD Pipeline

---

# 📋 Assignment Requirements Completed

* React Frontend
* Express Backend
* MongoDB Integration
* REST APIs
* Full CRUD Operations
* Form Validation
* Responsive Design
* Dynamic Updates Without Page Refresh
* Search
* Filtering
* Sorting
* Reusable Components
* Environment Variables
* Clean Project Structure
* Error Handling
* Loading States

---

# 👨‍💻 Author

**Md Sameer Ahmad**

Full Stack Developer

---

# 📄 License

This project is developed for the **COLL-EDGE CONNECT Full Stack Developer Intern Technical Assignment** and is intended for educational and evaluation purposes...