import { findUserByEmail } from "../repositories/user-repo.js";
import bcrypt from "bcrypt";

export const loginUser = async (email, password) => {
  const user = await findUserByEmail(email);
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!user && !isPasswordValid) {
    const error = new Error('Λάθος email ή κωδικός πρόσβασης.');
    error.code = 'INVALID_CREDENTIALS';
    throw error;
  }

  return user;
};