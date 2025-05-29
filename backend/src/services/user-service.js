import { findUserById } from "../repositories/user-repo.js";
import { findUserByEmail } from "../repositories/user-repo.js";
import { insertUser } from "../repositories/user-repo.js";
import bcrypt from "bcryptjs";

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
  const { firstName, lastName, email, phone, password } = userData;

  if (!firstName || !lastName || !email || !password || !phone) {
    const error = new Error("Όλα τα απαιτούμενα πεδία πρέπει να συμπληρωθούν.");
    error.statusCode = 400;
    throw error;
  }

  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    const error = new Error("Το email χρησιμοποιείται ήδη.");
    error.statusCode = 409; // Conflict
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await insertUser({
    firstName,
    lastName,
    email,
    phone,
    password: hashedPassword,
  });  
  
  return newUser;
};