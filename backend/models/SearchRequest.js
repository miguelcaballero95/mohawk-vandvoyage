const mongoose = require("mongoose");

const searchRequestSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null, // nullable for guest searches
  },
  mood_keyword: {
    type: String,
    required: true,
    trim: true,
  },
  origin: {
    type: String,
    required: true,
    trim: true,
  },
  date_range: {
    start: { type: Date, default: null },
    end: { type: Date, default: null },
  },
  budget_ceiling: {
    type: Number,
    default: null,
  },
  travelers_count: {
    type: Number,
    default: 1,
    min: 1,
  },
  baggage_preference: {
    type: String,
    enum: ["carry_on", "checked", "none", null],
    default: null,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

searchRequestSchema.index({ user_id: 1, created_at: -1 });

module.exports = mongoose.model("SearchRequest", searchRequestSchema);
