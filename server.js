import { EventEmitter } from "events";
EventEmitter.defaultMaxListeners = 20;

import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import postRoute from "./routes/postRoutes.js";
import authRoute from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to log origin (for debugging)
app.use((req, res, next) => {
  console.log("Request Origin:", req.headers.origin);
  next();
});

// CORS setup
const allowedOrigins = [process.env.CLIENT_URL];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed for this origin"));
      }
    },
    credentials: true,
  })
);

// JSON parser
app.use(express.json());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

// Test Route
app.get("/", (req, res) => {
  res.send("❤️ InkStack Backend is running ❤️");
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Server Start
app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});
