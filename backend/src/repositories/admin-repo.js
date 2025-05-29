import { connectToDatabase } from "../config/db.js";
import { fetchBoardGameDetailsByIdFromBGG } from "../services/board-game-service.js";

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

export const addBoardGamesToCatalog = async (bggIds, cafeId) => {
  const connection = await connectToDatabase();
  await connection.beginTransaction();
  try {
    for (const bgg_id of bggIds) {
      // Check if the board game exists
      const [existingGames] = await connection.execute(
        `SELECT id FROM board_game WHERE bgg_id = ?`,
        [bgg_id]
      );
      let boardGameId;
      if (existingGames.length === 0) {
        const details = await fetchBoardGameDetailsByIdFromBGG(bgg_id, false);
        const [result] = await connection.execute(
          `INSERT INTO board_game (bgg_id, category, name, min_players, max_players, playing_time, age, description, image, is_hot)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            details.bgg_id,
            details.category || '',
            details.name || '',
            details.min_players || 0,
            details.max_players || 0,
            details.playing_time || 0,
            details.age || 0,
            details.description || '',
            details.image || null,
            details.is_hot || false,
          ]
        );
        boardGameId = result.insertId;
      } else {
        boardGameId = existingGames[0].id;
      }

      // Add to catalog if not already present
      await connection.execute(
        `INSERT IGNORE INTO board_game_catalog (board_game_id, board_game_cafe_id) VALUES (?, ?)`,
        [boardGameId, cafeId]
      );
    }

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  }
};