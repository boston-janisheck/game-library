const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/api/test", (req, res) => {
  // This endpoint will test the PostgreSQL connection
  pool.query("SELECT * FROM mytable", (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send({ message: "Error connecting to database" });
    }
    res.send(result.rows);
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
