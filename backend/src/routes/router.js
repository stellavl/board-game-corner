import { Router } from 'express';
import login from './login-route.js';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API!' });
});

router.use('/', login);

export default router;
