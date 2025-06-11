const ChatMessage = ({ message, isUser }) => (
  <div className={`chat-message ${isUser ? 'user' : 'assistant'}`}>
    <div className="bubble">
      {isUser ? (
        <span className="user-label">You</span>
      ) : (
        <span className="assistant-label">Miscoh</span>
      )}
      <pre>{message}</pre>
    </div>
  </div>
);

export default ChatMessage;