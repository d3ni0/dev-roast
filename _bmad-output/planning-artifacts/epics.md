---
stepsCompleted: [1, 2, 3, 4]
status: 'complete'
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/architecture.md
  - docs/devroast-design-summary.md
---

# dev-roast - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for dev-roast, decomposing the requirements from the PRD, UX Design if it exists, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

- FR1: User can paste code into the editor.
- FR2: User can select the programming language of the pasted code.
- FR3: System validates code syntax before processing.
- FR4: System displays a clear error message when validation fails.
- FR5: User can retry after fixing validation errors.
- FR6: User can choose feedback mode (honest or full roast).
- FR7: User can submit code for roast analysis.
- FR8: System returns a score (0–10) for the submitted code.
- FR9: System returns a verdict badge based on the score.
- FR10: System returns a roast quote (one-liner).
- FR11: System returns structured analysis (critical / warning / good).
- FR12: System returns a suggested fix as a diff view.
- FR13: System displays a loading state while processing (if >5s).
- FR14: User can view submitted code in read-only mode with syntax highlighting.
- FR15: System handles API failures with a clear user-facing message.
- FR16: User can retry after a transient failure.
- FR17: User can share roast results via link. (Phase 2)
- FR18: System generates an OG image for social sharing. (Phase 2)
- FR19: User can opt in to add roast to the leaderboard. (Phase 2)
- FR20: User can choose identity (anonymous, nickname, or GitHub). (Phase 2)
- FR21: User can view the shame leaderboard (rank, score, snippet, language). (Phase 2)

### Non-Functional Requirements

- NFR1: Roast API response within 30 seconds under normal load.
- NFR2: Initial page load (LCP) within 3 seconds on 4G.
- NFR3: Loading state visible within 1 second of submit.
- NFR4: WCAG 2.1 AA — contrast, keyboard navigation, labels on interactive elements.
- NFR5: All interactive controls (toggle, button, editor) have accessible labels.
- NFR6: LLM API integration with clear fallback message on failure.
- NFR7: OG image generation via framework (e.g. Next.js) — no external service.
- NFR8: Graceful degradation when LLM API is unavailable (clear error, retry option).

### Additional Requirements (Architecture)

- Scaffold project via create-next-app (Next.js, Tailwind, TypeScript) — Epic 1 Story 1
- Add Monaco editor as dependency post-init
- Zod for API payload validation
- REST API: POST /api/roast with { code, language, mode } → { score, verdict, quote, analysis, diff }
- LLM: OpenAI or Anthropic (env var)
- Vercel deployment
- Design tokens in Tailwind (accent-green, accent-red, bg-page, etc.)

### UX Design Requirements

