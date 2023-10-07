import express from "express";
import getEvents from "../controllers/events.js";
import getLocations from "../controllers/locations.js";

const router = express.Router();

router.get('/events', async (req, res) => {
  try {
    const events = await getEvents();
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/locations', async (req, res) => {
  try {
    const locations = await getLocations();
    res.json(locations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default router;