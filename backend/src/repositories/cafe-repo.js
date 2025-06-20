import { connectToDatabase } from "../config/db.js";

export const findAllCafes = async () => {
  const connection = await connectToDatabase();
  const [rows] = await connection.execute(
    `SELECT c.id, c.name, c.city, c.address, c.phone_number AS phoneNumber, c.photo, u.email
     FROM board_game_cafe c
     JOIN user u ON c.user_id = u.id
     ORDER BY c.name ASC`
  );
  await connection.end();
  return rows;
};

export const findCafesByCity = async (city) => {
  const connection = await connectToDatabase();
  const [rows] = await connection.execute(
    `SELECT 
        c.id, 
        c.name, 
        c.city, 
        c.address, 
        c.phone_number AS phoneNumber, 
        c.photo, 
        u.email,
        COUNT(bgc.id) AS numberOfBoardGames
     FROM board_game_cafe c
     JOIN user u ON c.user_id = u.id
     LEFT JOIN board_game_catalog bgc ON c.id = bgc.board_game_cafe_id
     WHERE c.city = ?
     GROUP BY c.id, c.name, c.city, c.address, c.phone_number, c.photo, u.email
     ORDER BY c.name ASC`,
    [city]
  );
  await connection.end();
  return rows;
};

export const findCafeById = async (id) => {
  const connection = await connectToDatabase();
  const [rows] = await connection.execute(
    `SELECT c.id, c.name, c.city, c.address, c.phone_number AS phoneNumber, c.photo, u.email
     FROM board_game_cafe c
     JOIN user u ON c.user_id = u.id
     WHERE c.id = ?`,
    [id]
  );
  await connection.end();
  return rows[0] || null;
};

export const findAllBoardGamesByCafeId = async (cafeId) => {
  const connection = await connectToDatabase();
  const [rows] = await connection.execute(
    `SELECT bg.id, bg.bgg_id, bg.name, bg.category, bg.min_players, bg.max_players, bg.playing_time, bg.age, bg.description, bg.image, bg.is_hot
      FROM board_game_catalog bgc
      JOIN board_game bg ON bgc.board_game_id = bg.id
      WHERE bgc.board_game_cafe_id = ?
      ORDER BY bg.name ASC`,
    [cafeId]
  );
  await connection.end();
  return rows;
};