const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

const knex = require("../config/db");

router.post("/register", async (req, res) => {
  try {
    const { user, password } = req.body;
    if (!user || !password)
      return res.status(400).json({ message: "user and password required" });

    const [existing] = await knex("users").where({ username: user });
    if (existing)
      return res.status(400).json({ message: "user already exists" });

    const hashPass = await bcrypt.hash(password, 10);

    await knex("users").insert({
      username: user,
      password: hashPass,
    });

    res.status(201).json({
      message: "user registered succesfully as an inventory manager ",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "server error", details: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { user, password } = req.body;

    const [myUser] = await knex("users").where({ username: user });
    if (!myUser) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, myUser.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ username: myUser.username }, "JWT_SECRET", {
      expiresIn: "1h",
    });

    res.status(201).json({ token, message: "Login successful!" });
  } catch {
    res.status(500).json({ message: "server error" });
  }
});

function authenticate(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) return res.status(401).json({ message: "Access denied" });
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "no token" });
  }

  jwt.verify(token, "JWT_SECRET", (err, decodedUser) => {
    if (err) {
      return res.status(401).json({ message: "invalid token" });
    }
    req.user = decodedUser;
    next();
  });
}

module.exports = { authRouter: router, authToken: authenticate };
