const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: __dirname + "/server/.env" });

const UserModel = require("./models/Users");

// connecting to db
// listening to port
mongoose
  .connect(process.env.MONGODB_URI)
  .then((result) => {
    app.listen(3001, () => {
      console.log("server running");
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/getUsers", (req, res) => {
  UserModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});
