# Task Tracker Frontend

A React + Vite frontend for the Task Tracker application.

## Features
- Task list display
- Task creation and editing
- Task completion toggling
- Task deletion
- REST API integration with the backend
- Client-side routing with React Router

## Requirements
- Node.js 18+ recommended
- npm

## Install
```bash
cd client
npm install
```

## Run locally
```bash
cd client
npm run dev
```

Open the local development URL shown in the terminal, usually `http://localhost:5173`.

## Build for production
```bash
cd client
npm run build
```

## Preview production build
```bash
cd client
npm run preview
```

## Configuration
- The frontend uses Vite.
- The React app entry point is `src/main.jsx`.
- Static application shell is served from `client/index.html`.

If the frontend needs to call the backend API, configure the base URL in the app service layer or environment variables as appropriate.

## Project structure
- `src/` - React application source code
  - `App.jsx` - main app component
  - `main.jsx` - React root bootstrap
  - `pages/` - page components
  - `components/` - reusable UI components
  - `services/` - API service wrappers
  - `styles/` - CSS files

## Notes
- If Vite reports a 404 or cannot start, verify `client/index.html` exists and is at the repository root of the frontend.
- If you change dependencies, rerun `npm install`.
