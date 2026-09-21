import { useState, useEffect } from "react";

import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";

import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const [showRegister, setShowRegister] = useState(false);

  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // =========================
  // LOAD TASKS
  // =========================

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    fetch("http://localhost:3000/tasks", {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load tasks");
        }

        return response.json();
      })
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => {
        console.log("Error loading tasks:", error);
      });
  }, [isLoggedIn]);

  // =========================
  // COUNTERS
  // =========================

  const completedCount = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingCount =
    tasks.length - completedCount;

  const completionPercentage =
    tasks.length === 0
      ? 0
      : Math.round(
          (completedCount / tasks.length) * 100
        );

  // =========================
  // ADD TASK
  // =========================

  const addTask = async (taskText) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:3000/tasks",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            text: taskText
          })
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add task");
      }

      const newTask = await response.json();

      setTasks((oldTasks) => [
        ...oldTasks,
        newTask
      ]);
    } catch (error) {
      console.log("Error adding task:", error);
    }
  };

  // =========================
  // TOGGLE TASK
  // =========================

  const toggleTask = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:3000/tasks/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      const updatedTask = await response.json();

      setTasks((oldTasks) =>
        oldTasks.map((task) =>
          task._id === id
            ? updatedTask
            : task
        )
      );
    } catch (error) {
      console.log("Error updating task:", error);
    }
  };

  // =========================
  // DELETE TASK
  // =========================

  const deleteTask = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:3000/tasks/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      setTasks((oldTasks) =>
        oldTasks.filter(
          (task) => task._id !== id
        )
      );
    } catch (error) {
      console.log("Error deleting task:", error);
    }
  };

  // =========================
  // EDIT TASK
  // =========================

  const editTask = async (id, newText) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:3000/tasks/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            text: newText
          })
        }
      );

      if (!response.ok) {
        throw new Error("Failed to edit task");
      }

      const updatedTask = await response.json();

      setTasks((oldTasks) =>
        oldTasks.map((task) =>
          task._id === id
            ? updatedTask
            : task
        )
      );
    } catch (error) {
      console.log("Error editing task:", error);
    }
  };

  // =========================
  // CLEAR TASKS
  // =========================

  const clearTasks = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:3000/tasks",
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        throw new Error("Failed to clear tasks");
      }

      setTasks([]);
    } catch (error) {
      console.log("Error clearing tasks:", error);
    }
  };

  // =========================
  // FILTER TASKS
  // =========================

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.text
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      (filter === "completed" && task.completed) ||
      (filter === "pending" && !task.completed);

    return matchesSearch && matchesFilter;
  });

  // =========================
  // AUTH PAGE
  // =========================

  if (!isLoggedIn) {
    return (
      <div className="auth-page">

        <div className="auth-background-circle circle-one"></div>
        <div className="auth-background-circle circle-two"></div>

        <div className="auth-layout">

          <div className="auth-brand">

            <div className="brand-logo">
              ✦ TASKFLOW
            </div>

            <h1>
              Organize your work.
              <br />
              <span>Get things done.</span>
            </h1>

            <p className="brand-description">
              A simple and powerful task manager
              designed to help you stay organized,
              focused and productive.
            </p>

            <div className="feature-list">

              <div className="feature">
                <div className="feature-icon">
                  ✓
                </div>

                <div>
                  <strong>
                    Manage your tasks
                  </strong>

                  <p>
                    Create, edit and organize your work.
                  </p>
                </div>
              </div>

              <div className="feature">
                <div className="feature-icon">
                  ✓
                </div>

                <div>
                  <strong>
                    Track your progress
                  </strong>

                  <p>
                    See completed and pending tasks.
                  </p>
                </div>
              </div>

              <div className="feature">
                <div className="feature-icon">
                  ✓
                </div>

                <div>
                  <strong>
                    Stay productive
                  </strong>

                  <p>
                    Keep everything in one place.
                  </p>
                </div>
              </div>

            </div>

          </div>

          <div className="auth-form-container">

            {showRegister ? (
              <Register
                onLoginClick={() =>
                  setShowRegister(false)
                }
              />
            ) : (
              <Login
                onLogin={() =>
                  setIsLoggedIn(true)
                }
                onRegisterClick={() =>
                  setShowRegister(true)
                }
              />
            )}

          </div>

        </div>

        <div className="auth-footer">
          © 2026 TaskFlow. Built for productivity.
        </div>

      </div>
    );
  }

  // =========================
  // MODERN DASHBOARD
  // =========================

  return (
    <div className="dashboard">

      <Navbar />

      <main className="dashboard-main">

        {/* TOP HEADER */}

        <header className="dashboard-header">

          <div>
            <p className="dashboard-label">
              OVERVIEW
            </p>

            <h1 className="dashboard-title">
              Good morning 👋
            </h1>

            <p className="dashboard-subtitle">
              Stay organized and get things done.
            </p>
          </div>

          <div className="header-date">
            <span>Today</span>
            <strong>
              {new Date().toLocaleDateString(
                "en-US",
                {
                  month: "short",
                  day: "numeric",
                  year: "numeric"
                }
              )}
            </strong>
          </div>

        </header>


        {/* STAT CARDS */}

        <section className="dashboard-stats">

          <div className="modern-stat-card">

            <div className="stat-top">
              <span className="stat-label">
                TOTAL TASKS
              </span>

              <div className="stat-icon purple">
                ✓
              </div>
            </div>

            <div className="stat-number">
              {tasks.length}
            </div>

            <p className="stat-description">
              Tasks in your workspace
            </p>

          </div>


          <div className="modern-stat-card">

            <div className="stat-top">
              <span className="stat-label">
                COMPLETED
              </span>

              <div className="stat-icon green">
                ✓
              </div>
            </div>

            <div className="stat-number">
              {completedCount}
            </div>

            <p className="stat-description">
              {completionPercentage}% completion rate
            </p>

          </div>


          <div className="modern-stat-card">

            <div className="stat-top">
              <span className="stat-label">
                PENDING
              </span>

              <div className="stat-icon orange">
                ◷
              </div>
            </div>

            <div className="stat-number">
              {pendingCount}
            </div>

            <p className="stat-description">
              Tasks remaining
            </p>

          </div>

        </section>


        {/* TASK SECTION */}

        <section className="tasks-section">

          <div className="tasks-header">

            <div>
              <p className="dashboard-label">
                WORKSPACE
              </p>

              <h2>
                My Tasks
              </h2>

              <p>
                Manage everything you need to get done.
              </p>
            </div>

            <div className="task-count">
              {tasks.length} tasks
            </div>

          </div>


          {/* SEARCH */}

          <div className="search-container">

            <span className="search-icon">
              ⌕
            </span>

            <input
              className="modern-search"
              type="text"
              placeholder="Search your tasks..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />

          </div>


          {/* FILTERS */}

          <div className="task-toolbar">

            <div className="modern-filters">

              <button
                className={
                  filter === "all"
                    ? "filter-button active"
                    : "filter-button"
                }
                onClick={() =>
                  setFilter("all")
                }
              >
                All
              </button>

              <button
                className={
                  filter === "pending"
                    ? "filter-button active"
                    : "filter-button"
                }
                onClick={() =>
                  setFilter("pending")
                }
              >
                Pending
              </button>

              <button
                className={
                  filter === "completed"
                    ? "filter-button active"
                    : "filter-button"
                }
                onClick={() =>
                  setFilter("completed")
                }
              >
                Completed
              </button>

            </div>

            {tasks.length > 0 && (
              <button
                className="modern-clear-button"
                onClick={clearTasks}
              >
                Clear all
              </button>
            )}

          </div>


          {/* ADD TASK */}

          <div className="modern-add-task">

            <TaskInput
              onAddTask={addTask}
            />

          </div>


          {/* TASK LIST */}

          <div className="modern-task-list">

            {filteredTasks.length > 0 ? (

              <TaskList
                tasks={filteredTasks}
                onToggle={toggleTask}
                onDelete={deleteTask}
                onEdit={editTask}
              />

            ) : (

              <div className="empty-state">

                <div className="empty-icon">
                  ✓
                </div>

                <h3>
                  No tasks found
                </h3>

                <p>
                  {search
                    ? "Try a different search."
                    : "Add your first task to get started."}
                </p>

              </div>

            )}

          </div>

        </section>


        {/* PROGRESS */}

        <section className="progress-card">

          <div className="progress-info">

            <div>
              <span>
                Daily progress
              </span>

              <strong>
                {completionPercentage}%
              </strong>
            </div>

            <p>
              {completedCount} of {tasks.length} tasks completed
            </p>

          </div>

          <div className="progress-bar">

            <div
              className="progress-fill"
              style={{
                width: `${completionPercentage}%`
              }}
            ></div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default App;