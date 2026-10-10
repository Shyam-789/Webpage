
import { useEffect, useRef, useState } from "react";
import { SettingsContext } from "./SettingsContext";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000";

// ==========================================
// AUTHENTICATED SETTINGS API
// ==========================================

async function settingsApiFetch(path, options = {}) {
  const makeRequest = (token) =>
    fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
        ...(token
          ? { Authorization: `Bearer ${token}` }
          : {})
      }
    });

  let accessToken = sessionStorage.getItem("accessToken");
  let response = await makeRequest(accessToken);

  if (response.status === 401) {
    const refreshToken =
      sessionStorage.getItem("refreshToken");

    if (!refreshToken) return response;

    const refreshResponse = await fetch(
      `${API_URL}/auth/refresh`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ refreshToken })
      }
    );

    if (!refreshResponse.ok) return response;

    const data = await refreshResponse.json();

    if (!data.accessToken) return response;

    sessionStorage.setItem("accessToken", data.accessToken);

    response = await makeRequest(data.accessToken);
  }

  return response;
}

const translations = {
  English: {
    taskflow: "TASKFLOW",
    dashboard: "Dashboard",
    myTasks: "My Tasks",
    dailyProcess: "Daily Process",
    calendar: "Calendar",
    analytics: "Analytics",
    categories: "Categories",
    profile: "Profile",
    settings: "Settings",
    rating: "Rating",
    logout: "Logout",
    preferences: "PREFERENCES",
    customizeSettings: "Customize TASKFLOW to work the way you prefer.",
    notifications: "Notifications",
    notificationsDescription: "Receive reminders and productivity notifications.",
    completionSound: "Task Completion Sound",
    completionSoundDescription: "Play a sound when completing a task.",
    compactMode: "Compact Mode",
    compactModeDescription: "Use a more compact task layout.",
    appearance: "Appearance",
    appearanceDescription: "Customize the look of your workspace.",
    current: "Current",
    dark: "Dark",
    light: "Light",
    general: "GENERAL",
    language: "Language",
    languageDescription: "Choose your preferred language.",
    timeFormat: "Time Format",
    timeFormatDescription: "Choose how time is displayed.",
    hour12: "12-hour",
    hour24: "24-hour",
    account: "ACCOUNT",
    personalInformation: "PERSONAL INFORMATION",
    fullName: "Full Name",
    emailAddress: "Email Address",
    accountType: "Account Type",
    standardAccount: "Standard Account",
    active: "Active",
    protected: "Protected",
    notSignedIn: "Not signed in",
    editProfile: "Edit Profile",
    saveChanges: "Save Changes",
    cancel: "Cancel",
    addPhoto: "Add Photo",
    remove: "Remove",
    organization: "ORGANIZATION",
    selectedCategory: "SELECTED CATEGORY",
    allTasks: "All Tasks",
    pending: "Pending",
    completed: "Completed",
    important: "Important",
    newCategory: "New Category",
    workspace: "WORKSPACE",
    search: "Search",
    addTask: "Add Task",
    clearAll: "Clear All",
    welcome: "Welcome",
    goodMorning: "Good morning",
    goodAfternoon: "Good afternoon",
    goodEvening: "Good evening",
    goodNight: "Good night"
  },

  বাংলা: {
    taskflow: "টাস্কফ্লো",
    dashboard: "ড্যাশবোর্ড",
    myTasks: "আমার কাজ",
    dailyProcess: "দৈনিক প্রক্রিয়া",
    calendar: "ক্যালেন্ডার",
    analytics: "বিশ্লেষণ",
    categories: "ক্যাটাগরি",
    profile: "প্রোফাইল",
    settings: "সেটিংস",
    rating: "রেটিং",
    logout: "লগআউট",
    preferences: "পছন্দসমূহ",
    customizeSettings: "আপনার পছন্দ অনুযায়ী TASKFLOW কাস্টমাইজ করুন।",
    notifications: "নোটিফিকেশন",
    notificationsDescription: "রিমাইন্ডার এবং প্রোডাক্টিভিটি নোটিফিকেশন পান।",
    completionSound: "কাজ সম্পন্ন হওয়ার শব্দ",
    completionSoundDescription: "কাজ সম্পন্ন হলে একটি শব্দ বাজান।",
    compactMode: "কমপ্যাক্ট মোড",
    compactModeDescription: "আরও ছোট এবং কমপ্যাক্ট টাস্ক লেআউট ব্যবহার করুন।",
    appearance: "চেহারা",
    appearanceDescription: "আপনার ওয়ার্কস্পেসের চেহারা পরিবর্তন করুন।",
    current: "বর্তমান",
    dark: "ডার্ক",
    light: "লাইট",
    general: "সাধারণ",
    language: "ভাষা",
    languageDescription: "আপনার পছন্দের ভাষা নির্বাচন করুন।",
    timeFormat: "সময়ের ফরম্যাট",
    timeFormatDescription: "সময় কীভাবে প্রদর্শিত হবে তা নির্বাচন করুন।",
    hour12: "১২-ঘণ্টা",
    hour24: "২৪-ঘণ্টা",
    account: "অ্যাকাউন্ট",
    personalInformation: "ব্যক্তিগত তথ্য",
    fullName: "পুরো নাম",
    emailAddress: "ইমেল ঠিকানা",
    accountType: "অ্যাকাউন্টের ধরন",
    standardAccount: "সাধারণ অ্যাকাউন্ট",
    active: "সক্রিয়",
    protected: "সুরক্ষিত",
    notSignedIn: "সাইন ইন করা নেই",
    editProfile: "প্রোফাইল সম্পাদনা",
    saveChanges: "পরিবর্তন সংরক্ষণ",
    cancel: "বাতিল",
    addPhoto: "ছবি যোগ করুন",
    remove: "সরান",
    organization: "সংগঠন",
    selectedCategory: "নির্বাচিত ক্যাটাগরি",
    allTasks: "সব কাজ",
    pending: "অসম্পন্ন",
    completed: "সম্পন্ন",
    important: "গুরুত্বপূর্ণ",
    newCategory: "নতুন ক্যাটাগরি",
    workspace: "ওয়ার্কস্পেস",
    search: "অনুসন্ধান",
    addTask: "কাজ যোগ করুন",
    clearAll: "সব মুছুন",
    welcome: "স্বাগতম",
    goodMorning: "সুপ্রভাত",
    goodAfternoon: "শুভ অপরাহ্ন",
    goodEvening: "শুভ সন্ধ্যা",
    goodNight: "শুভ রাত্রি"
  },

  हिन्दी: {
    taskflow: "टास्कफ्लो",
    dashboard: "डैशबोर्ड",
    myTasks: "मेरे कार्य",
    dailyProcess: "दैनिक प्रक्रिया",
    calendar: "कैलेंडर",
    analytics: "विश्लेषण",
    categories: "श्रेणियाँ",
    profile: "प्रोफ़ाइल",
    settings: "सेटिंग्स",
    rating: "रेटिंग",
    logout: "लॉगआउट",
    preferences: "प्राथमिकताएँ",
    customizeSettings: "TASKFLOW को अपनी पसंद के अनुसार कस्टमाइज़ करें।",
    notifications: "सूचनाएँ",
    notificationsDescription: "रिमाइंडर और उत्पादकता सूचनाएँ प्राप्त करें।",
    completionSound: "कार्य पूरा होने की ध्वनि",
    completionSoundDescription: "कार्य पूरा होने पर ध्वनि बजाएँ।",
    compactMode: "कॉम्पैक्ट मोड",
    compactModeDescription: "अधिक कॉम्पैक्ट टास्क लेआउट का उपयोग करें।",
    appearance: "दिखावट",
    appearanceDescription: "अपने वर्कस्पेस की दिखावट बदलें।",
    current: "वर्तमान",
    dark: "डार्क",
    light: "लाइट",
    general: "सामान्य",
    language: "भाषा",
    languageDescription: "अपनी पसंदीदा भाषा चुनें।",
    timeFormat: "समय प्रारूप",
    timeFormatDescription: "समय कैसे दिखाया जाए, यह चुनें।",
    hour12: "12 घंटे",
    hour24: "24 घंटे",
    account: "अकाउंट",
    personalInformation: "व्यक्तिगत जानकारी",
    fullName: "पूरा नाम",
    emailAddress: "ईमेल पता",
    accountType: "अकाउंट प्रकार",
    standardAccount: "सामान्य अकाउंट",
    active: "सक्रिय",
    protected: "सुरक्षित",
    notSignedIn: "साइन इन नहीं है",
    editProfile: "प्रोफ़ाइल संपादित करें",
    saveChanges: "परिवर्तन सहेजें",
    cancel: "रद्द करें",
    addPhoto: "फोटो जोड़ें",
    remove: "हटाएँ",
    organization: "संगठन",
    selectedCategory: "चयनित श्रेणी",
    allTasks: "सभी कार्य",
    pending: "लंबित",
    completed: "पूर्ण",
    important: "महत्वपूर्ण",
    newCategory: "नई श्रेणी",
    workspace: "वर्कस्पेस",
    search: "खोजें",
    addTask: "कार्य जोड़ें",
    clearAll: "सभी हटाएँ",
    welcome: "स्वागत है",
    goodMorning: "सुप्रभात",
    goodAfternoon: "शुभ दोपहर",
    goodEvening: "शुभ संध्या",
    goodNight: "शुभ रात्रि"
  }
};

