"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useSyncExternalStore } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  if (!mounted) return null;

  const isDarkMode = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
      onClick={() => setTheme(isDarkMode ? "light" : "dark")}
      className="rounded-md p-2 text-muted-foreground transition-colors hover:text-foreground"
    >
      {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
