import { pool } from '../config/database.js'

export const getLocations = async () => {
  try {
    const res = await pool.query("SELECT * FROM locations");
    return res.rows;
  } catch (err) {
    console.error(err.message);
  }
};

export default getLocations;