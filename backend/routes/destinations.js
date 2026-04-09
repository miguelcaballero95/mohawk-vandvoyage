const express = require("express");
const router = express.Router();
const { StaticDestinationLibrary } = require("../models");

const SUPPORTED_LANGUAGES = ["en", "es", "fr"];

// GET /api/destinations
// Optional query params: ?tag=beach&lang=es
router.get("/", async (req, res) => {
  try {
    const filter = {};
    if (req.query.tag) {
      filter.tags = req.query.tag;
    }
    const destinations = await StaticDestinationLibrary.find(filter).lean();
    const lang = SUPPORTED_LANGUAGES.includes(req.query.lang)
      ? req.query.lang
      : "en";

    const localized = destinations.map((dest) => {
      const t = dest.translations?.[lang];
      return {
        ...dest,
        city: t?.city || dest.city,
        country: t?.country || dest.country,
        summary: t?.summary || dest.summary,
      };
    });

    res.json(localized);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
