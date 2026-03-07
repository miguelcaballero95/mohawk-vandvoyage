require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "vandvoyage" });
});

// Routes
app.use("/api/destinations", require("./routes/destinations"));

app.listen(PORT, () => {
  console.log(`VandVoyage server running on port ${PORT}`);
});
