# courchevel-web

Website for Courchevel Luxury Concierge, https://www.courchevelluxuryconcierge.com.

`main` serves the original single-page site until launch. The rebuild (Astro +
Tailwind, EN/FR) lives on `rebuild/*` branches. Rules and plan: [CLAUDE.md](CLAUDE.md).

## Run locally

Requires Node 22.23+ (Node 24 LTS recommended).

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
npm run check    # type and Astro diagnostics
```

Copy `.env.example` to `.env` for the lead system (Phase 3).

## Folders

- `audit/`: snapshot and audit of the old site, redirect list
- `docs/`: design directions and the list of missing facts
- `src/data/business.ts`: every business fact, used everywhere
