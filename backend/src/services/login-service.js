import { findUserByEmail } from "../repositories/user-repo.js";

export const loginUser = async (email, password) => {
  const user = await findUserByEmail(email);

  if (!user || user.password !== password) {
    throw new Error('Invalid email or password');
  }

  return user;
};