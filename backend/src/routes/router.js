import { Router } from 'express';
// import login from './login-route.js';
import userRoute from "./user-route.js";
// import adminRoute from "./admin-route.js";
// import boardGameRoute from './board-game-route.js';
// import cafeRoutes from "./cafe-route.js";
// import reservationRoute from './reservation-route.js';

const router = Router();

// console.log("Mounting login routes");
// router.use('/', login);
console.log("Mounting user routes");
router.use('/', userRoute);
// console.log("Mounting admin routes");
// router.use('/', adminRoute);
// console.log("Mounting board game routes");
// router.use('/', boardGameRoute);
// console.log("Mounting cafe routes");
// router.use("/", cafeRoutes);
// console.log("Mounting reservation routes");
// router.use("/", reservationRoute);

export default router;