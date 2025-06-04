import express from "express";
import { authenticateToken } from "../middleware/auth-middleware.js";
import { addBoardGameInUserListController } from "../controllers/user-lists-controller.js";

const router = express.Router();

router.post("/user-lists/:userId", authenticateToken, addBoardGameInUserListController);

export default router;