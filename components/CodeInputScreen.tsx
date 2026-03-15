"use client";

import { useState } from "react";
import { CodeEditor, PLACEHOLDER_CODE } from "./CodeEditor";
import { LanguageSelector } from "./LanguageSelector";
import { ValidationErrorDisplay } from "./ValidationErrorDisplay";
import { validateCode, type ValidationError } from "@/lib/validation";
import type { LanguageId } from "@/types/languages";

type ValidationStatus = "idle" | "valid" | "invalid";

export function CodeInputScreen() {
  const [code, setCode] = useState<string>(PLACEHOLDER_CODE);
  const [language, setLanguage] = useState<LanguageId>("javascript");
  const [validationStatus, setValidationStatus] = useState<ValidationStatus>("idle");
  const [validationError, setValidationError] = useState<ValidationError | null>(null);

  const handleValidate = () => {
    const result = validateCode(code, language);
    if (result.valid) {
      setValidationStatus("valid");
      setValidationError(null);
    } else {
      setValidationStatus("invalid");
      setValidationError(result.error ?? null);
    }
  };

  return (
    <main
      className="flex min-h-screen flex-col items-center px-6 py-12"
      style={{
        backgroundColor: "var(--bg-page)",
        color: "var(--text-primary)",
      }}
    >
      <h1
        className="font-mono text-2xl font-semibold"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        $ paste your code. get roasted.
      </h1>
      <p
        className="mt-2 text-center text-sm"
        style={{ color: "var(--text-secondary)" }}
      >
        // drop your code below and we&apos;ll rate it — brutally honest or full roast mode
      </p>
      <div className="mt-8 flex w-full max-w-[780px] flex-col gap-4">
        <LanguageSelector value={language} onChange={setLanguage} />
        <CodeEditor value={code} onChange={setCode} language={language} height="360px" />
        <button
          type="button"
          onClick={handleValidate}
          className="w-fit rounded-lg px-4 py-2 font-mono text-sm font-medium"
          style={{
            backgroundColor: "var(--accent-cta)",
            color: "white",
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          $ validate
        </button>
        {validationStatus === "invalid" && validationError && (
          <ValidationErrorDisplay error={validationError} />
        )}
        {validationStatus === "valid" && (
          <div
            className="rounded-lg border px-4 py-3"
            style={{
              borderColor: "var(--accent-green)",
              backgroundColor: "var(--bg-surface)",
              color: "var(--accent-green)",
            }}
          >
            <p className="font-mono text-sm" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              ✓ Valid — ready to roast
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
