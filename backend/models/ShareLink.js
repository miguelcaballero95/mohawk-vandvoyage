const mongoose = require("mongoose");
const crypto = require("crypto");

const shareLinkSchema = new mongoose.Schema({
  saved_trip_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SavedTrip",
    required: true,
  },
  public_token: {
    type: String,
    required: true,
    unique: true,
    default: () => crypto.randomBytes(16).toString("hex"),
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  expires_at: {
    type: Date,
    required: true,
  },
});

shareLinkSchema.index({ expires_at: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("ShareLink", shareLinkSchema);
