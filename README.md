
# Elvora Blog Backend

This is the backend for **Elvora**, a blogging platform allowing admin users to create, update, delete, and fetch blog posts with SEO-friendly slugs. The backend is built with **Node.js**, **Express**, and **MongoDB (Mongoose)**.

---

## 🚀 Features

- 🧠 SEO-friendly slugs from post titles
- 📄 CRUD APIs for blog posts
- 🌐 MongoDB Atlas integration
- 🔐 Admin-only protected routes
- ✨ Timestamps and post metadata

---

## 🛠️ Technologies Used

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [Slugify](https://www.npmjs.com/package/slugify)

---
## 📦 Installation
```bash
  cd backend
  npm install
  npm run dev

```

---

## 🔌 API Endpoints

| Method | Endpoint                | Description               |
|--------|-------------------------|---------------------------|
| POST   | `/api/posts/create`     | Create a new blog post    |
| GET    | `/api/posts/:slug`      | Get post by slug          |
| PUT    | `/api/posts/:slug`      | Edit a post               |
| DELETE | `/api/posts/:slug`      | Delete a post             |
| GET    | `/api/posts/all`        | Get all posts (admin)     |

---

## ⚙️ Environment Variables

```bash
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/elvora
JWT_SECRET=your_secret_key
```

---

## 🔐 Authentication
  Basic middleware restricts access to certain routes. You can enhance this using JWT for production-grade security.

---

## ☁️ Deployment
  - Server: Render, Railway, or your preferred Node hosting.
  - Database: MongoDB Atlas

---

## 😋 Elvora Frontend
🔗 [Live Site Elevora - the blogging webapp](https://github.com/ayush001010/Elvora-Frontend.git)



