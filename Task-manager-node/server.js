
require("dotenv").config();

const express = require("express");
const connectDB = require("./db");
const authMiddleware = require("./middleware/authMiddleware");
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const ratingRoutes = require("./routes/ratingRoutes");
const settingsRoutes = require("./routes/settingsRoutes");

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

function normalizeOrigin(url) {
  return url.trim().replace(/\/+$/, "");
}

const allowedOrigins = [
  "http://localhost:5173",
  ...(process.env.FRONTEND_URL || "")
    .split(",")
    .map(normalizeOrigin)
    .filter(Boolean)
];

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (origin && allowedOrigins.includes(normalizeOrigin(origin))) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }

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

app.use(express.json({ limit: "5mb" }));

// ===============================
// Authentication and Other Routes
// ===============================

app.use("/auth", authRoutes);
app.use("/categories", categoryRoutes);
app.use("/ratings", ratingRoutes);
app.use("/settings", settingsRoutes);

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
    console.error("Get tasks error:", error.message);
    res.status(500).json({
      message: "Failed to get tasks"
    });
  }
});

// ===============================
// POST Add Task
// ===============================

app.post("/tasks", authMiddleware, async (req, res) => {
  try {
    const { text, reminderAt, categoryId } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({
        message: "Task text is required"
      });
    }

    const newTask = await addTask(
      text,
      req.userId,
      reminderAt,
      categoryId
    );

    res.status(201).json(newTask);
  } catch (error) {
    console.error("Add task error:", error.message);
    res.status(500).json({
      message: "Failed to add task"
    });
  }
});

// ===============================
// PUT Edit Task
// ===============================

app.put("/tasks/:id", authMiddleware, async (req, res) => {
  try {
    const { text, reminderAt, categoryId } = req.body;

    const updatedTask = await editTask(
      req.params.id,
      text,
      req.userId,
      reminderAt,
      categoryId
    );

    if (!updatedTask) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.json(updatedTask);
  } catch (error) {
    console.error("Edit task error:", error.message);
    res.status(500).json({
      message: "Failed to edit task"
    });
  }
});

// ===============================
// PATCH Complete / Uncomplete
// ===============================

app.patch("/tasks/:id", authMiddleware, async (req, res) => {
  try {
    const updatedTask = await toggleTask(
      req.params.id,
      req.userId
    );

    if (!updatedTask) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.json(updatedTask);
  } catch (error) {
    console.error("Toggle task error:", error.message);
    res.status(500).json({
      message: "Failed to update task"
    });
  }
});

// ===============================
// DELETE One Task
// ===============================

app.delete("/tasks/:id", authMiddleware, async (req, res) => {
  try {
    const deletedTask = await deleteTask(
      req.params.id,
      req.userId
    );

    if (!deletedTask) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.json({
      message: "Task deleted successfully"
    });
  } catch (error) {
    console.error("Delete task error:", error.message);
    res.status(500).json({
      message: "Failed to delete task"
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
    console.error("Clear tasks error:", error.message);
    res.status(500).json({
      message: "Failed to delete all tasks"
    });
  }
});

// ===============================
// Start Server
// ===============================

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectDB();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Express server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
}

startServer();
