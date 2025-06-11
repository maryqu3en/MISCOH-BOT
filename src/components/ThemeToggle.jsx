import React, { useEffect, useRef, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import "../styles/ThemeToggle.css";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  const buttonRef = useRef(null);

  const setTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  };

  useEffect(() => {
    if (darkMode) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, [darkMode]);

  const triggerThemeTransition = () => {
    if (!buttonRef.current) return;
    setDarkMode((prev) => !prev);
  };

  return (
    <>
      <button
        className="theme-toggle"
        onClick={triggerThemeTransition}
        aria-label="Toggle theme"
        ref={buttonRef}
      >
        {darkMode ? (
          <FiSun
            size={24}
            style={{ color: "var(--light-purple)" }}
            title="Switch to light mode"
          />
        ) : (
          <FiMoon
            size={24}
            style={{ color: "var(--dark-purple)" }}
            title="Switch to dark mode"
          />
        )}
      </button>
    </>
  );
};

export default ThemeToggle;
