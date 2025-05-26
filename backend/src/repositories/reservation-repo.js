import { connectToDatabase } from "../config/db.js";

export const createReservationRepo = async (reservationData) => {
  const {
    date,
    time,
    players_no,
    customer_first_name,
    customer_last_name,
    customer_email,
    customer_phone,
    status,
    board_game_id,
    board_game_cafe_id,
    basic_user_id = null // optional
  } = reservationData;

  const connection = await connectToDatabase();
  try {
    const [result] = await connection.execute(
      `INSERT INTO reservation 
        (date, time, players_no, customer_first_name, customer_last_name, customer_email, customer_phone, status, board_game_id, board_game_cafe_id, basic_user_id)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        date,
        time,
        players_no,
        customer_first_name,
        customer_last_name,
        customer_email,
        customer_phone,
        status,
        board_game_id,
        board_game_cafe_id,
        basic_user_id
      ]
    );
    return result.insertId;
  } finally {
    await connection.end();
  }
};