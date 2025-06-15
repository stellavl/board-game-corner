import express from "express";
import { authenticateToken } from "../middleware/auth-middleware.js";
import { addBoardGameInUserListController, getSpecificBoardGameListForUserController, getAllBoardGamesListForUserController } from "../controllers/user-lists-controller.js";

const router = express.Router();

router.post("/user-lists/:userId", authenticateToken, addBoardGameInUserListController);
router.get("/user-lists/:userId/:boardGameId", authenticateToken, getSpecificBoardGameListForUserController);
router.get("/user-lists/:userId/", authenticateToken, getAllBoardGamesListForUserController);

export default router;