const express = require("express");
const app = express();
const PORT = process.env.PORT || 5001;
const { Pool } = require("pg");

const pool = new Pool({
  user: "myuser",
  host: "/var/run/postgresql", // or use a different host if you've configured it
  database: "game_library",
  password: "mypassword",
});

app.use(express.json());

const gameRoutes = require("./routes/gameRoutes");

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
