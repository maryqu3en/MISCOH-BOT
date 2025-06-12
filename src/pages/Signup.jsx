import Logo from "../components/Logo";
import SignupForm from "../components/SignupForm";
import "../styles/AuthPage.css";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();
  return (
    <div className="auth-page">
      <div className="circle glow-circle" />
      <div className="circle small-circle light" style={{ top: "20%", left: "80%" }} />
      <div className="circle small-circle dark" style={{ bottom: "15%", right: "15%" }} />
      <SignupForm onSignup={(userId) => navigate(`/u/${userId}`)} />
      <div className="auth-switch">
        Already have an account? <a href="/login">Login</a>
      </div>
    </div>
  );
};

export default SignupPage;