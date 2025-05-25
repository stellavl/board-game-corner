import express from "express";
import { getAllCafesController, getCafesByCityController } from "../controllers/cafe-controller.js";

const router = express.Router();

router.get("/board-game-cafes/all", getAllCafesController);
router.get("/board-game-cafes/:city", getCafesByCityController);

export default router;