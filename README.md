# Personal Website

Personal website for Max Gertzen — a single-page site with sections for about, skills, CV, and contact.

Deployed at [maxgertzen.com](https://maxgertzen.com) via Vercel.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + NextUI v2
- **Forms:** react-hook-form + reCAPTCHA v3
- **Linting:** ESLint 9 (flat config)

## Features

- Dark/light mode toggle
- Scroll-based navigation with active section highlighting
- Contact form with client-side validation, reCAPTCHA v3 verification, XSS sanitization, and in-memory rate limiting
- UI abstraction layer isolating NextUI imports from business components
- Unified skills grid with cross-category vertical alignment
- Accessible markup (semantic links, keyboard-navigable controls, ARIA labels)

## Getting Started

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `yarn dev` | Start development server |
| `yarn build` | Production build |
| `yarn lint` | Run ESLint |

## Deployment

Pushes to `main` trigger automatic deployment on Vercel.
