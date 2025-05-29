import { getUserById, createUser } from "../services/user-service.js";

export const getUserByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const createUserController = async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await createUser(userData);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(error.statusCode || 400).json({ error: error.message });
  }
};