"use client";
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

export type Theme = "light" | "dark";

/** Read the theme the inline boot script already applied to <html>. */
function currentTheme(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

/** Subscribe to theme changes made by the toggle anywhere on the page. */
export function useTheme(): Theme {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    setTheme(currentTheme());
    const observer = new MutationObserver(() => setTheme(currentTheme()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  return theme;
}

export default function ThemeToggle() {
  const theme = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const toggle = () => {
    const next: Theme = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", next === "dark");
    document.documentElement.style.colorScheme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* private mode — the choice just won't persist */
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={theme === "dark" ? "Light mode" : "Dark mode"}
      className="relative w-10 h-10 rounded-full grid place-items-center border border-black/10 dark:border-white/15 text-purple-600 dark:text-purple-300 hover:bg-purple-500/10 transition-colors"
    >
      {/* Render neutral until mounted so SSR and client markup agree. */}
      {mounted && (theme === "dark" ? <FaSun size={16} /> : <FaMoon size={16} />)}
    </button>
  );
}
