const express = require("express");
const router = express.Router();

// Example route for handling tokens
router.get("/tokens", (req, res) => {
  // Replace this with actual data fetching logic later
  res.json({ tokens: 100 }); // Sending back a dummy token balance
});

// Route for updating tokens (after a game is played)
router.post("/tokens", (req, res) => {
  const { tokens } = req.body;
  console.log(`Received new token balance: ${tokens}`);
  // Logic for saving the tokens will go here (using a database later)
  res.json({ message: "Token balance updated successfully" });
});

// Route for logging a game result
router.post("/log-spin", (req, res) => {
  const { result, pointsWon } = req.body;
  console.log(`Spin result: ${result}, Points won: ${pointsWon}`);
  // Later, this can save to the database
  res.json({ message: "Spin logged successfully" });
});

module.exports = router;
