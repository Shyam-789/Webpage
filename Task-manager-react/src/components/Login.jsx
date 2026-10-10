
import { useState } from "react";

function Login({
  onLogin,
  onRegisterClick,
  onForgotPassword
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:3000";

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email.trim() || !password) {
      setMessage("Please enter email and password.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email.trim(),
          password
        })
      });

      const contentType =
        response.headers.get("content-type") || "";

      const data = contentType.includes("application/json")
        ? await response.json()
        : {};

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      if (!data.accessToken || !data.refreshToken) {
        throw new Error(
          "Login successful, but authentication tokens were not received."
        );
      }

      // Save both tokens in sessionStorage
      sessionStorage.setItem("accessToken", data.accessToken);
      sessionStorage.setItem("refreshToken", data.refreshToken);

      // Save current user
      if (data.user) {
        sessionStorage.setItem(
          "taskflowUser",
          JSON.stringify({
            id: data.user.id,
            name: data.user.name,
            email: data.user.email
          })
        );
      }

      onLogin();
    } catch (error) {
      console.error("Login error:", error);
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <div className="auth-icon">✓</div>

      <h2>Welcome back</h2>

      <p className="auth-subtitle">
        Sign in to continue managing your tasks.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="login-email">Email address</label>

          <div className="input-wrapper">
            <span>✉</span>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="login-password">Password</label>

          <div className="input-wrapper">
            <span>🔒</span>
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "🙈" : "👁"}
            </button>
          </div>

          <div className="forgot-password">
            <button
              type="button"
              className="forgot-password-button"
              onClick={onForgotPassword}
            >
              Forgot password?
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="auth-button"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign in"}
          {!loading && <span>→</span>}
        </button>
      </form>

      {message && (
        <p className="auth-message">{message}</p>
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
