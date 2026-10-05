import { useMemo } from "react";
import { useSettings } from "../context/useSettings";

function DailyProcess({ tasks = [] }) {
  const { language } = useSettings();

  const today = new Date();

  const text = {
    English: {
      pageLabel: "DAILY PRODUCTIVITY",
      title: "Daily Process",
      description:
        "Plan your day, focus on your priorities, and keep your productivity moving.",
      currentProgress: "CURRENT PROGRESS",
      complete: "Complete",
      completedOf: "tasks completed.",
      done: "Done",

      totalTasks: "Total Tasks",
      pending: "Pending",
      completed: "Completed",
      productivity: "Productivity",

      focus: "FOCUS",
      todaysPriorities: "Today's Priorities",
      allCaughtUp: "All caught up!",
      noPendingTasks: "You have no pending tasks.",
      completedStatus: "Completed",
      inProgress: "In progress",

      routine: "ROUTINE",
      dailyRoutine: "Daily Routine",

      morningPlanning: "Morning Planning",
      reviewPriorities: "Review your priorities",

      deepWork: "Deep Work",
      focusImportant: "Focus on important tasks",

      break: "Break",
      recharge: "Take a short recharge",

      dailyReview: "Daily Review",
      reviewProgress: "Review today's progress"
    },

    "বাংলা": {
      pageLabel: "দৈনিক উৎপাদনশীলতা",
      title: "দৈনিক প্রক্রিয়া",
      description:
        "আপনার দিন পরিকল্পনা করুন, অগ্রাধিকারের কাজে মনোযোগ দিন এবং উৎপাদনশীলতা বজায় রাখুন।",
      currentProgress: "বর্তমান অগ্রগতি",
      complete: "সম্পন্ন",
      completedOf: "টি কাজ সম্পন্ন হয়েছে।",
      done: "সম্পন্ন",

      totalTasks: "মোট কাজ",
      pending: "অসম্পন্ন",
      completed: "সম্পন্ন",
      productivity: "উৎপাদনশীলতা",

      focus: "মনোযোগ",
      todaysPriorities: "আজকের অগ্রাধিকার",
      allCaughtUp: "সব কাজ সম্পন্ন!",
      noPendingTasks: "আপনার কোনো অসম্পন্ন কাজ নেই।",
      completedStatus: "সম্পন্ন",
      inProgress: "চলমান",

      routine: "রুটিন",
      dailyRoutine: "দৈনিক রুটিন",

      morningPlanning: "সকালের পরিকল্পনা",
      reviewPriorities:
        "আপনার অগ্রাধিকারগুলো পর্যালোচনা করুন",

      deepWork: "গভীর মনোযোগের কাজ",
      focusImportant:
        "গুরুত্বপূর্ণ কাজগুলিতে মনোযোগ দিন",

      break: "বিরতি",
      recharge: "কিছুক্ষণ বিশ্রাম নিন",

      dailyReview: "দৈনিক পর্যালোচনা",
      reviewProgress:
        "আজকের অগ্রগতি পর্যালোচনা করুন"
    },

    "हिन्दी": {
      pageLabel: "दैनिक उत्पादकता",
      title: "दैनिक प्रक्रिया",
      description:
        "अपने दिन की योजना बनाएँ, अपनी प्राथमिकताओं पर ध्यान दें और उत्पादकता बनाए रखें।",
      currentProgress: "वर्तमान प्रगति",
      complete: "पूर्ण",
      completedOf: "कार्य पूर्ण हुए।",
      done: "पूर्ण",

      totalTasks: "कुल कार्य",
      pending: "लंबित",
      completed: "पूर्ण",
      productivity: "उत्पादकता",

      focus: "ध्यान",
      todaysPriorities: "आज की प्राथमिकताएँ",
      allCaughtUp: "सभी कार्य पूरे हो गए!",
      noPendingTasks:
        "आपके पास कोई लंबित कार्य नहीं है।",
      completedStatus: "पूर्ण",
      inProgress: "प्रगति में",

      routine: "दिनचर्या",
      dailyRoutine: "दैनिक दिनचर्या",

      morningPlanning: "सुबह की योजना",
      reviewPriorities:
        "अपनी प्राथमिकताओं की समीक्षा करें",

      deepWork: "गहन कार्य",
      focusImportant:
        "महत्वपूर्ण कार्यों पर ध्यान दें",

      break: "विराम",
      recharge: "थोड़ा आराम करें",

      dailyReview: "दैनिक समीक्षा",
      reviewProgress:
        "आज की प्रगति की समीक्षा करें"
    }
  };

  const currentText =
    text[language] || text.English;

  // =========================
  // TODAY DATE
  // =========================

  const todayText = today.toLocaleDateString(
    language === "বাংলা"
      ? "bn-BD"
      : language === "हिन्दी"
      ? "hi-IN"
      : "en-US",
    {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric"
    }
  );

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks = tasks.filter(
    (task) => !task.completed
  ).length;

  const progress =
    tasks.length === 0
      ? 0
      : Math.round(
          (completedTasks / tasks.length) * 100
        );

  const priorities = useMemo(() => {
    return tasks
      .filter((task) => !task.completed)
      .slice(0, 4);
  }, [tasks]);

  return (
    <div className="modern-page">

      {/* Header */}

      <div className="modern-page-header">

        <div>
          <span className="modern-page-label">
            {currentText.pageLabel}
          </span>

          <h1>
            {currentText.title}
          </h1>

          <p>
            {currentText.description}
          </p>
        </div>

        <div className="today-badge">
          📅 {todayText}
        </div>

      </div>


      {/* Progress Hero */}

      <div className="daily-hero-card">

        <div className="daily-hero-content">

          <span className="hero-small-text">
            {currentText.currentProgress}
          </span>

          <h2>
            {progress}% {currentText.complete}
          </h2>

          <p>
            {completedTasks} {currentText.completed}{" "}
            {currentText.completedOf}
          </p>

          <div className="daily-progress-track">

            <div
              className="daily-progress-fill"
              style={{
                width: `${progress}%`
              }}
            />

          </div>

        </div>

        <div className="daily-progress-circle">

          <strong>
            {progress}%
          </strong>

          <span>
            {currentText.done}
          </span>

        </div>

      </div>


      {/* Statistics */}

      <div className="modern-stat-grid">

        <div className="modern-stat-card">

          <div className="modern-stat-icon">
            ✓
          </div>

          <div className="modern-stat-content">

            <span>
              {currentText.totalTasks}
            </span>

            <strong>
              {tasks.length}
            </strong>

          </div>

        </div>


        <div className="modern-stat-card">

          <div className="modern-stat-icon">
            ◷
          </div>

          <div className="modern-stat-content">

            <span>
              {currentText.pending}
            </span>

            <strong>
              {pendingTasks}
            </strong>

          </div>

        </div>


        <div className="modern-stat-card">

          <div className="modern-stat-icon">
            ✓
          </div>

          <div className="modern-stat-content">

            <span>
              {currentText.completed}
            </span>

            <strong>
              {completedTasks}
            </strong>

          </div>

        </div>


        <div className="modern-stat-card">

          <div className="modern-stat-icon">
            ⚡
          </div>

          <div className="modern-stat-content">

            <span>
              {currentText.productivity}
            </span>

            <strong>
              {progress}%
            </strong>

          </div>

        </div>

      </div>


      {/* Main Grid */}

      <div className="daily-content-grid">

        {/* Priorities */}

        <div className="modern-panel">

          <div className="modern-panel-header">

            <div>

              <span className="panel-label">
                {currentText.focus}
              </span>

              <h2>
                {currentText.todaysPriorities}
              </h2>

            </div>

            <span className="panel-count">
              {priorities.length}
            </span>

          </div>


          {priorities.length === 0 ? (

            <div className="modern-empty">

              <div>
                ✓
              </div>

              <h3>
                {currentText.allCaughtUp}
              </h3>

              <p>
                {currentText.noPendingTasks}
              </p>

            </div>

          ) : (

            <div className="priority-list">

              {priorities.map((task, index) => (

                <div
                  className="priority-item"
                  key={task._id}
                >

                  <div className="priority-number">
                    {index + 1}
                  </div>

                  <div>

                    <h3>
                      {task.text}
                    </h3>

                    <span>
                      {task.completed
                        ? currentText.completedStatus
                        : currentText.inProgress}
                    </span>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>


        {/* Daily Routine */}

        <div className="modern-panel">

          <div className="modern-panel-header">

            <div>

              <span className="panel-label">
                {currentText.routine}
              </span>

              <h2>
                {currentText.dailyRoutine}
              </h2>

            </div>

          </div>


          <div className="routine-list">

            <div className="routine-item">

              <span className="routine-icon">
                🌅
              </span>

              <div>

                <strong>
                  {currentText.morningPlanning}
                </strong>

                <p>
                  {currentText.reviewPriorities}
                </p>

              </div>

              <span className="routine-status">
                ✓
              </span>

            </div>


            <div className="routine-item">

              <span className="routine-icon">
                🎯
              </span>

              <div>

                <strong>
                  {currentText.deepWork}
                </strong>

                <p>
                  {currentText.focusImportant}
                </p>

              </div>

              <span className="routine-status">
                ○
              </span>

            </div>


            <div className="routine-item">

              <span className="routine-icon">
                ☕
              </span>

              <div>

                <strong>
                  {currentText.break}
                </strong>

                <p>
                  {currentText.recharge}
                </p>

              </div>

              <span className="routine-status">
                ○
              </span>

            </div>


            <div className="routine-item">

              <span className="routine-icon">
                🌙
              </span>

              <div>

                <strong>
                  {currentText.dailyReview}
                </strong>

                <p>
                  {currentText.reviewProgress}
                </p>

              </div>

              <span className="routine-status">
                ○
              </span>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default DailyProcess;
