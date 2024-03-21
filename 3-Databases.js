const express = require("express");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://anilcodes01:anilcodes01@cluster0.kbsq56y.mongodb.net/Dummy_user_app"
);

const app = express();
app.use(express.json());

const User = mongoose.model("Users", {
  name: String,
  email: String,
  password: String,
});

app.post("/signup", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    res.status(400).send({
      msg: "User already exists!",
    });
  }
  const user = new User({
    name: name,
    email: email,
    password: password,
  });

  user.save();
  res.json({
    msg: "User created successfully!",
  });
});

app.listen(3000, (req, res) => {
  console.log("Server app listening on port 3000...");
});
