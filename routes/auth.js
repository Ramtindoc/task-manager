const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registerUser, findUser } = require("../models/User");
const { createTask, getTasksByUserId } = require("../models/task");
const router = express.Router();
require("dotenv").config();

let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
let jwtSecretKey = process.env.JWT_SECRET_KEY;

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const token = req.headers[tokenHeaderKey]?.split(" ")[1]; // Get token from Authorization header

  if (!token) {
    res.status(403).json({ error: "No token provided" }); // Only send this response once
    console.log(req.headers);
  }

  jwt.verify(token, jwtSecretKey, (err, user) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized" }); // Only send this response once
    }
    req.user = user; // Attach user info to request object
    next(); // Proceed to the next middleware/route handler
  });
};

// Register from user to sign up
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await registerUser(username, hashedPassword);
    res.status(201).json({ message: "User registered successfully", userId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await findUser(username);
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    //   expiresIn: "1h",
    // });

    const token = jwt.sign({ id: user.id }, jwtSecretKey, {
      expiresIn: "1h",
    });
    return res.json({ token }); // send a token to login with JWT
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = {
  authenticateToken,
  router,
};
