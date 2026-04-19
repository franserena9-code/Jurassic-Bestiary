import { useEffect, useState } from "react";
import "./ThemeToggle.css";

export const ThemeToggle = () => {
  const [isLightMode, setIsLightMode] = useState(() => {
    return localStorage.getItem("theme") === "light";
  });

  useEffect(() => {
    if (isLightMode) {
      document.body.classList.add("light-mode");
      localStorage.setItem("theme", "light");
    } else {
      document.body.classList.remove("light-mode");
      localStorage.setItem("theme", "dark");
    }
  }, [isLightMode]);

  return (
    <button
      className="theme-toggle-btn"
      onClick={() => setIsLightMode(!isLightMode)}
      title="Alternar tema"
    >
      {isLightMode ? "🌙" : "☀️"}
    </button>
  );
};
