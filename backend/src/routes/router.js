import { Router } from 'express';
import login from './login-route.js';
import userRoute from "./user-route.js";
import adminRoute from "./admin-route.js";

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API!' });
});

router.use('/', login);
router.use('/', userRoute);
router.use('/', adminRoute);


export default router;
