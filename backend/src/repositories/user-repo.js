import { connectToDatabase } from "../config/db.js";

export const findUserByEmail = async (email) => {
  const connection = await connectToDatabase();
  const [rows] = await connection.execute(
    `SELECT 
       u.id AS user_id, 
       u.email, 
       u.password, 
       u.role, 
       b.first_name, 
       b.last_name, 
       b.phone_number 
     FROM user u
     LEFT JOIN basic_user b ON u.id = b.user_id
     WHERE u.email = ?`,
    [email]
  );
  await connection.end();
  return rows.length > 0 ? rows[0] : null;
};

export const findUserById = async (id) => {
  const connection = await connectToDatabase();
  const [rows] = await connection.execute(
    `SELECT 
       u.id, 
       u.email, 
       u.role, 
       b.first_name, 
       b.last_name, 
       b.phone_number 
     FROM user u
     LEFT JOIN basic_user b ON u.id = b.user_id
     WHERE u.id = ?`,
    [id]
  );
  await connection.end();
  return rows.length > 0 ? rows[0] : null;
};

export const insertUser = async ({ firstName, lastName, email, phone, password, role = 'USER' }) => {
  const connection = await connectToDatabase();

  await connection.beginTransaction();

  try {
    const [userResult] = await connection.execute(
      `INSERT INTO user (email, password, role) 
       VALUES (?, ?, ?)`,
      [email, password, role]
    );

    const userId = userResult.insertId;

    await connection.execute(
      `INSERT INTO basic_user (first_name, last_name, phone_number, user_id) 
       VALUES (?, ?, ?, ?)`,
      [firstName, lastName, phone, userId]
    );

    await connection.commit();

    return { id: userId, firstName, lastName, email, phone };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    await connection.end();
  }
};