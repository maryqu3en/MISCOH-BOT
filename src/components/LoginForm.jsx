import { useState } from "react";
import { showError, showSuccess } from "./Toast";
import { FaUser, FaLock } from "react-icons/fa";

const API_URL = import.meta.env.API_URL  || "http://localhost:5000";

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        const userRes = await fetch(`${API_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${data.token}` },
        });
        const user = await userRes.json();
        if (user && user.id) {
          showSuccess("Welcome back!");
          onLogin(user.id);
        } else {
          showError("Could not get user info.");
        }
      } else {
        showError(data.message || "Invalid email or password.");
      }
    } catch {
      showError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <label>
        Email
        <div className="input-group">
          <FaUser />
          <input
            type="email"
            autoComplete="username"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>
      </label>
      <label>
        Password
        <div className="input-group">
          <FaLock />
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>
      </label>
      <button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;