import { useState } from "react";

function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  const handleSave = () => {
    if (newText.trim() === "") {
      return;
    }

    onEdit(task._id, newText.trim());
    setEditing(false);
  };

  return (
    <li className={task.completed ? "completed" : ""}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task._id)}
      />

      {editing ? (
        <>
          <input
            type="text"
            value={newText}
            onChange={(event) => setNewText(event.target.value)}
          />

          <button onClick={handleSave}>
            Save
          </button>
        </>
      ) : (
        <>
          <span>{task.text}</span>

          <button onClick={() => setEditing(true)}>
            Edit
          </button>
        </>
      )}

      <button onClick={() => onDelete(task._id)}>
        Delete
      </button>
    </li>
  );
}

export default TaskItem;