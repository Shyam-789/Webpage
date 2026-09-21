import { useState } from "react";

function Login({ onLogin, onRegisterClick }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

 const handleLogin = async (event) => {
  event.preventDefault();
  setMessage("");

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      }
    );

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);

      if (onLogin) {
        onLogin();
      }
    } else {
      setMessage(data.message);
    }
  } catch (error) {
    console.error(error);
    setMessage("Server error. Please try again.");
  }
};



  return (
    <div className="auth-card">

      <div className="auth-icon">
        ✓
      </div>

      <h2>Welcome back</h2>

      <p className="auth-subtitle">
        Sign in to continue managing your tasks.
      </p>

      <form onSubmit={handleLogin}>

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
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Password</label>

          <div className="input-wrapper">
            <span>🔒</span>

            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="Enter your password"
              required
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? "🙈" : "👁"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="auth-button"
        >
          Sign in
          <span>→</span>
        </button>

      </form>

      {message && (
        <p className="auth-message">
          {message}
        </p>
      )}

      <div className="auth-divider">
        <span>OR</span>
      </div>

      <p className="switch-text">
        Don't have an account?
        <button
          type="button"
          onClick={onRegisterClick}
          className="switch-button"
        >
          Create account
        </button>
      </p>

    </div>
  );
}

export default Login;