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
    translations: {
      en: {
        city: "Lisbon",
        country: "Portugal",
        summary:
          "Charming hillside capital with pastel buildings, world-class seafood, and affordable prices.",
      },
      es: {
        city: "Lisboa",
        country: "Portugal",
        summary:
          "Encantadora capital sobre colinas con edificios de colores pastel, mariscos de clase mundial y precios accesibles.",
      },
      fr: {
        city: "Lisbonne",
        country: "Portugal",
        summary:
          "Charmante capitale vallonnée aux bâtiments pastel, fruits de mer de renommée mondiale et prix abordables.",
      },
    },
  },
  {
    city: "Tokyo",
    country: "Japan",
    summary:
      "A high-energy blend of futuristic tech, ancient temples, and some of the best food on the planet.",
    image_url: null,
    tags: ["adventure", "culture", "food", "city", "tech"],
    source_flag: "curated",
    translations: {
      en: {
        city: "Tokyo",
        country: "Japan",
        summary:
          "A high-energy blend of futuristic tech, ancient temples, and some of the best food on the planet.",
      },
      es: {
        city: "Tokio",
        country: "Japón",
        summary:
          "Una mezcla vibrante de tecnología futurista, templos ancestrales y la mejor gastronomía del planeta.",
      },
      fr: {
        city: "Tokyo",
        country: "Japon",
        summary:
          "Un mélange vibrant de technologie futuriste, de temples anciens et de la meilleure cuisine au monde.",
      },
    },
  },
  {
    city: "Medellín",
    country: "Colombia",
    summary:
      "Spring-like weather year-round, vibrant nightlife, and a transformed urban landscape.",
    image_url: null,
    tags: ["budget", "adventure", "nightlife", "nature", "warm"],
    source_flag: "curated",
    translations: {
      en: {
        city: "Medellín",
        country: "Colombia",
        summary:
          "Spring-like weather year-round, vibrant nightlife, and a transformed urban landscape.",
      },
      es: {
        city: "Medellín",
        country: "Colombia",
        summary:
          "Clima primaveral todo el año, vida nocturna vibrante y un paisaje urbano transformado.",
      },
      fr: {
        city: "Medellín",
        country: "Colombie",
        summary:
          "Un climat printanier toute l'année, une vie nocturne animée et un paysage urbain transformé.",
      },
    },
  },
  {
    city: "Reykjavik",
    country: "Iceland",
    summary:
      "Gateway to glaciers, geysers, and the Northern Lights in a compact walkable city.",
    image_url: null,
    tags: ["nature", "adventure", "unique", "cold", "photography"],
    source_flag: "curated",
    translations: {
      en: {
        city: "Reykjavik",
        country: "Iceland",
        summary:
          "Gateway to glaciers, geysers, and the Northern Lights in a compact walkable city.",
      },
      es: {
        city: "Reikiavik",
        country: "Islandia",
        summary:
          "Puerta de entrada a glaciares, géiseres y auroras boreales en una ciudad compacta y caminable.",
      },
      fr: {
        city: "Reykjavik",
        country: "Islande",
        summary:
          "Porte d'entrée vers les glaciers, geysers et aurores boréales dans une ville compacte et accessible à pied.",
      },
    },
  },
  {
    city: "Marrakech",
    country: "Morocco",
    summary:
      "Sensory overload in the best way — spice markets, riads, and the Atlas Mountains nearby.",
    image_url: null,
    tags: ["culture", "budget", "food", "warm", "romantic"],
    source_flag: "curated",
    translations: {
      en: {
        city: "Marrakech",
        country: "Morocco",
        summary:
          "Sensory overload in the best way — spice markets, riads, and the Atlas Mountains nearby.",
      },
      es: {
        city: "Marrakech",
        country: "Marruecos",
        summary:
          "Una sobrecarga sensorial en el mejor sentido — mercados de especias, riads y las montañas del Atlas cerca.",
      },
      fr: {
        city: "Marrakech",
        country: "Maroc",
        summary:
          "Une surcharge sensorielle dans le meilleur sens — marchés d'épices, riads et les montagnes de l'Atlas à proximité.",
      },
    },
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
