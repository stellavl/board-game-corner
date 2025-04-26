import { findUserById } from "../repositories/user-repo.js";
import { insertUser } from "../repositories/user-repo.js";

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

export const createUser = async (userData) => {
  const { firstName, lastName, email, phoneNumber, password } = userData;

  if (!firstName || !lastName || !email || !password || !phoneNumber) {
    const error = new Error("Όλα τα απαιτούμενα πεδία πρέπει να συμπληρωθούν.");
    error.statusCode = 400;
    throw error;
  }

  const newUser = await insertUser({ firstName, lastName, email, phoneNumber, password });
  return newUser;
};