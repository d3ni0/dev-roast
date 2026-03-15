"use client";

import { useState } from "react";
import { CodeEditor, PLACEHOLDER_CODE } from "./CodeEditor";
import { LanguageSelector } from "./LanguageSelector";
import type { LanguageId } from "@/types/languages";

export function CodeInputScreen() {
  const [code, setCode] = useState<string>(PLACEHOLDER_CODE);
  const [language, setLanguage] = useState<LanguageId>("javascript");

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
      <div className="mt-8 flex flex-col gap-4">
        <LanguageSelector value={language} onChange={setLanguage} />
        <CodeEditor value={code} onChange={setCode} language={language} height="360px" />
      </div>
    </main>
  );
}
