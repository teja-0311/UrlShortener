# URL Shortener

A full-stack URL Shortener application built using React, Node.js, Express, and MongoDB.

Users can register, log in, shorten long URLs, track clicks, view visit history, edit aliases, and manage their shortened URLs through a clean dashboard.

---

##  Features

### Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes

### URL Management

* Create Short URLs
* Reuse Existing Short URLs for Duplicate URLs
* Delete URLs
* Edit Short URL Alias
* View Original URL

### Analytics

* Click Counter
* Last Visited Timestamp
* Automatic Redirect to Original URL

### Dashboard

* View All Personal URLs
* Sort URLs by Last Visited
* URL Statistics
* Responsive UI

---

##  Tech Stack

### Frontend

* React
* Vite
* React Router DOM
* Axios
* Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt
* normalize-url

---

##  Project Structure

```text
urlshortener/
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   └── App.jsx
│   │
│   └── package.json
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── app.js
│   └── package.json
│
└── README.md
```

---

##  Installation

### Clone Repository

```bash
git clone https://github.com/teja-0311/UrlShortener.git
cd UrlShortener
```

---

##  Backend Setup

Navigate to backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start backend server:

```bash
npm run dev
```

Server runs on:

```text
http://localhost:3000
```

---

##  Frontend Setup

Navigate to frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start frontend:

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

##  API Endpoints

### User Routes

#### Register

```http
POST /api/users/register
```

#### Login

```http
POST /api/users/login
```

---

### URL Routes

#### Create Short URL

```http
POST /api/urls
```

#### Get User URLs

```http
GET /api/urls/myurls
```

#### Edit URL Alias

```http
PUT /api/urls/edit/:shorturl
```

#### Delete URL

```http
DELETE /api/urls/:id
```

#### Redirect to Original URL

```http
GET /api/urls/:shorturl
```

---

##  Example

Original URL:

```text
https://www.google.com
```

Generated Short URL:

```text
http://localhost:3000/api/urls/a1b2c3d4
```

---

##  Features Implemented

* URL Shortening
* Duplicate URL Detection
* URL Click Tracking
* Last Visited Tracking
* User Authentication
* Protected Dashboard
* URL Deletion
* Alias Editing
* MongoDB Integration
* REST API Architecture

---

##  Future Enhancements

* QR Code Generation
* Custom Vanity URLs
* URL Expiration
* Advanced Analytics Dashboard
* Copy-to-Clipboard Button
* Dark Mode
* Public API Access
* Admin Dashboard


