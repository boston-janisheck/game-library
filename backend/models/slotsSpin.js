const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Import the shared Sequelize instance

const SlotsSpin = sequelize.define("SlotsSpin", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  spinScore: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = SlotsSpin;
