import express from "express";
import getEvents from "../controllers/events.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const events = await getEvents();
    res.json(events);
  } catch (err) {
    console.error(err.message);
  }
});

export default router;
