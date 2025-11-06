// src/routes/index.js
import express from 'express';
import authRoutes from './authRoutes.js';
import authorRoutes from './authorRoutes.js';
import bookRoutes from './bookRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/authors', authorRoutes);
router.use('/books', bookRoutes);

export default router;