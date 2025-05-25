import express from "express";
import { getAllCafesController, getCafesByCityController, getCafeByIdController } from "../controllers/cafe-controller.js";

const router = express.Router();

router.get("/board-game-cafes/all", getAllCafesController);
router.get("/board-game-cafes/:city", getCafesByCityController);
router.get("/board-game-cafes/id/:id", getCafeByIdController);

export default router;