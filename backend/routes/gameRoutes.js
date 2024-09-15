const express = require("express");
const router = express.Router();
const Token = require("../models/tokens");
const Bux = require("../models/bux");
const SlotsSpin = require("../models/slotsSpin");

// ----------------[ Token Endpoints ]------------------ //

// Get user's tokens
router.get("/tokens/:userId", async (req, res) => {
  try {
    const tokens = await Token.findOne({
      where: { userId: req.params.userId },
    });
    if (tokens) {
      return res.json(tokens);
    } else {
      return res.status(404).json({ message: "User not found." });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Update or create user's tokens
router.post("/tokens", async (req, res) => {
  const { userId, tokens } = req.body;
  try {
    const [token, created] = await Token.upsert({ userId, tokens });
    return res.json({ token, created });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// ----------------[ Bux Endpoints ]------------------ //

// Get user's bux balance
router.get("/bux/:userId", async (req, res) => {
  try {
    const bux = await Bux.findOne({ where: { userId: req.params.userId } });
    if (bux) {
      return res.json(bux);
    } else {
      return res.status(404).json({ message: "User not found." });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Update or create user's bux
router.post("/bux", async (req, res) => {
  const { userId, bux } = req.body;
  try {
    const [buxRecord, created] = await Bux.upsert({ userId, bux });
    return res.json({ buxRecord, created });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// ----------------[ SlotsSpin Endpoints ]------------------ //

// Get user's slot spins
router.get("/slotsSpin/:userId", async (req, res) => {
  try {
    const spins = await SlotsSpin.findAll({
      where: { userId: req.params.userId },
    });
    return res.json(spins);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Create a spin result for the user
router.post("/slotsSpin", async (req, res) => {
  const { userId, spinScore } = req.body;
  try {
    const spin = await SlotsSpin.create({ userId, spinScore });
    return res.json(spin);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
