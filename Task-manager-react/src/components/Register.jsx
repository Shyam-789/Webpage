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

    try {
      const response = await fetch(
       `${import.meta.env.VITE_API_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name,
            email,
            password
          })
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Account created successfully!");

        setName("");
        setEmail("");
        setPassword("");
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

      <div className="auth-icon register-icon">
        ✦
      </div>

      <h2>Create your account</h2>

      <p className="auth-subtitle">
        Start organizing your work today.
      </p>

      <form onSubmit={handleRegister}>

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
              required
            />
          </div>
        </div>

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
              placeholder="Create a password"
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
          Create account
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