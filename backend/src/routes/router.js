import { Router } from 'express';
import loginPersonal from './login-route.js';
import loginAdmin from './login-route.js';
import userRoute from "./user-route.js";
import adminRoute from "./admin-route.js";
import boardGameRoute from './board-game-route.js';
import cafeRoutes from "./cafe-route.js";

const router = Router();

router.use('/', loginPersonal);
router.use('/', loginAdmin);
router.use('/', userRoute);
router.use('/', adminRoute);
router.use('/', boardGameRoute);
router.use("/", cafeRoutes);

export default router;
