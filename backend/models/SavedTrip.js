const mongoose = require("mongoose");

const savedTripSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  // String ID from the hardcoded activities data (not a MongoDB ObjectId)
  activity_id: {
    type: String,
    required: true,
  },
  // Snapshot of key activity fields at save time so the card
  // still renders correctly if the source data ever changes
  activity_snapshot: {
    name: { type: String, default: "" },
    city: { type: String, default: "" },
    price: {
      amount: { type: Number, default: 0 },
      currencyCode: { type: String, default: "CAD" },
    },
    thumbnail: { type: String, default: null },
    categories: { type: [String], default: [] },
    minimumDuration: { type: String, default: null },
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// Prevent a user from saving the same activity twice
savedTripSchema.index({ user_id: 1, activity_id: 1 }, { unique: true });

module.exports = mongoose.model("SavedTrip", savedTripSchema);
