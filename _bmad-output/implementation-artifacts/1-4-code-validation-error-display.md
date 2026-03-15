# Story 1.4: Code Validation & Error Display

Status: done

## Story

As a user,
I want invalid code to be rejected with a clear message,
So that I know what to fix before roasting.

## Acceptance Criteria

1. **Given** I have pasted code with syntax errors **When** I attempt to submit (or validation runs) **Then** I see a clear error message (FR4)
2. **And** I can fix the code and retry (FR5)
3. **Given** valid code **When** validation runs **Then** the code passes (FR3)

## Tasks / Subtasks

- [x] Task 1: Create validation logic (AC: #1, #3)
  - [x] 1.1 Create lib/validation.ts with validateCode(code, language) → { valid: boolean, error?: { message, line?, column? } }
  - [x] 1.2 Add syntax validation for JavaScript (acorn or @babel/parser)
  - [x] 1.3 Add syntax validation for TypeScript (same parser with TS support)
  - [x] 1.4 For unsupported languages: return { valid: true } (skip validation) or { valid: false, error: { message: "Validation not available for {language}" } } — document decision
- [x] Task 2: Create ValidationErrorDisplay component (AC: #1, #2)
  - [x] 2.1 Create components/ValidationErrorDisplay.tsx — shows error message, line/column if available
  - [x] 2.2 Use design tokens: accent-red for error, text-primary, bg-surface
  - [x] 2.3 Accessible: aria-live="polite" for error announcements
- [x] Task 3: Add Validate button and wire validation into CodeInputScreen (AC: #1, #2, #3)
  - [x] 3.1 Add "Validate" button below editor (or above roast toggle — Story 2.2 adds roast toggle)
  - [x] 3.2 On click: run validateCode(code, language), show ValidationErrorDisplay or success message
  - [x] 3.3 Store validation state: { status: 'idle' | 'valid' | 'invalid', error?: ValidationError }
  - [x] 3.4 User can fix code and click Validate again (retry) — FR5

## Dev Notes

### Architecture Compliance

- **Validation:** lib/validation.ts [Source: architecture.md#Project Structure & Requirements to Structure Mapping]
- **Error:** try/catch, user-facing message, retry option [Source: architecture.md#Process Patterns]
- **Components:** PascalCase (`ValidationErrorDisplay`) [Source: architecture.md#Naming Patterns]
- **API:** Zod for API payloads (Story 2.1) — this story is client-side syntax validation only

### Validation Strategy

- **Client-side:** Use Acorn or @babel/parser for JS/TS — lightweight, runs in browser
- **Scope:** Story 1.4 focuses on JavaScript and TypeScript. Other languages: return valid (skip) or show "Validation available for JavaScript/TypeScript" — document choice
- **Trigger:** "Validate" button (Story 2.2 adds roast submit; validation will run before roast in that flow)

### Error Message Format (FR4)

- Clear: "Syntax error on line X: {message}"
- Include line/column when available from parser
- Example: "Unexpected token (3:12)" or "SyntaxError: Unexpected token '}'"

### Previous Story (1.3) Context

- CodeInputScreen has: code, language (useState)
- types/languages.ts: LANGUAGES, LanguageId
- Validation must accept LanguageId and map to parser

### Design Tokens (FR4)

- **Error:** accent-red for error text/border
- **Success:** accent-green for "Valid" message
- **Button:** accent-cta for primary (Validate)

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.4]
- [Source: _bmad-output/planning-artifacts/architecture.md]
- [Source: docs/devroast-design-summary.md]

## Dev Agent Record

### Agent Model Used

Composer (dev-story workflow)

### Debug Log References

(none)

### Completion Notes List

- Implemented lib/validation.ts with @babel/parser for JS/TS; unsupported languages return { valid: true }
- Created ValidationErrorDisplay.tsx with accent-red, aria-live="polite"
- Wired Validate button into CodeInputScreen with validation state (idle/valid/invalid)
- Added Vitest and 7 unit tests for validateCode (JS, TS, unsupported languages)
- Build and tests pass
- **Code Review (2026-03-15):** Fixed type safety issues (error casting, ValidationError type import), updated File List documentation

### Change Log

- 2026-03-15: Initial implementation — validation logic, ValidationErrorDisplay, Validate button, Vitest tests

### File List

- lib/validation.ts (new)
- lib/validation.test.ts (new)
- components/ValidationErrorDisplay.tsx (new)
- components/CodeInputScreen.tsx (modified)
- vitest.config.mjs (new)
- package.json (modified: test script, vitest deps)
- package-lock.json (modified: npm lockfile update)

### Senior Developer Review (AI)

**Reviewer:** Code Review Agent (Claude Sonnet 4.5)  
**Review Date:** 2026-03-15  
**Outcome:** Changes Requested → Fixed

**Action Items:**

- [x] [HIGH] Unsafe error type casting in validation.ts - replaced with type guards
- [x] [MEDIUM] ValidationError type mismatch in CodeInputScreen - imported proper type
- [x] [MEDIUM] Test file missing from File List - added to documentation
- [ ] [LOW] Hardcoded font-family should use design token/CSS variable
- [ ] [LOW] Consider snapshot tests for @babel/parser error message formats

**Review Summary:**

All acceptance criteria implemented correctly. Code quality is solid with proper error handling, accessibility, and test coverage. Fixed type safety issues and documentation completeness. Low-priority items can be addressed in future refactoring.
