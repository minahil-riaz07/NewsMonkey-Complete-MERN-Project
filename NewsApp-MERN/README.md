# 📰 NewsMonkey – MERN Stack News Application

A full-stack news application built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js).

---

## 🚀 Features

### Frontend (React.js)
- 📰 Browse top headlines by **7 categories**: General, Business, Entertainment, Health, Science, Sports, Technology
- 🔍 **Search** news by keyword via the search bar
- ♾️ **Infinite Scroll** – auto-loads more articles as you scroll
- 🔖 **Bookmark articles** (login required)
- 💬 **Comment** on saved articles
- 👤 **User Profile** – update name & preferred categories
- 🔴 **Loading bar** with progress indicator
- 📱 Fully **responsive** (Bootstrap 5)

### Backend (Node.js + Express.js)
- 🔐 **JWT Authentication** – Register, Login, protected routes
- 🗞️ **News Proxy API** – Wraps NewsAPI so the API key stays server-side
- 🔖 **Saved Articles API** – Save, delete, and list bookmarks per user
- 💬 **Comments API** – Add/delete comments on saved articles
- 🛡️ **Rate Limiting** – Prevents API abuse
- ✅ **Input Validation** – express-validator on all POST routes

### Database (MongoDB + Mongoose)
- 👤 **User** model – name, email, hashed password, preferred categories
- 📌 **SavedArticle** model – per-user bookmarks with embedded comments
- 🔑 Compound index prevents duplicate saves

---

## 📁 Project Structure

```
NewsApp-MERN/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── middleware/
│   │   └── auth.js            # JWT protect middleware
│   ├── models/
│   │   ├── User.js            # User schema
│   │   └── SavedArticle.js    # Saved article + comments schema
│   ├── routes/
│   │   ├── auth.js            # /api/auth  (register, login, me, profile)
│   │   ├── news.js            # /api/news  (top-headlines, search)
│   │   └── saved.js           # /api/saved (CRUD + comments)
│   ├── .env                   # Environment variables
│   ├── package.json
│   └── server.js              # Express app entry point
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── NavBar.js          # Responsive navbar with search & auth
│   │   │   ├── News.js            # Category news feed (infinite scroll)
│   │   │   ├── NewsItem.js        # Single article card with bookmark
│   │   │   ├── Spinner.js         # Loading spinner
│   │   │   ├── Login.js           # Login form
│   │   │   ├── Register.js        # Registration form
│   │   │   ├── SavedArticles.js   # Bookmarks + comments page
│   │   │   ├── SearchResults.js   # Search results page
│   │   │   └── Profile.js         # User profile page
│   │   ├── context/
│   │   │   └── AuthContext.js     # Global auth state (React Context)
│   │   ├── App.js                 # Root component with routing
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
│
├── package.json      # Root – runs both servers concurrently
└── README.md
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js ≥ 16.x
- MongoDB (local) or MongoDB Atlas account
- NewsAPI key from https://newsapi.org

### 1. Clone & Install

```bash
# Install all dependencies at once
npm run install-all
```

Or manually:
```bash
# Root
npm install

# Backend
cd backend && npm install

# Frontend
cd ../frontend && npm install
```

### 2. Configure Environment

Edit `backend/.env`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/newsmonkey
JWT_SECRET=your_very_secret_key_here
NEWS_API_KEY=your_newsapi_key_here
NODE_ENV=development
```

For MongoDB Atlas, replace `MONGO_URI` with your connection string:
```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/newsmonkey
```

### 3. Run the Application

```bash
# From root – runs backend & frontend concurrently
npm run dev
```

Or separately:
```bash
# Terminal 1 – Backend (port 5000)
cd backend && npm run dev

# Terminal 2 – Frontend (port 3000)
cd frontend && npm start
```

### 4. Open the App
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api/health

---

## 🔌 API Endpoints

### Authentication `/api/auth`
| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| POST | `/register` | Create new user | Public |
| POST | `/login` | Login & get JWT | Public |
| GET | `/me` | Get current user | Private |
| PUT | `/profile` | Update name/preferences | Private |

### News `/api/news`
| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| GET | `/top-headlines` | Fetch headlines by category | Public |
| GET | `/search` | Search articles by keyword | Public |

Query params for `/top-headlines`: `country`, `category`, `page`, `pageSize`  
Query params for `/search`: `q`, `page`, `pageSize`, `sortBy`

### Saved Articles `/api/saved`
| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| GET | `/` | Get all saved articles | Private |
| POST | `/` | Save an article | Private |
| DELETE | `/:id` | Remove saved article | Private |
| POST | `/:id/comments` | Add comment | Private |
| DELETE | `/:id/comments/:commentId` | Delete comment | Private |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, React Router v6, Axios, React Toastify |
| Styling | Bootstrap 5, Custom CSS |
| Backend | Node.js, Express.js 4 |
| Database | MongoDB, Mongoose ODM |
| Auth | JWT (jsonwebtoken), bcryptjs |
| Validation | express-validator |
| Dev Tools | nodemon, concurrently |

---

## 📸 Pages Overview

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | General top headlines |
| Category | `/business` etc. | Category-specific news |
| Search | `/search?q=...` | Full-text news search |
| Login | `/login` | User authentication |
| Register | `/register` | New user signup |
| Saved | `/saved` | Bookmarked articles + comments |
| Profile | `/profile` | User settings |

---

## 👨‍💻 Authors

MERN Stack implementation – NewsMonkey Project

> **Note**: NewsAPI free tier only works on `localhost`. For production deployment, upgrade to a paid NewsAPI plan or use an alternative news source.
