const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  userId: String,
  tokens: Number,
});

module.exports = mongoose.model("Token", tokenSchema);
