import { Router } from 'express';
import { loginPersonal, loginAdmin } from '../controllers/login-controller.js';

const router = Router();

router.post('/login/personal', loginPersonal);
router.post('/login/admin', loginAdmin);

export default router;
