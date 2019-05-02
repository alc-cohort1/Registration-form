const express = require("express");
const parser = require("body-parser");
const mysql = require("mysql");

const app = express();

app.use(express.static("./templates"));

// middleware
app.use(parser.urlencoded({ extended: false }));

const getConnection = mysql.createConnection({
  host: "localhost",
  user: "julius",
  database: "julius3",
  password: "123456"
});

getConnection.connect(err => {
  if (err) {
    throw err;
  }
  console.log("Connected to the database");
});

// This routes post users to the database
app.post("/user_create", (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const password = req.body.password;
  const queryString =
    "INSERT INTO `users` (`firstName`, `lastName`, `password`) VALUES (?, ?, ?)";
  getConnection.query(
    queryString,
    [firstName, lastName, password],
    (err, result, field) => {
      if (err) {
        console.log("an error has occured " + err);
        res.status(500);
        return;
      }
    }
  );
});

// This routes post registration form to the database
app.post("/user_register", (req, res) => {
  const userId = req.body.userId;
  const password = req.body.password;
  const name = req.body.name;
  const address = req.body.address;
  const country = req.body.country;
  const zipCode = req.body.zipCode;
  const email = req.body.email;
  const gender = req.body.gender;
  const language = req.body.language;
  const about = req.body.about;
  const queryString =
    "INSERT INTO `regtable` (`userId`, `password`, `name`, `address`, `country`, `zipCode`, `email`, `gender`, `language`, `about`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  getConnection.query(
    queryString,
    [
      userId,
      password,
      name,
      address,
      country,
      zipCode,
      email,
      gender,
      language,
      about
    ],
    (err, result, field) => {
      if (err) {
        console.log("an error has occured " + err);
        res.status(500);
        return;
      }
    }
  );
});

// // THis route gets all the user from the database
// app.get("/users", (req, res) => {
//   const sql = "SELECT * FROM users";
//   getConnection.query(sql, (err, result) => {
//     if (err) throw err;
//     res.send(result);
//     result.forEach(row => {
//       console.log(`${row.username} is in ${row.location}`);
//     });
//   });
// });

const PORT = process.env.PORT || 3000;

// Binding to a port
app.listen(PORT, () => {
  console.log(`Express server started at port ${PORT}`);
});
