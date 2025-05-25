import { getAllCafes, getCafesByCity, getCafeById, getPaginatedBoardGamesByCafeId } from "../services/cafe-service.js";

export const getAllCafesController = async (req, res) => {
  try {
    const cafes = await getAllCafes();
    res.status(200).json(cafes);
  } catch (error) {
    res.status(500).json({ error: "Σφάλμα κατά την ανάκτηση των καφέ." });
  }
};

export const getCafesByCityController = async (req, res) => {
  try {
    const { city } = req.params;
    const cafes = await getCafesByCity(city);
    res.status(200).json(cafes);
  } catch (error) {
    res.status(500).json({ error: "Σφάλμα κατά την ανάκτηση των καφέ για την πόλη." });
  }
};

export const getCafeByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const cafe = await getCafeById(id);
    if (!cafe) {
      return res.status(404).json({ error: "Το παιχνιδοκαφέ δεν βρέθηκε" });
    }
    res.status(200).json(cafe);
  } catch (error) {
    res.status(500).json({ error: "Σφάλμα κατά την ανάκτηση του καφέ." });
  }
};

export const getBoardGamesByCafeIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const {currentPage, pageSize} = req.body;
    const { boardGames, totalElements } = await getPaginatedBoardGamesByCafeId(id, pageSize, currentPage);
    res.status(200).json({ boardGames, totalElements });
  } catch (error) {
    res.status(500).json({ error: "Σφάλμα κατά την ανάκτηση των επιτραπέζιων για το καφέ." });
  }
};