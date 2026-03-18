import OpenAI from "openai";
import Anthropic from "@anthropic-ai/sdk";
import type { LanguageId } from "@/types/languages";
import type { RoastResponse } from "@/types/roast";
import { ErrorCode } from "@/types/roast";

export interface GenerateRoastOptions {
  code: string;
  language: LanguageId;
  mode: "honest" | "roast";
}

/**
 * Generate roast analysis using LLM (OpenAI or Anthropic)
 * @throws Error with specific error code if LLM fails
 */
export async function generateRoast(options: GenerateRoastOptions): Promise<RoastResponse> {
  const { code, language, mode } = options;

  // Check for API keys
  const openaiKey = process.env.OPENAI_API_KEY;
  const anthropicKey = process.env.ANTHROPIC_API_KEY;

  if (!openaiKey && !anthropicKey) {
    const error = new Error("No LLM API key configured");
    (error as any).code = ErrorCode.LLM_NOT_CONFIGURED;
    throw error;
  }

  // Build prompt
  const prompt = buildPrompt(code, language, mode);

  try {
    let responseText: string;

    if (openaiKey) {
      responseText = await callOpenAI(prompt, openaiKey);
    } else {
      responseText = await callAnthropic(prompt, anthropicKey!);
    }

    // Parse LLM response
    const parsed = parseRoastResponse(responseText);
    return parsed;
  } catch (err) {
    // Re-throw errors with codes
    if (err && typeof err === "object" && "code" in err) {
      throw err;
    }

    // Timeout errors
    if (err && typeof err === "object" && "message" in err && typeof err.message === "string") {
      if (err.message.includes("timeout") || err.message.includes("timed out")) {
        const error = new Error("LLM request timed out");
        (error as any).code = ErrorCode.LLM_TIMEOUT;
        throw error;
      }

      // Network errors
      if (
        err.message.includes("network") ||
        err.message.includes("ECONNREFUSED") ||
        err.message.includes("rate limit")
      ) {
        const error = new Error("LLM API unavailable");
        (error as any).code = ErrorCode.LLM_UNAVAILABLE;
        throw error;
      }
    }

    // Generic error
    const error = new Error("LLM API unavailable");
    (error as any).code = ErrorCode.LLM_UNAVAILABLE;
    throw error;
  }
}

function buildPrompt(code: string, language: LanguageId, mode: "honest" | "roast"): string {
  const modeDescription = mode === "roast" ? "brutally honest and sarcastic" : "constructive and helpful";

  return `You are a brutally honest code reviewer. Analyze this ${language} code in ${mode} mode.

Code:
\`\`\`${language}
${code}
\`\`\`

Return ONLY a valid JSON object with these exact fields:
- score: number from 0 to 10 rating code quality
- verdict: Short badge text (e.g., "Production Ready" or "Needs Work")
- quote: One-liner roast or praise
- analysis: object with three arrays:
  - critical: array of critical issues (strings)
  - warning: array of warnings (strings)
  - good: array of positive observations (strings)
- diff: Suggested fix as unified diff format (string)

Be ${modeDescription}. Return ONLY the JSON, no markdown formatting, no explanation.`;
}

async function callOpenAI(prompt: string, apiKey: string): Promise<string> {
  const client = new OpenAI({ apiKey });

  // Race between API call and timeout (30 seconds)
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => {
      const error = new Error("LLM request timed out");
      (error as any).code = ErrorCode.LLM_TIMEOUT;
      reject(error);
    }, 30000);
  });

  const apiPromise = client.chat.completions.create({
    model: "gpt-4o-mini", // Cost-effective model
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    max_tokens: 2048,
  });

  const response = await Promise.race([apiPromise, timeoutPromise]);

  const content = response.choices[0]?.message?.content;
  if (!content) {
    const error = new Error("OpenAI returned empty response");
    (error as any).code = ErrorCode.LLM_INVALID_RESPONSE;
    throw error;
  }

  return content;
}

async function callAnthropic(prompt: string, apiKey: string): Promise<string> {
  const client = new Anthropic({ apiKey });

  // Race between API call and timeout (30 seconds)
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => {
      const error = new Error("LLM request timed out");
      (error as any).code = ErrorCode.LLM_TIMEOUT;
      reject(error);
    }, 30000);
  });

  const apiPromise = client.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 2048,
    messages: [{ role: "user", content: prompt }],
  });

  const response = await Promise.race([apiPromise, timeoutPromise]);

  const content = response.content[0];
  if (content.type !== "text") {
    const error = new Error("Anthropic returned non-text response");
    (error as any).code = ErrorCode.LLM_INVALID_RESPONSE;
    throw error;
  }

  return content.text;
}

function parseRoastResponse(responseText: string): RoastResponse {
  try {
    // Remove markdown code blocks if present
    let cleaned = responseText.trim();
    if (cleaned.startsWith("```json")) {
      cleaned = cleaned.replace(/^```json\s*/, "").replace(/\s*```$/, "");
    } else if (cleaned.startsWith("```")) {
      cleaned = cleaned.replace(/^```\s*/, "").replace(/\s*```$/, "");
    }

    const parsed = JSON.parse(cleaned);

    // Validate structure
    if (
      typeof parsed !== "object" ||
      typeof parsed.score !== "number" ||
      typeof parsed.verdict !== "string" ||
      typeof parsed.quote !== "string" ||
      typeof parsed.analysis !== "object" ||
      !Array.isArray(parsed.analysis.critical) ||
      !Array.isArray(parsed.analysis.warning) ||
      !Array.isArray(parsed.analysis.good) ||
      typeof parsed.diff !== "string"
    ) {
      throw new Error("Invalid response structure");
    }

    return parsed as RoastResponse;
  } catch (err) {
    const error = new Error("LLM returned invalid JSON");
    (error as any).code = ErrorCode.LLM_INVALID_RESPONSE;
    throw error;
  }
}
