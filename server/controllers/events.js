const { pool } = require("../database");

const getEvents = async () => {
  try {
    const res = await pool.query("SELECT * FROM events");
    return res.rows;
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = { getEvents };
