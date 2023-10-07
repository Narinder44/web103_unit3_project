import express from "express";
import getLocations from "../controllers/locations.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const locations = await getLocations();
    res.json(locations);
  } catch (err) {
    console.error(err.message);
  }
});

export default router;
