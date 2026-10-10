
import TaskInput from "../components/TaskInput";
import TaskList from "../components/TaskList";
import { useSettings } from "../context/useSettings";

function Dashboard({
  tasks,
  categories = [],
  search,
  setSearch,
  filter,
  setFilter,
  greeting,
  currentTime,
  completedCount,
  pendingCount,
  completionPercentage,
  addTask,
  toggleTask,
  deleteTask,
  editTask,
  clearTasks
}) {
  const {
    language,
    formatTime,
    t
  } = useSettings();

  // =========================
  // DASHBOARD TRANSLATIONS
  // =========================

  const dashboardText = {
    English: {
      overview: "OVERVIEW",
      stayOrganized:
        "Stay organized and get things done.",
      today: "Today",
      loading: "Loading...",
      totalTasks: "TOTAL TASKS",
      completed: "COMPLETED",
      pending: "PENDING",
      tasksWorkspace:
        "Tasks in your workspace",
      completionRate: "completion rate",
      tasksRemaining: "Tasks remaining",
      workspace: "WORKSPACE",
      manageTasks:
        "Manage everything you need to get done.",
      task: "task",
      tasks: "tasks",
      searchPlaceholder:
        "Search your tasks...",
      all: "All",
      clearAll: "Clear all",
      confirmDelete:
        "Are you sure you want to delete all tasks?",
      noTasks: "No tasks found",
      differentSearch:
        "Try a different search.",
      firstTask:
        "Add your first task to get started.",
      dailyProgress: "Daily progress",
      of: "of",
      completedWord: "tasks completed"
    },

    বাংলা: {
      overview: "ওভারভিউ",
      stayOrganized:
        "সংগঠিত থাকুন এবং আপনার কাজ সম্পন্ন করুন।",
      today: "আজ",
      loading: "লোড হচ্ছে...",
      totalTasks: "মোট কাজ",
      completed: "সম্পন্ন",
      pending: "অসম্পন্ন",
      tasksWorkspace:
        "আপনার ওয়ার্কস্পেসের কাজ",
      completionRate: "সম্পন্নের হার",
      tasksRemaining: "বাকি কাজ",
      workspace: "ওয়ার্কস্পেস",
      manageTasks:
        "আপনার প্রয়োজনীয় সব কাজ পরিচালনা করুন।",
      task: "কাজ",
      tasks: "কাজ",
      searchPlaceholder:
        "আপনার কাজ অনুসন্ধান করুন...",
      all: "সব",
      clearAll: "সব মুছুন",
      confirmDelete:
        "আপনি কি সব কাজ মুছে ফেলতে চান?",
      noTasks: "কোনো কাজ পাওয়া যায়নি",
      differentSearch:
        "অন্য কিছু অনুসন্ধান করে দেখুন।",
      firstTask:
        "শুরু করতে আপনার প্রথম কাজ যোগ করুন।",
      dailyProgress: "দৈনিক অগ্রগতি",
      of: "এর মধ্যে",
      completedWord: "টি কাজ সম্পন্ন"
    },

    हिन्दी: {
      overview: "अवलोकन",
      stayOrganized:
        "व्यवस्थित रहें और अपने काम पूरे करें।",
      today: "आज",
      loading: "लोड हो रहा है...",
      totalTasks: "कुल कार्य",
      completed: "पूर्ण",
      pending: "लंबित",
      tasksWorkspace:
        "आपके वर्कस्पेस के कार्य",
      completionRate: "पूर्णता दर",
      tasksRemaining: "बाकी कार्य",
      workspace: "वर्कस्पेस",
      manageTasks:
        "अपने सभी आवश्यक कार्यों को प्रबंधित करें।",
      task: "कार्य",
      tasks: "कार्य",
      searchPlaceholder:
        "अपने कार्य खोजें...",
      all: "सभी",
      clearAll: "सभी हटाएँ",
      confirmDelete:
        "क्या आप सभी कार्य हटाना चाहते हैं?",
      noTasks: "कोई कार्य नहीं मिला",
      differentSearch:
        "कोई दूसरा खोज शब्द आज़माएँ।",
      firstTask:
        "शुरू करने के लिए अपना पहला कार्य जोड़ें।",
      dailyProgress: "दैनिक प्रगति",
      of: "में से",
      completedWord: "कार्य पूर्ण"
    }
  };

  const text =
    dashboardText[language] ||
    dashboardText.English;

  // =========================
  // TIME FORMAT
  // =========================

  const formattedTime = currentTime
    ? formatTime(currentTime)
    : text.loading;

  // =========================
  // FILTER TASKS
  // =========================

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.text
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      (filter === "completed" && task.completed) ||
      (filter === "pending" && !task.completed);

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="dashboard">
      <main className="dashboard-main">

        {/* =========================
            HEADER
        ========================= */}

        <header className="dashboard-header">
          <div>
            <p className="dashboard-label">
              {text.overview}
            </p>

            <h1 className="dashboard-title">
              {greeting}
            </h1>

            <p className="dashboard-subtitle">
              {text.stayOrganized}
            </p>
          </div>

          <div className="header-date">
            <span>
              {text.today}
            </span>

            <strong>
              {currentTime
                ? currentTime.toLocaleDateString(
                    language === "বাংলা"
                      ? "bn-BD"
                      : language === "हिन्दी"
                      ? "hi-IN"
                      : "en-US",
                    {
                      month: "short",
                      day: "numeric",
                      year: "numeric"
                    }
                  )
                : text.loading}
            </strong>

            {/* =========================
                CURRENT TIME
            ========================= */}

            <strong>
              {formattedTime}
            </strong>
          </div>
        </header>

        {/* =========================
            STAT CARDS
        ========================= */}

        <section className="dashboard-stats">

          <div className="modern-stat-card">
            <div className="stat-top">

              <span className="stat-label">
                {text.totalTasks}
              </span>

              <div className="stat-icon purple">
                ✓
              </div>

            </div>

            <div className="stat-number">
              {tasks.length}
            </div>

            <p className="stat-description">
              {text.tasksWorkspace}
            </p>
          </div>

          <div className="modern-stat-card">
            <div className="stat-top">

              <span className="stat-label">
                {text.completed}
              </span>

              <div className="stat-icon green">
                ✓
              </div>

            </div>

            <div className="stat-number">
              {completedCount}
            </div>

            <p className="stat-description">
              {completionPercentage}%{" "}
              {text.completionRate}
            </p>
          </div>

          <div className="modern-stat-card">
            <div className="stat-top">

              <span className="stat-label">
                {text.pending}
              </span>

              <div className="stat-icon orange">
                ◷
              </div>

            </div>

            <div className="stat-number">
              {pendingCount}
            </div>

            <p className="stat-description">
              {text.tasksRemaining}
            </p>
          </div>

        </section>

        {/* =========================
            TASK SECTION
        ========================= */}

        <section className="tasks-section">

          {/* TASK HEADER */}

          <div className="tasks-header">

            <div>

              <p className="dashboard-label">
                {text.workspace}
              </p>

              <h2>
                {t("myTasks")}
              </h2>

              <p>
                {text.manageTasks}
              </p>

            </div>

            <div className="task-count">
              {tasks.length}{" "}
              {tasks.length === 1
                ? text.task
                : text.tasks}
            </div>

          </div>

          {/* =========================
              SEARCH
          ========================= */}

          <div className="search-container">

            <span className="search-icon">
              ⌕
            </span>

            <input
              className="modern-search"
              type="text"
              placeholder={
                text.searchPlaceholder
              }
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />

          </div>

          {/* =========================
              FILTERS
          ========================= */}

          <div className="task-toolbar">

            <div className="modern-filters">

              <button
                type="button"
                className={
                  filter === "all"
                    ? "filter-button active"
                    : "filter-button"
                }
                onClick={() =>
                  setFilter("all")
                }
              >
                {text.all}
              </button>

              <button
                type="button"
                className={
                  filter === "pending"
                    ? "filter-button active"
                    : "filter-button"
                }
                onClick={() =>
                  setFilter("pending")
                }
              >
                {t("pending")}
              </button>

              <button
                type="button"
                className={
                  filter === "completed"
                    ? "filter-button active"
                    : "filter-button"
                }
                onClick={() =>
                  setFilter("completed")
                }
              >
                {t("completed")}
              </button>

            </div>

            {/* =========================
                CLEAR ALL
            ========================= */}

            {tasks.length > 0 && (
              <button
                type="button"
                className="modern-clear-button"
                onClick={async () => {

                  const confirmed =
                    window.confirm(
                      text.confirmDelete
                    );

                  if (confirmed) {
                    await clearTasks();
                  }

                }}
              >
                {text.clearAll}
              </button>
            )}

          </div>

          {/* =========================
              ADD TASK
          ========================= */}

          <div className="modern-add-task">

            <TaskInput
              onAdd={addTask}
              categories={categories}
            />

          </div>

          {/* =========================
              TASK LIST
          ========================= */}

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
                  {text.noTasks}
                </h3>

                <p>
                  {search
                    ? text.differentSearch
                    : text.firstTask}
                </p>

              </div>

            )}

          </div>

        </section>

        {/* =========================
            PROGRESS
        ========================= */}

        <section className="progress-card">

          <div className="progress-info">

            <div>

              <span>
                {text.dailyProgress}
              </span>

              <strong>
                {completionPercentage}%
              </strong>

            </div>

            <p>
              {completedCount} {text.of}{" "}
              {tasks.length}{" "}
              {text.completedWord}
            </p>

          </div>

          <div className="progress-bar">

            <div
              className="progress-fill"
              style={{
                width: `${completionPercentage}%`
              }}
            />

          </div>

        </section>

      </main>
    </div>
  );
}

export default Dashboard;
