import { findAdminByEmail } from "../repositories/admin-repo.js";
import bcrypt from "bcrypt";

export const loginAdminUser = async (email, password) => {
  const admin = await findAdminByEmail(email);
  if (!admin) {
    const error = new Error('Λάθος email ή κωδικός πρόσβασης.');
    error.code = 'INVALID_CREDENTIALS';
    throw error;
  }

  const isPasswordValid = await bcrypt.compare(password, admin.password);
  if (!isPasswordValid) {
    const error = new Error('Λάθος email ή κωδικός πρόσβασης.');
    error.code = 'INVALID_CREDENTIALS';
    throw error;
  }

  return admin;
};