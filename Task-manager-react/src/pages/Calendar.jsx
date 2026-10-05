import { useState } from "react";
import { useSettings } from "../context/useSettings";

function Calendar({ tasks = [] }) {
  const [currentDate, setCurrentDate] = useState(
    new Date()
  );

  const { language } = useSettings();

  const text = {
    English: {
      pageLabel: "PLANNING",
      title: "Calendar",
      description:
        "View your tasks and organize your schedule.",
      totalTasks: "Total Tasks",

      previousMonth: "Previous month",
      nextMonth: "Next month",

      weekdays: [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"
      ],

      task: "task",
      tasks: "tasks"
    },

    "বাংলা": {
      pageLabel: "পরিকল্পনা",
      title: "ক্যালেন্ডার",
      description:
        "আপনার কাজ দেখুন এবং সময়সূচি সংগঠিত করুন।",
      totalTasks: "মোট কাজ",

      previousMonth: "আগের মাস",
      nextMonth: "পরের মাস",

      weekdays: [
        "রবি",
        "সোম",
        "মঙ্গল",
        "বুধ",
        "বৃহস্পতি",
        "শুক্র",
        "শনি"
      ],

      task: "কাজ",
      tasks: "টি কাজ"
    },

    "हिन्दी": {
      pageLabel: "योजना",
      title: "कैलेंडर",
      description:
        "अपने कार्य देखें और अपनी समय-सारणी व्यवस्थित करें।",
      totalTasks: "कुल कार्य",

      previousMonth: "पिछला महीना",
      nextMonth: "अगला महीना",

      weekdays: [
        "रवि",
        "सोम",
        "मंगल",
        "बुध",
        "गुरु",
        "शुक्र",
        "शनि"
      ],

      task: "कार्य",
      tasks: "कार्य"
    }
  };

  const currentText =
    text[language] || text.English;

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthName = currentDate.toLocaleDateString(
    language === "বাংলা"
      ? "bn-BD"
      : language === "हिन्दी"
      ? "hi-IN"
      : "en-US",
    {
      month: "long",
      year: "numeric"
    }
  );

  const firstDay = new Date(
    year,
    month,
    1
  ).getDay();

  const daysInMonth = new Date(
    year,
    month + 1,
    0
  ).getDate();

  const today = new Date();

  // =========================
  // MONTH NAVIGATION
  // =========================

  const previousMonth = () => {
    setCurrentDate(
      new Date(year, month - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(year, month + 1, 1)
    );
  };

  // =========================
  // CHECK TODAY
  // =========================

  const isToday = (day) => {
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  // =========================
  // GET TASKS FOR DAY
  // =========================

  const getTasksForDay = (day) => {
    return tasks.filter((task) => {
      if (!task.createdAt) {
        return false;
      }

      const taskDate = new Date(
        task.createdAt
      );

      return (
        taskDate.getDate() === day &&
        taskDate.getMonth() === month &&
        taskDate.getFullYear() === year
      );
    });
  };

  // =========================
  // CREATE CALENDAR DAYS
  // =========================

  const calendarDays = [];

  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }

  for (
    let day = 1;
    day <= daysInMonth;
    day++
  ) {
    calendarDays.push(day);
  }

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

        <div className="calendar-summary">

          <strong>
            {tasks.length}
          </strong>

          <span>
            {currentText.totalTasks}
          </span>

        </div>

      </div>


      {/* =========================
          CALENDAR
      ========================= */}

      <div className="calendar-panel">

        {/* Calendar Header */}

        <div className="calendar-header">

          <button
            type="button"
            onClick={previousMonth}
            aria-label={currentText.previousMonth}
          >
            ←
          </button>

          <h2>
            {monthName}
          </h2>

          <button
            type="button"
            onClick={nextMonth}
            aria-label={currentText.nextMonth}
          >
            →
          </button>

        </div>


        {/* Weekdays */}

        <div className="calendar-weekdays">

          {currentText.weekdays.map((day) => (

            <div key={day}>
              {day}
            </div>

          ))}

        </div>


        {/* Calendar Days */}

        <div className="calendar-grid">

          {calendarDays.map((day, index) => {

            // Empty days before the first day
            // of the month

            if (!day) {
              return (
                <div
                  className="calendar-day empty"
                  key={`empty-${index}`}
                />
              );
            }

            const dayTasks =
              getTasksForDay(day);

            return (
              <div
                className={`calendar-day ${
                  isToday(day)
                    ? "today"
                    : ""
                }`}
                key={day}
              >

                <span className="calendar-number">
                  {day}
                </span>

                {dayTasks.length > 0 && (

                  <div className="calendar-task-info">

                    <span />

                    {dayTasks.length}{" "}
                    {dayTasks.length === 1
                      ? currentText.task
                      : currentText.tasks}

                  </div>

                )}

              </div>
            );
          })}

        </div>

      </div>

    </div>
  );
}

export default Calendar;

