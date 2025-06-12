import Logo from "./Logo";
import "../styles/LoadingScreen.css";

const LoadingScreen = () => (
  <div className="loading-screen">
    <div className="loading-header">
      <Logo style={{ width: 56, height: 56 }} />
      <span className="loading-title">MISCOH BOT</span>
    </div>
    <div className="loading-spinner"></div>
  </div>
);

export default LoadingScreen;