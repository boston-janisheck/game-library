const mongoose = require("mongoose");

const slotsSpinSchema = new mongoose.Schema({
  userId: String,
  spinId: { type: Number, default: Date.now() },
  score: Number,
});

module.exports = mongoose.model("SlotsSpin", slotsSpinSchema);
