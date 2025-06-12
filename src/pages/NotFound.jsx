import Logo from "../components/Logo";
import "../styles/NotFound.css";

const NotFound = () => (
  <div className="notfound-container">
    <Logo />
    <h1 className="notfound-title">404</h1>
    <p className="notfound-text">
      Oops! This page wandered off into the code jungle.<br />
      MISCOH BOT couldn't find what you're looking for.
    </p>
    <a href="/" className="notfound-home-btn">Go Home</a>
  </div>
);

export default NotFound;