import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import '../styles/ChatWindow.css'

const ChatWindow = ({ messages }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-window">
      {messages.map((msg, i) => (
        <ChatMessage key={i} message={msg.text} isUser={msg.role === 'user'} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatWindow;