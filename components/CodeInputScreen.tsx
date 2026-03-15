"use client";

import { useState } from "react";
import { CodeEditor, PLACEHOLDER_CODE } from "./CodeEditor";

export function CodeInputScreen() {
  const [code, setCode] = useState<string>(PLACEHOLDER_CODE);

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
        style={{ fontFamily: "var(--font-jetbrains-mono)" }}
      >
        $ paste your code. get roasted.
      </h1>
      <p
        className="mt-2 text-center text-sm"
        style={{ color: "var(--text-secondary)" }}
      >
        // drop your code below and we&apos;ll rate it — brutally honest or full roast mode
      </p>
      <div className="mt-8">
        <CodeEditor value={code} onChange={setCode} height="360px" />
      </div>
    </main>
  );
}
