"use client";

import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";

export const PLACEHOLDER_CODE = `function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  return total;
}`;

export interface CodeEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  height?: string;
}

export function CodeEditor({
  value = PLACEHOLDER_CODE,
  onChange,
  height = "360px",
}: CodeEditorProps) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const html = document.documentElement;
    const dark = html.classList.contains("dark") || html.getAttribute("data-theme") === "dark";
    setIsDark(dark);

    const handleThemeChange = () => {
      const newDark = html.classList.contains("dark") || html.getAttribute("data-theme") === "dark";
      setIsDark(newDark);
    };

    const observer = new MutationObserver(handleThemeChange);
    observer.observe(html, { attributes: true, attributeFilter: ["class", "data-theme"] });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="overflow-hidden rounded-xl border border-border-primary"
      style={{
        width: "780px",
        maxWidth: "100%",
        height,
        backgroundColor: "var(--bg-input)",
      }}
    >
      <Editor
        height={height}
        defaultLanguage="javascript"
        value={value}
        onChange={(v) => onChange?.(v ?? "")}
        theme={isDark ? "vs-dark" : "vs"}
        options={{
          lineNumbers: "on",
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: "'JetBrains Mono', 'Monaco', monospace",
          padding: { top: 16 },
          scrollBeyondLastLine: false,
          wordWrap: "on",
        }}
        loading={
          <div
            className="flex h-full items-center justify-center"
            style={{ backgroundColor: "var(--bg-input)", color: "var(--text-secondary)" }}
          >
            Loading editor...
          </div>
        }
      />
    </div>
  );
}
