import '../styles/ChatMessage.css'

const ChatMessage = ({ message, isUser }) => (
  <div className={`chat-message ${isUser ? 'user' : 'assistant'}`}>
    <div className="bubble">
      {isUser ? (
        <span className="user-label">You</span>
      ) : (
        <span className="assistant-label">Miscoh</span>
      )}
      <p>{message}</p>
    </div>
  </div>
);

export default ChatMessage;