import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    if (!password || !confirmPassword) {
      setError("Please enter both password fields.");
      return;
    }

    if (password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!token) {
      setError(
        "Invalid or missing password reset token."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/auth/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            token,
            password
          })
        }
      );

      const contentType =
        response.headers.get("content-type") || "";

      const data = contentType.includes(
        "application/json"
      )
        ? await response.json()
        : {};

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to reset password."
        );
      }

      setMessage(
        data.message ||
          "Password reset successfully."
      );

      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        navigate("/");
      }, 2000);

    } catch (error) {
      console.error(
        "Reset password error:",
        error
      );

      setError(
        error.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-background-circle circle-one"></div>

      <div className="auth-background-circle circle-two"></div>

      <div className="auth-layout">

        {/* LEFT SIDE */}

        <div className="auth-brand">

          <div className="brand-logo">
            ✦ TASKFLOW
          </div>

          <h1>
            Create a new password.
            <br />

            <span>
              Secure your account.
            </span>
          </h1>

          <p className="brand-description">
            Choose a strong new password for your
            TaskFlow account.
          </p>

        </div>

        {/* RIGHT SIDE */}

        <div className="auth-form-container">

          <div className="auth-card">

            <div className="auth-card-header">

              <h2>
                Reset Password
              </h2>

              <p>
                Enter your new password below.
              </p>

            </div>

            <form onSubmit={handleSubmit}>

              {/* NEW PASSWORD */}

              <div className="form-group">

                <label htmlFor="new-password">
                  New Password
                </label>

                <input
                  id="new-password"
                  type="password"
                  value={password}
                  onChange={(event) =>
                    setPassword(
                      event.target.value
                    )
                  }
                  placeholder="Enter new password"
                  autoComplete="new-password"
                  disabled={loading}
                />

              </div>

              {/* CONFIRM PASSWORD */}

              <div className="form-group">

                <label htmlFor="confirm-password">
                  Confirm Password
                </label>

                <input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(event) =>
                    setConfirmPassword(
                      event.target.value
                    )
                  }
                  placeholder="Confirm new password"
                  autoComplete="new-password"
                  disabled={loading}
                />

              </div>

              {/* ERROR */}

              {error && (
                <div className="auth-error">
                  {error}
                </div>
              )}

              {/* SUCCESS */}

              {message && (
                <div className="auth-success">
                  {message}
                </div>
              )}

              {/* BUTTON */}

              <button
                type="submit"
                className="auth-button"
                disabled={loading}
              >
                {loading
                  ? "Resetting..."
                  : "Reset Password"}
              </button>

            </form>

            {/* LOGIN */}

            <div className="auth-footer-link">

              <button
                type="button"
                className="back-to-login-button"
                onClick={() => navigate("/")}
                disabled={loading}
              >
                ← Back to Login
              </button>

            </div>

          </div>

        </div>

      </div>

      <div className="auth-footer">
        © 2026 TaskFlow. Built for productivity.
      </div>

    </div>
  );
}

export default ResetPassword;
