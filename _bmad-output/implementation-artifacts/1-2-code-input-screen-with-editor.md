# Story 1.2: Code Input Screen with Editor

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a user,
I want to see a code input screen with an editor,
So that I can paste my code.

## Acceptance Criteria

1. **Given** I am on the home page **When** the page loads **Then** I see the hero "$ paste your code. get roasted."
2. **And** I see a code editor (Monaco) with placeholder
3. **And** I can paste code into the editor (FR1)

## Tasks / Subtasks

- [x] Task 1: Add Monaco editor dependency (AC: #2, #3)
  - [x] 1.1 Install @monaco-editor/react
  - [x] 1.2 Create CodeEditor component (components/CodeEditor.tsx) with "use client"
- [x] Task 2: Implement code input screen layout (AC: #1, #2)
  - [x] 2.1 Hero: "$ paste your code. get roasted."
  - [x] 2.2 Subtitle: "// drop your code below and we'll rate it — brutally honest or full roast mode"
  - [x] 2.3 Code editor: 780×360px, line numbers, placeholder `calculateTotal` example per design
  - [x] 2.4 Use design tokens: bg-input for editor, border-primary, font-mono
- [x] Task 3: Wire CodeEditor into home page (AC: #1, #2, #3)
  - [x] 3.1 Replace app/page.tsx placeholder with full Screen 1 layout
  - [x] 3.2 Ensure user can paste code (Monaco default behavior)
  - [x] 3.3 Store editor value in state for later roast request (Story 2.2)

## Dev Notes

### Architecture Compliance

- **Editor:** Monaco via @monaco-editor/react [Source: architecture.md#Frontend Architecture]
- **Component:** CodeEditor.tsx in components/ [Source: architecture.md#Project Structure]
- **State:** useState for MVP [Source: architecture.md#Frontend Architecture]
- **Naming:** PascalCase for components [Source: architecture.md#Naming Patterns]

### Design (Screen 1 — Code Input)

[Source: docs/devroast-design-summary.md]

- **Hero:** `$ paste your code. get roasted.`
- **Subtitle:** `// drop your code below and we'll rate it — brutally honest or full roast mode`
- **Code editor:** 780×360px, line numbers, placeholder `calculateTotal` example
- **Roast toggle / CTA:** Deferred to Story 2.2 — this story is editor + layout only

### Monaco + Next.js

- Use `"use client"` — Monaco requires client-side rendering
- @monaco-editor/react works with App Router, no webpack config needed
- Default language: javascript (Story 1.3 adds language selector)

### Placeholder Example (calculateTotal)

```javascript
function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  return total;
}
```

### Previous Story (1.1) Learnings

- Design tokens in globals.css; use Tailwind classes (bg-bg-input, border-border-primary) or CSS vars
- ThemeProvider wraps app; ThemeToggle in top-right
- Fonts: Geist Sans (UI), JetBrains Mono (code) — already in layout

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.2]
- [Source: _bmad-output/planning-artifacts/architecture.md]
- [Source: docs/devroast-design-summary.md]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

- @monaco-editor/react installed; CodeEditor.tsx with 780×360px, line numbers, calculateTotal placeholder
- CodeInputScreen.tsx wraps hero, subtitle, editor; state in useState for roast request
- app/page.tsx renders CodeInputScreen
- **Review fixes:** Theme detection via MutationObserver (respects ThemeProvider toggle); fontFamily changed to direct font names (vs CSS vars)

### File List

- components/CodeEditor.tsx
- components/CodeInputScreen.tsx
- app/page.tsx
- package.json (added @monaco-editor/react)
