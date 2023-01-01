import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

export default function Nav() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <nav>
      <div className="nav-container">
        <div className="slang">Where in the world?</div>
        <button
          className="text-very-dark-blue dark:text-white"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme !== "dark" ? (
            <MoonIcon className="w-5 h-5" aria-hidden="true" />
          ) : (
            <SunIcon className="w-5 h-5" aria-hidden="true" />
          )}
          <span>{theme === "dark" ? "light" : "dark"} mode</span>
        </button>
      </div>
    </nav>
  );
}
