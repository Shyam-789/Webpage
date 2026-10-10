
import { useState } from "react";
import { useSettings } from "../context/useSettings";

function TaskInput({ onAdd, categories = [] }) {
  const [taskText, setTaskText] = useState("");
  const [reminderAt, setReminderAt] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const { language } = useSettings();

  // =========================
  // LANGUAGE TEXT
  // =========================

  const text = {
    English: {
      placeholder: "Enter a task...",
      reminder: "Set task reminder",
      addTask: "Add Task",
      category: "Category"
    },

    "বাংলা": {
      placeholder: "একটি কাজ লিখুন...",
      reminder: "কাজের রিমাইন্ডার সেট করুন",
      addTask: "কাজ যোগ করুন",
      category: "ক্যাটাগরি"
    },

    "हिन्दी": {
      placeholder: "एक कार्य दर्ज करें...",
      reminder: "कार्य रिमाइंडर सेट करें",
      addTask: "कार्य जोड़ें",
      category: "श्रेणी"
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
    const selectedCategory = categoryId;

    // Clear input immediately
    setTaskText("");
    setReminderAt("");
    setCategoryId("");

    try {
      setIsAdding(true);

      // Add task with reminder and category
      await onAdd(
        trimmedTask,
        selectedReminder || null,
        selectedCategory || null
      );
    } catch (error) {
      console.error("Add task error:", error);

      // Restore values if adding fails
      setTaskText(trimmedTask);
      setReminderAt(selectedReminder);
      setCategoryId(selectedCategory);
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

      {/* Category */}
      <select
        className="task-category-select"
        value={categoryId}
        onChange={(event) => {
          setCategoryId(event.target.value);
        }}
        title={currentText.category}
      >
        <option value="">
          {currentText.category}
        </option>

        {categories.map((category) => (
          <option
            key={category._id}
            value={category._id}
          >
            {category.name}
          </option>
        ))}
      </select>

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
