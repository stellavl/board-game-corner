import { findAdminByEmail, insertAdmin, findAdminById, addBoardGamesToCatalog } from "../repositories/admin-repo.js";
import bcrypt from "bcryptjs";

export const getAdminById = async (id) => {
  if (!id) {
    const error = new Error("Σφάλμα κατά την αναζήτηση του παιχνιδοκαφέ.");
    error.statusCode = 500; 
    throw error;
  }

  const admin = await findAdminById(id);
  if (!admin) {
    const error = new Error("Το παιχνιδοκαφέ δεν βρέθηκε.");
    error.statusCode = 404; 
    throw error;
  }

  return admin;
};

export const createAdmin = async (adminData) => {
  const { name, city, address, phone, email, password, photo, bggIds } = adminData;

  if (!name || !city || !address || !phone || !email || !password) {
    const error = new Error("Όλα τα απαιτούμενα πεδία πρέπει να συμπληρωθούν.");
    error.statusCode = 400;
    throw error;
  }

  const existingAdmin = await findAdminByEmail(email);
  if (existingAdmin) {
    const error = new Error("Το email χρησιμοποιείται ήδη. Δοκιμάστε να συνδεθείτε ή να εγγραφείτε με διαφορετικό email.");
    error.statusCode = 409; // Conflict
    throw error;
  }

  // Parse bggIds if it's a string
  let parsedBggIds = adminData.bggIds;
  if (typeof adminData.bggIds === "string") {
    try {
      parsedBggIds = JSON.parse(bggIds);
    } catch {
      parsedBggIds = [];
    }
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

  if (Array.isArray(parsedBggIds) && parsedBggIds.length > 0) {
    await addBoardGamesToCatalog(parsedBggIds, newAdmin.cafeId);
  }

  return newAdmin;
};