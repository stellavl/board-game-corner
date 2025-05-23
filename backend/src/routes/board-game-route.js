import express from "express";
import { 
    updateHotGamesController, 
    getHotBoardGamesController, 
    getBoardGameByNameController,  
    searchPaginatedBoardGames,
    getBoardGamesCategoriesController
} from '../controllers/board-game-controller.js';

const router = express.Router();

router.post('/hot-games', updateHotGamesController);
router.get('/hot-games', getHotBoardGamesController);
router.get('/board-game/categories', getBoardGamesCategoriesController)
router.get ('/board-game/:boardGameName', getBoardGameByNameController);
router.post('/board-game', searchPaginatedBoardGames);

export default router;