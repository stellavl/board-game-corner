import { connectToDatabase } from "../config/db.js";

export const findAdminByEmail = async (email) => {
  const connection = await connectToDatabase();
  const [rows] = await connection.execute(
    'SELECT id, email, password FROM board_game_cafe WHERE email = ?',
    [email]
  );

  return rows.length > 0 ? rows[0] : null;
};

export const findAdminById = async (id) => {
  const connection = await connectToDatabase();
  const [rows] = await connection.execute(
    'SELECT name, city, address, phone_number, email, photo FROM board_game_cafe WHERE id = ?',
    [id]
  );
  return rows.length > 0 ? rows[0] : null;
};

export const insertAdmin = async ({ name, city, address, phone, email, password, photo }) => {
  const connection = await connectToDatabase();
  const [result] = await connection.execute(
    `INSERT INTO board_game_cafe (name, city, address, phone_number, email, password, photo) 
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [name, city, address, phone, email, password, photo]
  );

  return { id: result.insertId, name, city, address, phone, email, photo };
};