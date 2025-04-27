import { createAdmin, getAdminById } from "../services/admin-service.js";

export const getAdminByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await getAdminById(id);
    res.status(200).json(admin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const createAdminController = async (req, res) => {
  try {
    const adminData = req.body;
    const newAdmin = await createAdmin(adminData);
    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(error.statusCode || 400).json({ error: error.message });
  }
};