import { body, validationResult } from 'express-validator';

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};

export const validateRegister = [
  body('email').isEmail().withMessage('Must be a valid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  handleValidationErrors,
];

export const validateLogin = [
  body('email').isEmail().withMessage('Must be a valid email address'),
  body('password').notEmpty().withMessage('Password is required'),
  handleValidationErrors,
];

export const validateBook = [
  body('title').notEmpty().withMessage('Title is required'),
  body('author').isMongoId().withMessage('Author must be a valid Mongo ID'),
  handleValidationErrors,
];