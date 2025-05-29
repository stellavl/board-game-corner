import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import url from 'url';

dotenv.config({ path: '../.env' });

export const connectToDatabase = async () => {
  if (process.env.JAWSDB_URL) {
    // Parse the JAWSDB_URL for better control
    const { hostname, port, pathname, auth } = new url.URL(process.env.JAWSDB_URL);
    const [user, password] = auth.split(':');
    const database = pathname.split('/')[1];

    return await mysql.createConnection({
      host: hostname,
      port,
      user,
      password,
      database,
    });
  } else {
    // Local development
    return await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'user',
      password: process.env.DB_PASSWORD || 'user_password',
      database: process.env.DB_NAME || 'board_game_corner',
    });
  }
};  
