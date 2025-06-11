import "./styles/App.css";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
// function ChatMessage({ message, isUser }) {
//   return (
//     <div className={`chat-message ${isUser ? 'user' : 'assistant'}`}>
//       <div className="bubble">
//         {isUser ? (
//           <span className="user-label">You</span>
//         ) : (
//           <span className="assistant-label">Copilot</span>
//         )}
//         <pre>{message}</pre>
//       </div>
//     </div>
//   );
// }

// function ChatWindow({ messages, bottomRef }) {
//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages, bottomRef]);
//   return (
//     <div className="chat-window">
//       {messages.map((msg, i) => (
//         <ChatMessage key={i} message={msg.text} isUser={msg.role === 'user'} />
//       ))}
//       <div ref={bottomRef} />
//     </div>
//   );
// }

// function PromptInput({ prompt, setPrompt, onSend, loading }) {
//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey && prompt.trim()) {
//       e.preventDefault();
//       onSend();
//     }
//   };
//   return (
//     <form className="prompt-form" onSubmit={e => { e.preventDefault(); onSend(); }}>
//       <textarea
//         className="prompt-input"
//         rows="2"
//         placeholder='Type your message...'
//         value={prompt}
//         onChange={e => setPrompt(e.target.value)}
//         onKeyDown={handleKeyDown}
//         disabled={loading}
//       />
//       <button
//         className="send-btn"
//         type="submit"
//         disabled={loading || !prompt.trim()}
//       >
//         {loading ? '...' : 'Send'}
//       </button>
//     </form>
//   );
// }

// const API_URL = import.meta.env.API_URL;

function App() {
  // const [prompt, setPrompt] = useState('');
  // const [messages, setMessages] = useState([
  //   { role: 'assistant', text: "Hi! I'm your code assistant. How can I help you today?" }
  // ]);
  // const [loading, setLoading] = useState(false);
  // const bottomRef = useRef(null);

  // useEffect(() => {
  //   const saved = localStorage.getItem('theme');
  //   if (saved) {
  //     setTheme(saved);
  //     document.documentElement.setAttribute('data-theme', saved);
  //   }
  // }, []);
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
  }

  // const handleSend = async () => {
  //   if (!prompt.trim()) return;
  //   const userMsg = { role: 'user', text: prompt };
  //   setMessages(msgs => [...msgs, userMsg]);
  //   setPrompt('');
  //   setLoading(true);
  //   try {
  //     const res = await axios.post(`${API_URL}/api/cohere/generate`, { prompt });
  //     setMessages(msgs => [
  //       ...msgs,
  //       { role: 'assistant', text: res.data.output }
  //     ]);
  //   } catch (err) {
  //     setMessages(msgs => [
  //       ...msgs,
  //       { role: 'assistant', text: 'Error generating code.' }
  //     ]);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div>
      <AppRoutes />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
