import cors from 'cors';

export const corsMiddleware = cors({
  origin: process.env.NODE_ENV === 'production' ? false : ['http://localhost:5173'],
  credentials: true,
});
