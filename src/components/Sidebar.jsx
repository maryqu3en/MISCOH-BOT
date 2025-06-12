import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { showSuccess, showError } from "./Toast";
import "../styles/Sidebar.css";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import ThemeToggle from'./ThemeToggle'; 
import axios from "axios";

const API_URL = import.meta.env.API_URL || "http://localhost:5000";

const UserSidebar = () => {
  const [sessions, setSessions] = useState([]);
  const [search, setSearch] = useState("");
  const [showTitleInput, setShowTitleInput] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [creating, setCreating] = useState(false);
  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    axios
      .get(`${API_URL}/api/sessions`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => setSessions(res.data || []))
      .catch(() => showError("Failed to load chats."));
  }, []);

  const filteredSessions = sessions.filter(
    s => s.title?.toLowerCase().includes(search.toLowerCase())
  );

  const handleNewChatClick = () => {
    setShowTitleInput(true);
    setTimeout(() => {
      document.getElementById("new-chat-title")?.focus();
    }, 100);
  };

  const handleCreateChat = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      showError("Please enter a chat title.");
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      showError("Not authenticated.");
      return;
    }
    setCreating(true);
    try {
      const res = await axios.post(
        `${API_URL}/api/sessions`,
        { title: newTitle },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data && res.data._id) {
        setSessions(prev => [res.data, ...prev]);
        setShowTitleInput(false);
        setNewTitle("");
        showSuccess("Chat created!");
        navigate(`/u/${userId}/chat/${res.data._id}`);
      } else {
        showError(res.data.error || "Failed to create chat.");
      }
    } catch (err) {
      showError(
        err.response?.data?.error || "Failed to create chat."
      );
    } finally {
      setCreating(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    showSuccess("Logged out!");
    navigate("/");
  };

  return (
    <aside className="user-sidebar">
      <div className="sidebar-top">
        {showTitleInput ? (
          <form className="new-chat-title-form" onSubmit={handleCreateChat}>
            <input
              id="new-chat-title"
              className="sidebar-search"
              type="text"
              placeholder="Enter chat title..."
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              disabled={creating}
              maxLength={60}
              autoFocus
              onBlur={() => setShowTitleInput(false)}
              onKeyDown={e => {
                if (e.key === "Escape") {
                  setShowTitleInput(false);
                  setNewTitle("");
                }
              }}
            />
            <button
              type="submit"
              className="new-chat-btn"
              disabled={creating}
              style={{ marginLeft: "0.5em" }}
            >
              {creating ? "Creating..." : "Create"}
            </button>
          </form>
        ) : (
          <button className="new-chat-btn" onClick={handleNewChatClick}>
            <HiOutlinePencilSquare style={{ marginRight: "0.5em", fontSize: "1.2em", color: "var(--light-purple)" }} />
            New Chat
          </button>
        )}
        <input
          className="sidebar-search"
          type="text"
          placeholder="Search chats..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className="sidebar-sessions">
        {filteredSessions.length === 0 ? (
          <div className="sidebar-empty">No chats found.</div>
        ) : (
          filteredSessions.map(session => (
            <div
              key={session._id}
              className="sidebar-session"
              onClick={() => navigate(`/u/${userId}/chat/${session._id}`)}
            >
              <span className="session-title">{session.title || "Untitled Chat"}</span>
            </div>
          ))
        )}
      </div>
      <div className="actions">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
        <ThemeToggle />
      </div>
    </aside>
  );
};

export default UserSidebar;