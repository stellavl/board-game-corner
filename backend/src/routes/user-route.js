import express from "express";
import { authenticateToken } from "../middleware/auth-middleware.js";
import { getUserByIdController } from "../controllers/user-controller.js";
import { createUserController } from "../controllers/user-controller.js";

const router = express.Router();

router.get("/basic-users/:id", authenticateToken, getUserByIdController);
router.post("/basic-users", createUserController);

console.log("Loaded user routes");

export default router;