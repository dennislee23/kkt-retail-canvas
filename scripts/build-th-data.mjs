#!/usr/bin/env node
/* build-th-data.mjs — generate canvas-data-th.js + roadmap-data-th.js
 * (window.*_TH overlays) for the retail canvas Thai localization.
 *
 * Merges the translation parts (scripts/th-part-*.json), clones the EN data
 * structures from canvas-data.js / roadmap-data.js, and overlays Thai text by
 * id — keeping every structural field (ids, colors, tags, relations) intact.
 * Only structures with at least one translation are emitted; the app falls back
 * to EN per-structure (_resolve: window.X_TH || window.X). Untranslated items
 * inside an emitted structure keep their EN text (per-item fallback).
 *
 * Tag ENUM values on plays (speed/requirements/cost/impact) are intentionally
 * LEFT IN ENGLISH here — they double as filter keys and tooltip keys, so
 * translating them in place would break filtering/tooltips. Tag display
 * translation is handled separately at render. Tooltip TEXT is translated
 * (TAG_TOOLTIPS_TH keyed by the EN tag).
 *
 * Re-run after editing any th-part-*.json:  node scripts/build-th-data.mjs
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import vm from 'node:vm';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');

// ── Load EN data (self-referential globals → window = sandbox) ──────────────
const sb = {}; sb.window = sb; sb.console = console;
vm.createContext(sb);
for (const f of ['canvas-data.js', 'roadmap-data.js']) {
  vm.runInContext(readFileSync(join(root, f), 'utf8'), sb);
}

// ── Merge translation parts ────────────────────────────────────────────────
const TR = { domains:{}, plays:{}, pressures:{}, businessAreas:{}, improvementTypes:{},
  stageMeta:{}, tagTooltips:{}, speedOptions:{}, reqOptions:{}, impactOptions:{},
  roadmapNodes:{}, roadmapSteps:{}, roadmapPathways:{}, roadmapOptions:{}, roadmapStates:{} };
const PARTS = ['th-part-meta.json', 'th-part-plays1.json', 'th-part-plays2.json', 'th-part-plays3.json'];
let loaded = 0;
for (const p of PARTS) {
  const fp = join(here, p);
  if (!existsSync(fp)) { console.error(`  (skip ${p} — not present yet)`); continue; }
  const part = JSON.parse(readFileSync(fp, 'utf8'));
  for (const k of Object.keys(TR)) if (part[k]) Object.assign(TR[k], part[k]);
  loaded++;
}
console.error(`merged ${loaded}/${PARTS.length} parts`);

// ── Overlay helpers ────────────────────────────────────────────────────────
const hasAny = (o) => o && Object.keys(o).length > 0;
const parts = [];
const emit = (file, name, value, count) => {
  file.push(`window.${name} = ${JSON.stringify(value)};`);
  console.error(`  ${name}: ${count} translated`);
};
// overlay label-only array items ({id,label}) → translated label
const overlayLabels = (arr, map) => arr.map(x => (map[x.id] != null ? { ...x, label: map[x.id] } : { ...x }));

// ── canvas-data-th.js ──────────────────────────────────────────────────────
const canvasOut = [];

if (hasAny(TR.domains) || hasAny(TR.plays)) {
  const domainsTH = sb.ALL_DOMAINS.map(d => {
    const dt = TR.domains[d.id] || {};
    const plays = (d.plays || []).map(p => {
      const pt = TR.plays[p.id];
      return pt ? { ...p, ...pt } : { ...p };
    });
    return { ...d, ...(dt.title ? { title: dt.title } : {}), ...(dt.subtitle ? { subtitle: dt.subtitle } : {}), ...(dt.context ? { context: dt.context } : {}), plays };
  });
  emit(canvasOut, 'ALL_DOMAINS_TH', domainsTH, `${Object.keys(TR.domains).length} domains / ${Object.keys(TR.plays).length} plays`);
}
if (hasAny(TR.pressures))        emit(canvasOut, 'PRESSURES_TH',         overlayLabels(sb.PRESSURES, TR.pressures), Object.keys(TR.pressures).length);
if (hasAny(TR.businessAreas))    emit(canvasOut, 'BUSINESS_AREAS_TH',    overlayLabels(sb.BUSINESS_AREAS, TR.businessAreas), Object.keys(TR.businessAreas).length);
if (hasAny(TR.improvementTypes)) emit(canvasOut, 'IMPROVEMENT_TYPES_TH', overlayLabels(sb.IMPROVEMENT_TYPES, TR.improvementTypes), Object.keys(TR.improvementTypes).length);
if (hasAny(TR.stageMeta)) {
  const sm = {}; for (const k of Object.keys(sb.STAGE_META)) sm[k] = TR.stageMeta[k] ? { ...sb.STAGE_META[k], label: TR.stageMeta[k] } : { ...sb.STAGE_META[k] };
  emit(canvasOut, 'STAGE_META_TH', sm, Object.keys(TR.stageMeta).length);
}
if (hasAny(TR.tagTooltips)) {
  const tt = {}; for (const k of Object.keys(sb.TAG_TOOLTIPS)) tt[k] = TR.tagTooltips[k] || sb.TAG_TOOLTIPS[k];
  emit(canvasOut, 'TAG_TOOLTIPS_TH', tt, Object.keys(TR.tagTooltips).length);
}
// Tag display map (EN label → TH) for badge/chip display translation at render.
const tagMap = { ...TR.speedOptions, ...TR.reqOptions, ...TR.impactOptions };
if (hasAny(tagMap)) emit(canvasOut, 'RETAIL_TAG_TH', tagMap, Object.keys(tagMap).length);

// ── roadmap-data-th.js ─────────────────────────────────────────────────────
const roadmapOut = [];
const overlayById = (arr, map, fields) => arr.map(x => {
  const t = map[x.id]; if (!t) return { ...x };
  const o = { ...x }; for (const f of fields) if (t[f] != null) o[f] = t[f]; return o;
});
if (hasAny(TR.roadmapNodes))    emit(roadmapOut, 'ROADMAP_NODES_TH',    overlayById(sb.ROADMAP_NODES, TR.roadmapNodes, ['title','shortRole','executiveWhy','readinessSignals']), Object.keys(TR.roadmapNodes).length);
if (hasAny(TR.roadmapSteps))    emit(roadmapOut, 'ROADMAP_STEPS_TH',    overlayById(sb.ROADMAP_STEPS, TR.roadmapSteps, ['label','executiveQuestion','purpose','typicalOutputs','maturitySignal','avoid']), Object.keys(TR.roadmapSteps).length);
if (hasAny(TR.roadmapPathways)) emit(roadmapOut, 'ROADMAP_PATHWAYS_TH', overlayById(sb.ROADMAP_PATHWAYS, TR.roadmapPathways, ['title','executiveUseCase','readinessQuestions','diagnosticNote']), Object.keys(TR.roadmapPathways).length);
if (hasAny(TR.roadmapOptions))  emit(roadmapOut, 'ROADMAP_READINESS_OPTIONS_TH', overlayById(sb.ROADMAP_READINESS_OPTIONS, TR.roadmapOptions, ['label','meaning']), Object.keys(TR.roadmapOptions).length);
if (hasAny(TR.roadmapStates))   emit(roadmapOut, 'ROADMAP_BLOCK_STATES_TH', overlayById(sb.ROADMAP_BLOCK_STATES, TR.roadmapStates, ['label']), Object.keys(TR.roadmapStates).length);

// ── Write ──────────────────────────────────────────────────────────────────
const banner = (n) => `/* AUTO-GENERATED by scripts/build-th-data.mjs — do not edit by hand.\n   Edit scripts/th-part-*.json + re-run. Thai first pass, pending native review. */\n`;
writeFileSync(join(root, 'canvas-data-th.js'),  banner() + canvasOut.join('\n')  + '\n');
writeFileSync(join(root, 'roadmap-data-th.js'), banner() + roadmapOut.join('\n') + '\n');
console.error(`\ncanvas-data-th.js (${canvasOut.length} structures) + roadmap-data-th.js (${roadmapOut.length} structures) written.`);
