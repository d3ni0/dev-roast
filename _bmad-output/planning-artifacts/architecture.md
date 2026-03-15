---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
lastStep: 8
status: 'complete'
completedAt: '2026-03-14'
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/product-brief-dev-roast-2026-03-14.md
  - docs/devroast-design-summary.md
workflowType: 'architecture'
project_name: 'dev-roast'
user_name: 'd3ni0'
date: '2026-03-14'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

---

## Project Context Analysis

### Requirements Overview

**Functional Requirements:** 21 FRs across Code Input, Roast Feedback, Error Handling, Share, Leaderboard. Core flow: paste → validate → roast → score/analysis/diff.

**Non-Functional Requirements:** Performance (<30s roast, LCP <3s), WCAG 2.1 AA, LLM integration with fallback, OG image via framework.

**Scale & Complexity:** Low-medium. Primary domain: web full-stack. Key components: code editor, roast API, diff view, share/OG.

### Technical Constraints & Dependencies

- LLM API (OpenAI/Anthropic) for roast analysis
- OG image generation via framework (no external service)
- WCAG 2.1 AA compliance

### Cross-Cutting Concerns Identified

- Loading states for async roast
- API error handling and retry
- Accessibility (contrast, labels, keyboard)

---

## Starter Template Evaluation

### Primary Technology Domain

Web full-stack (SPA + API) based on project requirements.

### Starter Options Considered

- **create-next-app:** Official Next.js starter with App Router, Tailwind, TypeScript, ESLint.

### Selected Starter: create-next-app

**Rationale:** Matches PRD (SPA, OG image via generateMetadata, API routes for roast). Tailwind for design tokens. TypeScript for type safety.

**Initialization Command:**

```bash
npx create-next-app@latest [dir] --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*" --use-npm --turbopack
```

**Note:** Run in empty subfolder (e.g. `web/`) or scaffold manually if root has existing files. Monaco added as dependency post-init.

**Architectural Decisions Provided by Starter:**

- **Language & Runtime:** TypeScript, Node.js
- **Framework:** Next.js 15+, App Router
- **Styling:** Tailwind CSS
- **Build:** Turbopack (dev), Webpack (prod)
- **Linting:** ESLint (Next.js config)

---

## Core Architectural Decisions

### Decision Priority Analysis

**Critical (Block Implementation):** Next.js, Tailwind, TypeScript, Monaco, LLM API, API Routes, Vercel.

**Important (Shape Architecture):** Zod validation, error response format, design tokens.

**Deferred (Post-MVP):** DB for leaderboard, auth, rate limiting.

### Data Architecture

- **MVP:** No database (stateless flow).
- **Phase 2:** Supabase or Vercel KV for leaderboard (TBD).
- **Validation:** Zod for API payloads.

### Authentication & Security

- **MVP:** No auth.
- **Phase 2:** GitHub OAuth for identity.

### API & Communication

- **Pattern:** REST via Next.js API Routes.
- **Roast endpoint:** `POST /api/roast` — `{ code, language, mode }` → `{ score, verdict, quote, analysis, diff }`.
- **LLM:** OpenAI or Anthropic (env var).
- **Errors:** Standardized response format.

### Frontend Architecture

- **State:** React useState for MVP.
- **Editor:** Monaco. **Diff:** react-diff-viewer or similar.
- **Fonts:** JetBrains Mono, IBM Plex Mono (Google Fonts).

### Infrastructure & Deployment

- **Hosting:** Vercel.
- **Env:** `OPENAI_API_KEY` or `ANTHROPIC_API_KEY`

---

## Implementation Patterns & Consistency Rules

### Naming Patterns

- **API:** REST, plural endpoints, camelCase in JSON
- **Components:** PascalCase (`CodeEditor`, `RoastResult`)
- **Files:** kebab-case for routes, PascalCase for components (`CodeEditor.tsx`)
- **Variables/functions:** camelCase

### Structure Patterns

- **app/**, **components/** (ui, features), **lib/**, **types/**
- **API routes:** `app/api/[name]/route.ts`

### Format Patterns

- **API response:** `{ data?, error?: { message, code } }`
- **JSON:** camelCase. **Dates:** ISO 8601

### Process Patterns

- **Loading:** `isLoading` or `status: 'loading'`
- **Errors:** try/catch, user-facing message, retry option
- **Validation:** Zod on API request

---

## Project Structure & Boundaries

### Complete Project Directory Structure

```
dev-roast/
├── README.md
├── package.json
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── postcss.config.mjs
├── .env.local
├── .env.example
├── .gitignore
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── roast/
│   │   └── page.tsx
│   └── api/
│       └── roast/
│           └── route.ts
├── components/
│   ├── ui/
│   ├── CodeEditor.tsx
│   ├── RoastResult.tsx
│   └── DiffView.tsx
├── lib/
│   ├── roast.ts
│   └── validation.ts
├── types/
│   └── roast.ts
├── docs/
└── _bmad-output/
```

### Requirements to Structure Mapping

- **Code Input (FR1-5):** `app/page.tsx`, `components/CodeEditor.tsx`
- **Roast Feedback (FR6-14):** `app/api/roast/route.ts`, `lib/roast.ts`, `components/RoastResult.tsx`, `components/DiffView.tsx`
- **Error Handling (FR15-16):** `lib/validation.ts`, error handling in `route.ts`

---

## Architecture Validation Results

### Coherence Validation ✅

All decisions compatible. Patterns align with stack.

### Requirements Coverage ✅

All FRs and NFRs architecturally supported.

### Implementation Readiness ✅

Ready for AI agent implementation.

### Architecture Readiness Assessment

**Status:** READY FOR IMPLEMENTATION

**First Priority:** Scaffold via create-next-app or manual structure.
