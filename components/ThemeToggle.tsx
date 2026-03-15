"use client";

export function ThemeToggle() {
  const toggle = () => {
    const html = document.documentElement;
    const isDark = html.classList.contains("dark");
    if (isDark) {
      html.classList.remove("dark");
      html.setAttribute("data-theme", "light");
    } else {
      html.classList.add("dark");
      html.setAttribute("data-theme", "dark");
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="rounded-lg border border-border-primary bg-bg-surface px-3 py-1.5 text-sm text-text-primary hover:bg-bg-input"
      aria-label="Toggle dark/light theme"
    >
      Theme
    </button>
  );
}
