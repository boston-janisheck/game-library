const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Adjust the path as needed

const Tokens = sequelize.define(
  "Tokens",
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
    tableName: "tokens",
    timestamps: true,
  }
);

module.exports = Tokens;
