# devroast

**Paste your code. Get roasted.**

A web app where developers paste code and receive immediate feedback: a score (0–10), roast (honest or sarcastic), structured analysis, and suggested fixes.

## Tech Stack

- **Framework:** Next.js 16 (App Router, TypeScript)
- **Styling:** Tailwind CSS v4
- **Fonts:** Geist Sans (UI), JetBrains Mono (code)
- **Linting:** ESLint

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Production build
- `npm start` — Run production server
- `npm run lint` — Lint code

## Design Tokens

All tokens are CSS variables in `app/globals.css` with dark/light theme support:

- **Colors:** `bg-page`, `bg-surface`, `bg-input`, `border-primary`, `text-primary/secondary/tertiary`, `accent-green/amber/red/cta`
- **Fonts:** `--font-geist-sans` (UI), `--font-jetbrains-mono` (code)

Theme toggle: Click "Theme" button (top right).

## Project Structure

```
dev-roast/
├── app/             # Next.js app router
├── components/      # React components
│  └── ui/           # UI component library
├── lib/             # Utilities
├── types/           # TypeScript types
├── public/          # Static assets
└── _bmad-output/    # BMAD artifacts (planning, implementation)
```

## Deployment

Ready for Vercel.

### Environment Variables

Set up at least one LLM API key:

- **OpenAI:** `OPENAI_API_KEY` (get from https://platform.openai.com/api-keys)
- **Anthropic:** `ANTHROPIC_API_KEY` (get from https://console.anthropic.com/)

**LLM Provider Selection:**
The app automatically selects the LLM provider based on which API key is set:
1. If `OPENAI_API_KEY` is set → uses OpenAI (gpt-4o-mini)
2. Else if `ANTHROPIC_API_KEY` is set → uses Anthropic (claude-3-5-sonnet)
3. If neither is set → returns error "LLM not configured"

**Local Development:**
Copy `.env.example` to `.env.local` and add your API key:
```bash
cp .env.example .env.local
# Edit .env.local and add your key
```
