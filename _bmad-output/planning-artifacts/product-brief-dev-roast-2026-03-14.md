---
stepsCompleted: [1, 2, 3]
inputDocuments:
  - docs/devroast-design.pen.json
  - docs/devroast-design-summary.md
date: 2026-03-14
author: d3ni0
---

# Product Brief: dev-roast

<!-- Content will be appended sequentially through collaborative workflow steps -->

---

## Executive Summary

**devroast** is a web app where developers paste code and receive a score (0–10), feedback that can be sarcastic ("roast") or serious, plus structured analysis and suggested fixes. It combines humor with real code review, making learning from mistakes more engaging and shareable.

---

## Core Vision

### Problem Statement

Developers often lack quick, honest feedback on their code. Code reviews can feel intimidating or too formal. Linters catch syntax and style, but not readability, patterns, or design. Learning from mistakes is easier when feedback is memorable and engaging.

### Problem Impact

Without accessible feedback, junior developers and bootcamp graduates repeat the same mistakes. Teams spend time in formal reviews that could be lighter. Bad habits spread when there's no low-friction way to get a second opinion.

### Why Existing Solutions Fall Short

- **Linters** (ESLint, Prettier): Focus on rules, not intent or readability.
- **Formal code review**: Slow, intimidating, not always available.
- **AI assistants** (ChatGPT, Copilot): Generic, not framed as "roast" or gamified.
- **No tool** combines sarcastic humor with serious analysis and shareability.

### Proposed Solution

A single-page app where users paste code, choose feedback mode (brutally honest or full roast), and receive:

1. **Score** (0–10) with verdict badge
2. **Roast quote** — memorable, shareable one-liner
3. **Detailed analysis** — cards (critical / warning / good)
4. **Suggested fix** — diff view with improved code
5. **Share** — link or OG image for social
6. **Shame leaderboard** — worst code ranked by score

### Key Differentiators

- **Dual mode**: Honest feedback or maximum sarcasm — user chooses
- **Serious + fun**: Real analysis (var vs const, reduce vs for) wrapped in roast tone
- **Shareable**: OG image and link make it viral-friendly
- **Leaderboard**: Gamification drives engagement and return visits

### Product Decisions (from Party Mode)

- **Primary job**: "Aprender se divertindo" (learn while having fun)
- **Visual hierarchy**: Roast (hook) → Analysis (value) → Diff (action)
- **Identity options**: Anonymous / Nickname / GitHub (connect account)
- **Leaderboard**: Opt-in — user chooses to appear and selects identity mode

---

## Target Users

### Primary Users

**Junior developers & bootcamp graduates**
- Want quick feedback without formal code review
- Learning patterns and best practices
- Often code alone or in small teams
- Motivated by "aprender se divertindo" — fun, low-pressure way to improve

**Self-taught developers**
- No structured feedback loop
- Rely on docs, forums, tutorials
- Value memorable feedback that sticks
- May share roasts with peers for laughs + learning

### Secondary Users

**Dev teams / mentors**
- Use as icebreaker or light code review tool
- Share roasts in team channels
- Junior devs can learn without fear of formal critique

**Dev community / content creators**
- Share roasts on social media
- Create content around "worst code" moments
- Drive viral engagement

### User Journey

1. **Discovery**: Social share, dev community, Twitter/X, Reddit
2. **Onboarding**: Paste code → choose roast mode → submit (no signup required)
3. **Core usage**: Get roast + analysis + diff → optionally share or add to leaderboard
4. **Success moment**: "I got roasted but learned why my code was bad — and how to fix it"
5. **Long-term**: Return to roast new code; optionally connect GitHub for profile
