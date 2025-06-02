import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

export const connectToDatabase = async () => {
  return await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'user',
    password: process.env.DB_PASSWORD || 'user_password',
    database: process.env.DB_NAME || 'board_game_corner',
  });
};  
