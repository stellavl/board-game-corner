import { findUserById } from "../repositories/user-repo.js";

export const getUserById = async (id) => {
  if (!id) {
    const error = new Error("Σφάλμα κατά την αναζήτηση του χρήστη.");
    error.statusCode = 500; 
    throw error;
  }

  const user = await findUserById(id);
  if (!user) {
    const error = new Error("Ο χρήστης δεν βρέθηκε.");
    error.statusCode = 404; 
    throw error;
  }

  return user;
};