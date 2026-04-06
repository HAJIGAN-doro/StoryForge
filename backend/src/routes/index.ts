import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    name: 'Apstory API',
    version: '0.1.0',
    status: 'running',
  });
});

export default router;
