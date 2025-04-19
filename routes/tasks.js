// tasks.js
const express = require("express");
const { createTask, getTasksByUserId } = require("../models/task");
const router = express.Router();
const auth = require("./auth.js");

// create a new task
router.post("/create", auth, async (req, res) => {
  const { title, completed } = req.body;
  try {
    const newTask = await createTask(title, completed, req.user.id);
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// گرفتن همه تسک‌ها
router.get("/gettask", auth, async (req, res) => {
  try {
    const tasks = await getTasksByUserId(req.user.id);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// سایر مسیرها (گرفتن یک تسک، به‌روزرسانی، حذف) را نیز می‌توانید به همین صورت پیاده‌سازی کنید.

module.exports = router;
