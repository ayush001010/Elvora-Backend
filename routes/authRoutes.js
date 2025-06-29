import express from 'express';
import { register, login } from '../controllers/authController.js';

const route = express.Router();

// REGISTER
route.post('/register', register);

// LOGIN 
route.post('/login', login);

export default route;