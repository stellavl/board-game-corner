import { createAdmin } from "../services/admin-service.js";

export const createAdminController = async (req, res) => {
  try {
    const adminData = req.body;
    const newAdmin = await createAdmin(adminData);
    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(error.statusCode || 400).json({ error: error.message });
  }
};