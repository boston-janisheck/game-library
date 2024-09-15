const express = require("express");
const app = express();
const { Sequelize } = require("sequelize");
require("dotenv").config();

// Import the routes
const gameRoutes = require("./routes/gameRoutes");

// Initialize Sequelize instance (you probably already did this)
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "postgres",
  }
);

// Sync models (synchronize your models with the database)
sequelize.sync().then(() => {
  console.log("Database synchronized.");
});

// Express middlewares
app.use(express.json());

// Use your defined routes
app.use("/api/game", gameRoutes);

// Basic home route for testing
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
