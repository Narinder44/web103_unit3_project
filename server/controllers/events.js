import { pool } from '../config/database.js';

export const getEvents = async () => {
  try {
    const res = await pool.query("SELECT * FROM events");
    return res.rows;
  } catch (err) {
    console.error(err.message);
    throw err; 
  }
};

export default getEvents;
