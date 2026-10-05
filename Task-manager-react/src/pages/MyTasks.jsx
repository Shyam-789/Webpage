import { useMemo, useState } from "react";
import TaskInput from "../components/TaskInput";
import { useSettings } from "../context/useSettings";

function MyTasks({
  tasks = [],
  onAdd,
  onToggle,
  onDelete,
  onEdit,
  onClear
}) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const { language } = useSettings();

  // =========================
  // LANGUAGE TEXT
  // =========================

  const text = {
    English: {
      pageLabel: "TASK MANAGEMENT",
      title: "My Tasks",
      description: "Organize your work and stay productive.",
      newTask: "New Task",

      totalTasks: "Total Tasks",
      pending: "Pending",
      completed: "Completed",
      progress: "Progress",

      addNewTask: "Add a new task",
      accomplish: "What do you want to accomplish?",

      search: "Search tasks...",
      all: "All",

      overallProgress: "Overall Progress",
      completedProgress: "completed",

      tasks: "Tasks",
      task: "task",
      tasksPlural: "tasks",

      clearAll: "Clear All",
      confirmClear: "Are you sure you want to delete all tasks?",

      noTasks: "No tasks found",
      differentSearch: "Try a different search.",
      firstTask: "Create your first task to get started.",

      inProgress: "In progress",
      completedStatus: "Completed",

      save: "Save",
      cancel: "Cancel",
      edit: "Edit",
      delete: "Delete"
    },

    "বাংলা": {
      pageLabel: "কাজ ব্যবস্থাপনা",
      title: "আমার কাজ",
      description: "আপনার কাজ সংগঠিত করুন এবং উৎপাদনশীল থাকুন।",
      newTask: "নতুন কাজ",

      totalTasks: "মোট কাজ",
      pending: "অসম্পন্ন",
      completed: "সম্পন্ন",
      progress: "অগ্রগতি",

      addNewTask: "একটি নতুন কাজ যোগ করুন",
      accomplish: "আপনি কী করতে চান?",

      search: "কাজ অনুসন্ধান করুন...",
      all: "সব",

      overallProgress: "সামগ্রিক অগ্রগতি",
      completedProgress: "সম্পন্ন",

      tasks: "কাজ",
      task: "কাজ",
      tasksPlural: "টি কাজ",

      clearAll: "সব মুছুন",
      confirmClear: "আপনি কি সব কাজ মুছে ফেলতে চান?",

      noTasks: "কোনো কাজ পাওয়া যায়নি",
      differentSearch: "অন্য কিছু অনুসন্ধান করে দেখুন।",
      firstTask: "শুরু করতে আপনার প্রথম কাজ তৈরি করুন।",

      inProgress: "চলমান",
      completedStatus: "সম্পন্ন",

      save: "সংরক্ষণ করুন",
      cancel: "বাতিল করুন",
      edit: "সম্পাদনা করুন",
      delete: "মুছুন"
    },

    "हिन्दी": {
      pageLabel: "कार्य प्रबंधन",
      title: "मेरे कार्य",
      description: "अपने काम को व्यवस्थित रखें और उत्पादक बने रहें।",
      newTask: "नया कार्य",

      totalTasks: "कुल कार्य",
      pending: "लंबित",
      completed: "पूर्ण",
      progress: "प्रगति",

      addNewTask: "नया कार्य जोड़ें",
      accomplish: "आप क्या पूरा करना चाहते हैं?",

      search: "कार्य खोजें...",
      all: "सभी",

      overallProgress: "कुल प्रगति",
      completedProgress: "पूर्ण",

      tasks: "कार्य",
      task: "कार्य",
      tasksPlural: "कार्य",

      clearAll: "सभी हटाएँ",
      confirmClear: "क्या आप सभी कार्य हटाना चाहते हैं?",

      noTasks: "कोई कार्य नहीं मिला",
      differentSearch: "कोई दूसरा खोज शब्द आज़माएँ।",
      firstTask: "शुरू करने के लिए अपना पहला कार्य बनाएँ।",

      inProgress: "प्रगति में",
      completedStatus: "पूर्ण",

      save: "सहेजें",
      cancel: "रद्द करें",
      edit: "संपादित करें",
      delete: "हटाएँ"
    }
  };

  const currentText =
    text[language] || text.English;

  // =========================
  // FILTER TASKS
  // =========================

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.text
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesFilter =
        filter === "all" ||
        (filter === "pending" && !task.completed) ||
        (filter === "completed" && task.completed);

      return matchesSearch && matchesFilter;
    });
  }, [tasks, search, filter]);

  // =========================
  // STATISTICS
  // =========================

  const completedCount = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingCount = tasks.filter(
    (task) => !task.completed
  ).length;

  const completion =
    tasks.length === 0
      ? 0
      : Math.round(
          (completedCount / tasks.length) * 100
        );

  // =========================
  // NEW TASK BUTTON
  // =========================

  const handleNewTask = () => {
    const addSection =
      document.getElementById(
        "mytasks-add-section"
      );

    if (addSection) {
      addSection.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });

      const input =
        addSection.querySelector("input");

      if (input) {
        setTimeout(() => {
          input.focus();
        }, 400);
      }
    }
  };

  // =========================
  // START EDIT
  // =========================

  const startEdit = (task) => {
    setEditingId(task._id);
    setEditText(task.text);
  };

  // =========================
  // SAVE EDIT
  // =========================

  const saveEdit = () => {
    const trimmedText = editText.trim();

    if (!trimmedText) {
      return;
    }

    onEdit(editingId, trimmedText);

    setEditingId(null);
    setEditText("");
  };

  // =========================
  // CANCEL EDIT
  // =========================

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  return (
    <div className="mytasks-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="mytasks-header">

        <div>
          <p className="page-label">
            {currentText.pageLabel}
          </p>

          <h1>
            {currentText.title}
          </h1>

          <p className="page-description">
            {currentText.description}
          </p>
        </div>

        <button
          type="button"
          className="modern-add-button"
          onClick={handleNewTask}
        >
          + {currentText.newTask}
        </button>

      </div>


      {/* =========================
          STATISTICS
      ========================= */}

      <div className="task-stat-grid">

        <div className="task-stat-card">
          <div className="stat-icon">✓</div>

          <div>
            <span>
              {currentText.totalTasks}
            </span>

            <strong>
              {tasks.length}
            </strong>
          </div>
        </div>

        <div className="task-stat-card">
          <div className="stat-icon">○</div>

          <div>
            <span>
              {currentText.pending}
            </span>

            <strong>
              {pendingCount}
            </strong>
          </div>
        </div>

        <div className="task-stat-card">
          <div className="stat-icon">✓</div>

          <div>
            <span>
              {currentText.completed}
            </span>

            <strong>
              {completedCount}
            </strong>
          </div>
        </div>

        <div className="task-stat-card progress-stat">
          <div className="stat-icon">↗</div>

          <div>
            <span>
              {currentText.progress}
            </span>

            <strong>
              {completion}%
            </strong>
          </div>
        </div>

      </div>


      {/* =========================
          ADD TASK
      ========================= */}

      <div
        id="mytasks-add-section"
        className="mytasks-add-section"
      >

        <div className="mytasks-add-heading">

          <div>
            <h2>
              {currentText.addNewTask}
            </h2>

            <p>
              {currentText.accomplish}
            </p>
          </div>

        </div>

        <TaskInput onAdd={onAdd} />

      </div>


      {/* =========================
          TOOLBAR
      ========================= */}

      <div className="tasks-toolbar">

        <div className="task-search">

          <span>⌕</span>

          <input
            type="text"
            placeholder={currentText.search}
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />

        </div>

        <div className="task-filters">

          <button
            type="button"
            className={
              filter === "all"
                ? "active"
                : ""
            }
            onClick={() =>
              setFilter("all")
            }
          >
            {currentText.all}
          </button>

          <button
            type="button"
            className={
              filter === "pending"
                ? "active"
                : ""
            }
            onClick={() =>
              setFilter("pending")
            }
          >
            {currentText.pending}
          </button>

          <button
            type="button"
            className={
              filter === "completed"
                ? "active"
                : ""
            }
            onClick={() =>
              setFilter("completed")
            }
          >
            {currentText.completed}
          </button>

        </div>

      </div>


      {/* =========================
          PROGRESS
      ========================= */}

      <div className="task-progress-card">

        <div className="progress-header">

          <div>
            <span>
              {currentText.overallProgress}
            </span>

            <strong>
              {completion}%{" "}
              {currentText.completedProgress}
            </strong>
          </div>

          <span>
            {completedCount} / {tasks.length}
          </span>

        </div>

        <div className="progress-track">

          <div
            className="progress-fill"
            style={{
              width: `${completion}%`
            }}
          />

        </div>

      </div>


      {/* =========================
          TASK LIST
      ========================= */}

      <div className="modern-task-section">

        <div className="section-heading">

          <div>

            <h2>
              {currentText.tasks}
            </h2>

            <span>
              {filteredTasks.length}{" "}
              {filteredTasks.length === 1
                ? currentText.task
                : currentText.tasksPlural}
            </span>

          </div>

          {tasks.length > 0 && (

            <button
              type="button"
              className="modern-clear-button"
              onClick={() => {

                const confirmed =
                  window.confirm(
                    currentText.confirmClear
                  );

                if (confirmed) {
                  onClear();
                }

              }}
            >
              {currentText.clearAll}
            </button>

          )}

        </div>


        {filteredTasks.length === 0 ? (

          <div className="modern-empty-state">

            <div className="empty-icon">
              ✓
            </div>

            <h3>
              {currentText.noTasks}
            </h3>

            <p>
              {search
                ? currentText.differentSearch
                : currentText.firstTask}
            </p>

          </div>

        ) : (

          <div className="modern-task-list">

            {filteredTasks.map((task) => (

              <div
                className={`modern-task-card ${
                  task.completed
                    ? "task-completed"
                    : ""
                }`}
                key={task._id}
              >

                {/* CHECKBOX */}

                <button
                  type="button"
                  className={`task-check ${
                    task.completed
                      ? "checked"
                      : ""
                  }`}
                  onClick={() =>
                    onToggle(task._id)
                  }
                >
                  {task.completed
                    ? "✓"
                    : ""}
                </button>


                {/* TASK CONTENT */}

                <div className="modern-task-content">

                  {editingId === task._id ? (

                    <input
                      className="mytasks-edit-input"
                      type="text"
                      value={editText}
                      onChange={(event) =>
                        setEditText(
                          event.target.value
                        )
                      }
                      onKeyDown={(event) => {

                        if (
                          event.key === "Enter"
                        ) {
                          saveEdit();
                        }

                        if (
                          event.key === "Escape"
                        ) {
                          cancelEdit();
                        }

                      }}
                      autoFocus
                    />

                  ) : (

                    <h3>
                      {task.text}
                    </h3>

                  )}

                  <div className="task-meta">

                    <span>
                      {task.completed
                        ? currentText.completedStatus
                        : currentText.inProgress}
                    </span>

                    {task.createdAt && (

                      <span>
                        •{" "}
                        {new Date(
                          task.createdAt
                        ).toLocaleDateString()}
                      </span>

                    )}

                  </div>

                </div>


                {/* ACTIONS */}

                <div className="modern-task-actions">

                  {editingId === task._id ? (

                    <>

                      <button
                        type="button"
                        className="save-task"
                        onClick={saveEdit}
                      >
                        {currentText.save}
                      </button>

                      <button
                        type="button"
                        onClick={cancelEdit}
                      >
                        {currentText.cancel}
                      </button>

                    </>

                  ) : (

                    <>

                      <button
                        type="button"
                        onClick={() =>
                          startEdit(task)
                        }
                      >
                        {currentText.edit}
                      </button>

                      <button
                        type="button"
                        className="delete-task"
                        onClick={() =>
                          onDelete(task._id)
                        }
                      >
                        {currentText.delete}
                      </button>

                    </>

                  )}

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default MyTasks;
