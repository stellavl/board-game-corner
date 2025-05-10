import { connectToDatabase } from "../config/db.js";

export const findBoardGameByBggId = async (bgg_id) => {
  const connection = await connectToDatabase();
  const [rows] = await connection.execute(
    'SELECT id, is_hot FROM board_game WHERE bgg_id = ?',
    [bgg_id]
  );
  return rows;
};

export const insertBoardGame = async (gameDetails) => {
  const {
    bgg_id,
    name,
    category,
    min_players,
    max_players,
    playing_time,
    age,
    description,
    image,
    is_hot,
  } = gameDetails;

  const connection = await connectToDatabase();
  const [result] = await connection.execute(
    `INSERT INTO board_game 
    (bgg_id, name, category, min_players, max_players, playing_time, age, description, image, is_hot) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,

    [bgg_id, name, category, min_players, max_players, playing_time, age, description, image, is_hot]
  );
  return result.insertId;
};

export const markGameAsNotHot = async (bggIdsToMarkNotHot) => {
  const connection = await connectToDatabase();
  await connection.execute(
    `UPDATE board_game 
    SET is_hot = false 
    WHERE bgg_id IN (?)`,
    [bggIdsToMarkNotHot]
  );
};

export const markGameAsHot = async (bgg_id) => {
    const connection = await connectToDatabase();
    await connection.execute(
        `UPDATE board_game 
        SET is_hot = true 
        WHERE bgg_id = ?`,
        [bgg_id]
    );
}

export const getHotBoardGames = async () => {
  try {
    const connection = await connectToDatabase();
    const [rows] = await connection.execute(
      'SELECT id, bgg_id, name, min_players, max_players, age, category, image, playing_time FROM board_game WHERE is_hot = true'
    );
    return rows;
  } catch (error) {
    throw new Error('Σφάλμα κατά την ανάκτηση των παιχνιδιών από τη βάση δεδομένων.');
  }
};

export const getBoardGameByName = async (name) => {
  try {
    const connection = await connectToDatabase();
    const [rows] = await connection.execute(
      'SELECT name, min_players, max_players, age, category, image, playing_time, description FROM board_game WHERE name = ?',
      [name]
    );
    return rows[0];
  } catch (error) {
    throw new Error('Σφάλμα κατά την ανάκτηση του παιχνιδιού από τη βάση δεδομένων.');
  }
}