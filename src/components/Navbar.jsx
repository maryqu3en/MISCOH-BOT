import ThemeToggle from "./ThemeToggle";
import "../styles/Navbar.css";
import Logo from "./Logo"; 
import Miscoh from "./Miscoh";
const Navbar = () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  return (
    <header className="main-header">
      <div className="header-content">
        <div className="logo">
            <Logo />
            <Miscoh />
        </div>
        <nav className="nav-links">
          {!token ? (
            <>
              <a href="/login">Login</a>
              <a href="/signup" className="signup-btn">Sign Up</a>
            </>
          ) : (
            <a href="/chat" className="signup-btn">Chat with MISCOH</a>
          )}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
};

export default Navbar;