import express from 'express';
import { register, login } from '../controllers/authController.js';
import { loginLimiter } from '../middlewares/rateLimiter.js';
import { validateRegister, validateLogin } from '../middlewares/validators.js';

const router = express.Router();

router.post('/register', validateRegister, register);

router.post('/login', loginLimiter, validateLogin, login);

export default router;