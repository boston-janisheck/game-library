const { Sequelize } = require("sequelize");
require("dotenv").config();

// Initialize the Sequelize instance using values from .env
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || "localhost", // Defaulting to localhost if DB_HOST isn't set
    dialect: "postgres",
    logging: false, // Optional: Disable Sequelize logging queries to console
  }
);

// Export the `sequelize` instance to use in models
module.exports = sequelize;
