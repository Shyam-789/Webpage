
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

  try {
    // Use a service worker on mobile when one is registered
    if ("serviceWorker" in navigator) {
      const registration =
        await navigator.serviceWorker.getRegistration();

      if (registration?.showNotification) {
        await registration.showNotification(title, {
          ...options,
          icon: options.icon || "/favicon.ico",
        });
        return;
      }
    }

    // Desktop fallback
    new Notification(title, {
      ...options,
    });
  } catch (error) {
    console.error(
      "TASKFLOW notification failed:",
      error
    );
  }
};
