const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Import the shared Sequelize instance

const Bux = sequelize.define("Bux", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bux: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

module.exports = Bux;
