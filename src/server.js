// src/server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from './config/db.js';
import globalRouter from './routes/index.js';
import { globalLimiter } from './middlewares/rateLimiter.js';

// Charger les variables d'environnement
dotenv.config();

// Connexion à la base de données
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares de sécurité
app.use(express.json()); // Parser le JSON
app.use(helmet()); // Sécurise les en-têtes HTTP 

// Configuration CORS [cite: 34, 95]
const corsOptions = {
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173', // Autoriser le front [cite: 97]
  credentials: true,
};
app.use(cors(corsOptions));

// Logs (morgan) [cite: 38]
app.use(morgan('dev'));

// Rate Limiting Global [cite: 35, 100]
app.use(globalLimiter);

// Routes principales
app.use('/api', globalRouter);

// Route de santé [cite: 61]
app.get('/api/status', (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Middleware de gestion d'erreurs centralisé [cite: 105]
app.use((err, req, res, next) => {
  console.error(err.stack);
  // Masquer les messages d'erreur sensibles en production [cite: 38]
  const statusCode = err.statusCode || 500;
  const message = (process.env.NODE_ENV === 'production' && statusCode === 500) 
    ? 'Internal Server Error' 
    : err.message || 'Something broke!';
    
  res.status(statusCode).json({
    error: message,
    code: statusCode
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});