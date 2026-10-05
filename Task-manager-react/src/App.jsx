import { useState, useEffect, useCallback } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import { SettingsProvider } from "./context/SettingsProvider";
import { useSettings } from "./context/useSettings";

import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import MyTasks from "./pages/MyTasks";
import DailyProcess from "./pages/DailyProcess";
import Calendar from "./pages/Calendar";
import Analytics from "./pages/Analytics";
import Categories from "./pages/Categories";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Rating from "./pages/Rating";

import { showNotification } from "./utils/notifications";

import {
  startReminderChecker,
  stopReminderChecker
} from "./utils/reminderChecker";

import "./App.css";

// =========================================================
// APP CONTENT
// =========================================================

function AppContent() {
  const { language } = useSettings();

  // =========================================================
  // LANGUAGE TEXT
  // =========================================================

  const text = {
    English: {
      goodMorning: "Good morning 👋",
      goodAfternoon: "Good afternoon ☀️",
      goodEvening: "Good evening 🌆",
      goodNight: "Good night 🌙",

      loading: "Loading...",
      checkingSession: "Checking your session...",

      organizeWork: "Organize your work.",
      getThingsDone: "Get things done.",
      brandDescription:
        "A simple and powerful task manager designed to help you stay organized, focused and productive.",

      manageTasks: "Manage your tasks",
      manageTasksDescription:
        "Create, edit and organize your work.",

      trackProgress: "Track your progress",
      trackProgressDescription:
        "See completed and pending tasks.",

      stayProductive: "Stay productive",
      stayProductiveDescription:
        "Keep everything in one place.",

      footer:
        "© 2026 TaskFlow. Built for productivity.",

      taskAdded: "Task Added ✅",
      taskAddedBody: "was added successfully.",

      taskCompleted: "Task Completed 🎉",
      taskCompletedBody: "has been completed.",

      taskReopened: "Task Reopened 🔄",
      taskReopenedBody: "has been reopened.",

      taskDeleted: "Task Deleted 🗑️",
      taskDeletedBody: "was deleted successfully.",

      taskDeletedGeneric:
        "The task was deleted successfully.",

      allTasksCleared: "All Tasks Cleared 🗑️",
      allTasksClearedBody:
        "All your tasks have been cleared successfully."
    },

    "বাংলা": {
      goodMorning: "সুপ্রভাত 👋",
      goodAfternoon: "শুভ অপরাহ্ন ☀️",
      goodEvening: "শুভ সন্ধ্যা 🌆",
      goodNight: "শুভ রাত্রি 🌙",

      loading: "লোড হচ্ছে...",
      checkingSession: "আপনার সেশন যাচাই করা হচ্ছে...",

      organizeWork: "আপনার কাজ সংগঠিত করুন।",
      getThingsDone: "কাজ সম্পন্ন করুন।",
      brandDescription:
        "একটি সহজ এবং শক্তিশালী টাস্ক ম্যানেজার যা আপনাকে সংগঠিত, মনোযোগী এবং উৎপাদনশীল থাকতে সাহায্য করে।",

      manageTasks: "আপনার কাজ পরিচালনা করুন",
      manageTasksDescription:
        "আপনার কাজ তৈরি, সম্পাদনা এবং সংগঠিত করুন।",

      trackProgress: "আপনার অগ্রগতি দেখুন",
      trackProgressDescription:
        "সম্পন্ন এবং অসম্পন্ন কাজ দেখুন।",

      stayProductive: "উৎপাদনশীল থাকুন",
      stayProductiveDescription:
        "সবকিছু এক জায়গায় রাখুন।",

      footer:
        "© ২০২৬ TaskFlow। উৎপাদনশীলতার জন্য তৈরি।",

      taskAdded: "কাজ যোগ করা হয়েছে ✅",
      taskAddedBody: "সফলভাবে যোগ করা হয়েছে।",

      taskCompleted: "কাজ সম্পন্ন হয়েছে 🎉",
      taskCompletedBody: "সম্পন্ন হয়েছে।",

      taskReopened: "কাজ আবার খোলা হয়েছে 🔄",
      taskReopenedBody: "আবার খোলা হয়েছে।",

      taskDeleted: "কাজ মুছে ফেলা হয়েছে 🗑️",
      taskDeletedBody: "সফলভাবে মুছে ফেলা হয়েছে.",

      taskDeletedGeneric:
        "কাজটি সফলভাবে মুছে ফেলা হয়েছে।",

      allTasksCleared: "সব কাজ মুছে ফেলা হয়েছে 🗑️",
      allTasksClearedBody:
        "আপনার সব কাজ সফলভাবে মুছে ফেলা হয়েছে।"
    },

    "हिन्दी": {
      goodMorning: "सुप्रभात 👋",
      goodAfternoon: "शुभ दोपहर ☀️",
      goodEvening: "शुभ संध्या 🌆",
      goodNight: "शुभ रात्रि 🌙",

      loading: "लोड हो रहा है...",
      checkingSession: "आपका सत्र जांचा जा रहा है...",

      organizeWork: "अपने काम को व्यवस्थित करें।",
      getThingsDone: "अपने काम पूरे करें।",
      brandDescription:
        "एक सरल और शक्तिशाली टास्क मैनेजर जो आपको व्यवस्थित, केंद्रित और उत्पादक बने रहने में मदद करता है।",

      manageTasks: "अपने कार्यों को प्रबंधित करें",
      manageTasksDescription:
        "अपने काम को बनाएँ, संपादित करें और व्यवस्थित करें।",

      trackProgress: "अपनी प्रगति देखें",
      trackProgressDescription:
        "पूर्ण और लंबित कार्य देखें।",

      stayProductive: "उत्पादक बने रहें",
      stayProductiveDescription:
        "सब कुछ एक ही जगह रखें।",

      footer:
        "© 2026 TaskFlow। उत्पादकता के लिए बनाया गया।",

      taskAdded: "कार्य जोड़ा गया ✅",
      taskAddedBody: "सफलतापूर्वक जोड़ा गया।",

      taskCompleted: "कार्य पूर्ण हुआ 🎉",
      taskCompletedBody: "पूर्ण हो गया है।",

      taskReopened: "कार्य फिर से खोला गया 🔄",
      taskReopenedBody: "फिर से खोला गया है।",

      taskDeleted: "कार्य हटाया गया 🗑️",
      taskDeletedBody: "सफलतापूर्वक हटा दिया गया।",

      taskDeletedGeneric:
        "कार्य सफलतापूर्वक हटा दिया गया।",

      allTasksCleared: "सभी कार्य हटाए गए 🗑️",
      allTasksClearedBody:
        "आपके सभी कार्य सफलतापूर्वक हटा दिए गए हैं।"
    }
  };

  const currentText =
    text[language] || text.English;

  // =========================================================
  // AUTH STATE
  // =========================================================

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!sessionStorage.getItem("accessToken") ||
    !!sessionStorage.getItem("refreshToken")
  );

  const [authChecking, setAuthChecking] = useState(true);

  const [showRegister, setShowRegister] = useState(false);

  // =========================================================
  // FORGOT PASSWORD STATE
  // =========================================================

  const [showForgotPassword, setShowForgotPassword] =
    useState(false);

  // =========================================================
  // SIDEBAR STATE
  // =========================================================

  const [sidebarCollapsed, setSidebarCollapsed] =
    useState(false);

  // =========================================================
  // TASK STATE
  // =========================================================

  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // =========================================================
  // CURRENT TIME
  // =========================================================

  const [currentTime, setCurrentTime] =
    useState(new Date());

  // =========================================================
  // API URL
  // =========================================================

  const API_URL = import.meta.env.VITE_API_URL;

  // =========================================================
  // REFRESH ACCESS TOKEN
  // =========================================================

  const refreshAccessToken = useCallback(async () => {
    const refreshToken =
      sessionStorage.getItem("refreshToken");

    if (!refreshToken) {
      return false;
    }

    try {
      const response = await fetch(
        `${API_URL}/auth/refresh`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            refreshToken
          })
        }
      );

      const contentType =
        response.headers.get("content-type") || "";

      const data = contentType.includes(
        "application/json"
      )
        ? await response.json()
        : {};

      if (!response.ok || !data.accessToken) {
        throw new Error(
          data.message || "Unable to refresh token"
        );
      }

      sessionStorage.setItem(
        "accessToken",
        data.accessToken
      );

      return true;
    } catch (error) {
      console.error(
        "Token refresh failed:",
        error
      );

      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("refreshToken");
      sessionStorage.removeItem("taskflowUser");

      setIsLoggedIn(false);

      return false;
    }
  }, [API_URL]);

  // =========================================================
  // CHECK AUTH ON APP START
  // =========================================================

  useEffect(() => {
    const checkAuthentication = async () => {
      const accessToken =
        sessionStorage.getItem("accessToken");

      const refreshToken =
        sessionStorage.getItem("refreshToken");

      if (!accessToken && !refreshToken) {
        setIsLoggedIn(false);
        setAuthChecking(false);
        return;
      }

      if (accessToken) {
        setIsLoggedIn(true);
        setAuthChecking(false);
        return;
      }

      if (refreshToken) {
        const refreshed =
          await refreshAccessToken();

        if (refreshed) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }

        setAuthChecking(false);
        return;
      }

      setIsLoggedIn(false);
      setAuthChecking(false);
    };

    checkAuthentication();
  }, [refreshAccessToken]);

  // =========================================================
  // AUTHENTICATED API REQUEST
  // =========================================================

  const apiFetch = useCallback(
    async (url, options = {}) => {
      let accessToken =
        sessionStorage.getItem("accessToken");

      if (!accessToken) {
        const refreshed =
          await refreshAccessToken();

        if (!refreshed) {
          throw new Error(
            "Session expired. Please login again."
          );
        }

        accessToken =
          sessionStorage.getItem("accessToken");

        if (!accessToken) {
          throw new Error(
            "Unable to get new access token."
          );
        }
      }

      let response = await fetch(
        url,
        {
          ...options,
          headers: {
            ...(options.headers || {}),
            Authorization: `Bearer ${accessToken}`
          }
        }
      );

      if (response.status === 401) {
        const refreshed =
          await refreshAccessToken();

        if (!refreshed) {
          throw new Error(
            "Session expired. Please login again."
          );
        }

        accessToken =
          sessionStorage.getItem("accessToken");

        if (!accessToken) {
          throw new Error(
            "Unable to get new access token."
          );
        }

        response = await fetch(
          url,
          {
            ...options,
            headers: {
              ...(options.headers || {}),
              Authorization: `Bearer ${accessToken}`
            }
          }
        );
      }

      return response;
    },
    [refreshAccessToken]
  );

  // =========================================================
  // LOAD TASKS
  // =========================================================

  useEffect(() => {
    if (!isLoggedIn || authChecking) {
      return;
    }

    let cancelled = false;

    const loadTasks = async () => {
      try {
        const response = await apiFetch(
          `${API_URL}/tasks`,
          {
            cache: "no-store"
          }
        );

        const data =
          response.headers
            .get("content-type")
            ?.includes("application/json")
            ? await response.json()
            : null;

        if (!response.ok) {
          throw new Error(
            data?.message ||
              "Failed to load tasks"
          );
        }

        if (!cancelled) {
          setTasks(data || []);
        }
      } catch (error) {
        if (!cancelled) {
          console.error(
            "Error loading tasks:",
            error
          );
        }
      }
    };

    loadTasks();

    return () => {
      cancelled = true;
    };
  }, [
    isLoggedIn,
    authChecking,
    API_URL,
    apiFetch
  ]);

  // =========================================================
  // TASK REMINDER CHECKER
  // =========================================================

  useEffect(() => {
    if (!isLoggedIn || authChecking) {
      stopReminderChecker();
      return;
    }

    startReminderChecker(tasks);

    return () => {
      stopReminderChecker();
    };
  }, [
    tasks,
    isLoggedIn,
    authChecking
  ]);

  // =========================================================
  // UPDATE CLOCK
  // =========================================================

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // =========================================================
  // GREETING
  // =========================================================

  const currentHour = currentTime.getHours();

  let greeting;

  if (currentHour >= 5 && currentHour < 12) {
    greeting = currentText.goodMorning;
  } else if (
    currentHour >= 12 &&
    currentHour < 17
  ) {
    greeting = currentText.goodAfternoon;
  } else if (
    currentHour >= 17 &&
    currentHour < 21
  ) {
    greeting = currentText.goodEvening;
  } else {
    greeting = currentText.goodNight;
  }

  // =========================================================
  // COUNTERS
  // =========================================================

  const completedCount = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingCount =
    tasks.length - completedCount;

  const completionPercentage =
    tasks.length === 0
      ? 0
      : Math.round(
          (completedCount / tasks.length) * 100
        );

  // =========================================================
  // ADD TASK
  // =========================================================

  const addTask = async (
    taskText,
    reminderAt = null
  ) => {
    const tempId = `temp-${Date.now()}`;

    const tempTask = {
      _id: tempId,
      text: taskText,
      completed: false,
      reminderAt: reminderAt,
      createdAt: new Date().toISOString()
    };

    setTasks((oldTasks) => [
      tempTask,
      ...oldTasks
    ]);

    try {
      const response = await apiFetch(
        `${API_URL}/tasks`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            text: taskText,

            reminderAt: reminderAt
              ? new Date(
                  reminderAt
                ).toISOString()
              : null
          })
        }
      );

      const data =
        response.headers
          .get("content-type")
          ?.includes("application/json")
          ? await response.json()
          : null;

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Failed to add task"
        );
      }

      setTasks((oldTasks) =>
        oldTasks.map((task) =>
          task._id === tempId
            ? data
            : task
        )
      );

      showNotification(
        currentText.taskAdded,
        {
          body: `"${data.text}" ${currentText.taskAddedBody}`
        }
      );
    } catch (error) {
      console.error(
        "Error adding task:",
        error
      );

      setTasks((oldTasks) =>
        oldTasks.filter(
          (task) => task._id !== tempId
        )
      );
    }
  };

  // =========================================================
  // TOGGLE TASK
  // =========================================================

  const toggleTask = async (id) => {
    const oldTasks = [...tasks];

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task._id === id
          ? {
              ...task,
              completed: !task.completed
            }
          : task
      )
    );

    try {
      const response = await apiFetch(
        `${API_URL}/tasks/${id}`,
        {
          method: "PATCH"
        }
      );

      const data =
        response.headers
          .get("content-type")
          ?.includes("application/json")
          ? await response.json()
          : null;

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Failed to update task"
        );
      }

      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task._id === id
            ? data
            : task
        )
      );

      showNotification(
        data.completed
          ? currentText.taskCompleted
          : currentText.taskReopened,
        {
          body: data.completed
            ? `"${data.text}" ${currentText.taskCompletedBody}`
            : `"${data.text}" ${currentText.taskReopenedBody}`
        }
      );
    } catch (error) {
      console.error(
        "Error updating task:",
        error
      );

      setTasks(oldTasks);
    }
  };

  // =========================================================
  // DELETE TASK
  // =========================================================

  const deleteTask = async (id) => {
    const oldTasks = [...tasks];

    const deletedTask =
      tasks.find(
        (task) => task._id === id
      );

    setTasks((currentTasks) =>
      currentTasks.filter(
        (task) => task._id !== id
      )
    );

    try {
      const response = await apiFetch(
        `${API_URL}/tasks/${id}`,
        {
          method: "DELETE"
        }
      );

      const data =
        response.headers
          .get("content-type")
          ?.includes("application/json")
          ? await response.json()
          : null;

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Failed to delete task"
        );
      }

      showNotification(
        currentText.taskDeleted,
        {
          body: deletedTask?.text
            ? `"${deletedTask.text}" ${currentText.taskDeletedBody}`
            : currentText.taskDeletedGeneric
        }
      );
    } catch (error) {
      console.error(
        "Error deleting task:",
        error
      );

      setTasks(oldTasks);
    }
  };

  // =========================================================
  // EDIT TASK
  // =========================================================

  const editTask = async (
    id,
    newText
  ) => {
    const oldTasks = [...tasks];

    const existingTask =
      oldTasks.find(
        (task) => task._id === id
      );

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task._id === id
          ? {
              ...task,
              text: newText
            }
          : task
      )
    );

    try {
      const response = await apiFetch(
        `${API_URL}/tasks/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            text: newText,
            reminderAt:
              existingTask?.reminderAt ||
              null
          })
        }
      );

      const data =
        response.headers
          .get("content-type")
          ?.includes("application/json")
          ? await response.json()
          : null;

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Failed to edit task"
        );
      }

      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task._id === id
            ? data
            : task
        )
      );
    } catch (error) {
      console.error(
        "Error editing task:",
        error
      );

      setTasks(oldTasks);
    }
  };

  // =========================================================
  // CLEAR ALL TASKS
  // =========================================================

  const clearTasks = async () => {
    try {
      const response = await apiFetch(
        `${API_URL}/tasks`,
        {
          method: "DELETE"
        }
      );

      if (!response.ok) {
        let errorMessage =
          "Failed to clear tasks";

        try {
          const data =
            await response.json();

          if (data.message) {
            errorMessage =
              data.message;
          }
        } catch {
          // No JSON response
        }

        throw new Error(errorMessage);
      }

      setTasks([]);

      showNotification(
        currentText.allTasksCleared,
        {
          body:
            currentText.allTasksClearedBody
        }
      );

      console.log(
        "All tasks cleared successfully"
      );
    } catch (error) {
      console.error(
        "Error clearing tasks:",
        error
      );
    }
  };

  // =========================================================
  // AUTH CHECKING SCREEN
  // =========================================================

  if (authChecking) {
    return (
      <div className="auth-page">

        <div className="auth-form-container">

          <div className="auth-card">

            <h2>
              Loading...
            </h2>

            <p>
              Checking your session...
            </p>

          </div>

        </div>

      </div>
    );
  }

  // =========================================================
  // AUTH PAGE
  // =========================================================

  if (!isLoggedIn) {
    return (
      <Routes>

        {/* FORGOT PASSWORD */}

        <Route
          path="/forgot-password"
          element={
            <div className="auth-page">

              <div className="auth-background-circle circle-one"></div>

              <div className="auth-background-circle circle-two"></div>

              <div className="auth-layout">

                <div className="auth-brand">

                  <div className="brand-logo">
                    ✦ TASKFLOW
                  </div>

                  <h1>
                    Organize your work.
                    <br />
                    <span>
                      Get things done.
                    </span>
                  </h1>

                  <p className="brand-description">
                    A simple and powerful task manager
                    designed to help you stay organized,
                    focused and productive.
                  </p>

                </div>

                <div className="auth-form-container">

                  <ForgotPassword
                    onBackToLogin={() => {
                      setShowForgotPassword(false);
                      window.history.pushState(
                        {},
                        "",
                        "/"
                      );
                      window.dispatchEvent(
                        new PopStateEvent("popstate")
                      );
                    }}
                  />

                </div>

              </div>

              <div className="auth-footer">
                © 2026 TaskFlow. Built for productivity.
              </div>

            </div>
          }
        />

        {/* RESET PASSWORD */}

        <Route
          path="/reset-password/:token"
          element={
            <ResetPassword />
          }
        />

        {/* NORMAL LOGIN / REGISTER */}

        <Route
          path="*"
          element={
            <div className="auth-page">

              <div className="auth-background-circle circle-one"></div>

              <div className="auth-background-circle circle-two"></div>

              <div className="auth-layout">

                {/* LEFT SIDE */}

                <div className="auth-brand">

                  <div className="brand-logo">
                    ✦ TASKFLOW
                  </div>

                  <h1>
                    Organize your work.
                    <br />
                    <span>
                      Get things done.
                    </span>
                  </h1>

                  <p className="brand-description">
                    A simple and powerful task manager
                    designed to help you stay organized,
                    focused and productive.
                  </p>

                  <div className="feature-list">

                    <div className="feature">

                      <div className="feature-icon">
                        ✓
                      </div>

                      <div>

                        <strong>
                          Manage your tasks
                        </strong>

                        <p>
                          Create, edit and organize
                          your work.
                        </p>

                      </div>

                    </div>

                    <div className="feature">

                      <div className="feature-icon">
                        ✓
                      </div>

                      <div>

                        <strong>
                          Track your progress
                        </strong>

                        <p>
                          See completed and pending
                          tasks.
                        </p>

                      </div>

                    </div>

                    <div className="feature">

                      <div className="feature-icon">
                        ✓
                      </div>

                      <div>

                        <strong>
                          Stay productive
                        </strong>

                        <p>
                          Keep everything in one place.
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

                {/* RIGHT SIDE */}

                <div className="auth-form-container">

                  {showForgotPassword ? (

                    <ForgotPassword
                      onBackToLogin={() => {
                        setShowForgotPassword(false);
                      }}
                    />

                  ) : showRegister ? (

                    <Register
                      onLoginClick={() =>
                        setShowRegister(false)
                      }
                    />

                  ) : (

                    <Login
                      onLogin={() => {
                        setIsLoggedIn(true);
                      }}
                      onRegisterClick={() =>
                        setShowRegister(true)
                      }
                      onForgotPassword={() => {
                        setShowForgotPassword(true);
                      }}
                    />

                  )}

                </div>

              </div>

              <div className="auth-footer">
                © 2026 TaskFlow. Built for productivity.
              </div>

            </div>
          }
        />

      </Routes>
    );
  }

  // =========================================================
  // LOGGED-IN APPLICATION
  // =========================================================

  return (
    <>
      <Navbar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />

      <div
        className={
          sidebarCollapsed
            ? "app-content collapsed-main"
            : "app-content"
        }
      >

        <Routes>

          {/* DASHBOARD */}

          <Route
            path="/"
            element={
              <Dashboard
                tasks={tasks}
                search={search}
                setSearch={setSearch}
                filter={filter}
                setFilter={setFilter}
                greeting={greeting}
                currentTime={currentTime}
                completedCount={completedCount}
                pendingCount={pendingCount}
                completionPercentage={
                  completionPercentage
                }
                addTask={addTask}
                toggleTask={toggleTask}
                deleteTask={deleteTask}
                editTask={editTask}
                clearTasks={clearTasks}
              />
            }
          />

          {/* MY TASKS */}

          <Route
            path="/tasks"
            element={
              <MyTasks
                tasks={tasks}
                onAdd={addTask}
                onToggle={toggleTask}
                onDelete={deleteTask}
                onEdit={editTask}
                onClear={clearTasks}
              />
            }
          />

          {/* DAILY PROCESS */}

          <Route
            path="/daily-process"
            element={
              <DailyProcess
                tasks={tasks}
              />
            }
          />

          {/* CALENDAR */}

          <Route
            path="/calendar"
            element={
              <Calendar
                tasks={tasks}
              />
            }
          />

          {/* ANALYTICS */}

          <Route
            path="/analytics"
            element={
              <Analytics
                tasks={tasks}
              />
            }
          />

          {/* CATEGORIES */}

          <Route
            path="/categories"
            element={
              <Categories
                tasks={tasks}
              />
            }
          />

          {/* PROFILE */}

          <Route
            path="/profile"
            element={
              <Profile />
            }
          />

          {/* SETTINGS */}

          <Route
            path="/settings"
            element={
              <Settings />
            }
          />

          {/* RATING */}

          <Route
            path="/rating"
            element={
              <Rating />
            }
          />

          {/* UNKNOWN URL */}

          <Route
            path="*"
            element={
              <Navigate
                to="/"
                replace
              />
            }
          />

        </Routes>

      </div>
    </>
  );
}

// =========================================================
// APP
// =========================================================

function App() {
  return (
    <SettingsProvider>

      <BrowserRouter>

        <AppContent />

      </BrowserRouter>

    </SettingsProvider>
  );
}

export default App;
