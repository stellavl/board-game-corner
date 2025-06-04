import express from "express";
import { authenticateToken } from "../middleware/auth-middleware.js";
import { addBoardGameInUserListController, getSpecificBoardGameListForUserController } from "../controllers/user-lists-controller.js";

const router = express.Router();

router.post("/user-lists/:userId", authenticateToken, addBoardGameInUserListController);
router.get("/user-lists/:userId/:boardGameId", authenticateToken, getSpecificBoardGameListForUserController);

export default router;