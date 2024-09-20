const express = require("express");
const router = express.Router();
const Token = require("../models/tokens"); // Correct path based on filename
const Bux = require("../models/bux"); // Correct path based on filename

// ----------------[ TOKEN ENDPOINTS ]------------------ //

// Get user's tokens by userId
router.get("/tokens/:userId", async (req, res) => {
  try {
    console.log(`Fetching tokens for userId: ${req.params.userId}`);

    const tokens = await Token.findOne({
      where: { userId: req.params.userId },
    });

    if (tokens) {
      console.log("Fetched tokens:", tokens.dataValues);
      return res.json(tokens); // Return the found token balance
    } else {
      console.warn("User not found for tokens fetch:", req.params.userId);
      return res.status(404).json({ message: "User not found." });
    }
  } catch (err) {
    console.error("Error fetching tokens:", err);
    return res.status(500).json({ error: err.message });
  }
});

// Save or update user's tokens
router.post("/tokens", async (req, res) => {
  const { userId, balance } = req.body;

  console.log("Received tokens payload:", { userId, balance });

  if (balance === null || isNaN(balance)) {
    console.error("Invalid token balance:", { balance });
    return res.status(400).json({ error: "Invalid token balance" });
  }

  try {
    const token = await Token.findOne({ where: { userId } });

    if (token) {
      console.log("Updating existing token for user:", userId);
      await Token.update({ balance }, { where: { userId } });
      console.log("Token updated:", { userId, balance });
      return res.json({ message: "Token updated" });
    } else {
      console.log("Creating a new token record for user:", userId);
      await Token.create({ userId, balance });
      console.log("Token created:", { userId, balance });
      return res.json({ message: "Token created" });
    }
  } catch (error) {
    console.error("Error saving tokens:", error);
    return res.status(500).json({ error: "Failed to save tokens" });
  }
});

// ----------------[ BUX ENDPOINTS ] ------------------ //

// Get user's bux balance by userId
router.get("/bux/:userId", async (req, res) => {
  try {
    console.log(`Fetching bux for userId: ${req.params.userId}`);

    const bux = await Bux.findOne({ where: { userId: req.params.userId } });
    if (bux) {
      console.log("Fetched bux:", bux.dataValues);
      return res.json(bux); // Return found bux balance
    } else {
      console.warn("User not found for bux fetch:", req.params.userId);
      return res.status(404).json({ message: "User not found." });
    }
  } catch (err) {
    console.error("Error fetching bux:", err);
    return res.status(500).json({ error: err.message });
  }
});

// Save or update user's bux
router.post("/bux", async (req, res) => {
  const { userId, allPoints } = req.body;
  console.log("Received bux payload:", { userId, allPoints });

  if (allPoints === null || isNaN(allPoints)) {
    console.error("Invalid bux balance:", { allPoints });
    return res.status(400).json({ error: "Invalid bux balance" });
  }

  try {
    const bux = await Bux.findOne({ where: { userId } });

    if (bux) {
      console.log("Updating existing bux for user:", userId);
      await Bux.update({ balance: allPoints }, { where: { userId } });
      console.log("Bux updated:", { userId, allPoints });
      return res.json({ message: "Bux updated" });
    } else {
      console.log("Creating a new bux record for user:", userId);
      await Bux.create({ userId, balance: allPoints });
      console.log("Bux created:", { userId, allPoints });
      return res.json({ message: "Bux created" });
    }
  } catch (error) {
    console.error("Error saving bux:", error);
    return res.status(500).json({ error: "Failed to save bux" });
  }
});

module.exports = router;
