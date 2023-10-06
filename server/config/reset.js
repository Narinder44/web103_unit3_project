import { pool } from "./database.js";
import "./dotenv.js";
import eventData from "../data/events.js";
import locationData from "../data/locations.js";

const createLocationTable = async () => {
  const createLocationTableQuery = `
        DROP TABLE IF EXISTS locations CASCADE;

        CREATE TABLE IF NOT EXISTS locations (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) UNIQUE NOT NULL,
            address VARCHAR(255) NOT NULL,
            img_url VARCHAR(255) NOT NULL
        )
    `;
  try {
    const res = await pool.query(createLocationTableQuery);
    console.log("🎉 locations table created successfully");
  } catch (err) {
    console.error("⚠️ error creating locations table", err);
  }
};

const createEventsTable = async () => {
  const createEventsTableQuery = `
      DROP TABLE IF EXISTS events;
  
      CREATE TABLE IF NOT EXISTS events (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          date DATE NOT NULL,
          time TIME NOT NULL,
          img_url  TEXT NOT NULL,
          location VARCHAR(255) NOT NULL,
          FOREIGN KEY (location) REFERENCES locations(name)
      )
  `;

  try {
    const res = await pool.query(createEventsTableQuery);
    console.log("🎉 events table created successfully");
  } catch (err) {
    console.error("⚠️ error creating events table", err);
  }
};

const seedLocationTable = async () => {
  await createLocationTable();

  locationData.forEach((location) => {
    const insertQuery = {
      text: "INSERT INTO locations (name, address, img_url) VALUES ($1, $2, $3)",
    };

    const values = [location.name, location.address, location.img_url];

    pool.query(insertQuery, values, (err, res) => {
      if (err) {
        console.error("⚠️ error inserting location", err);
        return;
      }

      console.log(`✅ ${location.name} added successfully`);
    });
  });
};

const seedEventTable = async () => {
  await createEventsTable();

  eventData.forEach((event) => {
    const insertQuery = {
      text: "INSERT INTO events (name, date, time, img_url, location) VALUES ($1, to_date($2, 'YYYY-MM-DD'), to_timestamp($3, 'HH24:MI'), $4, $5)",
    };

    const values = [
      event.name,
      event.date,
      event.time,
      event.img_url,
      event.location,
    ];

    pool.query(insertQuery, values, (err, res) => {
      if (err) {
        console.error("⚠️ error inserting event", err);
        return;
      }

      console.log(`✅ ${event.name} added successfully`);
    });
  });
};

async function resetDatabase() {
  try {
    await seedLocationTable();
    await seedEventTable();
    console.log("🎉 database reset successfully");
  } catch (err) {
    console.error("⚠️ error resetting database", err);
  } finally {
    await pool.end();
  }
}
resetDatabase();