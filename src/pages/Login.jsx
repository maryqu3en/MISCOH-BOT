import Logo from "../components/Logo";
import LoginForm from "../components/LoginForm";
import "../styles/AuthPage.css";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <div className="auth-page">
      
      <LoginForm onLogin={userId => navigate(`/u/${userId}`)} />
      <div className="auth-switch">
        Don't have an account? <a href="/signup">Sign up</a>
      </div>
    </div>
  );
};

export default LoginPage;