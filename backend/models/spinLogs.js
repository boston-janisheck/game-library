const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const SpinLogs = sequelize.define(
  "SpinLogs",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    outcome: {
      type: DataTypes.STRING, // Assuming outcome is stored as a string
      allowNull: false,
    },
    dateTime: {
      type: DataTypes.DATE, // Stores timestamp of when the spin occurred
      allowNull: false,
    },
  },
  {
    tableName: "spinlogs",
    timestamps: true, // This will add 'createdAt' and 'updatedAt' fields
  }
);

module.exports = SpinLogs;
