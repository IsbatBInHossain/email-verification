# Email Verification

A simple authentication system using Vue.js for the frontend, Express.js for the backend API, and MongoDB as the database.

## Installation

    - Clone the repository:

      `git clone https://github.com/yourusername/your-repo.git`

    - Navigate to the project directory:

      `cd your-repo`

    - Install dependencies:
      `npm install`

## Configuration

Create a .env file in the backend directory and add the following:

```
  MONGODB_URI=your-mongodb-connection-string
  JWT_SECRET=your-jwt-secret
  FRONTEND_URL=http://localhost:8080
  EMAIL_USER=your-email-username
  EMAIL_PASS=your-email-password
  PORT=3000
  VITE_BACKEND_URL=http://localhost:3000
```

    - "MONGODB_URI": MongoDB connection string
    - "JWT_SECRET": Secret for JWT token generation
    - "FRONTEND_URL": URL for the frontend application
    - "EMAIL_USER": Email username for sending verification emails
    - "EMAIL_PASS": Email password (use App password for Gmail)
    - "PORT": Port for the backend server
    - "VITE_BACKEND_URL": Backend URL for the frontend (Vite-specific)

## Running the Application

    Start the development server:
      `npm run start`

This will simultaneously start frontend and backend server. Visit http://localhost:5173 in your browser to access the application.

## Tech Stack

    Frontend:
        Vue.js

    Backend:
        Express.js
        MongoDB

    Email Service:
        Nodemailer
