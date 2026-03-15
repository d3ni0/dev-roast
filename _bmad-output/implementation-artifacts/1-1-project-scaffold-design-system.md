# Story 1.1: Project Scaffold & Design System

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a developer,
I want the project scaffolded with Next.js, Tailwind, and design tokens,
So that I have a consistent foundation for building the app.

## Acceptance Criteria

1. **Given** an empty or existing project directory **When** the scaffold is applied (create-next-app or manual) **Then** the project has Next.js 15+, Tailwind, TypeScript, ESLint
2. **And** design tokens are in tailwind.config (accent-green, accent-red, accent-amber, accent-cta, bg-page, bg-surface, bg-input, border-primary, text-primary/secondary/tertiary) for both dark and light themes
3. **And** JetBrains Mono and font-primary (Geist Sans or DM Sans) are loaded via Google Fonts or next/font

## Tasks / Subtasks

- [x] Task 1: Scaffold Next.js app (AC: #1)
  - [x] 1.1 Create Next.js app in subfolder `web/` via create-next-app (root has existing _bmad-output, docs, etc.)
  - [x] 1.2 Move app/, components/, lib/, types/, next.config.ts, tsconfig.json, postcss.config.mjs, package.json, .gitignore to project root; preserve _bmad-output, _bmad, docs, .cursor
  - [x] 1.3 Remove empty web/ folder; run npm install at root
  - [x] 1.4 Verify Next.js 15+, Tailwind, TypeScript, ESLint work (npm run dev)
- [x] Task 2: Add design tokens to Tailwind (AC: #2)
  - [x] 2.1 Add CSS variables and Tailwind theme extension for dark/light tokens per docs/devroast-design-summary.md
  - [x] 2.2 Implement theme toggle (dark/light) with class or data-theme on html/body
  - [x] 2.3 Ensure tokens: bg-page, bg-surface, bg-input, border-primary, text-primary, text-secondary, text-tertiary, accent-green, accent-amber, accent-red, accent-cta
- [x] Task 3: Load typography (AC: #3)
  - [x] 3.1 Add JetBrains Mono for code (next/font/google)
  - [x] 3.2 Add Geist Sans or DM Sans for UI (next/font/google or Geist from Vercel)
  - [x] 3.3 Wire fonts into layout.tsx and globals.css

## Dev Notes

### Architecture Compliance

- **Starter:** create-next-app with `--typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*" --use-npm --turbopack` [Source: _bmad-output/planning-artifacts/architecture.md#Starter Template Evaluation]
- **Monaco:** Add as dependency post-init (Story 1.2); do NOT add in this story
- **Structure:** app/, components/, lib/, types/ at root; API routes in app/api/ [Source: architecture.md#Project Structure & Boundaries]
- **Naming:** Components PascalCase, files kebab-case for routes [Source: architecture.md#Naming Patterns]

### Design Tokens (Design Alignment)

Use values from [Source: docs/devroast-design-summary.md]:

| Token | Dark | Light |
|-------|------|-------|
| bg-page | #0C0C0E | #FAFAFA |
| bg-surface | #18181B | #FFFFFF |
| bg-input | #141416 | #F4F4F5 |
| border-primary | #27272A | #E4E4E7 |
| text-primary | #FAFAFA | #18181B |
| text-secondary | #A1A1AA | #52525B |
| text-tertiary | #71717A | #71717A |
| accent-green | #22C55E | #16A34A |
| accent-amber | #EAB308 | #CA8A04 |
| accent-red | #EF4444 | #DC2626 |
| accent-cta | #8B5CF6 | #7C3AED |

### Scaffolding Strategy (Root Has Existing Files)

Root contains: _bmad-output/, _bmad/, docs/, .cursor/. Do NOT overwrite.

**Recommended:** Run create-next-app in subfolder, then move:

```bash
npx create-next-app@latest web --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*" --use-npm --turbopack
# Then move web/app web/components web/lib web/types web/next.config.* web/tailwind.config.* web/tsconfig*.json web/postcss.config.* web/package.json web/.env.example .  (merge .gitignore)
# rm -rf web && npm install
```

**Alternative:** Manual scaffold — create app/, components/ui/, lib/, types/, config files, package.json with deps. More control, more work.

### Project Structure Notes

- Target structure per architecture: dev-roast/app/, dev-roast/components/, dev-roast/lib/, dev-roast/types/
- Import alias @/* must resolve to project root (./)
- globals.css in app/globals.css

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.1]
- [Source: _bmad-output/planning-artifacts/architecture.md]
- [Source: docs/devroast-design-summary.md]
- [Source: _bmad-output/planning-artifacts/prd.md]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5

### Debug Log References

### Completion Notes List

- Next.js 16 + Tailwind v4 scaffolded via create-next-app in web/, moved to root
- Design tokens in globals.css (CSS vars + @theme inline) for dark/light
- ThemeProvider + ThemeToggle with .dark class and data-theme on html
- Geist Sans (UI) and JetBrains Mono (code) via next/font/google
- app/page.tsx placeholder with devroast hero text

### File List

- app/globals.css
- app/layout.tsx
- app/page.tsx
- components/ThemeProvider.tsx
- components/ThemeToggle.tsx
- components/ui/ (empty dir)
- lib/ (empty dir)
- types/ (empty dir)
- package.json
- next.config.ts
- tsconfig.json
- postcss.config.mjs
- eslint.config.mjs
- next-env.d.ts
- .env.example
- .gitignore
