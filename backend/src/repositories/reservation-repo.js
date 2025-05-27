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

export const getReservationsByUserRepo = async (userId) => {
  const connection = await connectToDatabase();
  try {
    const [rows] = await connection.execute(
      `SELECT 
         DATE_FORMAT(r.date, '%d-%m-%Y') AS date,
         DATE_FORMAT(r.time, '%H:%i') AS time,
         r.players_no,
         r.status,
         bg.name AS board_game_name,
         bgc.name AS board_game_cafe_name
       FROM reservation r
       JOIN basic_user bu ON r.basic_user_id = bu.id
       JOIN board_game bg ON r.board_game_id = bg.id
       JOIN board_game_cafe bgc ON r.board_game_cafe_id = bgc.id
       WHERE bu.user_id = ?`,
      [userId]
    );
    return rows;
  } finally {
    await connection.end();
  }
};

export const getReservationsByCafeRepo = async (userId) => {
  const connection = await connectToDatabase();
  try {
    // Get cafeId for this user
    const [cafes] = await connection.execute(
      `SELECT id FROM board_game_cafe WHERE user_id = ?`,
      [userId]
    );
    if (cafes.length === 0) return []; // No cafe found for this user

    const cafeId = cafes[0].id;

    // Now get reservations for this cafeId
    const [rows] = await connection.execute(
      `SELECT 
         r.id,
         DATE_FORMAT(r.date, '%d-%m-%Y') AS date,
         DATE_FORMAT(r.time, '%H:%i') AS time,
         r.players_no,
         r.status,
         r.customer_first_name,
         r.customer_last_name,
         r.customer_email,
         r.customer_phone,
         bg.name AS board_game_name,
         bgc.name AS board_game_cafe_name
       FROM reservation r
       JOIN board_game bg ON r.board_game_id = bg.id
       JOIN board_game_cafe bgc ON r.board_game_cafe_id = bgc.id
       WHERE r.board_game_cafe_id = ?`,
      [cafeId]
    );
    return rows;
  } finally {
    await connection.end();
  }
};

export const updateReservationStatusRepo = async (reservationId, status) => {
  const connection = await connectToDatabase();
  try {
    const [result] = await connection.execute(
      `UPDATE reservation SET status = ? WHERE id = ?`,
      [status, reservationId]
    );
    return result.affectedRows > 0;
  } finally {
    await connection.end();
  }
};