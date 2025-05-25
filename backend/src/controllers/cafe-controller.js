import { getAllCafes, getCafesByCity } from "../services/cafe-service.js";

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