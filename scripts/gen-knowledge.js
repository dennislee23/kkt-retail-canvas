#!/usr/bin/env node
// Generates retail/knowledge/02-cards.md and 03-roadmap.md from
// canvas-data.js / roadmap-data.js (the source of truth for the canvas).
// Re-run after data changes — output is committed so it doesn't need to
// run on the server.

const fs = require('fs');
const path = require('path');

// Stub window object — both data files use window.* assignments.
const window = {};

// Some places inside canvas-data.js reference DOMAINS / _ALL_DOMAINS / etc.
// without the window prefix, expecting "var X = window.X" hoisting from the
// outer browser scope. We replicate that with `with(window)`.
const code1 = fs.readFileSync(path.join(__dirname, '..', 'canvas-data.js'), 'utf8');
const code2 = fs.readFileSync(path.join(__dirname, '..', 'roadmap-data.js'), 'utf8');
new Function('window', `with (window) { ${code1}\n${code2} }`)(window);

const SM = window.STAGE_META;
const stageLabel = (n) => (SM[n] && SM[n].label) || `Stage ${n}`;

// ─── 02-cards.md ─────────────────────────────────────────────────────────────
let cardsMd = '# Canvas service catalog\n\n';
cardsMd += 'The Retail AI Canvas defines 43 services across 11 domains and 3 stages.\n';
cardsMd += 'Each service has a stable id (e.g. `df-1`, `cust-2`, `lp-1`). When citing a\n';
cardsMd += 'service in a response, use the exact id below — never invent or paraphrase ids.\n\n';

for (const [domainId, domain] of Object.entries(window.DOMAINS)) {
  cardsMd += `## ${domain.title}\n\n`;
  cardsMd += `Stage: ${stageLabel(domain.stage)}.\n\n`;
  for (const card of (domain.plays || domain.cards || [])) {
    cardsMd += `### \`${card.id}\` — ${card.title}\n\n`;
    cardsMd += `${stageLabel(domain.stage)} · ${card.speed || ''} · ${card.requirements || ''} · ${card.cost || ''} · ${(card.impact||[]).join(', ')}\n\n`;
    if (card.cardText)    cardsMd += `**One-liner:** ${card.cardText}\n\n`;
    if (card.shortPain)   cardsMd += `**Business problem:** ${card.shortPain}\n\n`;
    if (card.whatWeDo)    cardsMd += `**What we do:** ${card.whatWeDo}\n\n`;
    if (card.helpImprove) cardsMd += `**Helps improve:** ${card.helpImprove}\n\n`;
    if (card.dataBehind)  cardsMd += `**Data and analytics behind it:** ${card.dataBehind}\n\n`;
    if (Array.isArray(card.diagnosticQuestions) && card.diagnosticQuestions.length) {
      cardsMd += `**Diagnostic questions:**\n`;
      for (const q of card.diagnosticQuestions) cardsMd += `- ${q}\n`;
      cardsMd += '\n';
    }
  }
}
fs.writeFileSync(path.join(__dirname, '..', 'knowledge', '02-cards.md'), cardsMd);
console.log(`02-cards.md: ${cardsMd.length} chars`);

// ─── 03-roadmap.md ───────────────────────────────────────────────────────────
let roadmapMd = '# Capability roadmap\n\n';
roadmapMd += 'A staged sequence of capabilities. Five steps: See, Control, Optimize, Scale,\n';
roadmapMd += 'Expand. Step ids: `see`, `control`, `optimize`, `scale`, `expand`. When citing a\n';
roadmapMd += 'roadmap step in a response, use one of these ids — or `null` if no specific\n';
roadmapMd += 'step fits.\n\n';

roadmapMd += '## Steps\n\n';
for (const step of (window.ROADMAP_STEPS || [])) {
  roadmapMd += `### \`${step.id}\` — ${step.label}\n\n`;
  if (step.stageLabel)        roadmapMd += `Stage: ${step.stageLabel}.\n\n`;
  if (step.executiveQuestion) roadmapMd += `**Executive question:** ${step.executiveQuestion}\n\n`;
  if (step.purpose)           roadmapMd += `**Purpose:** ${step.purpose}\n\n`;
  if (step.maturitySignal)    roadmapMd += `**Maturity signal:** ${step.maturitySignal}\n\n`;
  if (step.avoid)             roadmapMd += `**Avoid:** ${step.avoid}\n\n`;
}

roadmapMd += '## Capability nodes\n\n';
roadmapMd += 'Each step has one or more capability nodes. Nodes carry dependencies — what\n';
roadmapMd += 'must be in place before this capability becomes useful.\n\n';
for (const node of (window.ROADMAP_NODES || [])) {
  roadmapMd += `### \`${node.id}\` (${node.stepId})\n\n`;
  roadmapMd += `**${node.title}** — ${node.shortRole}\n\n`;
  if (node.executiveWhy) roadmapMd += `**Why it matters:** ${node.executiveWhy}\n\n`;
  if (Array.isArray(node.dependsOn) && node.dependsOn.length) {
    roadmapMd += `**Depends on:** ${node.dependsOn.map(x => `\`${x}\``).join(', ')}\n\n`;
  }
  if (Array.isArray(node.linkedCards) && node.linkedCards.length) {
    roadmapMd += `**Related card ids:** ${node.linkedCards.map(x => `\`${x}\``).join(', ')}\n\n`;
  }
  if (Array.isArray(node.readinessSignals) && node.readinessSignals.length) {
    roadmapMd += `**Readiness signals:**\n`;
    for (const s of node.readinessSignals) roadmapMd += `- ${s}\n`;
    roadmapMd += '\n';
  }
}
fs.writeFileSync(path.join(__dirname, '..', 'knowledge', '03-roadmap.md'), roadmapMd);
console.log(`03-roadmap.md: ${roadmapMd.length} chars`);

console.log('Done.');
