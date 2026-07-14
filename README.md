# CGPA Ledger — Full-Stack CGPA Calculator

A full-stack application for tracking semester GPA and overall CGPA, built with Vue 3 + Express.js + MongoDB.

## Project Structure

```
├── client/          Vue 3 + Vite frontend
│   └── src/
│       ├── api/          Axios instance with JWT interceptors
│       ├── composables/  useAuth, useAcademicRecord, useToast
│       ├── views/        Dashboard, Semesters, Profile, Settings, Login, Register
│       └── ...
└── server/          Express.js backend
    ├── models/      Mongoose schemas (User, Semester)
    ├── routes/      REST API (auth, semesters, profile)
    ├── middleware/  JWT authentication
    └── server.js    Entry point
```

## Getting Started

### Server

```bash
cd server
npm install
npm run dev      # http://localhost:3000
```

### Client

```bash
cd client
npm install
npm run dev      # http://localhost:5173
```

## Tech Stack

- **Frontend:** Vue 3, Vite, Vue Router 4, Axios
- **Backend:** Express.js, Mongoose, JWT, bcrypt
- **Database:** MongoDB Atlas

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Create account |
| POST | /api/auth/login | Sign in |
| GET | /api/profile | Get profile |
| PUT | /api/profile | Update profile |
| GET | /api/semesters | List all semesters |
| POST | /api/semesters | Create semester |
| PUT | /api/semesters/:id | Update semester |
| DELETE | /api/semesters/:id | Delete semester |
| POST | /api/semesters/:id/courses | Add course |
| PUT | /api/semesters/:id/courses/:courseId | Update course |
| DELETE | /api/semesters/:id/courses/:courseId | Delete course |
