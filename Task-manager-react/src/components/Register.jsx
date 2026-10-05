import { useState } from "react";

function Register({ onLoginClick }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();
    setMessage("");

    // Remove extra spaces
    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();

    // Basic validation
    if (!trimmedName || !trimmedEmail || !password) {
      setMessage("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: trimmedName,
            email: trimmedEmail,
            password
          })
        }
      );

      // Safely read JSON response
      const contentType =
        response.headers.get("content-type") || "";

      const data = contentType.includes("application/json")
        ? await response.json()
        : {};

      if (response.ok) {
        // ==========================================
        // SAVE USER INFORMATION FOR PROFILE PAGE
        // ==========================================

        localStorage.setItem(
          "taskflowUser",
          JSON.stringify({
            name: trimmedName,
            email: trimmedEmail
          })
        );

        setMessage("Account created successfully!");

        // Clear form
        setName("");
        setEmail("");
        setPassword("");
        setShowPassword(false);
      } else {
        setMessage(
          data.message ||
            "Registration failed. Please try again."
        );
      }

    } catch (error) {
      console.error("Register error:", error);

      setMessage(
        "Server error. Please try again."
      );
    }
  };

  return (
    <div className="auth-card">

      {/* REGISTER ICON */}
      <div className="auth-icon register-icon">
        ✦
      </div>

      {/* TITLE */}
      <h2>Create your account</h2>

      <p className="auth-subtitle">
        Start organizing your work today.
      </p>

      {/* REGISTER FORM */}
      <form onSubmit={handleRegister}>

        {/* FULL NAME */}
        <div className="form-group">
          <label>Full name</label>

          <div className="input-wrapper">
            <span>👤</span>

            <input
              type="text"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              placeholder="Your name"
              autoComplete="name"
              required
            />
          </div>
        </div>

        {/* EMAIL */}
        <div className="form-group">
          <label>Email address</label>

          <div className="input-wrapper">
            <span>✉</span>

            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </div>
        </div>

        {/* PASSWORD */}
        <div className="form-group">
          <label>Password</label>

          <div className="input-wrapper">
            <span>🔒</span>

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="Create a password"
              autoComplete="new-password"
              required
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              aria-label={
                showPassword
                  ? "Hide password"
                  : "Show password"
              }
            >
              {showPassword ? "🙈" : "👁"}
            </button>
          </div>
        </div>

        {/* CREATE ACCOUNT */}
        <button
          type="submit"
          className="auth-button"
        >
          Create account
          <span>→</span>
        </button>

      </form>

      {/* MESSAGE */}
      {message && (
        <p className="auth-message">
          {message}
        </p>
      )}

      {/* DIVIDER */}
      <div className="auth-divider">
        <span>OR</span>
      </div>

      {/* LOGIN LINK */}
      <p className="switch-text">
        Already have an account?

        <button
          type="button"
          onClick={onLoginClick}
          className="switch-button"
        >
          Sign in
        </button>
      </p>

    </div>
  );
}

export default Register;