- UX-DR1: Implement design tokens (accent-green #10B981, accent-red #EF4444, accent-amber #F59E0B, bg-page, bg-input, bg-surface, border-primary, text-primary/secondary/tertiary)
- UX-DR2: Typography: JetBrains Mono (primary), IBM Plex Mono (secondary)
- UX-DR3: Component library: Buttons (primary, secondary, link), Toggle, Badges, Cards, Code block, Diff lines, Score ring
- UX-DR4: Screen 1 layout: Hero, subtitle, code editor 780×360px, roast toggle, CTA button
- UX-DR5: Screen 2 layout: Score ring (0–10 gradient), verdict badge, roast quote, analysis cards (critical/warning/good), diff view
- UX-DR6: Score ring with gradient (red → amber → green)
- UX-DR7: OG image 1200×630 for social sharing

### FR Coverage Map

- FR1–5: Epic 1 — Project Foundation & Code Input
- FR6–16: Epic 2 — Roast Feedback Experience
- FR17–18: Epic 3 — Share & Viral (Phase 2)
- FR19–21: Epic 4 — Shame Leaderboard (Phase 2)

## Epic List

### Epic 1: Project Foundation & Code Input

User can paste code, select language, and receive validation before roasting.

**FRs covered:** FR1, FR2, FR3, FR4, FR5

### Epic 2: Roast Feedback Experience

User can submit code and receive full roast (score, verdict, quote, analysis, diff).

**FRs covered:** FR6, FR7, FR8, FR9, FR10, FR11, FR12, FR13, FR14, FR15, FR16

### Epic 3: Share & Viral (Phase 2)

User can share roast via link and OG image.

**FRs covered:** FR17, FR18

### Epic 4: Shame Leaderboard (Phase 2)

User can opt in to leaderboard and view ranking.

**FRs covered:** FR19, FR20, FR21

---

## Epic 1: Project Foundation & Code Input

User can paste code, select language, and receive validation before roasting.

### Story 1.1: Project Scaffold & Design System

As a developer,
I want the project scaffolded with Next.js, Tailwind, and design tokens,
So that I have a consistent foundation for building the app.

**Acceptance Criteria:**

**Given** an empty or existing project directory
**When** the scaffold is applied (create-next-app or manual)
**Then** the project has Next.js 15+, Tailwind, TypeScript, ESLint
**And** design tokens are in tailwind.config (accent-green, accent-red, bg-page, etc.)
**And** JetBrains Mono and IBM Plex Mono are loaded

### Story 1.2: Code Input Screen with Editor

As a user,
I want to see a code input screen with an editor,
So that I can paste my code.

**Acceptance Criteria:**

**Given** I am on the home page
**When** the page loads
**Then** I see the hero "$ paste your code. get roasted."
**And** I see a code editor (Monaco) with placeholder
**And** I can paste code into the editor (FR1)

### Story 1.3: Language Selection

As a user,
I want to select the programming language of my code,
So that the roast analysis is accurate.

**Acceptance Criteria:**

**Given** I have pasted code
**When** I select a language from a dropdown
**Then** the selection is stored for the roast request
**And** common languages are available (JavaScript, TypeScript, Python, etc.)

### Story 1.4: Code Validation & Error Display

As a user,
I want invalid code to be rejected with a clear message,
So that I know what to fix before roasting.

**Acceptance Criteria:**

**Given** I have pasted code with syntax errors
**When** I attempt to submit (or validation runs)
**Then** I see a clear error message (FR4)
**And** I can fix the code and retry (FR5)
**Given** valid code
**When** validation runs
**Then** the code passes (FR3)

---

## Epic 2: Roast Feedback Experience

User can submit code and receive full roast (score, verdict, quote, analysis, diff).

### Story 2.1: Roast API & LLM Integration

As a developer,
I want a POST /api/roast endpoint that calls the LLM,
So that roast analysis can be generated.

**Acceptance Criteria:**

**Given** a valid request { code, language, mode }
**When** POST /api/roast is called
**Then** the request is validated with Zod
**And** the LLM is called with the appropriate prompt
**And** the response includes { score, verdict, quote, analysis, diff }
**And** errors return { error: { message, code } }

### Story 2.2: Roast Mode Toggle & Submit

As a user,
I want to choose honest or full roast mode and submit,
So that I get the feedback style I prefer.

**Acceptance Criteria:**

**Given** I am on the code input screen
**When** I see the roast toggle
**Then** I can switch between "honest" and "full roast" (FR6)
**And** I can click the submit button (FR7)
**And** the selected mode is sent to the API

### Story 2.3: Loading State

As a user,
I want to see a loading state while my roast is processing,
So that I know the system is working.

**Acceptance Criteria:**

**Given** I have submitted code
**When** the roast is processing (>1s)
**Then** I see a loading indicator (NFR3, FR13)
**And** the loading state is visible within 1 second of submit

### Story 2.4: Roast Results Display

As a user,
I want to see my roast results (score, verdict, quote, analysis, diff),
So that I can learn from the feedback.

**Acceptance Criteria:**

**Given** the roast has completed
**When** the results are displayed
**Then** I see a score (0–10) with gradient ring (FR8, UX-DR6)
**And** I see a verdict badge (FR9)
**And** I see a roast quote (FR10)
**And** I see structured analysis (critical/warning/good) (FR11)
**And** I see a diff view with suggested fix (FR12)
**And** I see my submitted code in read-only mode with syntax highlighting (FR14)

### Story 2.5: Error Handling & Retry

As a user,
I want clear error messages when the API fails,
So that I can retry or understand what went wrong.

**Acceptance Criteria:**

**Given** the roast API fails (LLM unavailable, timeout, etc.)
**When** the error occurs
**Then** I see a clear user-facing message (FR15, NFR6, NFR8)
**And** I can retry (FR16)

---

## Epic 3: Share & Viral (Phase 2)

User can share roast via link and OG image.

### Story 3.1: Share Link

As a user,
I want to share my roast via a link,
So that others can see it.

**Acceptance Criteria:**

**Given** I have received roast results
**When** I click share
**Then** I get a shareable link (FR17)

### Story 3.2: OG Image Generation

As a user,
I want an OG image for my roast when sharing on social,
So that the preview looks good.

**Acceptance Criteria:**

**Given** a roast result URL
**When** the page is shared (e.g. Twitter, Slack)
**Then** the OG image (1200×630) shows score, verdict, quote (FR18, UX-DR7)
**And** it is generated via Next.js (no external service)

---

## Epic 4: Shame Leaderboard (Phase 2)

User can opt in to leaderboard and view ranking.

### Story 4.1: Leaderboard Opt-In

As a user,
I want to opt in to add my roast to the leaderboard,
So that I can compete (or be roasted publicly).

**Acceptance Criteria:**

**Given** I have received roast results
**When** I choose to opt in
**Then** I can select identity (anonymous, nickname, or GitHub) (FR19, FR20)
**And** my roast is added to the leaderboard

### Story 4.2: Leaderboard View

As a user,
I want to view the shame leaderboard,
So that I can see the worst (or best) roasted code.

**Acceptance Criteria:**

**Given** I am on the leaderboard page
**When** the page loads
**Then** I see entries with rank, score, code snippet, language (FR21)
