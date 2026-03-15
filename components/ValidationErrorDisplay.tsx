"use client";

import type { ValidationError } from "@/lib/validation";

export interface ValidationErrorDisplayProps {
  error: ValidationError;
}

export function ValidationErrorDisplay({ error }: ValidationErrorDisplayProps) {
  return (
    <div
      role="alert"
      aria-live="polite"
      className="rounded-lg border px-4 py-3"
      style={{
        borderColor: "var(--accent-red)",
        backgroundColor: "var(--bg-surface)",
        color: "var(--accent-red)",
      }}
    >
      <p className="font-mono text-sm" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
        {error.message}
      </p>
      {error.line != null && (
        <p className="mt-1 text-xs" style={{ color: "var(--text-secondary)" }}>
          Line {error.line}
          {error.column != null ? `, column ${error.column}` : ""}
        </p>
      )}
    </div>
  );
}
