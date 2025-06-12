import { useState } from "react";
import { showError, showSuccess } from "./Toast";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import Logo from "./Logo";

const VITE_API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const SignupForm = ({ onSignup }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${VITE_API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        const userRes = await fetch(`${VITE_API_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${data.token}` },
        });
        const user = await userRes.json();
        if (user && user.id) {
          showSuccess("Account created! 🎉");
          onSignup(user.id);
        } else {
          showError("Could not get user info.");
        }
      } else {
        showError(data.message || "Signup failed.");
      }
    } catch {
      showError("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="auth-form-header">
        <span className="logo"><Logo /></span>
        <span className="site-name">MISCOH BOT</span>
      </div>
      <div className="input-row">
        <label htmlFor="username">Username</label>
        <div className="input-icon-wrapper">
          <span className="input-icon"><FaUser /></span>
          <input
            id="username"
            type="text"
            autoComplete="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            disabled={loading}
          />
        </div>
      </div>
      <div className="input-row">
        <label htmlFor="email">Email</label>
        <div className="input-icon-wrapper">
          <span className="input-icon"><FaEnvelope /></span>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>
      </div>
      <div className="input-row">
        <label htmlFor="password">Password</label>
        <div className="input-icon-wrapper">
          <span className="input-icon"><FaLock /></span>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            minLength={6}
            disabled={loading}
          />
        </div>
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Signing up..." : "Sign Up"}
      </button>
    </form>
  );
};

export default SignupForm;