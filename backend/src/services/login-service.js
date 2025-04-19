import { findUserByEmail } from "../repositories/user-repo.js";

export const loginUser = async (email, password) => {
  const user = await findUserByEmail(email);

  if (!user || user.password !== password) {
    const error = new Error('Λάθος email ή κωδικός πρόσβασης.');
    error.code = 'INVALID_CREDENTIALS';
    throw error;
  }

  return user;
};