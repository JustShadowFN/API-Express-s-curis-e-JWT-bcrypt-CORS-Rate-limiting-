import rateLimit from 'express-rate-limit'; 

// Limiteur global 
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 200, 
  message: 'trop de requêtes venant de cette IP, veuillez réessayer plus tard',
  standardHeaders: true,
  legacyHeaders: false,
});

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 10, 
  message: 'trop de tentatives de connexion, veuillez réessayer après 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
});