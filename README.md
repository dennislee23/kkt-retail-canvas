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
| `TZ_RETAIL_ASSISTANT_V1.md` | Spec for the assistant refresh currently in progress |

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
