import express from "express";
import { createReservationController } from "../controllers/reservation-controller.js";

const router = express.Router();

router.post("/reservations", createReservationController);

export default router;