import { parse } from "@babel/parser";
import type { LanguageId } from "@/types/languages";

export interface ValidationError {
  message: string;
  line?: number;
  column?: number;
}

export interface ValidationResult {
  valid: boolean;
  error?: ValidationError;
}

const SUPPORTED_LANGUAGES: LanguageId[] = ["javascript", "typescript"];

export function validateCode(code: string, language: LanguageId): ValidationResult {
  if (!SUPPORTED_LANGUAGES.includes(language)) {
    return { valid: true };
  }

  try {
    parse(code, {
      sourceType: "module",
      plugins: language === "typescript" ? ["typescript"] : [],
    });
    return { valid: true };
  } catch (err) {
    const message =
      err && typeof err === "object" && "message" in err && typeof err.message === "string"
        ? err.message
        : "Syntax error";
    const line =
      err && typeof err === "object" && "loc" in err && err.loc && typeof err.loc === "object" && "line" in err.loc
        ? (err.loc.line as number)
        : undefined;
    const column =
      err &&
      typeof err === "object" &&
      "loc" in err &&
      err.loc &&
      typeof err.loc === "object" &&
      "column" in err.loc &&
      typeof err.loc.column === "number"
        ? err.loc.column
        : undefined;

    return {
      valid: false,
      error: {
        message: line != null ? `Syntax error on line ${line}: ${message}` : message,
        line,
        column,
      },
    };
  }
}
