const mongoose = require("mongoose");

const passwordResetTokenSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  token_hash: {
    type: String,
    required: true,
  },
  issued_at: {
    type: Date,
    default: Date.now,
  },
  expires_at: {
    type: Date,
    required: true,
  },
  used_flag: {
    type: Boolean,
    default: false,
  },
});

// Auto-cleanup expired tokens
passwordResetTokenSchema.index({ expires_at: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model(
  "PasswordResetToken",
  passwordResetTokenSchema
);
