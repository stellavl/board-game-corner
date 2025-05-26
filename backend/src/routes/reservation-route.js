import express from "express";
import { authenticateToken } from "../middleware/auth-middleware.js";
import { 
    createReservationController, 
    getReservationsByUserController, 
    getReservationsByCafeController 
} from "../controllers/reservation-controller.js";

const router = express.Router();

router.post("/reservations", createReservationController);
router.get("/reservations/basic-user/:userId", authenticateToken, getReservationsByUserController);
router.get("/reservations/admin/:userId", authenticateToken, getReservationsByCafeController);

export default router;