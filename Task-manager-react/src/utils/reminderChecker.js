
// ========================================
// TASKFLOW REMINDER CHECKER
// ========================================

import { showNotification } from "./notifications";

let reminderTimer = null;

let currentTasks = [];

const notifiedReminders = new Set();

// ========================================
// CHECK TASK REMINDERS
// ========================================

const checkReminders = () => {
  if (!Array.isArray(currentTasks)) {
    return;
  }

  const now = Date.now();

  currentTasks.forEach((task) => {
    if (!task.reminderAt) {
      return;
    }

    if (task.completed) {
      return;
    }

    const reminderTime =
      new Date(task.reminderAt).getTime();

    if (Number.isNaN(reminderTime)) {
      return;
    }

    if (
      reminderTime <= now &&
      !notifiedReminders.has(task._id)
    ) {
      notifiedReminders.add(task._id);

      showNotification("Task Reminder ⏰", {
        body: `"${task.text}" is due now.`
      });
    }
  });
};

// ========================================
// START REMINDER CHECKER
// ========================================

export const startReminderChecker = (tasks) => {
  currentTasks = Array.isArray(tasks)
    ? tasks
    : [];

  checkReminders();

  if (reminderTimer) {
    clearInterval(reminderTimer);
  }

  reminderTimer = setInterval(() => {
    checkReminders();
  }, 30000);
};

// ========================================
// STOP REMINDER CHECKER
// ========================================

export const stopReminderChecker = () => {
  if (reminderTimer) {
    clearInterval(reminderTimer);
    reminderTimer = null;
  }

  currentTasks = [];
};
