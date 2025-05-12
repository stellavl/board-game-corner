import { connectToDatabase } from "../config/db.js";

export const findAdminByEmail = async (email) => {
  const connection = await connectToDatabase();
  const [rows] = await connection.execute(
    `SELECT u.id AS user_id, u.email, u.password, u.role, 
            b.id AS cafe_id, b.name, b.city, b.address, b.phone_number, b.photo 
     FROM user u
     LEFT JOIN board_game_cafe b ON u.id = b.user_id
     WHERE u.email = ? AND u.role = 'ADMIN'`,
    [email]
  );

  return rows.length > 0 ? rows[0] : null;
};

export const findAdminById = async (id) => {
  const connection = await connectToDatabase();
  const [rows] = await connection.execute(
    `SELECT u.id AS user_id, u.email, u.role, 
            b.id AS cafe_id, b.name, b.city, b.address, b.phone_number, b.photo 
     FROM user u
     LEFT JOIN board_game_cafe b ON u.id = b.user_id
     WHERE u.id = ? AND u.role = 'ADMIN'`,
    [id]
  );
  return rows.length > 0 ? rows[0] : null;
};

export const insertAdmin = async ({ name, city, address, phone, email, password, photo }) => {
  const connection = await connectToDatabase();
  await connection.beginTransaction();

  try {
    const [userResult] = await connection.execute(
      `INSERT INTO user (email, password, role) 
       VALUES (?, ?, 'ADMIN')`,
      [email, password]
    );

    const userId = userResult.insertId;

    const [cafeResult] = await connection.execute(
      `INSERT INTO board_game_cafe (name, city, address, phone_number, photo, user_id) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [name, city, address, phone, photo, userId]
    );

    await connection.commit();

    return {
      userId,
      cafeId: cafeResult.insertId,
      name,
      city,
      address,
      phone,
      email,
      photo,
    };
  } catch (error) {
    await connection.rollback();
    throw error;
  }
};