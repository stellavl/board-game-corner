import { updateHotGamesService } from '../services/board-game-service.js';
import { getHotBoardGamesService, getBoardGameByNameService } from '../services/board-game-service.js';

export const getHotBoardGamesController = async (req, res) => {
  try {
    const hotBoardGames = await getHotBoardGamesService();
    res.status(200).json(hotBoardGames);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateHotGamesController = async (req, res) => {
  try {
    await updateHotGamesService();
    res.status(200).json({ message: "Επιτυχής ανάκτηση των δημοφιλών επιτραπεζίων από το Board Game Geek" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getBoardGameByNameController = async (req, res) => {
  try {
    const { boardGameName } = req.params;
    const boardGame = await getBoardGameByNameService(boardGameName);
    res.status(200).json(boardGame);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}