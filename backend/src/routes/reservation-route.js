import express from "express";
import { authenticateToken } from "../middleware/auth-middleware.js";
import { 
    createReservationController, 
    getReservationsByUserController, 
    getReservationsByCafeController,
    updateReservationStatusController 
} from "../controllers/reservation-controller.js";

const router = express.Router();

router.post("/reservations", createReservationController);
router.get("/reservations/basic-user/:userId", authenticateToken, getReservationsByUserController);
router.get("/reservations/admin/:userId", authenticateToken, getReservationsByCafeController);
router.put("/reservations/:reservationId/status", authenticateToken, updateReservationStatusController);

export default router;