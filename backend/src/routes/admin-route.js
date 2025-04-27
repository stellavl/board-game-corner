import express from "express";
import { createAdminController, getAdminByIdController } from "../controllers/admin-controller.js";
import { authenticateToken } from "../middleware/auth-middleware.js";

const router = express.Router();

router.get("/admins/:id", authenticateToken, getAdminByIdController);
router.post("/admins", createAdminController);

export default router;