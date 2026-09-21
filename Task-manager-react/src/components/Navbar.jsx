function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <aside className="sidebar">

      <div className="sidebar-logo">
        <div className="logo-symbol">✦</div>
        <span>TASKFLOW</span>
      </div>

      <div className="sidebar-section">
        <p className="sidebar-title">DASHBOARD</p>

        <button className="sidebar-link active">
          <span>◉</span>
          Overview
        </button>
      </div>

      <div className="sidebar-section">
        <p className="sidebar-title">WORKSPACE</p>

        <button className="sidebar-link">
          <span>✓</span>
          My Tasks
        </button>

        <button className="sidebar-link">
          <span>★</span>
          Important
        </button>
      </div>

      <div className="sidebar-section">
        <p className="sidebar-title">GENERAL</p>

        <button className="sidebar-link">
          <span>⚙</span>
          Settings
        </button>

        <button className="sidebar-link">
          <span>?</span>
          Help
        </button>
      </div>

      <div className="sidebar-bottom">

        <div className="account-box">
          <div className="account-avatar">
            U
          </div>

          <div>
            <strong>My Account</strong>
            <small>Personal workspace</small>
          </div>
        </div>

        <button
          className="logout-button"
          onClick={handleLogout}
        >
          <span>↪</span>
          Logout
        </button>

      </div>

    </aside>
  );
}

export default Navbar;