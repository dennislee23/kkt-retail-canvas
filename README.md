# retail.kittykat.tech — Retail AI Canvas

Live site: https://retail.kittykat.tech (planned).

A standalone playbook microsite for KKT's mid-sized retail audience.
Single static HTML page + two data modules + Claude-backed AI advisor.

## Files

| File | Purpose |
|------|---------|
| `Retail_AI_Canvas_V3.html` | The whole site — Babel-in-browser React, no build step |
| `canvas-data.js` | 43 service cards across 11 domains, recommendation engine, copilot system prompt |
| `roadmap-data.js` | 5-step roadmap nodes, dependency graph, pathway routing |
| `api/advisor.php` | Self-contained Claude-backed advisor endpoint |
| `knowledge/*.md` | What the advisor knows — see "Knowledge files" below |
| `scripts/gen-knowledge.js` | Regenerates 02-cards.md / 03-roadmap.md from the data files |
| `TZ_RETAIL_ASSISTANT_V1.md` | Spec for the assistant refresh currently in progress |

## Knowledge files

`api/advisor.php` builds its system prompt by concatenating every `.md`
file in `knowledge/` in alphabetical order. This means the advisor's
behaviour, tone, and grounding are editable **without touching code**.

| File | What it controls |
|------|------------------|
| `knowledge/01-base.md` | Tone rules, stage model, response format. Edit to tune voice. |
| `knowledge/02-cards.md` | All 43 services with full content. Auto-generated from canvas-data.js. |
| `knowledge/03-roadmap.md` | 5-step roadmap with dependency graph. Auto-generated from roadmap-data.js. |
| `knowledge/04-*.md`, `05-*.md`, … | (none yet) Drop in case studies, benchmarks, internal frameworks, FAQ, etc. The advisor reads them all. |

To regenerate `02-cards.md` / `03-roadmap.md` after editing the source
data files:

```bash
node scripts/gen-knowledge.js
```

The order is determined by filename (numeric prefix), so `04-case-studies.md`
loads after the canvas catalog, `00-priority-override.md` would load before
the base prompt.

If the `knowledge/` directory is empty or missing, `advisor.php` falls back
to a built-in minimal prompt — the advisor keeps working but loses the
canvas-specific grounding.

## Audience

C-level / C-1 leaders at mid-sized food retailers (200+ stores). Not technical.
Reads in business language; data/AI is the enabling layer, not the subject.

## Backend dependency

The AI advisor calls `POST https://api.kittykat.tech/v1/retail-advisor` (anonymous,
rate-limited, ZDR). The endpoint is implemented in the
`GAS STATIONS PROJECT/REV 3.0/` PHP backend that already powers
fuel.kittykat.tech and alfa.kittykat.tech. Same Claude integration pattern
(retry, prompt caching, friendly error mapping); different system prompt and model.

See `TZ_RETAIL_ASSISTANT_V1.md` §10 for the contract.

## Deploy (to be set up)

Single static page — any static host works. Probably:
- DNS A/AAAA for `retail.kittykat.tech` to a static host.
- `update.html`-style FTP, or modern static-host (Cloudflare Pages / Netlify / GitHub Pages).
- TBD when assistant work is complete.

## Decisions

See `WORK/decisions/DECISIONS.md` in the parent `KKT WEB 2026` folder for
project-wide decisions. Deltas specific to this microsite live here as
inline comments and commit messages.
