import express from "express";
import { getAllCafesController, getCafesByCityController, getCafeByIdController, getBoardGamesByCafeIdController } from "../controllers/cafe-controller.js";

const router = express.Router();

router.get("/board-game-cafes/all", getAllCafesController);
router.get("/board-game-cafes/city/:city", getCafesByCityController);
router.get("/board-game-cafes/id/:id", getCafeByIdController);
router.get("/board-game-cafes/id/:id/board-games", getBoardGamesByCafeIdController);

export default router;