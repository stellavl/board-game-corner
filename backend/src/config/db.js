import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' }); 

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

export const connectToDatabase = async () => {
  return await mysql.createConnection(dbConfig);
};