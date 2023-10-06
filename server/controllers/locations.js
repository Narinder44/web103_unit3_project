const { pool } = require("../database");

const getLocations = async () => {
  try {
    const res = await pool.query("SELECT * FROM locations");
    return res.rows;
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = { getLocations };
