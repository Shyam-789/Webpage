import { useState } from "react";

function TaskInput({ onAddTask }) {
  const [task, setTask] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (task.trim() === "") {
      return;
    }

    onAddTask(task);

    setTask("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter your task"
        value={task}
        onChange={(event) => setTask(event.target.value)}
      />

      <button type="submit">
        Add Task
      </button>
    </form>
  );
}

export default TaskInput;