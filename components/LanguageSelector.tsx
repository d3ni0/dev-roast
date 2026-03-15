"use client";

import { LANGUAGES, type LanguageId } from "@/types/languages";

export interface LanguageSelectorProps {
  value: LanguageId;
  onChange: (language: LanguageId) => void;
}

export function LanguageSelector({ value, onChange }: LanguageSelectorProps) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor="language"
        className="text-sm font-medium"
        style={{ color: "var(--text-secondary)" }}
      >
        Language
      </label>
      <select
        id="language"
        value={value}
        onChange={(e) => onChange(e.target.value as LanguageId)}
        className="rounded-lg border border-border-primary bg-bg-surface px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cta"
        style={{
          backgroundColor: "var(--bg-surface)",
          borderColor: "var(--border-primary)",
          color: "var(--text-primary)",
        }}
      >
        {LANGUAGES.map((lang) => (
          <option key={lang.id} value={lang.id}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
}
