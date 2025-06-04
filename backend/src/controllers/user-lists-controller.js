import { addBoardGameInUserListService } from "../services/user-lists-service.js";

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