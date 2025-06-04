import { connectToDatabase } from "../config/db.js";

export const findUserBoardGameListEntry = async (userId, boardGameId) => {
  const connection = await connectToDatabase();
  try {
    const [rows] = await connection.execute(
      `
        SELECT ubgl.*
        FROM user_board_game_list ubgl
        JOIN basic_user bu ON ubgl.basic_user_id = bu.id
        JOIN user u ON bu.user_id = u.id
        WHERE u.id = ? AND ubgl.board_game_id = ?
      `,
      [userId, boardGameId]
    );
    return rows[0];
  } catch(error){
    throw new Error("Υπήρξε σφάλμα κατά την ενημέρωση της λίστας παιχνιδιών.");
  } finally {
    await connection.end();
  }
};


export const updateUserBoardGameListBoolean = async (entryId, listType, value) => {
  const connection = await connectToDatabase();
  try {
    await connection.execute(
      `
      UPDATE user_board_game_list SET ${listType} = ? WHERE id = ?
      `,
      [value, entryId]
    );
  } catch (error){
    throw new Error("Υπήρξε σφάλμα κατά την ενημέρωση της λίστας παιχνιδιών.");
  } finally {
    await connection.end();
  }
};

export const insertUserBoardGameListEntry = async (userId, boardGameId, listType, value) => {
  const connection = await connectToDatabase();
    const booleans = {
        is_favorite: false,
        is_have_played: false,
        is_want_to_play: false,
    };
    booleans[listType] = value;

  try {
    await connection.execute(
      `INSERT INTO user_board_game_list (is_favorite, is_have_played, is_want_to_play, basic_user_id, board_game_id)
        VALUES (?, ?, ?, (SELECT id FROM basic_user WHERE user_id = ?), ?)
        `,
      [
        booleans.is_favorite,
        booleans.is_have_played,
        booleans.is_want_to_play,
        userId,
        boardGameId,
      ]
    );
  } catch (error){
    throw new Error("Υπήρξε σφάλμα κατά την ενημέρωση της λίστας παιχνιδιών.");
  } finally {
    await connection.end();
  }
};