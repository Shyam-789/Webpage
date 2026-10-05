import { useSettings } from "../context/useSettings";

function Analytics({ tasks = [] }) {
  const { language } = useSettings();

  const text = {
    English: {
      pageLabel: "INSIGHTS",
      title: "Analytics",
      description:
        "Understand your productivity and task completion.",

      totalTasks: "Total Tasks",
      allTasksCreated: "All tasks created",

      completed: "Completed",
      finishedTasks: "Finished tasks",

      pending: "Pending",
      tasksRemaining: "Tasks remaining",

      completionRate: "Completion Rate",
      overallProgress: "Overall progress",

      performance: "PERFORMANCE",
      taskCompletion: "Task Completion",

      completedLower: "completed",
      pendingLower: "pending",

      breakdown: "BREAKDOWN",
      taskStatus: "Task Status",

      productivityInsight: "PRODUCTIVITY INSIGHT",

      excellentProgress: "Excellent progress!",
      goodProgress:
        "You're making good progress.",
      keepMomentum:
        "Keep building your momentum.",

      insightDescription:
        "Complete more tasks to improve your overall completion rate."
    },

    "বাংলা": {
      pageLabel: "অন্তর্দৃষ্টি",
      title: "বিশ্লেষণ",
      description:
        "আপনার উৎপাদনশীলতা এবং কাজ সম্পন্নের অগ্রগতি বুঝুন।",

      totalTasks: "মোট কাজ",
      allTasksCreated: "তৈরি করা সব কাজ",

      completed: "সম্পন্ন",
      finishedTasks: "সম্পন্ন করা কাজ",

      pending: "অসম্পন্ন",
      tasksRemaining: "বাকি কাজ",

      completionRate: "সম্পন্নের হার",
      overallProgress: "সামগ্রিক অগ্রগতি",

      performance: "কর্মদক্ষতা",
      taskCompletion: "কাজ সম্পন্ন",

      completedLower: "সম্পন্ন",
      pendingLower: "অসম্পন্ন",

      breakdown: "বিভাজন",
      taskStatus: "কাজের অবস্থা",

      productivityInsight: "উৎপাদনশীলতার অন্তর্দৃষ্টি",

      excellentProgress: "দারুণ অগ্রগতি!",
      goodProgress:
        "আপনি ভালো অগ্রগতি করছেন।",
      keepMomentum:
        "আপনার অগ্রগতি চালিয়ে যান।",

      insightDescription:
        "সামগ্রিক কাজ সম্পন্নের হার বাড়াতে আরও কাজ সম্পন্ন করুন।"
    },

    "हिन्दी": {
      pageLabel: "अंतर्दृष्टि",
      title: "विश्लेषण",
      description:
        "अपनी उत्पादकता और कार्य पूर्णता को समझें।",

      totalTasks: "कुल कार्य",
      allTasksCreated: "बनाए गए सभी कार्य",

      completed: "पूर्ण",
      finishedTasks: "पूर्ण किए गए कार्य",

      pending: "लंबित",
      tasksRemaining: "बाकी कार्य",

      completionRate: "पूर्णता दर",
      overallProgress: "कुल प्रगति",

      performance: "प्रदर्शन",
      taskCompletion: "कार्य पूर्णता",

      completedLower: "पूर्ण",
      pendingLower: "लंबित",

      breakdown: "विवरण",
      taskStatus: "कार्य स्थिति",

      productivityInsight: "उत्पादकता अंतर्दृष्टि",

      excellentProgress: "बहुत अच्छी प्रगति!",
      goodProgress:
        "आप अच्छी प्रगति कर रहे हैं।",
      keepMomentum:
        "अपनी प्रगति को जारी रखें।",

      insightDescription:
        "अपनी कुल पूर्णता दर बढ़ाने के लिए अधिक कार्य पूरे करें।"
    }
  };

  const currentText =
    text[language] || text.English;

  const completed = tasks.filter(
    (task) => task.completed
  ).length;

  const pending = tasks.filter(
    (task) => !task.completed
  ).length;

  const total = tasks.length;

  const completion =
    total === 0
      ? 0
      : Math.round(
          (completed / total) * 100
        );

  return (
    <div className="modern-page">

      {/* =========================
          HEADER
      ========================= */}

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

      </div>


      {/* =========================
          MAIN STATS
      ========================= */}

      <div className="analytics-stat-grid">

        <div className="analytics-card">

          <span>
            {currentText.totalTasks}
          </span>

          <strong>
            {total}
          </strong>

          <small>
            {currentText.allTasksCreated}
          </small>

        </div>


        <div className="analytics-card">

          <span>
            {currentText.completed}
          </span>

          <strong>
            {completed}
          </strong>

          <small>
            {currentText.finishedTasks}
          </small>

        </div>


        <div className="analytics-card">

          <span>
            {currentText.pending}
          </span>

          <strong>
            {pending}
          </strong>

          <small>
            {currentText.tasksRemaining}
          </small>

        </div>


        <div className="analytics-card">

          <span>
            {currentText.completionRate}
          </span>

          <strong>
            {completion}%
          </strong>

          <small>
            {currentText.overallProgress}
          </small>

        </div>

      </div>


      {/* =========================
          PROGRESS
      ========================= */}

      <div className="analytics-content-grid">

        <div className="modern-panel">

          <div className="modern-panel-header">

            <div>

              <span className="panel-label">
                {currentText.performance}
              </span>

              <h2>
                {currentText.taskCompletion}
              </h2>

            </div>

            <strong className="analytics-percent">
              {completion}%
            </strong>

          </div>


          <div className="analytics-progress">

            <div
              className="analytics-progress-fill"
              style={{
                width: `${completion}%`
              }}
            />

          </div>


          <div className="analytics-progress-info">

            <span>
              {completed}{" "}
              {currentText.completedLower}
            </span>

            <span>
              {pending}{" "}
              {currentText.pendingLower}
            </span>

          </div>

        </div>


        {/* =========================
            BREAKDOWN
        ========================= */}

        <div className="modern-panel">

          <div className="modern-panel-header">

            <div>

              <span className="panel-label">
                {currentText.breakdown}
              </span>

              <h2>
                {currentText.taskStatus}
              </h2>

            </div>

          </div>


          <div className="status-breakdown">

            <div className="status-row">

              <div>

                <span className="status-dot completed-dot" />

                {currentText.completed}

              </div>

              <strong>
                {completed}
              </strong>

            </div>


            <div className="status-row">

              <div>

                <span className="status-dot pending-dot" />

                {currentText.pending}

              </div>

              <strong>
                {pending}
              </strong>

            </div>

          </div>

        </div>

      </div>


      {/* =========================
          PRODUCTIVITY INSIGHT
      ========================= */}

      <div className="analytics-insight">

        <div className="insight-icon">
          ⚡
        </div>

        <div>

          <span>
            {currentText.productivityInsight}
          </span>

          <h2>

            {completion >= 80
              ? currentText.excellentProgress
              : completion >= 50
              ? currentText.goodProgress
              : currentText.keepMomentum}

          </h2>

          <p>
            {currentText.insightDescription}
          </p>

        </div>

      </div>

    </div>
  );
}

export default Analytics;

