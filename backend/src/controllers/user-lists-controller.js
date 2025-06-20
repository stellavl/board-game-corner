import { addBoardGameInUserListService, getSpecificBoardGameListForUserService, getAllBoardGamesListForUserService } from "../services/user-lists-service.js";

export const addBoardGameInUserListController = async (req, res) => {
  try {
    const { userId } = req.params;
    const { boardGameId, listType, value } = req.body;
    await addBoardGameInUserListService(userId, boardGameId, listType, value);
    res.status(200).json({message: value ? "Επιτυχής προσθήκη του παιχνιδιού στη λίστα" : "Επιτυχής αφαίρεση του παιχνιδιού από τη λίστα"});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getSpecificBoardGameListForUserController = async (req, res) => {
  try {
    const { userId, boardGameId } = req.params;
    const entry = await getSpecificBoardGameListForUserService(userId, boardGameId);
    res.status(200).json(entry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export const getAllBoardGamesListForUserController = async (req, res) => {
  try {
    const { userId } = req.params;
    const entries = await getAllBoardGamesListForUserService(userId);
    res.status(200).json(entries);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}