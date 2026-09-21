import { useState, useEffect } from "react";

import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";

import "./App.css";

function App() {

  // =========================
  // Login State
  // =========================

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );


  // =========================
  // Tasks
  // =========================

  const [tasks, setTasks] = useState([]);


  // =========================
  // Search
  // =========================

  const [search, setSearch] = useState("");


  // =========================
  // Filter
  // =========================

  const [filter, setFilter] = useState("all");


  // =========================
  // Load Tasks
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

        console.log(
          "Error loading tasks:",
          error
        );

      });

  }, [isLoggedIn]);


  // =========================
  // Completed Count
  // =========================

  const completedCount = tasks.filter(
    (task) => task.completed
  ).length;


  // =========================
  // Pending Count
  // =========================

  const pendingCount =
    tasks.length - completedCount;


  // =========================
  // Add Task
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

      console.log(
        "Error adding task:",
        error
      );

    }

  };


  // =========================
  // Complete / Uncomplete
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
        throw new Error(
          "Failed to update task"
        );
      }

      const updatedTask =
        await response.json();

      setTasks((oldTasks) =>
        oldTasks.map((task) =>
          task._id === id
            ? updatedTask
            : task
        )
      );

    } catch (error) {

      console.log(
        "Error updating task:",
        error
      );

    }

  };


  // =========================
  // Delete One Task
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
        throw new Error(
          "Failed to delete task"
        );
      }

      setTasks((oldTasks) =>
        oldTasks.filter(
          (task) => task._id !== id
        )
      );

    } catch (error) {

      console.log(
        "Error deleting task:",
        error
      );

    }

  };


  // =========================
  // Edit Task
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
        throw new Error(
          "Failed to edit task"
        );
      }

      const updatedTask =
        await response.json();

      setTasks((oldTasks) =>
        oldTasks.map((task) =>
          task._id === id
            ? updatedTask
            : task
        )
      );

    } catch (error) {

      console.log(
        "Error editing task:",
        error
      );

    }

  };


  // =========================
  // Clear All Tasks
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
        throw new Error(
          "Failed to clear tasks"
        );
      }

      setTasks([]);

    } catch (error) {

      console.log(
        "Error clearing tasks:",
        error
      );

    }

  };


  // =========================
  // Search + Filter
  // =========================

  const filteredTasks = tasks.filter(
    (task) => {

      const matchesSearch =
        task.text
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesFilter =
        filter === "all" ||
        (
          filter === "completed" &&
          task.completed
        ) ||
        (
          filter === "pending" &&
          !task.completed
        );

      return (
        matchesSearch &&
        matchesFilter
      );

    }
  );


  // =========================
  // LOGGED OUT
  // =========================

  if (!isLoggedIn) {

    return (
      <>
        <h1>Task Manager</h1>

        <Login
          onLogin={() => setIsLoggedIn(true)}
        />

        <Register />
      </>
    );

  }


  // =========================
  // LOGGED IN
  // =========================

  return (
    <>
      <Navbar />

      <h1>My Task Manager</h1>


      {/* Counters */}

      <div className="stats">

        <div className="stat-card">
          <h3>Total</h3>
          <p>{tasks.length}</p>
        </div>

        <div className="stat-card">
          <h3>Completed</h3>
          <p>{completedCount}</p>
        </div>

        <div className="stat-card">
          <h3>Pending</h3>
          <p>{pendingCount}</p>
        </div>

      </div>


      {/* Search */}

      <input
        className="search-input"
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(event) =>
          setSearch(event.target.value)
        }
      />


      {/* Filters */}

      <div className="filters">

        <button
          onClick={() => setFilter("all")}
        >
          All
        </button>

        <button
          onClick={() => setFilter("pending")}
        >
          Pending
        </button>

        <button
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>

      </div>


      {/* Add Task */}

      <TaskInput
        onAddTask={addTask}
      />


      {/* Task List */}

      <TaskList
        tasks={filteredTasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
        onEdit={editTask}
      />


      {/* Clear All */}

      {tasks.length > 0 && (
        <button
          className="clear-btn"
          onClick={clearTasks}
        >
          Clear All Tasks
        </button>
      )}

    </>
  );
}

export default App;