import { connectToDatabase } from "../config/db.js";

export const findAllCafes = async () => {
  const connection = await connectToDatabase();
  const [rows] = await connection.execute(
    `SELECT c.id, c.name, c.city, c.address, c.phone_number AS phoneNumber, c.photo, u.email
     FROM board_game_cafe c
     JOIN user u ON c.user_id = u.id`
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
     GROUP BY c.id, c.name, c.city, c.address, c.phone_number, c.photo, u.email`,
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
