# URL Shortener

A full-stack URL Shortener application built with the MERN stack. Users can register, log in securely, shorten long URLs, manage their links, and track basic analytics.

## Features

- User Authentication (JWT + HTTP-only Cookies)
- Password Hashing using bcrypt
- Generate unique short URLs
- Redirect to original URLs
- Track click count
- Track last visited timestamp
- View all URLs created by the logged-in user
- Edit custom URL alias
- Delete shortened URLs
- URL normalization to avoid duplicate entries
- Route protection using authentication middleware
- Rate limiting to prevent API abuse and brute-force attacks

---

## Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- express-rate-limit
- normalize-url
- cookie-parser
- dotenv

### Frontend

- React
- Vite
- Axios
- React Router DOM

---

## Project Structure

```
backend/
│
├── middleware/
├── models/
├── routes/
├── app.js
└── .env

frontend/
│
├── src/
├── components/
├── pages/
└── App.jsx
```

---

## Authentication

- User Registration
- User Login
- JWT Token Generation
- HTTP-only Cookie Storage
- Protected Routes using Middleware

---

## Rate Limiting

Implemented using **express-rate-limit** to protect sensitive endpoints from abuse.

Current configuration:

- Maximum **5 requests**
- Per **5 minutes**
- Returns **HTTP 429 (Too Many Requests)** when the limit is exceeded

This helps protect against:

- Brute-force login attacks
- API abuse
- Spam URL generation
- Denial-of-Service (DoS) attempts

---

## URL Analytics

Each shortened URL stores:

- Original URL
- Short URL
- Owner
- Click Count
- Last Visited Timestamp

---

## API Endpoints

### Authentication

| Method | Endpoint |
|--------|----------|
| POST | `/api/users/register` |
| POST | `/api/users/login` |
| POST | `/api/users/logout` |

### URLs

| Method | Endpoint |
|--------|----------|
| POST | `/api/urls` |
| GET | `/api/urls/myurls` |
| GET | `/api/urls/:shorturl` |
| PUT | `/api/urls/edit/:shorturl` |
| DELETE | `/api/urls/:id` |

---

## Concepts Learned

- REST API Development
- JWT Authentication
- Cookie-based Authentication
- Password Hashing
- CRUD Operations
- MongoDB Relationships
- Express Middleware
- Route Protection
- URL Normalization
- Rate Limiting
- React and Express Integration

---

## Future Improvements

- Redis-based Rate Limiting
- Redis Caching
- QR Code Generation
- Custom Expiration Dates
- URL Expiry
- Public Analytics Dashboard
- Docker Support
- CI/CD Pipeline
- Unit and Integration Testing

---

## Author

**Teja**
