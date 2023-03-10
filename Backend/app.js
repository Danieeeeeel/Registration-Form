const express = require("express");
const app = express();
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 3001;

// handling parse URLECONDED form
// app.use(bodyParser.urlencoded({ extended: false }));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "pass123",
  database: "final",
  multipleStatements: true,
});

// handles parsing JSON data from frontend
app.use(bodyParser.json());

// cors
app.use(cors());

// CRUD Application
// CREATE (insert)
app.post("/register", (req, res) => {
  const { firstname, lastname, email, mobile, tupstudent, address, message } =
    req.body;

  // insert to database
  connection.query(
    "INSERT INTO registrationform (firstname, lastname, email, mobile, tupstudent, address, message) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [firstname, lastname, email, mobile, tupstudent, address, message],
    (err, results) => {
      try {
        if (results.affectedRows > 0) {
          res.json({ message: "Data has been added!" });
        } else if (err) {
          res.json({ message: err });
        } else {
          res.json({ message: "Something went wrong!" });
        }
      } catch (err) {
        res.json({ message: err });
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
