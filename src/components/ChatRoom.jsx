import { useEffect, useState } from "react";
import ChatWindow from "./ChatWindow";
import PromptInput from "./PromptInput";
import { showError } from "./Toast";

const API_URL = import.meta.env.API_URL || "http://localhost:5000";

const ChatRoom = ({ sessionId }) => {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!sessionId || !token) return;
    setLoading(true);
    fetch(`${API_URL}/api/chats/${sessionId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setMessages(data);
        else setMessages([]);
      })
      .catch(() => showError("Failed to load chat history."))
      .finally(() => setLoading(false));
  }, [sessionId]);

  const handleSend = async () => {
    if (!prompt.trim() || !sessionId) return;
    const token = localStorage.getItem("token");
    const userMsg = { role: "user", text: prompt, message: prompt, session: sessionId };
    setMessages(msgs => [...msgs, userMsg]);
    setPrompt('');
    setLoading(true);

    try {
      await fetch(`${API_URL}/api/chats`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ message: prompt, role: "user", session: sessionId })
      });

      const res = await fetch(`${API_URL}/api/cohere/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      if (res.ok && data.text) {
        await fetch(`${API_URL}/api/chats`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ message: data.text, role: "assistant", session: sessionId })
        });
        setMessages(msgs => [
          ...msgs,
          { role: "assistant", text: data.text }
        ]);
      } else {
        setMessages(msgs => [
          ...msgs,
          { role: "assistant", text: "Sorry, I couldn't generate a response." }
        ]);
      }
    } catch (err) {
      setMessages(msgs => [
        ...msgs,
        { role: "assistant", text: "Error generating code." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-room">
      <ChatWindow messages={messages} />
      <PromptInput
        prompt={prompt}
        setPrompt={setPrompt}
        onSend={handleSend}
        loading={loading}
      />
    </div>
  );
};

export default ChatRoom;