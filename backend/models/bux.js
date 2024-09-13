const mongoose = require("mongoose");

const buxSchema = new mongoose.Schema({
  userId: String,
  bux: Number,
});

module.exports = mongoose.model("BUX", buxSchema);
