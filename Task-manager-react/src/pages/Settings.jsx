import { useSettings } from "../context/useSettings";

function Settings() {
  // ==========================================
  // SETTINGS FROM SETTINGS PROVIDER
  // ==========================================

  const {
    notifications,
    setNotifications,

    sound,
    setSound,

    compactMode,
    setCompactMode,

    appearance,
    setAppearance,

    language,
    setLanguage,

    timeFormat,
    setTimeFormat,

    t
  } = useSettings();

  // ==========================================
  // APPEARANCE BUTTON
  // ==========================================

  const handleAppearance = () => {
    setAppearance((current) =>
      current === "dark" ? "light" : "dark"
    );
  };

  return (
    <div className="modern-page">

      {/* =====================================
          PAGE HEADER
          ===================================== */}

      <div className="modern-page-header">

        <div>

          <span className="modern-page-label">
            {t("preferences")}
          </span>

          <h1>
            {t("settings")}
          </h1>

          <p>
            {t("customizeSettings")}
          </p>

        </div>

      </div>

      {/* =====================================
          SETTINGS GRID
          ===================================== */}

      <div className="settings-grid">

        {/* ===================================
            NOTIFICATIONS
            =================================== */}

        <div className="settings-card">

          <div className="settings-card-icon">
            🔔
          </div>

          <div className="settings-card-content">

            <h2>
              {t("notifications")}
            </h2>

            <p>
              {t("notificationsDescription")}
            </p>

          </div>

          <button
            type="button"
            className={`settings-toggle ${
              notifications ? "active" : ""
            }`}
            onClick={() =>
              setNotifications(
                (current) => !current
              )
            }
            aria-label={t("notifications")}
            aria-pressed={notifications}
          >
            <span />
          </button>

        </div>

        {/* ===================================
            SOUND
            =================================== */}

        <div className="settings-card">

          <div className="settings-card-icon">
            🔊
          </div>

          <div className="settings-card-content">

            <h2>
              {t("completionSound")}
            </h2>

            <p>
              {t("completionSoundDescription")}
            </p>

          </div>

          <button
            type="button"
            className={`settings-toggle ${
              sound ? "active" : ""
            }`}
            onClick={() =>
              setSound(
                (current) => !current
              )
            }
            aria-label={t("completionSound")}
            aria-pressed={sound}
          >
            <span />
          </button>

        </div>

        {/* ===================================
            COMPACT MODE
            =================================== */}

        <div className="settings-card">

          <div className="settings-card-icon">
            ◫
          </div>

          <div className="settings-card-content">

            <h2>
              {t("compactMode")}
            </h2>

            <p>
              {t("compactModeDescription")}
            </p>

          </div>

          <button
            type="button"
            className={`settings-toggle ${
              compactMode ? "active" : ""
            }`}
            onClick={() =>
              setCompactMode(
                (current) => !current
              )
            }
            aria-label={t("compactMode")}
            aria-pressed={compactMode}
          >
            <span />
          </button>

        </div>

        {/* ===================================
            APPEARANCE
            =================================== */}

        <div className="settings-card">

          <div className="settings-card-icon">
            🎨
          </div>

          <div className="settings-card-content">

            <h2>
              {t("appearance")}
            </h2>

            <p>
              {t("appearanceDescription")}
            </p>

            <small>
              {t("current")}:{" "}
              {appearance === "dark"
                ? t("dark")
                : t("light")}
            </small>

          </div>

          <button
            type="button"
            className="settings-arrow"
            onClick={handleAppearance}
            aria-label={
              appearance === "dark"
                ? `${t("appearance")}: ${t("dark")}`
                : `${t("appearance")}: ${t("light")}`
            }
            title={
              appearance === "dark"
                ? `${t("dark")} → ${t("light")}`
                : `${t("light")} → ${t("dark")}`
            }
          >
            →
          </button>

        </div>

      </div>

      {/* =====================================
          GENERAL
          ===================================== */}

      <div className="settings-section">

        <span className="modern-page-label">
          {t("general")}
        </span>

        {/* ===================================
            LANGUAGE
            =================================== */}

        <div className="settings-option">

          <div>

            <h3>
              {t("language")}
            </h3>

            <p>
              {t("languageDescription")}
            </p>

          </div>

          <select
            value={language}
            onChange={(event) =>
              setLanguage(event.target.value)
            }
            aria-label={t("language")}
          >

            <option value="English">
              English
            </option>

            <option value="বাংলা">
              বাংলা
            </option>

            <option value="हिन्दी">
              हिन्दी
            </option>

          </select>

        </div>

        {/* ===================================
            TIME FORMAT
            =================================== */}

        <div className="settings-option">

          <div>

            <h3>
              {t("timeFormat")}
            </h3>

            <p>
              {t("timeFormatDescription")}
            </p>

          </div>

          <select
            value={timeFormat}
            onChange={(event) =>
              setTimeFormat(event.target.value)
            }
            aria-label={t("timeFormat")}
          >

            <option value="12-hour">
              {t("hour12")}
            </option>

            <option value="24-hour">
              {t("hour24")}
            </option>

          </select>

        </div>

      </div>

    </div>
  );
}

export default Settings;
