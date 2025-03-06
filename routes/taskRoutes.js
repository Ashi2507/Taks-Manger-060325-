const express = require("express");
const Task = require("../models/Task");

const router = express.Router();


router.post("/tasks", async (req, res) => {
  try {
    const { task_name } = req.body;
    if (!task_name) {
      return res.status(400).json({ error: "Task Name" });
    }

    const newTask = new Task({ task_name });
    await newTask.save();
    res.status(201).json({ message: "Add task Name", task: newTask });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.put("/tasks/:id", async (req, res) => {
  try {
    const { task_name } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { task_name },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "not found task" });
    }
    res.json({ message: "updated task", task: updatedTask });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.delete("/tasks/:id", async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ error: "not found task" });
    }
    res.json({ message: "deletd task" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
