---
stepsCompleted: ['step-01-init', 'step-02-discovery', 'step-02b-vision', 'step-02c-executive-summary', 'step-03-success', 'step-04-journeys', 'step-05-domain', 'step-06-innovation', 'step-07-project-type', 'step-08-scoping', 'step-09-functional', 'step-10-nonfunctional', 'step-11-polish', 'step-12-complete']
classification:
  projectType: web-app
  domain: developer-tools-education
  complexity: low-medium
  projectContext: greenfield
inputDocuments:
  - _bmad-output/planning-artifacts/product-brief-dev-roast-2026-03-14.md
  - docs/devroast-design-summary.md
  - docs/devroast-design.pen.json
documentCounts:
  briefCount: 1
  researchCount: 0
  brainstormingCount: 0
  projectDocsCount: 2
workflowType: 'prd'
date: 2026-03-14
author: d3ni0
---

# Product Requirements Document - dev-roast

**Author:** d3ni0
**Date:** 2026-03-14

---

## Executive Summary

**devroast** is a web app where developers paste code and receive immediate feedback: a score (0–10), roast (honest or sarcastic), structured analysis, and suggested fixes. The focus is **learning while having fun** — memorable, low-pressure feedback instead of formal code review or purely technical linters.

**Target users:** Junior devs, bootcamp graduates, and self-taught developers who want quick feedback without fear of judgment. The value moment: "I got roasted, but I understood what was wrong and how to fix it."

### What Makes This Special

- **Dual mode:** User chooses honest feedback or maximum roast.
- **Real analysis:** Technical feedback (var vs const, reduce vs for) wrapped in roast tone.
- **Shareable:** Link and OG image for social sharing.
- **Leaderboard opt-in:** Gamification without forcing visibility; identity (anonymous, nickname, or GitHub) is user's choice.
- **Visual hierarchy:** Roast (hook) → Analysis (value) → Diff (action).

### Project Classification

| Attribute | Value |
|-----------|-------|
| Project Type | Web app |
| Domain | Developer tools / Education |
| Complexity | Low–medium |
| Context | Greenfield |

---

## Success Criteria

### User Success

- User completes the flow: paste code → receive roast + analysis + diff.
- "Aha!" moment: "I got roasted, but I understood what was wrong and how to fix it."
- User shares roast (link or OG image) or opts in to leaderboard.
- User returns to roast new code.

### Business Success

- Organic growth via social sharing.
- Engagement: users who roast more than once.
- Optional: Define targets for 3/6/12 months if desired.

### Technical Success

- Roast API response in < 30s.
- App available and responsive.
- OG image generated correctly for sharing.

### Measurable Outcomes

- % of users who complete the flow (paste → roast → result).
- % of roasts shared.
- % of users who roast more than once.
- Average roast API response time.

## Product Scope

### MVP - Minimum Viable Product

- Code paste + language selection
- Roast mode toggle (honest vs full roast)
- Score (0–10) + verdict + roast quote
- Structured analysis (critical / warning / good)
- Diff with suggested fix

### Growth Features (Post-MVP)

- Share (link + OG image)
- Leaderboard opt-in
- Identity (anonymous / nickname / GitHub)

### Vision (Future)

- GitHub integration
- Roast history per user
- Community / user-generated content

---

## User Journeys

### Journey 1: Junior Dev — Happy Path (Ana)

**Opening:** Ana, junior dev, just wrote a function and isn't sure if it's good. She doesn't want to ask for formal code review.

**Rising action:** She pastes the code into devroast, selects "honest mode," clicks roast. Within seconds she gets score 4/10, roast quote, analysis (critical: "var instead of const"), and diff with the fix.

**Climax:** "I get it! It's not just style — const prevents bugs. And reduce would be more idiomatic." She applies the diff and feels she actually learned.

**Resolution:** She returns next week to roast another snippet. Optionally shares the roast in the team Slack.

### Journey 2: Self-Taught Dev — Share Path (Bruno)

**Opening:** Bruno is self-taught, learns alone. He saw a roast shared on Twitter and got curious.

**Rising action:** He opens the link, pastes code he wrote, selects "full roast mode." Gets the result with sarcastic tone but serious analysis.

**Climax:** He laughs at the roast but sees the analysis is useful. Clicks "share" and posts to Twitter with his own caption.

**Resolution:** The roast goes viral among dev friends. Bruno returns to roast more code and improve.

### Journey 3: Primary User — Error Recovery (Carla)

**Opening:** Carla pastes code with a syntax error. The system rejects it or returns an error.

**Rising action:** She sees a clear message: "Syntax error on line X. Fix before roasting." She fixes and tries again.

**Climax:** The roast works. She understands the app validates before processing.

**Resolution:** She completes the flow and gets the expected feedback.

### Journey 4: Dev Team / Mentor (Daniel)

