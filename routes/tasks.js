const express = require("express");
const { createTask, getTasksByUserId } = require("../models/task");
const router = express.Router();
const { authenticateToken } = require("./auth.js"); // Ensure this is importing the correct middleware

// Create a new task(NOT FIX)
router.post("/create", authenticateToken, async (req, res) => {
  const { title, completed } = req.body;
  try {
    const newTask = await createTask(title, completed, req.user.id);
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get tasks by user ID (NOT FIX)
router.get("/gettask", authenticateToken, async (req, res) => {
  try {
    const tasks = await getTasksByUserId(req.user.id);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Additional routes (e.g., fetching a task, updating, deleting) can be implemented similarly.

module.exports = router;
