import { connectToDatabase } from "../config/db.js";

export const findUserByEmail = async (email) => {
  const connection = await connectToDatabase();
  const [rows] = await connection.execute(
    'SELECT id, email, password FROM registered_user WHERE email = ?',
    [email]
  );

  return rows.length > 0 ? rows[0] : null;
};