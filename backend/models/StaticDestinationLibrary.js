const mongoose = require("mongoose");

const staticDestinationLibrarySchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
    trim: true,
  },
  country: {
    type: String,
    required: true,
    trim: true,
  },
  summary: {
    type: String,
    default: "",
  },
  image_url: {
    type: String,
    default: null,
  },
  tags: {
    type: [String],
    default: [],
  },
  source_flag: {
    type: String,
    enum: ["curated", "imported", "generated"],
    default: "curated",
  },
  last_reviewed_at: {
    type: Date,
    default: Date.now,
  },
});

staticDestinationLibrarySchema.index({ tags: 1 });
staticDestinationLibrarySchema.index({ city: 1, country: 1 });

module.exports = mongoose.model(
  "StaticDestinationLibrary",
  staticDestinationLibrarySchema
);
