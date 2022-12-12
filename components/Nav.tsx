import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@heroicons/react/20/solid";

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
            <MoonIcon className="h-5 xl:h-6 w-5 xl:w-6" aria-hidden="true" />
          ) : (
            <SunIcon className="h-5 xl:h-6 w-5 xl:w-6" aria-hidden="true" />
          )}
          <span>{theme === "dark" ? "light" : "dark"} mode</span>
        </button>
      </div>
    </nav>
  );
}
