import express from "express";
import { updateHotGamesController, getHotBoardGamesController } from '../controllers/board-game-controller.js';

const router = express.Router();

router.post('/hot-games', updateHotGamesController);
router.get('/hot-games', getHotBoardGamesController);

export default router;