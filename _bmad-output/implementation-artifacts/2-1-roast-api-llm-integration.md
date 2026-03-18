# Story 2.1: Roast API & LLM Integration

Status: done

## Story

As a developer,
I want a POST /api/roast endpoint that calls the LLM,
So that roast analysis can be generated.

## Acceptance Criteria

1. **Given** a valid request `{ code, language, mode }` **When** POST /api/roast is called **Then** the request is validated with Zod
2. **And** the LLM is called with the appropriate prompt
3. **And** the response includes `{ score, verdict, quote, analysis, diff }`
4. **And** errors return `{ error: { message, code } }`

## Tasks / Subtasks

- [x] Task 1: Create Zod schemas for API validation (AC: #1, #4)
  - [x] 1.1 Create `types/roast.ts` with request/response type definitions
  - [x] 1.2 Define `RoastRequestSchema` with Zod: `{ code: string, language: LanguageId, mode: 'honest' | 'roast' }`
  - [x] 1.3 Define `RoastResponseSchema` with Zod: `{ score: number (0-10), verdict: string, quote: string, analysis: { critical: string[], warning: string[], good: string[] }, diff: string }`
  - [x] 1.4 Define `ErrorResponseSchema` with Zod: `{ error: { message: string, code: string } }`
- [x] Task 2: Create LLM service abstraction (AC: #2)
  - [x] 2.1 Create `lib/roast.ts` with `generateRoast(code, language, mode)` function
  - [x] 2.2 Implement LLM client selection: OpenAI if `OPENAI_API_KEY` is set, Anthropic if `ANTHROPIC_API_KEY` is set
  - [x] 2.3 Craft roast prompt: include code, language, mode (honest vs full roast), request structured output (score, verdict, quote, analysis, diff)
  - [x] 2.4 Parse LLM response into structured RoastResponse format
  - [x] 2.5 Handle LLM errors: timeout, API unavailable, invalid response → throw descriptive error
- [x] Task 3: Create POST /api/roast route (AC: #1, #2, #3, #4)
  - [x] 3.1 Create `app/api/roast/route.ts` with POST handler
  - [x] 3.2 Validate request body with `RoastRequestSchema.parse()` → return 400 if invalid
  - [x] 3.3 Call `generateRoast(code, language, mode)` from lib/roast.ts
  - [x] 3.4 Return 200 with `RoastResponse` on success
  - [x] 3.5 Return 500 with `ErrorResponse` on LLM failure (catch errors, log, return user-facing message)
  - [x] 3.6 Set appropriate headers: `Content-Type: application/json`, CORS if needed
- [x] Task 4: Environment configuration and documentation (AC: #2)
  - [x] 4.1 Add `OPENAI_API_KEY` and `ANTHROPIC_API_KEY` to `.env.example`
  - [x] 4.2 Document LLM provider selection logic in README or comments
  - [x] 4.3 Add error handling if neither API key is set → return 500 "LLM not configured"

## Dev Notes

### Architecture Compliance

- **API Route:** `app/api/roast/route.ts` [Source: architecture.md#Project Structure]
- **LLM Service:** `lib/roast.ts` [Source: architecture.md#Requirements to Structure Mapping]
- **Type Definitions:** `types/roast.ts` [Source: architecture.md#Structure Patterns]
- **Validation:** Zod for API payloads [Source: architecture.md#Data Architecture]
- **Error Format:** `{ error: { message, code } }` [Source: architecture.md#Format Patterns]
- **Naming:** camelCase for JSON fields, PascalCase for types [Source: architecture.md#Naming Patterns]

### LLM Integration Strategy

**Provider Selection:**
- Check `process.env.OPENAI_API_KEY` → use OpenAI SDK (`openai` npm package)
- Else check `process.env.ANTHROPIC_API_KEY` → use Anthropic SDK (`@anthropic-ai/sdk` npm package)
- Else throw error "No LLM API key configured"

**OpenAI Implementation:**
```typescript
import OpenAI from 'openai';
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const response = await client.chat.completions.create({
  model: 'gpt-4o',  // or 'gpt-4o-mini' for cost
  messages: [{ role: 'system', content: prompt }],
  temperature: 0.7,
});
```

**Anthropic Implementation:**
```typescript
import Anthropic from '@anthropic-ai/sdk';
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const response = await client.messages.create({
  model: 'claude-3-5-sonnet-20241022',
  max_tokens: 2048,
  messages: [{ role: 'user', content: prompt }],
});
```

**Prompt Engineering:**
- **Mode: "honest"** — Constructive feedback with positives and areas to improve
- **Mode: "roast"** — Brutally honest, sarcastic, roast-style critique (but still helpful)
- **Output Structure:** Request JSON with fields: `score` (0-10), `verdict` (e.g., "Code Smells Like Week-Old Fish"), `quote` (one-liner roast), `analysis` (object with `critical`, `warning`, `good` arrays), `diff` (suggested fix as unified diff string)
- **Example Prompt Template:**
```
You are a brutally honest code reviewer. Analyze this ${language} code in ${mode} mode.

Code:
${code}

Return a JSON object with:
- score: 0-10 rating
- verdict: Short badge text (e.g., "Production Ready" or "Needs Work")
- quote: One-liner roast or praise
- analysis: { critical: string[], warning: string[], good: string[] }
- diff: Suggested fix as unified diff format

Be ${mode === 'roast' ? 'brutally honest and sarcastic' : 'constructive and helpful'}.
```

### API Request/Response Format

**Request:**
```json
{
  "code": "function calculateTotal(items) { return items.reduce((sum, item) => sum + item.price, 0); }",
  "language": "javascript",
  "mode": "roast"
}
```

**Success Response (200):**
```json
{
  "score": 6,
  "verdict": "Functional But Fragile",
  "quote": "Your code works, but so does duct tape.",
  "analysis": {
    "critical": ["No null/undefined handling for items array", "Assumes item.price exists without validation"],
    "warning": ["No TypeScript types", "Function could be more readable with explicit types"],
    "good": ["Uses functional reduce pattern", "Clean and concise logic"]
  },
  "diff": "--- original\n+++ improved\n@@ -1 +1,5 @@\n-function calculateTotal(items) { return items.reduce((sum, item) => sum + item.price, 0); }\n+function calculateTotal(items: Item[] | null): number {\n+  if (!items) return 0;\n+  return items.reduce((sum, item) => sum + (item.price ?? 0), 0);\n+}"
}
```

**Error Response (400/500):**
```json
{
  "error": {
    "message": "Invalid request: code field is required",
    "code": "VALIDATION_ERROR"
  }
}
```

### Error Handling Strategy

**Client Errors (400):**
- Missing required fields (code, language, mode)
- Invalid language (not in LanguageId enum)
- Invalid mode (not 'honest' or 'roast')
- Code too long (>10k characters)

**Server Errors (500):**
- LLM API timeout (>30s)
- LLM API unavailable (network error, rate limit)
- LLM returned invalid JSON
- No API key configured

**Error Codes:**
- `VALIDATION_ERROR` — Request validation failed
- `LLM_TIMEOUT` — LLM took >30s
- `LLM_UNAVAILABLE` — LLM API unreachable
- `LLM_INVALID_RESPONSE` — LLM didn't return valid JSON
- `LLM_NOT_CONFIGURED` — No API key set

### Previous Story Learnings (Story 1.4)

**Patterns to Follow:**
- Use runtime type guards for error handling (not unsafe `as` casts) [Source: 1-4 code review]
- Import shared types explicitly (e.g., `import type { ValidationError }`) [Source: 1-4 code review]
- Add comprehensive test coverage (unit tests with Vitest) [Source: 1-4 implementation]
- Document decisions in Dev Notes [Source: 1-4 story file]

**File Naming Conventions:**
- `lib/` for business logic (`lib/roast.ts`)
- `types/` for shared type definitions (`types/roast.ts`)
- `app/api/` for API routes (`app/api/roast/route.ts`)

**Design Tokens Already Established:**
- `accent-green` for success
- `accent-red` for error
- `accent-amber` for warning
- `accent-cta` for primary actions

### Testing Requirements

**Unit Tests (lib/roast.test.ts):**
- `generateRoast()` with valid code → returns RoastResponse
- `generateRoast()` with LLM timeout → throws descriptive error
- `generateRoast()` with invalid LLM response → throws error
- LLM provider selection: OpenAI key set → uses OpenAI
- LLM provider selection: Anthropic key set → uses Anthropic
- LLM provider selection: neither key set → throws error

**API Route Tests (app/api/roast/route.test.ts):**
- POST with valid payload → 200 with RoastResponse
- POST with missing code → 400 with ErrorResponse
- POST with invalid language → 400 with ErrorResponse
- POST with LLM failure → 500 with ErrorResponse

**Integration Test (optional):**
- End-to-end: POST /api/roast with real API key (if available) → verify response structure

### Dependencies to Install

```bash
npm install zod openai @anthropic-ai/sdk
npm install -D @types/node
```

**Versions:**
- `zod`: Latest (^3.22.0)
- `openai`: Latest (^4.0.0)
- `@anthropic-ai/sdk`: Latest (^0.17.0)

### Environment Variables

**.env.example:**
```
# LLM API Keys (at least one required)
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
```

**.env.local (create manually, not committed):**
```
OPENAI_API_KEY=your-actual-key-here
```

### Git Context from Recent Commits

**Recent Work Patterns:**
1. Commit 7239d58: Epic 1 complete → all foundation work done
2. Commit 7c0cb00: Code review pattern established → expect review workflow
3. Commit 31eaebe: Feature implementation with types → follow TypeScript patterns
4. Commit 436c318: Fix commits address issues → expect iterative fixes
5. Commit ffe40fa: Feature commits with clear scope → atomic story implementation

**Established Patterns:**
- Commit format: `feat(story): description` or `fix(story): description`
- Story completion: mark done, run code review, address findings
- Type safety: Use TypeScript types, avoid `any`
- Testing: Add Vitest tests for new modules

### Current Project State (from git)

**Existing Files:**
- `types/languages.ts` — `LanguageId` type already defined (reuse for validation)
- `lib/validation.ts` — Client-side syntax validation (separate from API validation)
- `components/CodeInputScreen.tsx` — Will call /api/roast in Story 2.2
- `vitest.config.mjs` — Test infrastructure already set up

**Next Story Preview (Story 2.2):**
- Adds roast mode toggle and submit button
- Will integrate with `/api/roast` endpoint created in this story
- Ensure API contract matches what frontend will send

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Epic 2, Story 2.1]
- [Source: _bmad-output/planning-artifacts/architecture.md#API & Communication]
- [Source: _bmad-output/planning-artifacts/architecture.md#Project Structure]
- [Source: _bmad-output/implementation-artifacts/1-4-code-validation-error-display.md#Previous Story Learnings]
- [Source: architecture.md#Error Handling, NFR6, NFR8]

## Dev Agent Record

### Agent Model Used

Claude Sonnet 4.5 (Composer - dev-story workflow)

### Debug Log References

None

### Completion Notes List

- Created Zod schemas in `types/roast.ts` for request/response validation with proper TypeScript types
- Implemented `lib/roast.ts` with OpenAI and Anthropic integration, automatic provider selection based on env vars
- Built POST /api/roast endpoint with proper error handling (400 for validation, 500 for LLM errors)
- Added comprehensive prompt engineering for honest vs roast modes
- Configured `.env.example` with both API keys and documented provider selection in README
- Added 14 unit tests covering API key validation, input/mode validation, and error handling
- All tests passing, build successful

### Change Log

- 2026-03-15: Initial implementation — Zod schemas, LLM service, API route, env config, tests
- 2026-03-15: Code review fixes — Proper language enum validation, 30s timeout for LLM calls

### File List

- types/roast.ts (new)
- lib/roast.ts (new)
- lib/roast.test.ts (new)
- app/api/roast/route.ts (new)
- .env.example (modified: added LLM API keys)
- README.md (modified: documented LLM provider selection)
- package.json (modified: zod, openai, @anthropic-ai/sdk dependencies)
- package-lock.json (modified: npm lockfile update)

### Senior Developer Review (AI)

**Reviewer:** Code Review Agent (Claude Sonnet 4.5)  
**Review Date:** 2026-03-15  
**Outcome:** Changes Requested → Fixed

**Action Items:**

- [x] [MEDIUM] Language validation not enforced - Fixed with proper Zod enum validation
- [x] [MEDIUM] Missing timeout handling - Added 30s timeout to both OpenAI and Anthropic calls
- [ ] [LOW] Test coverage incomplete - Integration tests can be added later
- [ ] [LOW] Error type casting - Custom error class can be added in future refactoring

**Review Summary:**

All acceptance criteria fully implemented. Fixed language validation security issue (now properly validates against LanguageId enum) and added 30-second timeout handling for LLM API calls as per architecture requirements. Low-priority items deferred for future improvement. Code is production-ready.
