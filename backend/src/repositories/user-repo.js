import { connectToDatabase } from "../config/db.js";

export const findUserByEmail = async (email) => {
  const connection = await connectToDatabase();
  const [rows] = await connection.execute(
    'SELECT id, email, password FROM registered_user WHERE email = ?',
    [email]
  );

  return rows.length > 0 ? rows[0] : null;
};

export const findUserById = async (id) => {
  const connection = await connectToDatabase();
  const [rows] = await connection.execute(
    'SELECT first_name, last_name, email, phone_number FROM registered_user WHERE id = ?',
    [id]
  );
  return rows.length > 0 ? rows[0] : null;
};