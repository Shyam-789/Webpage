import { useState } from "react";
import { useSettings } from "../context/useSettings";

function TaskInput({ onAdd }) {
  const [taskText, setTaskText] = useState("");
  const [reminderAt, setReminderAt] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const { language } = useSettings();

  // =========================
  // LANGUAGE TEXT
  // =========================
  const text = {
    English: {
      placeholder: "Enter a task...",
      reminder: "Set task reminder",
      addTask: "Add Task"
    },

    "বাংলা": {
      placeholder: "একটি কাজ লিখুন...",
      reminder: "কাজের রিমাইন্ডার সেট করুন",
      addTask: "কাজ যোগ করুন"
    },

    "हिन्दी": {
      placeholder: "एक कार्य दर्ज करें...",
      reminder: "कार्य रिमाइंडर सेट करें",
      addTask: "कार्य जोड़ें"
    }
  };

  const currentText =
    text[language] || text.English;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedTask = taskText.trim();

    if (!trimmedTask || isAdding) {
      return;
    }

    // Save values before clearing
    const selectedReminder = reminderAt;

    // Clear input immediately
    setTaskText("");
    setReminderAt("");

    try {
      setIsAdding(true);

      // Add task with reminder
      await onAdd(
        trimmedTask,
        selectedReminder || null
      );
    } catch (error) {
      console.error("Add task error:", error);

      // Restore values if adding fails
      setTaskText(trimmedTask);
      setReminderAt(selectedReminder);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <form
      className="task-input-form"
      onSubmit={handleSubmit}
    >
      <input
        id="mytasks-input"
        className="task-input"
        type="text"
        placeholder={currentText.placeholder}
        value={taskText}
        onChange={(event) => {
          setTaskText(event.target.value);
        }}
        autoComplete="off"
      />

      <input
        className="task-reminder-input"
        type="datetime-local"
        value={reminderAt}
        onChange={(event) => {
          setReminderAt(event.target.value);
        }}
        title={currentText.reminder}
      />

      <button
        className="add-task-button"
        type="submit"
        disabled={isAdding}
      >
        + {currentText.addTask}
      </button>
    </form>
  );
}

export default TaskInput;
