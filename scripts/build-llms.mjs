#!/usr/bin/env node
/* build-llms.mjs — regenerate llms.txt from the service catalog (English).
 *
 * The retail canvas is a client-side React/Babel app: crawlers and AI fetchers
 * that don't run JavaScript see only the <head> (title/meta/OG/JSON-LD), never
 * the rendered catalog body. llms.txt is the JS-free, machine-readable version
 * — so this inlines a condensed catalog (12 domains → 46 services, each with its
 * one-liner) parsed from knowledge/02-cards.md (the advisor's catalog, itself
 * generated from canvas-data.js).
 *
 * ⚠️ Refresh: rerun after the catalog changes:  node scripts/build-llms.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');

const md = readFileSync(join(root, 'knowledge/02-cards.md'), 'utf8').split('\n');

// Parse: ## Domain → ### `id` — Title (+ next "One-liner:" line).
const domains = [];
let domain = null, pendingTitle = null;
for (const line of md) {
  let m;
  if ((m = line.match(/^##\s+(.+)$/))) { domain = { name: m[1].trim(), services: [] }; domains.push(domain); pendingTitle = null; }
  else if ((m = line.match(/^###\s+`[^`]+`\s+—\s+(.+)$/))) { pendingTitle = m[1].trim(); }
  else if ((m = line.match(/^One-liner:\s*(.+)$/i)) && pendingTitle && domain) {
    domain.services.push({ title: pendingTitle, oneLiner: m[1].trim() });
    pendingTitle = null;
  }
}
const serviceCount = domains.reduce((n, d) => n + d.services.length, 0);

const out = [];
out.push('# Retail AI Canvas — KKT');
out.push('');
out.push('> An interactive map of where data and AI deliver measurable results across the retail business, published by Kitty Kat Technologies (KKT). It lays out, domain by domain, the solutions that move retail economics — from a trusted data foundation through analytics, AI, and automation. This file mirrors the full catalog as text (the canvas itself renders client-side).');
out.push('');
out.push('The Retail AI Canvas is a working artifact from KKT, a data, AI, and automation delivery firm based in Tallinn, Estonia (EU). KKT works with mid-enterprise companies in traditional, asset-heavy industries, starting every engagement from the business question rather than the technology. It is the retail counterpart to KKT\'s Fuel AI Transformation Map.');
out.push('');
out.push(`## The catalog — ${domains.length} domains, ${serviceCount} services`);
out.push('');
for (const d of domains) {
  out.push(`### ${d.name}`);
  for (const s of d.services) out.push(`- **${s.title}** — ${s.oneLiner}`);
  out.push('');
}
out.push('## About KKT');
out.push('');
out.push('- [Kitty Kat Technologies](https://kittykat.tech/): The firm behind the canvas — business-first data & AI delivery for mid-enterprise companies in asset-heavy industries.');
out.push('- [Retail positioning](https://kittykat.tech/industries/retail/): How KKT approaches retail — mid-enterprise starting points, business question first.');
out.push('- [Fuel AI Transformation Map](https://fuelretail.kittykat.tech/): The fuel-retail counterpart canvas.');
out.push('');

writeFileSync(join(root, 'llms.txt'), out.join('\n'));
console.error(`llms.txt written: ${domains.length} domains, ${serviceCount} services`);
