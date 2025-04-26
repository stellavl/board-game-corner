import express from "express";
import { getUserByIdController } from "../controllers/user-controller.js";
import { authenticateToken } from "../middleware/auth-middleware.js";

const router = express.Router();

router.get("/users/:id", authenticateToken, getUserByIdController);

export default router;