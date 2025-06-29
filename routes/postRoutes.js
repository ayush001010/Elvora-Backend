import express from 'express';
import { createPost, getAllPosts, getPostBySlug, getMyPosts, updatePost, deletePost } from '../controllers/postController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const route = express.Router();

//ALL
route.get("/all", getAllPosts);

// CREATE
route.post('/create', authMiddleware, createPost);

// USER ACCESS
route.get("/user", authMiddleware, getMyPosts);

// READ
route.get('/:slug', getPostBySlug);

//UPDATE
route.put('/:slug', authMiddleware, updatePost);

//DELETE
route.delete('/:slug', authMiddleware, deletePost);

export default route;