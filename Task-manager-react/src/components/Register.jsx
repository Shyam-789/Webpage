import { useState } from "react";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:3000/auth/register",
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
        setMessage("Registration successful!");

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
    <div>
      <h2>Register</h2>

      <form onSubmit={handleRegister}>
        <div>
          <label>Name</label>
          <br />

          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter your name"
          />
        </div>

        <br />

        <div>
          <label>Email</label>
          <br />

          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <br />

        <div>
          <label>Password</label>
          <br />

          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
          />
        </div>

        <br />

        <button type="submit">
          Register
        </button>
      </form>

      <p>{message}</p>
    </div>
  );
}

export default Register;