function translate(language, key) {
  return (
    translations[language]?.[key] ??
    translations.English?.[key] ??
    key
  );
}

function getLocale(language) {
  if (language === "বাংলা") return "bn-BD";
  if (language === "हिन्दी") return "hi-IN";
  return "en-US";
}

export function SettingsProvider({ children }) {
  const [appearance, setAppearance] = useState(() => {
    return localStorage.getItem("taskflowAppearance") === "light"
      ? "light"
      : "dark";
  });

  const [sound, setSound] = useState(() => {
    return localStorage.getItem("taskflowSound") !== "false";
  });

  const [notifications, setNotifications] = useState(() => {
    return localStorage.getItem("taskflowNotifications") !== "false";
  });

  const [compactMode, setCompactMode] = useState(() => {
    const saved = localStorage.getItem("taskflowCompactMode");

    if (saved !== null) return saved === "true";

    return window.matchMedia("(max-width: 600px)").matches;
  });

  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem("taskflowLanguage");
    return translations[saved] ? saved : "English";
  });

  const [timeFormat, setTimeFormat] = useState(() => {
    return localStorage.getItem("taskflowTimeFormat") === "24-hour"
      ? "24-hour"
      : "12-hour";
  });

  // NEW: Controls when MongoDB loading and saving can happen.
  const [settingsLoaded, setSettingsLoaded] = useState(false);
  const saveTimer = useRef(null);

  // ==========================================
  // LOAD SETTINGS FROM MONGODB
  // ==========================================

  useEffect(() => {
    let cancelled = false;

    async function loadSettings() {
      try {
        const hasSession =
          sessionStorage.getItem("accessToken") ||
          sessionStorage.getItem("refreshToken");

        if (!hasSession) return;

        const response = await settingsApiFetch("/settings");

        if (!response.ok) {
          throw new Error(`Settings load failed: ${response.status}`);
        }

        const data = await response.json();
        const saved = data.settings ?? data;

        if (cancelled) return;

        if (saved.appearance === "light" || saved.appearance === "dark") {
          setAppearance(saved.appearance);
        }

        if (typeof saved.sound === "boolean") {
          setSound(saved.sound);
        }

        if (typeof saved.notifications === "boolean") {
          setNotifications(saved.notifications);
        }

        if (typeof saved.compactMode === "boolean") {
          setCompactMode(saved.compactMode);
        }

        if (translations[saved.language]) {
          setLanguage(saved.language);
        }

        if (saved.timeFormat === "12-hour" || saved.timeFormat === "24-hour") {
          setTimeFormat(saved.timeFormat);
        }
      } catch (error) {
        console.error("Could not load settings:", error);
      } finally {
        if (!cancelled) setSettingsLoaded(true);
      }
    }

    loadSettings();

    return () => {
      cancelled = true;
    };
  }, []);

  // ==========================================
  // SAVE SETTINGS TO MONGODB
  // ==========================================

  useEffect(() => {
    if (!settingsLoaded) return;

    if (!sessionStorage.getItem("accessToken")) return;

    clearTimeout(saveTimer.current);

    saveTimer.current = setTimeout(async () => {
      try {
        const response = await settingsApiFetch("/settings", {
          method: "PUT",
          body: JSON.stringify({
            appearance,
            sound,
            notifications,
            compactMode,
            language,
            timeFormat
          })
        });

        if (!response.ok) {
          console.error("Failed to save settings:", response.status);
        }
      } catch (error) {
        console.error("Could not save settings:", error);
      }
    }, 400);

    return () => clearTimeout(saveTimer.current);
  }, [
    settingsLoaded,
    appearance,
    sound,
    notifications,
    compactMode,
    language,
    timeFormat
  ]);

  // ==========================================
  // SAVE + APPLY APPEARANCE
  // ==========================================

  useEffect(() => {
    localStorage.setItem("taskflowAppearance", appearance);

    document.documentElement.setAttribute("data-theme", appearance);

    document.documentElement.classList.toggle(
      "light-theme",
      appearance === "light"
    );

    document.body.setAttribute("data-theme", appearance);
  }, [appearance]);

  // ==========================================
  // SAVE SOUND
  // ==========================================

  useEffect(() => {
    localStorage.setItem("taskflowSound", String(sound));
  }, [sound]);

  // ==========================================
  // SAVE NOTIFICATIONS
  // ==========================================

  useEffect(() => {
    localStorage.setItem("taskflowNotifications", String(notifications));
  }, [notifications]);

  // ==========================================
  // SAVE COMPACT MODE
  // ==========================================

  useEffect(() => {
    localStorage.setItem("taskflowCompactMode", String(compactMode));

    document.documentElement.classList.toggle(
      "compact-mode",
      compactMode
    );
  }, [compactMode]);

  // ==========================================
  // SAVE LANGUAGE
  // ==========================================

  useEffect(() => {
    localStorage.setItem("taskflowLanguage", language);

    document.documentElement.lang =
      language === "বাংলা"
        ? "bn"
        : language === "हिन्दी"
        ? "hi"
        : "en";
  }, [language]);

  // ==========================================
  // SAVE TIME FORMAT
  // ==========================================

  useEffect(() => {
    localStorage.setItem("taskflowTimeFormat", timeFormat);
  }, [timeFormat]);

  // ==========================================
  // TRANSLATION
  // ==========================================

  const t = (key) => translate(language, key);

  // ==========================================
  // FORMAT TIME
  // ==========================================

  const formatTime = (date) => {
    const currentDate = date instanceof Date ? date : new Date(date);

    if (Number.isNaN(currentDate.getTime())) return "";

    return currentDate.toLocaleTimeString(getLocale(language), {
      hour: "numeric",
      minute: "2-digit",
      hour12: timeFormat === "12-hour"
    });
  };

  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatDate = (date) => {
    const currentDate = date instanceof Date ? date : new Date(date);

    if (Number.isNaN(currentDate.getTime())) return "";

    return currentDate.toLocaleDateString(getLocale(language), {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  };

  // ==========================================
  // CONTEXT VALUE
  // ==========================================

  const value = {
    appearance,
    setAppearance,
    sound,
    setSound,
    notifications,
    setNotifications,
    compactMode,
    setCompactMode,
    language,
    setLanguage,
    timeFormat,
    setTimeFormat,
    t,
    formatTime,
    formatDate
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}
