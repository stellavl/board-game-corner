import { connectToDatabase } from "../config/db.js";

export const findBoardGameByBggId = async (bgg_id) => {
  const connection = await connectToDatabase();
  try {
    const [rows] = await connection.execute(
      'SELECT id, is_hot FROM board_game WHERE bgg_id = ?',
      [bgg_id]
    );
    return rows;
  } finally {
    await connection.end(); 
  }
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

  try {
    // If a game with the same ID exists, return its ID and skip insertion
    const existingGameWithSameID = await findBoardGameByBggId(bgg_id);
    if (existingGameWithSameID.length > 0) {
      return existingGameWithSameID[0].id;
    }

    // If a game with the same name exists, return its ID and skip insertion
    const [existingGameWithSameName] = await connection.execute(
      'SELECT id FROM board_game WHERE name = ?',
      [name]
    );
    if (existingGameWithSameName.length > 0) {
      return existingGameWithSameName[0].id;
    }

    const [result] = await connection.execute(
      `INSERT INTO board_game 
      (bgg_id, name, category, min_players, max_players, playing_time, age, description, image, is_hot) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [bgg_id, name, category, min_players, max_players, playing_time, age, description, image, is_hot]
    );
    return result.insertId;
  } finally {
    await connection.end();
  }
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
      'SELECT id, bgg_id, name, min_players, max_players, age, category, image, playing_time, description FROM board_game WHERE is_hot = true'
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

export const getHotBoardGameCategories = async () => {
  try {
    const connection = await connectToDatabase();
    const [rows] = await connection.execute(
      'SELECT DISTINCT category FROM board_game WHERE is_hot = true'
    );
    return rows.map(row => row.category);
  } catch (error) {
    throw new Error('Σφάλμα κατά την ανάκτηση των κατηγοριών από τη βάση δεδομένων.');
  }
};

export const getFilteredHotBoardGamesRepo = async (filters) => {
  const {
    categories = [],
    minPlayers,
    maxPlayers,
    minAge,
    minduration,
    maxduration,
  } = filters;

  const connection = await connectToDatabase();

  let baseQuery = `FROM board_game WHERE is_hot = true`;
  const params = [];

  let filteredCategories = categories.filter(c => c && c.trim() !== '');
  if (filteredCategories.length > 0) {
    baseQuery += ` AND category IN (${filteredCategories.map(() => '?').join(',')})`;
    params.push(...filteredCategories);
  }

  if (minPlayers != null) {
    baseQuery += ` AND min_players >= ?`;
    params.push(minPlayers);
  }
  if (maxPlayers != null) {
    baseQuery += ` AND max_players <= ?`;
    params.push(maxPlayers);
  }
  if (minAge != null) {
    baseQuery += ` AND age >= ?`;
    params.push(minAge);
  }
  if (minduration != null) {
    baseQuery += ` AND playing_time >= ?`;
    params.push(minduration);
  }
  if (maxduration != null) {
    baseQuery += ` AND playing_time <= ?`;
    params.push(maxduration);
  }

  const [rows] = await connection.execute(
   `SELECT id, bgg_id, name, min_players, max_players, age, category, image, playing_time, description ${baseQuery}`,
    params
  );
  await connection.end();
  return rows; 
};