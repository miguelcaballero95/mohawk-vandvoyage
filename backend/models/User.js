const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    display_name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password_hash: {
      type: String,
      default: null, // null when using OAuth
    },
    preferred_language: {
      type: String,
      default: "en",
    },
    preferred_currency: {
      type: String,
      default: "CAD",
    },
    home_airport: {
      type: String,
      default: null,
    },
    consent_flags: {
      terms_accepted: { type: Boolean, default: false },
      marketing_opt_in: { type: Boolean, default: false },
    },
    auth_provider: {
      type: String,
      enum: ["local", "google", "apple", "facebook"],
      default: "local",
    },
    auth_provider_id: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("User", userSchema);
