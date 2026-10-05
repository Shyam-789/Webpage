import TaskItem from "./TaskItem";
import { useSettings } from "../context/useSettings";

function TaskList({
  tasks = [],
  onToggle,
  onDelete,
  onEdit
}) {
  const { language } = useSettings();

  // =================================================
  // LANGUAGE TEXT
  // =================================================

  const text = {
    English: {
      noTasks: "No tasks found",
      addTask: "Add a new task to get started."
    },

    "বাংলা": {
      noTasks: "কোনো কাজ পাওয়া যায়নি",
      addTask: "শুরু করতে একটি নতুন কাজ যোগ করুন।"
    },

    "हिन्दी": {
      noTasks: "कोई कार्य नहीं मिला",
      addTask: "शुरू करने के लिए एक नया कार्य जोड़ें।"
    }
  };

  const currentText =
    text[language] || text.English;

  if (tasks.length === 0) {
    return (
      <div className="empty-task">
        <div className="empty-task-icon">✓</div>

        <h3>{currentText.noTasks}</h3>

        <p>{currentText.addTask}</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

export default TaskList;
