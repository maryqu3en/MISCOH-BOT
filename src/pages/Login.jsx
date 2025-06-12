import Logo from "../components/Logo";
import LoginForm from "../components/LoginForm";
import "../styles/AuthPage.css";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <div className="auth-page">
      <div className="circle glow-circle" />
      <div className="circle small-circle light" style={{ top: "20%", left: "80%" }} />
      <div className="circle small-circle dark" style={{ bottom: "15%", right: "15%" }} />
      <LoginForm onLogin={userId => navigate(`/u/${userId}`)} />
      <div className="auth-switch">
        Don't have an account? <a href="/signup">Sign up</a>
      </div>
    </div>
  );
};

export default LoginPage;