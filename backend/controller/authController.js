const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

const knex = require("../config/db");

router.post("/login", async (req, res) => {
  const { user, password } = req.body;

  const myUser = await knex("users").where({ username: user });
  if (!myUser) return res.status(400).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, myUser.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ username: user.username }, "test_secret_key", {
    expiresIn: "1h",
  });

  res.json({ token, message: "Login successful!" });
});

module.exports = router;
