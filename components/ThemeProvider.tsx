"use client";

import { useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const html = document.documentElement;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (prefersDark) {
      html.classList.add("dark");
      html.setAttribute("data-theme", "dark");
    } else {
      html.classList.remove("dark");
      html.setAttribute("data-theme", "light");
    }
  }, []);

  return (
    <>
      <div className="fixed right-4 top-4">
        <ThemeToggle />
      </div>
      {children}
    </>
  );
}
