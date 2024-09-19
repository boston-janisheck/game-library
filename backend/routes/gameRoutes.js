const express = require("express");
const router = express.Router();
const Token = require("../models/tokens");
const Bux = require("../models/bux");
const SpinLogs = require("../models/spinLogs");

// ----------------[ Token Endpoints (Ensuring Proper `upsert()`) ]------------------ //

// Get user's token balance by userId
router.get("/tokens/:userId", async (req, res) => {
  try {
    const tokens = await Token.findOne({
      where: { userId: req.params.userId },
    });
    if (tokens) {
      return res.json(tokens); // Respond with found token balance
    } else {
      return res.status(404).json({ message: "User not found." });
    }
  } catch (err) {
    console.error("Error fetching tokens:", err);
    return res.status(500).json({ error: err.message });
  }
});

// Save or update a user's tokens
router.post("/tokens", async (req, res) => {
  const { userId, balance } = req.body;

  if (balance === null || isNaN(balance)) {
    return res.status(400).json({ error: "Invalid token balance" });
  }

  try {
    // Use `upsert()` to update existing user tokens
    const [tokenRecord, created] = await Token.upsert({
      userId, // Reference by unique userId
      balance, // Update token balance or create new record
    });

    return res.json({
      tokenRecord,
      created,
      message: created ? "Record created" : "Record updated",
    });
  } catch (error) {
    console.error("Error saving tokens:", error);
    return res.status(500).json({ error: "Failed to save tokens" });
  }
});

// ----------------[ Bux Endpoints (Fixing to Handle `upsert()` Properly) ]------------------ //

// Get user's bux balance by userId
router.get("/bux/:userId", async (req, res) => {
  try {
    const bux = await Bux.findOne({ where: { userId: req.params.userId } });
    if (bux) {
      return res.json(bux); // Return found bux balance
    } else {
      return res.status(404).json({ message: "User not found." });
    }
  } catch (err) {
    console.error("Error fetching bux:", err);
    return res.status(500).json({ error: err.message });
  }
});

// Save or update user's bux (fixing upsert flow)
router.post("/bux", async (req, res) => {
  const { userId, allPoints } = req.body;

  if (allPoints === null || isNaN(allPoints)) {
    return res.status(400).json({ error: "Invalid bux balance" });
  }

  try {
    // Use upsert, just like for tokens, to manage bux updates
    const [buxRecord, created] = await Bux.upsert({
      userId, // Reference userId
      balance: allPoints, // Store allPoints as balance for Bux
    });

    return res.json({
      buxRecord,
      created,
      message: created ? "Record created" : "Record updated",
    });
  } catch (error) {
    console.error("Error saving bux:", error);
    return res.status(500).json({ error: "Failed to save bux" });
  }
});

// ----------------[ SpinLogs Endpoints: Properly Manage Spins ]------------------ //

// Get user's spin logs using userId
router.get("/spinLogs/:userId", async (req, res) => {
  try {
    const spins = await SpinLogs.findAll({
      where: { userId: req.params.userId },
    });
    return res.json(spins);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Log a spin result for the user
router.post("/spinLogs", async (req, res) => {
  const { userId, spinScore } = req.body;

  try {
    const newSpin = await SpinLogs.create({
      userId: userId,
      spinScore: spinScore, // Save spin score
    });

    return res.json(newSpin);
  } catch (err) {
    console.error("Error saving spin log:", err);
    return res.status(500).json({ error: "Error saving spin log" });
  }
});

module.exports = router;
