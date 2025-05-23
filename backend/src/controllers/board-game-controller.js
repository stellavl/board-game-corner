import { 
  getHotBoardGamesService, 
  getBoardGameByNameService, 
  updateHotGamesService,
  searchBoardGamesByNameFromBGG,
  fetchPaginatedBoardGameDetails,
  getBoardGamesCategoriesService,
  filterBoardGamesService
} from '../services/board-game-service.js';

export const getHotBoardGamesController = async (req, res) => {
  try {
    const currentPage = parseInt(req.query.currentPage) || 1;
    const pageSize = parseInt(req.query.pageSize) || 8;
    const { boardGames, totalElements } = await getHotBoardGamesService(currentPage, pageSize);
    res.status(200).json({ boardGames, totalElements });
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

export const searchPaginatedBoardGames = async (req, res) => {
  try {
    const { searchText, currentPage, pageSize } = req.body;
    const boardGamesIDs = await searchBoardGamesByNameFromBGG(searchText);
    const { boardGames, totalElements } = await fetchPaginatedBoardGameDetails(boardGamesIDs, currentPage, pageSize);
    res.status(200).json({ boardGames, totalElements });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

export const getBoardGamesCategoriesController = async (req, res) => {
  try {
    const searchText = req.query.searchText;
    const boardGameCategories = await (getBoardGamesCategoriesService(searchText));
    res.status(200).json(boardGameCategories);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

export const filterHotBoardGamesController = async (req, res) => {
  try {
    const filters = req.body;
    const currentPage = parseInt(req.body.currentPage) || 1;
    const pageSize = parseInt(req.body.pageSize) || 8;
    const result = await filterBoardGamesService(filters, currentPage, pageSize);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};