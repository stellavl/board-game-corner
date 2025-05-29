import { Router } from 'express';
import login from './login-route.js';
import userRoute from "./user-route.js";
import adminRoute from "./admin-route.js";
import boardGameRoute from './board-game-route.js';
import cafeRoutes from "./cafe-route.js";
import reservationRoute from './reservation-route.js';

const router = Router();

router.use('/', login);
router.use('/', userRoute);
router.use('/', adminRoute);
router.use('/', boardGameRoute);
router.use("/", cafeRoutes);
router.use("/", reservationRoute);

export default router;
