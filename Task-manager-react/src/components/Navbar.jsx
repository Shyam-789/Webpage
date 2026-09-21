function Navbar() {

  const handleLogout = () => {
    localStorage.removeItem("token");

    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        <h2>Task Manager</h2>

        <ul className="nav-links">
          <li>Home</li>
          <li>Tasks</li>
          <li>About</li>

          <li>
            <button onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>

      </div>
    </nav>
  );
}

export default Navbar;