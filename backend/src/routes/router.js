import { Router } from 'express';
import loginPersonal from './login-route.js';
import loginAdmin from './login-route.js';
import userRoute from "./user-route.js";
import adminRoute from "./admin-route.js";

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API!' });
});

router.use('/', loginPersonal);
router.use('/', loginAdmin);
router.use('/', userRoute);
router.use('/', adminRoute);


export default router;