**Opening:** Daniel is a tech lead and wants a lightweight tool for the team to learn without fear of judgment.

**Rising action:** He uses devroast to roast a "bad" code example in a meeting. Shows the roast, analysis, and diff on screen.

**Climax:** The team laughs and discusses the technical points. Juniors realize they can use it on their own.

**Resolution:** devroast becomes part of onboarding and dailies as "roast of the day."

### Journey Requirements Summary

| Journey | Capabilities |
|---------|--------------|
| Ana (happy path) | Code paste, language select, roast toggle, score/verdict/quote, analysis cards, diff view |
| Bruno (share) | Share link, OG image, social flow |
| Carla (error) | Validation, error messages, recovery |
| Daniel (mentor) | No signup, quick access, shareable results |

---

## Web App Specific Requirements

### Project-Type Overview

Single-page web app for developers to paste code and receive roast feedback. SPA architecture, no signup required for core flow.

### Technical Architecture Considerations

- **Architecture:** SPA (Single Page Application)
- **Browser support:** Chrome, Firefox, Safari, Edge — latest 2 versions
- **SEO:** OG image for social sharing (score, verdict, quote)
- **Real-time:** No — request/response; roast is async
- **Accessibility:** WCAG 2.1 AA — contrast, keyboard nav, labels

### Implementation Considerations (from Party Mode)

- **Accessibility:** Prioritize contrast in dark theme and labels on all interactive controls (toggle, roast button, editor)
- **OG image:** Use Next.js `generateMetadata` or similar — avoid external service, keep stack simple
- **Browser support:** "Latest 2 versions" sufficient for MVP; consider IE11 only if corporate demand
- **Loading state:** If roast takes >5s, show loading with intermediate state instead of blank screen

---

## Project Scoping & Phased Development

### Design Alignment (Done)

Aligned on colors, fonts, and layout. Dark + Light themes. CTA violet (#8B5CF6). See `docs/devroast-design-summary.md`.

### MVP Strategy & Philosophy

**MVP Approach:** Problem-solving MVP — validate that devs use and learn from roast.
**Resource Requirements:** 1 full-stack dev; LLM API (OpenAI/Anthropic) for roast.

### MVP Feature Set (Phase 1)

**Core User Journeys Supported:** Ana (happy path), Carla (error recovery).

**Must-Have Capabilities:** Code paste + language select, roast toggle, score/verdict/quote, analysis cards, diff view, loading state if >5s.

### Post-MVP Features

**Phase 2 (Growth):** Share (link + OG image), leaderboard opt-in, identity (anonymous/nickname/GitHub).

**Phase 3 (Vision):** GitHub integration, roast history, community.

### Risk Mitigation Strategy

**Technical:** LLM dependency — clear fallback message if API fails.
**Market:** Validate with early adopters before investing in share/leaderboard.
**Resource:** MVP without share/leaderboard to reduce scope.

---

## Functional Requirements

### Code Input

- FR1: User can paste code into the editor.
- FR2: User can select the programming language of the pasted code.
- FR3: System validates code syntax before processing.
- FR4: System displays a clear error message when validation fails.
- FR5: User can retry after fixing validation errors.

### Roast Feedback

- FR6: User can choose feedback mode (honest or full roast).
- FR7: User can submit code for roast analysis.
- FR8: System returns a score (0–10) for the submitted code.
- FR9: System returns a verdict badge based on the score.
- FR10: System returns a roast quote (one-liner).
- FR11: System returns structured analysis (critical / warning / good).
- FR12: System returns a suggested fix as a diff view.
- FR13: System displays a loading state while processing (if >5s).
- FR14: User can view submitted code in read-only mode with syntax highlighting.

### Error Handling

- FR15: System handles API failures with a clear user-facing message.
- FR16: User can retry after a transient failure.

### Share (Phase 2)

- FR17: User can share roast results via link.
- FR18: System generates an OG image for social sharing.

### Leaderboard (Phase 2)

- FR19: User can opt in to add roast to the leaderboard.
- FR20: User can choose identity (anonymous, nickname, or GitHub).
- FR21: User can view the shame leaderboard (rank, score, snippet, language).

---

## Non-Functional Requirements

### Performance

- NFR1: Roast API response within 30 seconds under normal load.
- NFR2: Initial page load (LCP) within 3 seconds on 4G.
- NFR3: Loading state visible within 1 second of submit.

### Accessibility

- NFR4: WCAG 2.1 AA — contrast, keyboard navigation, labels on interactive elements.
- NFR5: All interactive controls (toggle, button, editor) have accessible labels.

### Integration

- NFR6: LLM API integration with clear fallback message on failure.
- NFR7: OG image generation via framework (e.g. Next.js) — no external service.

### Reliability

- NFR8: Graceful degradation when LLM API is unavailable (clear error, retry option).
