const express = require("express");
const router = express.Router();
const { StaticDestinationLibrary } = require("../models");

// GET /api/destinations
// Optional query param: ?tag=beach
router.get("/", async (req, res) => {
  try {
    const filter = {};
    if (req.query.tag) {
      filter.tags = req.query.tag;
    }
    const destinations = await StaticDestinationLibrary.find(filter);
    res.json(destinations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
