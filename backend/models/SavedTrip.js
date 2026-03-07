const mongoose = require("mongoose");

const savedTripSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  recommendation_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recommendation",
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// Prevent duplicate saves
savedTripSchema.index({ user_id: 1, recommendation_id: 1 }, { unique: true });

module.exports = mongoose.model("SavedTrip", savedTripSchema);
