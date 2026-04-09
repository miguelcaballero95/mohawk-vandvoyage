require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());

// Connect to MongoDB
connectDB();

// Health check route
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "vandvoyage" });
});

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/destinations", require("./routes/destinations"));
app.use("/api/saved-trips", require("./routes/savedTrips"));

app.listen(PORT, () => {
  console.log(`VandVoyage server running on port ${PORT}`);
});
