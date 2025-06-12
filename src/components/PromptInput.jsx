import '../styles/PromptInput.css';

const PromptInput = ({ prompt, setPrompt, onSend, loading }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && prompt.trim()) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <form className="prompt-form" onSubmit={e => { e.preventDefault(); onSend(); }}>
      <textarea
        className="prompt-input"
        rows="2"
        placeholder='Type your message...'
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={loading}
      />
      <button
        className="send-btn"
        type="submit"
        disabled={loading || !prompt.trim()}
      >
        {loading ? '...' : 'Send'}
      </button>
    </form>
  );
};

export default PromptInput;