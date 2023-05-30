const express = require("express");

const app = express();

const UserModel = require("./models/Users");
const mongoose = require("mongoose");
require("dotenv").config();

app.use(express.json());
// connecting to db
// listening to port
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    app.listen(3001, () => {
      console.log("server running");
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/getUsers", async (req, res) => {
  const users = await UserModel.find({});
  res.json(users);
});

app.post("/createUser", async (req, res) => {
  const user = req.body;
  const newUser = new UserModel(user);
  await newUser.save();
  res.json(user);
});
