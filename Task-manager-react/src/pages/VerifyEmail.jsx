import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function VerifyEmail() {
  const { token } = useParams();

  const [message, setMessage] = useState(
    "Verifying your email..."
  );
  const [error, setError] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        if (!token) {
          setError("Verification token is missing.");
          setMessage("");
          return;
        }

        const response = await fetch(
          `${API_URL}/auth/verify-email/${token}`
        );

        const contentType =
          response.headers.get("content-type") || "";

        const data = contentType.includes("application/json")
          ? await response.json()
          : {};

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Unable to verify your email."
          );
        }

        setMessage(
          data.message ||
            "Email verified successfully. You can now login."
        );
      } catch (error) {
        console.error(
          "Email verification error:",
          error
        );

        setMessage("");
        setError(
          error.message ||
            "Unable to verify your email."
        );
      }
    };

    verifyEmail();
  }, [token, API_URL]);

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card-header">
          <h2>Email Verification</h2>

          {message && (
            <div className="auth-success">
              {message}
            </div>
          )}

          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}
        </div>

        {message &&
          message.includes("successfully") && (
            <div className="auth-footer-link">
              <Link
                to="/"
                className="back-to-login-button"
              >
                Go to Login
              </Link>
            </div>
          )}
      </div>
    </div>
  );
}

export default VerifyEmail;