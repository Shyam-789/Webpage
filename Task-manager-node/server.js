const express = require("express");
const connectDB = require("./db");
const authMiddleware = require("./middleware/authMiddleware");
const authRoutes = require("./routes/authRoutes");

const {
  getTasks,
  addTask,
  editTask,
  toggleTask,
  deleteTask,
  clearTasks
} = require("./modules/taskManager");

const app = express();


// ===============================
// CORS
// ===============================

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "http://localhost:5173"
  );

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});


// ===============================
// JSON Middleware
// ===============================

app.use(express.json());


// ===============================
// Authentication Routes
// ===============================

app.use("/auth", authRoutes);


// ===============================
// Home Route
// ===============================

app.get("/", (req, res) => {
  res.send("Task Manager API is running");
});


// ===============================
// GET All Tasks
// ===============================

app.get("/tasks", authMiddleware, async (req, res) => {
  try {
   const tasks = await getTasks(req.userId);

    res.json(tasks);

  } catch (error) {
    res.status(500).json({
      message: "Failed to get tasks",
      error: error.message
    });
  }
});


// ===============================
// POST Add Task
// ===============================

app.post("/tasks", authMiddleware, async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        message: "Task text is required"
      });
    }

   const newTask = await addTask(text, req.userId);

    res.status(201).json(newTask);

  } catch (error) {
    res.status(500).json({
      message: "Failed to add task",
      error: error.message
    });
  }
});


// ===============================
// PUT Edit Task
// ===============================

app.put("/tasks/:id", authMiddleware, async (req, res) => {
  try {
    const { text } = req.body;

    const updatedTask = await editTask(req.params.id, text, req.userId);

    if (!updatedTask) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.json(updatedTask);

  } catch (error) {
    res.status(500).json({
      message: "Failed to edit task",
      error: error.message
    });
  }
});


// ===============================
// PATCH Complete / Uncomplete
// ===============================

app.patch("/tasks/:id", authMiddleware, async (req, res) => {
  try {
    const updatedTask = await toggleTask(req.params.id, req.userId);

    if (!updatedTask) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.json(updatedTask);

  } catch (error) {
    res.status(500).json({
      message: "Failed to update task",
      error: error.message
    });
  }
});


// ===============================
// DELETE One Task
// ===============================

app.delete("/tasks/:id", authMiddleware, async (req, res) => {
  try {
    const deletedTask = await deleteTask(req.params.id, req.userId);

    if (!deletedTask) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.json({
      message: "Task deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to delete task",
      error: error.message
    });
  }
});


// ===============================
// DELETE All Tasks
// ===============================

app.delete("/tasks", authMiddleware, async (req, res) => {
  try {
    await clearTasks(req.userId);

    res.json({
      message: "All tasks deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to delete all tasks",
      error: error.message
    });
  }
});


// ===============================
// Connect MongoDB
// ===============================

connectDB();


// ===============================
// Start Server
// ===============================

app.listen(3000, () => {
  console.log(
    "Express server running at http://localhost:3000"
  );
});