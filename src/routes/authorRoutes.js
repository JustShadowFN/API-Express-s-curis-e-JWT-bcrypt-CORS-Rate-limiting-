import express from 'express';
import * as authorController from '../controllers/authorController.js';
import { auth } from '../middlewares/auth.js';
import { requireRole } from '../middlewares/roles.js';

const router = express.Router();

router.get('/', authorController.getAllAuthors);
router.get('/:id', authorController.getAuthorById);


router.post(
  '/',
  auth, 
  requireRole('admin'), 
  authorController.createAuthor
);

router.put(
  '/:id',
  auth,
  requireRole('admin'),
  authorController.updateAuthor
);

router.delete(
  '/:id',
  auth,
  requireRole('admin'),
  authorController.deleteAuthor
);

export default router;