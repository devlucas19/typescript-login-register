# jwt-auth-fullstack

A full-stack authentication system built with Node.js, Express, TypeScript, React and MySQL. Covers the full auth flow — register, login, JWT-protected routes and basic account management.

---

## Stack

**Backend**
- Node.js + Express
- TypeScript
- MySQL2
- bcrypt
- jsonwebtoken
- express-rate-limit
- uuidv7

**Frontend**
- React + Vite
- TypeScript
- Axios
- React Router DOM

---

## Features

- User registration with input validation (email format, password length, duplicate check)
- Login with JWT authentication (1h expiration)
- Protected routes via auth middleware
- Email change on profile page
- Rate limiting on auth routes
- Centralized error handling
- Responsive UI with loading states and error feedback

---

## Project Structure

```
├── backend/
│   └── src/
│       ├── database/
│       ├── errors/
│       ├── middlewares/
│       ├── routes/
│       ├── userControllers/
│       └── utils/
│
└── frontend/
    └── src/
        └── Components/
            ├── Login.tsx
            ├── Register.tsx
            └── Profile.tsx
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- MySQL running locally

### Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=3000
DB_HOST=localhost
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=your_database
JWT_SECRET=your_generated_secret
```

To generate a secure JWT secret:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Start the server:

```bash
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## API Routes

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | `/signup` | ❌ | Register a new user |
| POST | `/signin` | ❌ | Login and receive JWT |
| GET | `/profile` | ✅ | Get authenticated user data |
| POST | `/changeEmail` | ✅ | Update user email |

Protected routes require the `Authorization: Bearer <token>` header.

---

## Notes

- Passwords are hashed with bcrypt (10 salt rounds)
- UUIDs are generated with uuidv7
- Auth routes are limited to 10 requests per 15 minutes
- The JWT payload only contains the user ID — no sensitive data
