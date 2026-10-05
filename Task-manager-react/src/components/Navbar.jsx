import { Link, useLocation } from "react-router-dom";
import { useSettings } from "../context/useSettings";

function Navbar({ collapsed, setCollapsed }) {
  const location = useLocation();

  const { t } = useSettings();

  const handleLogout = () => {
    // Remove authentication tokens from this tab only
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");

    // Remove old token also, if it still exists
    sessionStorage.removeItem("token");

    // Remove user data for this tab
    sessionStorage.removeItem("taskflowUser");

    // Reload the page
    window.location.reload();
  };

  return (
    <aside
      className={`sidebar ${
        collapsed ? "collapsed" : ""
      }`}
    >

      {/* TOP */}
      <div className="sidebar-top">

        {/* LOGO */}
        <div className="sidebar-logo">

          <div className="logo-symbol">
            ✦
          </div>

          {!collapsed && (
            <span>{t("taskflow")}</span>
          )}

        </div>

        {/* TOGGLE BUTTON */}
        <button
          className="sidebar-toggle"
          onClick={() =>
            setCollapsed(!collapsed)
          }
          title={
            collapsed
              ? "Open sidebar"
              : "Close sidebar"
          }
        >
          ☰
        </button>

      </div>


      {/* NAVIGATION */}

      <nav className="sidebar-nav">

        {/* DASHBOARD */}

        <Link
          to="/"
          className={`sidebar-link ${
            location.pathname === "/"
              ? "active"
              : ""
          }`}
          title={t("dashboard")}
        >
          <span>◉</span>

          {!collapsed && (
            <label>{t("dashboard")}</label>
          )}
        </Link>


        {/* MY TASKS */}

        <Link
          to="/tasks"
          className={`sidebar-link ${
            location.pathname === "/tasks"
              ? "active"
              : ""
          }`}
          title={t("myTasks")}
        >
          <span>✓</span>

          {!collapsed && (
            <label>{t("myTasks")}</label>
          )}
        </Link>


        {/* DAILY PROCESS */}

        <Link
          to="/daily-process"
          className={`sidebar-link ${
            location.pathname === "/daily-process"
              ? "active"
              : ""
          }`}
          title={t("dailyProcess")}
        >
          <span>★</span>

          {!collapsed && (
            <label>{t("dailyProcess")}</label>
          )}
        </Link>


        {/* CALENDAR */}

        <Link
          to="/calendar"
          className={`sidebar-link ${
            location.pathname === "/calendar"
              ? "active"
              : ""
          }`}
          title={t("calendar")}
        >
          <span>▣</span>

          {!collapsed && (
            <label>{t("calendar")}</label>
          )}
        </Link>


        {/* ANALYTICS */}

        <Link
          to="/analytics"
          className={`sidebar-link ${
            location.pathname === "/analytics"
              ? "active"
              : ""
          }`}
          title={t("analytics")}
        >
          <span>▥</span>

          {!collapsed && (
            <label>{t("analytics")}</label>
          )}
        </Link>


        {/* CATEGORIES */}

        <Link
          to="/categories"
          className={`sidebar-link ${
            location.pathname === "/categories"
              ? "active"
              : ""
          }`}
          title={t("categories")}
        >
          <span>◈</span>

          {!collapsed && (
            <label>{t("categories")}</label>
          )}
        </Link>


        {/* PROFILE */}

        <Link
          to="/profile"
          className={`sidebar-link ${
            location.pathname === "/profile"
              ? "active"
              : ""
          }`}
          title={t("profile")}
        >
          <span>◯</span>

          {!collapsed && (
            <label>{t("profile")}</label>
          )}
        </Link>


        {/* SETTINGS */}

        <Link
          to="/settings"
          className={`sidebar-link ${
            location.pathname === "/settings"
              ? "active"
              : ""
          }`}
          title={t("settings")}
        >
          <span>⚙</span>

          {!collapsed && (
            <label>{t("settings")}</label>
          )}
        </Link>


        {/* RATING */}

        <Link
          to="/rating"
          className={`sidebar-link ${
            location.pathname === "/rating"
              ? "active"
              : ""
          }`}
          title={t("rating")}
        >
          <span>⭐</span>

          {!collapsed && (
            <label>{t("rating")}</label>
          )}
        </Link>

      </nav>


      {/* LOGOUT */}

      <div className="sidebar-bottom">

        <button
          className="logout-button"
          onClick={handleLogout}
          title={t("logout")}
        >
          <span>↪</span>

          {!collapsed && (
            <label>{t("logout")}</label>
          )}

        </button>

      </div>

    </aside>
  );
}

export default Navbar;
