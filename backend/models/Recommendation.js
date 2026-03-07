const mongoose = require("mongoose");

const recommendationSchema = new mongoose.Schema({
  search_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SearchRequest",
    required: true,
    index: true,
  },
  destination_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Destination",
    required: true,
  },
  indicative_price: {
    type: Number,
    default: null,
  },
  date_window: {
    start: { type: Date, default: null },
    end: { type: Date, default: null },
  },
  provider_name: {
    type: String,
    default: null,
  },
  value_score: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  redirect_url: {
    type: String,
    default: null,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Recommendation", recommendationSchema);
