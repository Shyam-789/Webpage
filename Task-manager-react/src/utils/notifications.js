
// ========================================
// TASKFLOW BROWSER NOTIFICATIONS
// ========================================

export const requestNotificationPermission = async () => {
  if (!("Notification" in window)) {
    return false;
  }

  if (Notification.permission === "granted") {
    return true;
  }

  if (Notification.permission === "denied") {
    return false;
  }

  const permission =
    await Notification.requestPermission();

  return permission === "granted";
};


// ========================================
// CHECK NOTIFICATION SETTING
// ========================================

export const notificationsEnabled = () => {
  const saved = localStorage.getItem(
    "taskflowNotifications"
  );

  return saved !== "false";
};


// ========================================
// SHOW NOTIFICATION
// ========================================

export const showNotification = async (
  title,
  options = {}
) => {
  if (!notificationsEnabled()) {
    return;
  }

  if (!("Notification" in window)) {
    return;
  }

  const allowed =
    await requestNotificationPermission();

  if (!allowed) {
    return;
  }

  new Notification(title, {
    ...options
  });
};
