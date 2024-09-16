const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const sequelize = require("./config/database"); // Ensure this path is correct

// Root URL message
app.get("/", (req, res) => {
  res.status(200).send("Welcome to the Game Library API!");
});

// Database connection test route
app.get("/api/test", async (req, res) => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    res
      .status(200)
      .send({
        message:
          "Connection to the database has been established successfully.",
      });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    res.status(500).send({ message: "Error connecting to database" });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
