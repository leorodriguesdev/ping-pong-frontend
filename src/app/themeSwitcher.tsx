// src/app/themeSwitcher.tsx
"use client";

import { useGlobalContext } from "@/context/GlobalContext";
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useGlobalContext();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 px-4 py-2 border rounded-full border-gray-300 dark:border-gray-700 rounded text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
    >
      {theme === "light" ? (
        <>
          <span role="img" aria-label="Sol">🌙</span>
        </>
      ) : (
        <>
          <span role="img" aria-label="Lua">☀️</span>
        </>
      )}
    </button>
  );
}
