const Task = require("../models/Task");

// =========================
// Get user's tasks
// =========================

const getTasks = async (userId) => {
  return await Task.find({ userId }).sort({ createdAt: -1 });
};


// =========================
// Add task
// =========================

const addTask = async (text, userId) => {
  const newTask = await Task.create({
    text: text,
    completed: false,
    userId: userId
  });

  return newTask;
};


// =========================
// Edit task
// =========================

const editTask = async (id, text, userId) => {
  return await Task.findOneAndUpdate(
    {
      _id: id,
      userId: userId
    },
    {
      text: text
    },
    {
      new: true
    }
  );
};


// =========================
// Toggle task
// =========================

const toggleTask = async (id, userId) => {
  const task = await Task.findOne({
    _id: id,
    userId: userId
  });

  if (!task) {
    return null;
  }

  task.completed = !task.completed;

  await task.save();

  return task;
};


// =========================
// Delete one task
// =========================

const deleteTask = async (id, userId) => {
  return await Task.findOneAndDelete({
    _id: id,
    userId: userId
  });
};


// =========================
// Delete all user's tasks
// =========================

const clearTasks = async (userId) => {
  return await Task.deleteMany({
    userId: userId
  });
};


// =========================
// Export
// =========================

module.exports = {
  getTasks,
  addTask,
  editTask,
  toggleTask,
  deleteTask,
  clearTasks
};