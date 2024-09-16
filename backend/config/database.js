require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME, // Be sure these match exactly with your .env file keys
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, // Ensure this is set to '5433'
    dialect: "postgres", // Confirm the dialect is set to 'postgres'
    logging: false,
  }
);

module.exports = sequelize;
