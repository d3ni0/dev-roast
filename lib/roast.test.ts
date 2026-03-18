import { describe, it, expect, beforeEach, afterAll } from "vitest";
import { generateRoast } from "./roast";
import { ErrorCode } from "@/types/roast";

describe("generateRoast", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
    delete process.env.OPENAI_API_KEY;
    delete process.env.ANTHROPIC_API_KEY;
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  describe("API key validation", () => {
    it("throws LLM_NOT_CONFIGURED when no API keys are set", async () => {
      try {
        await generateRoast({
          code: "console.log('test')",
          language: "javascript",
          mode: "honest",
        });
        expect.fail("Should have thrown an error");
      } catch (err: any) {
        expect(err.message).toBe("No LLM API key configured");
        expect(err.code).toBe(ErrorCode.LLM_NOT_CONFIGURED);
      }
    });

    it("throws error with code property", async () => {
      try {
        await generateRoast({
          code: "test",
          language: "typescript",
          mode: "roast",
        });
        expect.fail("Should have thrown an error");
      } catch (err: any) {
        expect(err).toHaveProperty("code");
        expect(err.code).toBe(ErrorCode.LLM_NOT_CONFIGURED);
      }
    });
  });

  describe("Input validation", () => {
    it("accepts valid JavaScript code", async () => {
      // This will fail due to no API key, but we're testing the input is accepted
      try {
        await generateRoast({
          code: "function test() { return 42; }",
          language: "javascript",
          mode: "honest",
        });
      } catch (err: any) {
        // Should fail with LLM_NOT_CONFIGURED, not input validation
        expect(err.code).toBe(ErrorCode.LLM_NOT_CONFIGURED);
      }
    });

    it("accepts TypeScript code", async () => {
      try {
        await generateRoast({
          code: "const x: number = 1;",
          language: "typescript",
          mode: "roast",
        });
      } catch (err: any) {
        expect(err.code).toBe(ErrorCode.LLM_NOT_CONFIGURED);
      }
    });

    it("accepts different languages", async () => {
      const languages: Array<"python" | "java" | "go" | "rust"> = ["python", "java", "go", "rust"];

      for (const lang of languages) {
        try {
          await generateRoast({
            code: "# test code",
            language: lang,
            mode: "honest",
          });
        } catch (err: any) {
          expect(err.code).toBe(ErrorCode.LLM_NOT_CONFIGURED);
        }
      }
    });
  });

  describe("Mode validation", () => {
    it("accepts honest mode", async () => {
      try {
        await generateRoast({
          code: "test",
          language: "javascript",
          mode: "honest",
        });
      } catch (err: any) {
        expect(err.code).toBe(ErrorCode.LLM_NOT_CONFIGURED);
      }
    });

    it("accepts roast mode", async () => {
      try {
        await generateRoast({
          code: "test",
          language: "javascript",
          mode: "roast",
        });
      } catch (err: any) {
        expect(err.code).toBe(ErrorCode.LLM_NOT_CONFIGURED);
      }
    });
  });
});
