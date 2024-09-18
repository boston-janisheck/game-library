const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Bux = sequelize.define(
  "Bux",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    balance: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "bux",
    timestamps: true, // This will add 'createdAt' and 'updatedAt' fields
  }
);

module.exports = Bux;
