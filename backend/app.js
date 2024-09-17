const express = require("express");
const { Sequelize } = require("sequelize");
require("dotenv").config();
const Tokens = require("./models/tokens");
const Bux = require("./models/bux");
const SpinLogs = require("./models/spinLogs");

// Import the routes
const gameRoutes = require("./routes/gameRoutes");

const app = express();

// Express JSON parsing middleware
app.use(express.json()); // This needs to come before any routes that will use it

// Initialize Sequelize instance (make sure you've configured it correctly in .env)
const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
  }
);

// Sync models (synchronize your models with the database)
sequelize.sync().then(() => {
  console.log("Database synchronized.");
});

// POST endpoint to store tokens
app.post("/tokens", async (req, res) => {
  try {
    const newToken = await Tokens.create({
      userId: req.body.userId,
      balance: req.body.balance,
    });
    res.status(201).send(newToken);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error storing tokens: " + error.message);
  }
});

// POST endpoint to store bux
app.post("/bux", async (req, res) => {
  try {
    const newBux = await Bux.create({
      userId: req.body.userId,
      balance: req.body.balance,
    });
    res.status(201).send(newBux);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error storing bux: " + error.message);
  }
});

// POST endpoint to store spin logs
app.post("/spinlogs", async (req, res) => {
  try {
    const newSpinLog = await SpinLogs.create({
      userId: req.body.userId,
      outcome: req.body.outcome,
      dateTime: req.body.dateTime,
    });
    res.status(201).send(newSpinLog);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error storing spin logs: " + error.message);
  }
});

// Use your defined routes
app.use("/api/game", gameRoutes);

// Basic home route for testing
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
