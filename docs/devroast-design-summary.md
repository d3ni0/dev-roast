# devroast — Design Summary

> Design Alignment completed. Dark + Light themes. Clean terminal aesthetic.

## Theme Toggle

User can switch between **dark** and **light** mode. All tokens support both themes.

---

## Design Tokens

### Dark Theme

| Token | Value | Uso |
|-------|-------|-----|
| bg-page | #0C0C0E | Fundo principal |
| bg-surface | #18181B | Cards, containers |
| bg-input | #141416 | Editor, inputs |
| border-primary | #27272A | Bordas |
| text-primary | #FAFAFA | Texto principal |
| text-secondary | #A1A1AA | Texto secundário |
| text-tertiary | #71717A | Texto terciário |
| accent-green | #22C55E | Sucesso, bom score |
| accent-amber | #EAB308 | Aviso, score médio |
| accent-red | #EF4444 | Erro, roast |
| accent-cta | #8B5CF6 | Botão principal (violeta) |

### Light Theme

| Token | Value | Uso |
|-------|-------|-----|
| bg-page | #FAFAFA | Fundo principal |
| bg-surface | #FFFFFF | Cards, containers |
| bg-input | #F4F4F5 | Editor, inputs |
| border-primary | #E4E4E7 | Bordas |
| text-primary | #18181B | Texto principal |
| text-secondary | #52525B | Texto secundário |
| text-tertiary | #71717A | Texto terciário |
| accent-green | #16A34A | Sucesso, bom score |
| accent-amber | #CA8A04 | Aviso, score médio |
| accent-red | #DC2626 | Erro, roast |
| accent-cta | #7C3AED | Botão principal (violeta) |

---

## Typography

| Token | Value |
|-------|-------|
| font-primary | Geist Sans ou DM Sans |
| font-mono | JetBrains Mono ou Fira Code |

- **UI / títulos:** font-primary (sans-serif)
- **Código:** font-mono

---

## Layout & Components

- **Cantos:** 8–12px (cards 12px, botões 8px, editor 12px)
- **Sombras:** leves — `0 2px 8px rgba(0,0,0,0.25)` em cards
- **CTA:** accent-cta (violeta), border-radius 8px

---

## Screens

### Screen 1 — Code Input
- **Hero:** `$ paste your code. get roasted.`
- **Subtitle:** `// drop your code below and we'll rate it — brutally honest or full roast mode`
- **Code editor:** 780×360px, line numbers, placeholder `calculateTotal` example
- **Roast toggle:** honest / full roast
- **CTA:** `$ roast_my_code` (accent-cta)
- **Footer stats:** "2,847 codes roasted · avg score: 4.2/10"
- **Leaderboard preview:** Top 3, columns # | score | code | lang

### Screen 2 — Roast Results
- **Score ring:** 0–10 com gradiente (red → amber → green)
- **Verdict badge:** e.g. `verdict: needs_serious_help`
- **Roast quote:** one-liner
- **Meta:** lang, lines
- **Share:** `$ share_roast`
- **Submitted code:** Read-only com syntax highlight
- **Detailed analysis:** Cards (critical / warning / good)
- **Suggested fix:** Diff view

### Screen 3 — Shame Leaderboard
- **Title:** `> shame_leaderboard`
- **Subtitle:** `// the most roasted code on the internet`
- **Entries:** Rank, score, code snippet, language, lines

### Screen 4 — OG Image (1200×630)
- Score, verdict, quote para social sharing

---

## Component Library

- Buttons (primary = accent-cta, secondary, link)
- Toggle, badges, cards
- Code block, diff lines, table row
- Score ring, navbar
