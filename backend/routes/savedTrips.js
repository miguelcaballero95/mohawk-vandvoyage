const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const User = require("../models/User");
const SavedTrip = require("../models/SavedTrip");

// Helper — verifies Firebase idToken and returns the matching User from MongoDB.
// Returns null and sends a 401 if the token is invalid or the user is not found.
async function authenticate(req, res) {
  const { idToken } = req.body || req.query;

  if (!idToken) {
    res.status(401).json({ error: "idToken is required" });
    return null;
  }

  let decoded;
  try {
    decoded = await admin.auth().verifyIdToken(idToken);
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
    return null;
  }

  const user = await User.findOne({ auth_provider_id: decoded.uid });
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return null;
  }

  return user;
}

// POST /api/saved-trips
// Save an activity to the user's account.
// Body: { idToken, activity_id, activity_snapshot }
router.post("/", async (req, res) => {
  const user = await authenticate(req, res);
  if (!user) return;

  const { activity_id, activity_snapshot } = req.body;

  console.log("Save trip request — activity_id:", activity_id, "| user._id:", user._id);

  if (!activity_id) {
    return res.status(400).json({ error: "activity_id is required" });
  }

  try {
    const count = await SavedTrip.countDocuments({ user_id: user._id });
    if (count >= 5) {
      return res.status(400).json({ error: "You can save a maximum of 5 trips" });
    }

    const saved = await SavedTrip.create({
      user_id: user._id,
      activity_id,
      activity_snapshot: activity_snapshot || {},
    });

    res.status(201).json({ saved });
  } catch (err) {
    // Duplicate key error — activity already saved by this user
    if (err.code === 11000) {
      console.log("Duplicate key error — keyPattern:", err.keyPattern, "keyValue:", err.keyValue);
      return res.status(409).json({ error: "Activity already saved" });
    }
    console.error("Save trip error:", err);
    res.status(500).json({ error: "Server error saving trip" });
  }
});

// GET /api/saved-trips
// Get all saved trips for the authenticated user.
// Query: { idToken }
router.get("/", async (req, res) => {
  // For GET requests, idToken comes from query params
  const { idToken } = req.query;
  const user = await authenticate({ body: { idToken }, query: { idToken } }, res);
  if (!user) return;

  try {
    const savedTrips = await SavedTrip.find({ user_id: user._id }).sort({ created_at: -1 });
    res.json({ savedTrips });
  } catch (err) {
    console.error("Get saved trips error:", err);
    res.status(500).json({ error: "Server error fetching saved trips" });
  }
});

// DELETE /api/saved-trips/:activity_id
// Remove a saved activity from the user's account.
// Body: { idToken }
router.delete("/:activity_id", async (req, res) => {
  const user = await authenticate(req, res);
  if (!user) return;

  try {
    const result = await SavedTrip.findOneAndDelete({
      user_id: user._id,
      activity_id: req.params.activity_id,
    });

    if (!result) {
      return res.status(404).json({ error: "Saved trip not found" });
    }

    res.json({ message: "Trip removed from saved" });
  } catch (err) {
    console.error("Delete saved trip error:", err);
    res.status(500).json({ error: "Server error removing saved trip" });
  }
});

// GET /api/saved-trips/check/:activity_id
// Check if a specific activity is saved by the user.
// Useful for the frontend to show a filled/outlined bookmark icon.
// Query: { idToken }
router.get("/check/:activity_id", async (req, res) => {
  const { idToken } = req.query;
  const user = await authenticate({ body: { idToken }, query: { idToken } }, res);
  if (!user) return;

  try {
    const saved = await SavedTrip.findOne({
      user_id: user._id,
      activity_id: req.params.activity_id,
    });

    res.json({ saved: !!saved });
  } catch (err) {
    console.error("Check saved trip error:", err);
    res.status(500).json({ error: "Server error checking saved trip" });
  }
});

module.exports = router;
