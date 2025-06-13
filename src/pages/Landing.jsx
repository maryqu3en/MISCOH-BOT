import Navbar from '../components/Navbar';
import '../styles/Landing.css';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaRocket, FaSignInAlt } from "react-icons/fa";
import robotImg from '../assets/robot.png';
import LoadingScreen from "../components/LoadingScreen"; // <-- import

const LandingPage = () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();



  const handleChatClick = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const VITE_API_URL = import.meta.env.VITE_API_URL ;
      const res = await fetch(`${VITE_API_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = await res.json();
      if (user && user.id) {
        navigate(`/u/${user.id}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="landing-main">
        <div className="circle glow-circle"></div>
        <div className="circle small-circle light"></div>
        <div className="circle small-circle dark"></div>

        <section className="hero">
          <div className="hero-content">
            <div className="hero-text">
              <h1>
                <span className="highlight">MISCOH BOT</span>
                <br />
                <span className="subtitle">AI Code Assistant & Chat</span>
              </h1>
              <p className="hero-desc">
                Instantly get code help, debugging, and programming answers in a beautiful, modern chat. <br />
                Powered by AI. Built for developers in 2025.
              </p>
              <div className="hero-actions">
                {!token ? (
                  <>
                    <a href="/signup" className="cta-btn">
                      <FaRocket style={{ marginRight: "0.6em", verticalAlign: "middle" }} />
                      Get Started
                    </a>
                    <a href="/login" className="secondary-btn">
                      <FaSignInAlt style={{ marginRight: "0.5em", verticalAlign: "middle" }} />
                      Login
                    </a>
                  </>
                ) : (
                  <button
                    className="cta-btn"
                    onClick={handleChatClick}
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Chat with MISCOH"}
                  </button>
                )}
              </div>
            </div>
            <div className="hero-image">
              <img
                src={robotImg}
                alt="MISCOH Bot waving"
                loading="lazy"
                style={{
                  maxWidth: "400px",    // Increased from 320px to 400px
                  width: "100%",
                  height: "auto"
                }}
              />
            </div>
          </div>
        </section>
        <section className="features">
          <div className="feature-card">
            <h3>💡 Instant Code Help</h3>
            <p>Ask questions and get code, explanations, or debugging tips in seconds.</p>
          </div>
          <div className="feature-card">
            <h3>🎨 Modern Chat UI</h3>
            <p>Enjoy a clean, responsive interface with dark/light mode and code highlighting.</p>
          </div>
          <div className="feature-card">
            <h3>🔒 Secure & Private</h3>
            <p>Your chats and code are private and protected with secure authentication.</p>
          </div>
        </section>
      </main>
    </>
  );
};

export default LandingPage;
