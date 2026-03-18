import { z } from "zod";
import { LANGUAGES, type LanguageId } from "./languages";

// Extract language IDs for validation
const languageIds = LANGUAGES.map((l) => l.id);

// Request schema
export const RoastRequestSchema = z.object({
  code: z.string().min(1, "Code cannot be empty").max(10000, "Code too long (max 10k characters)"),
  language: z.enum(languageIds as [string, ...string[]]),
  mode: z.enum(["honest", "roast"]),
});

export type RoastRequest = z.infer<typeof RoastRequestSchema>;

// Response schemas
export const AnalysisSchema = z.object({
  critical: z.array(z.string()),
  warning: z.array(z.string()),
  good: z.array(z.string()),
});

export const RoastResponseSchema = z.object({
  score: z.number().min(0).max(10),
  verdict: z.string(),
  quote: z.string(),
  analysis: AnalysisSchema,
  diff: z.string(),
});

export type RoastResponse = z.infer<typeof RoastResponseSchema>;

// Error response schema
export const ErrorResponseSchema = z.object({
  error: z.object({
    message: z.string(),
    code: z.string(),
  }),
});

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;

// Error codes
export const ErrorCode = {
  VALIDATION_ERROR: "VALIDATION_ERROR",
  LLM_TIMEOUT: "LLM_TIMEOUT",
  LLM_UNAVAILABLE: "LLM_UNAVAILABLE",
  LLM_INVALID_RESPONSE: "LLM_INVALID_RESPONSE",
  LLM_NOT_CONFIGURED: "LLM_NOT_CONFIGURED",
} as const;

export type ErrorCodeType = (typeof ErrorCode)[keyof typeof ErrorCode];
