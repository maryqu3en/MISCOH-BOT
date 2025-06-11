import Logo from "../components/Logo";
import SignupForm from "../components/SignupForm";
import "../styles/AuthPage.css";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();
  return (
    <div className="auth-page">
      <Logo />
      <h2 className="auth-title">Create your MISCOH BOT account</h2>
      <SignupForm onSignup={userId => navigate(`/u/${userId}`)} />
      <div className="auth-switch">
        Already have an account? <a href="/login">Login</a>
      </div>
    </div>
  );
};

export default SignupPage;