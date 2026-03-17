import { useEffect, useState } from "react";
import { Moon, Sun, Monitor } from "lucide-react";

type Theme = "light" | "dark" | "system";

const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>("system");

  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored) setTheme(stored);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    localStorage.setItem("theme", theme);

    if (theme === "system") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.toggle("dark", prefersDark);
      root.classList.toggle("light", !prefersDark);
    } else {
      root.classList.toggle("dark", theme === "dark");
      root.classList.toggle("light", theme === "light");
    }
  }, [theme]);

  // Listen for system changes when in system mode
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      if (theme === "system") {
        document.documentElement.classList.toggle("dark", e.matches);
        document.documentElement.classList.toggle("light", !e.matches);
      }
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme]);

  const cycle = () => {
    setTheme((prev) => (prev === "system" ? "light" : prev === "light" ? "dark" : "system"));
  };

  const icon =
    theme === "light" ? <Sun className="!size-4" /> :
    theme === "dark" ? <Moon className="!size-4" /> :
    <Monitor className="!size-4" />;

  return (
    <button
      onClick={cycle}
      className="p-2 rounded-md text-foreground hover:bg-secondary transition-colors"
      aria-label={`Tema: ${theme}`}
      title={`Tema: ${theme}`}
    >
      {icon}
    </button>
  );
};

export default ThemeToggle;
