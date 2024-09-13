const express = require("express");
const app = express();
const PORT = process.env.PORT || 5001;

// Import the routes
const gameRoutes = require("./routes/gameRoutes");

// Middleware to parse incoming JSON
app.use(express.json());

// Use the game routes
app.use("/api/game", gameRoutes);

// Basic route for testing
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
