"use client";

import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import type { LanguageId } from "@/types/languages";

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
  language?: LanguageId;
  height?: string;
}

export function CodeEditor({
  value = PLACEHOLDER_CODE,
  onChange,
  language = "javascript",
  height = "360px",
}: CodeEditorProps) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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

  if (!mounted) return null;

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
        language={language}
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
