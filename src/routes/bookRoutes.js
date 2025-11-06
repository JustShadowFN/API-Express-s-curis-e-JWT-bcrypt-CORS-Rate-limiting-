import express from 'express';
import * as bookController from '../controllers/bookController.js';
import { auth } from '../middlewares/auth.js';
import { requireRole } from '../middlewares/roles.js';
import { validateBook } from '../middlewares/validators.js';

const router = express.Router();

router.get('/', bookController.getAllBooks); 
router.get('/:id', bookController.getBookById);


router.post(
  '/',
  auth, 
  validateBook, 
  bookController.createBook
);

router.put(
  '/:id',
  auth,
  requireRole('admin'), 
  validateBook,
  bookController.updateBook
);

router.delete(
  '/:id',
  auth,
  requireRole('admin'), 
  bookController.deleteBook
);

export default router;