const express = require("express");
const router = express.Router();
const Token = require("../models/tokens"); // Ensure correct path
const Bux = require("../models/bux"); // Ensure correct path

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
      return res.json(tokens);
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
    const [token, created] = await Token.upsert(
      { userId, balance },
      { returning: true }
    );

    if (created) {
      console.log("Token created:", token.dataValues);
      return res.status(201).json({ message: "Token created", token });
    } else {
      console.log("Token updated:", token.dataValues);
      return res.json({ message: "Token updated", token });
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
      return res.json(bux);
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
  const { userId, balance } = req.body;

  console.log("Received bux payload:", { userId, balance });

  if (balance === null || isNaN(balance)) {
    console.error("Invalid bux balance:", { balance });
    return res.status(400).json({ error: "Invalid bux balance" });
  }

  try {
    const [bux, created] = await Bux.upsert(
      { userId, balance },
      { returning: true }
    );

    if (created) {
      console.log("Bux created:", bux.dataValues);
      return res.status(201).json({ message: "Bux created", bux });
    } else {
      console.log("Bux updated:", bux.dataValues);
      return res.json({ message: "Bux updated", bux });
    }
  } catch (error) {
    console.error("Error saving bux:", error);
    return res.status(500).json({ error: "Failed to save bux" });
  }
});

module.exports = router;
