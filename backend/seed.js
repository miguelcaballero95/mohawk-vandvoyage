require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const { StaticDestinationLibrary } = require("./models");

const sampleDestinations = [
  {
    city: "Lisbon",
    country: "Portugal",
    summary:
      "Charming hillside capital with pastel buildings, world-class seafood, and affordable prices.",
    image_url: null,
    tags: ["beach", "culture", "budget", "food", "romantic"],
    source_flag: "curated",
  },
  {
    city: "Tokyo",
    country: "Japan",
    summary:
      "A high-energy blend of futuristic tech, ancient temples, and some of the best food on the planet.",
    image_url: null,
    tags: ["adventure", "culture", "food", "city", "tech"],
    source_flag: "curated",
  },
  {
    city: "Medellín",
    country: "Colombia",
    summary:
      "Spring-like weather year-round, vibrant nightlife, and a transformed urban landscape.",
    image_url: null,
    tags: ["budget", "adventure", "nightlife", "nature", "warm"],
    source_flag: "curated",
  },
  {
    city: "Reykjavik",
    country: "Iceland",
    summary:
      "Gateway to glaciers, geysers, and the Northern Lights in a compact walkable city.",
    image_url: null,
    tags: ["nature", "adventure", "unique", "cold", "photography"],
    source_flag: "curated",
  },
  {
    city: "Marrakech",
    country: "Morocco",
    summary:
      "Sensory overload in the best way — spice markets, riads, and the Atlas Mountains nearby.",
    image_url: null,
    tags: ["culture", "budget", "food", "warm", "romantic"],
    source_flag: "curated",
  },
];

const seed = async () => {
  try {
    await connectDB();
    await StaticDestinationLibrary.deleteMany({});
    const inserted = await StaticDestinationLibrary.insertMany(
      sampleDestinations
    );
    console.log(`Seeded ${inserted.length} static destinations.`);
    process.exit(0);
  } catch (err) {
    console.error("Seed error:", err.message);
    process.exit(1);
  }
};

seed();
