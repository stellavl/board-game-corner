import { findAdminByEmail, insertAdmin } from "../repositories/admin-repo.js";
import bcrypt from "bcryptjs";

export const createAdmin = async (adminData) => {
  const { name, city, address, phone, email, password, photo } = adminData;

  if (!name || !city || !address || !phone || !email || !password) {
    const error = new Error("Όλα τα απαιτούμενα πεδία πρέπει να συμπληρωθούν.");
    error.statusCode = 400;
    throw error;
  }

  const existingAdmin = await findAdminByEmail(email);
  if (existingAdmin) {
    const error = new Error("Το email χρησιμοποιείται ήδη.");
    error.statusCode = 409; // Conflict
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newAdmin = await insertAdmin({
    name,
    city,
    address,
    phone,
    email,
    password: hashedPassword,
    photo,
  });

  return newAdmin;
};