import { describe, it, expect } from "vitest";
import { validateCode } from "./validation";

describe("validateCode", () => {
  describe("JavaScript", () => {
    it("returns valid for correct JS", () => {
      expect(validateCode("const x = 1;", "javascript")).toEqual({ valid: true });
      expect(validateCode("function foo() { return 42; }", "javascript")).toEqual({ valid: true });
    });

    it("returns invalid with error for syntax errors", () => {
      const result = validateCode("const x = ", "javascript");
      expect(result.valid).toBe(false);
      expect(result.error?.message).toBeDefined();
      expect(result.error?.line).toBeDefined();
    });

    it("returns invalid for unexpected token", () => {
      const result = validateCode("const x = }", "javascript");
      expect(result.valid).toBe(false);
      expect(result.error?.message).toContain("Syntax");
    });
  });

  describe("TypeScript", () => {
    it("returns valid for correct TS", () => {
      expect(validateCode("const x: number = 1;", "typescript")).toEqual({ valid: true });
      expect(validateCode("type Foo = { foo: string };", "typescript")).toEqual({ valid: true });
    });

    it("returns invalid with error for syntax errors", () => {
      const result = validateCode("const x: number = ", "typescript");
      expect(result.valid).toBe(false);
      expect(result.error?.message).toBeDefined();
    });
  });

  describe("unsupported languages", () => {
    it("returns valid for python (skip validation)", () => {
      expect(validateCode("def foo():", "python")).toEqual({ valid: true });
    });

    it("returns valid for rust (skip validation)", () => {
      expect(validateCode("fn main() {", "rust")).toEqual({ valid: true });
    });
  });
});
