import { EventEmitter } from "events";
EventEmitter.defaultMaxListeners = 20;

import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoute from './routes/postRoutes.js'
import authRoute from './routes/authRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//MIDDLEWARE
app.use(express.json());
const allowedOrigins = [
  process.env.CLIENT_URL,         // your main production domain
  /\.netlify\.app$/,              // all Netlify preview deploys
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // allow non-browser clients

      const allowed = allowedOrigins.some((o) =>
        typeof o === "string" ? o === origin : o.test(origin)
      );

      if (allowed) {
        callback(null, true);
      } else {
        callback(new Error(`CORS error: Origin ${origin} not allowed`));
      }
    },
    credentials: true,
  })
);


//MONGO CONNECTION
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DATABASE CONNECTED"))
    .catch((err) => console.log(err));

//ROUTES
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);

//RENDER
app.get('/', (req, res) =>{
    res.send('❤️❤️InkStack-Backend❤️❤️');
})

//LISTEN
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});