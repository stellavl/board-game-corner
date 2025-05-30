import { Router } from 'express';
import { login } from '../controllers/login-controller.js';

const router = Router();

router.post('/login', login);

console.log("Loaded login routes");

export default router;
