import { createAdmin, getAdminById } from "../services/admin-service.js";
import upload from "../middleware/file-middleware.js";

export const getAdminByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await getAdminById(id);
    res.status(200).json(admin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const createAdminController = [
  upload.single("photo"), 
  async (req, res) => {
    try {
      const adminData = req.body;
      const photoPath = req.file ? req.file.path : null;
      let bggIds = adminData.bggIds;
      if (typeof bggIds === "string") {
        try {
          bggIds = JSON.parse(bggIds);
        } catch {
          bggIds = [];
        }
      }
      const newAdmin = await createAdmin({ ...adminData, photo: photoPath, bggIds });
      res.status(201).json(newAdmin);
    } catch (error) {
      res.status(error.statusCode || 400).json({ error: error.message });
    }
  },
];