#!/usr/bin/env node
/* build-de-data.mjs — generate canvas-data-de.js + roadmap-data-de.js
 * (window.*_DE overlays), chrome-de.js (window.RETAIL_CHROME_DE) and
 * kktechnologies-profile-data-de.js (window.KKTECH_PROFILE_DE) for the retail
 * canvas German localization.
 *
 * German twin of build-th-data.mjs. Merges the translation parts
 * (scripts/de-part-*.json), clones the EN data structures from canvas-data.js /
 * roadmap-data.js, and overlays German text by id — keeping every structural
 * field (ids, colors, tags, relations) intact. Only structures with at least one
 * translation are emitted; the app falls back to EN per-structure
 * (_resolve: window.X_DE || window.X). Untranslated items inside an emitted
 * structure keep their EN text (per-item fallback).
 *
 * Tag ENUM values on plays (speed/requirements/cost/impact) are intentionally
 * LEFT IN ENGLISH inside the data — they double as filter keys and tooltip keys.
 * Their German DISPLAY comes from RETAIL_TAG_DE (built from speed/req/impact
 * options) and is applied at render by tagT().
 *
 * Terminology is fixed by ../fuel-canvas/scripts/de-glossary.md (owner decisions:
 * procurement=Einkauf, stockout=Out-of-Stock, loss control=Verlustkontrolle,
 * working capital=Working Capital, AI=KI, Sie-form) plus the retail terms
 * (shrinkage=Schwund, assortment=Sortiment, planogram=Planogramm, …).
 *
 * Re-run after editing any de-part-*.json / chrome-de.json / profile-de.json:
 *   node scripts/build-de-data.mjs
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
const PARTS = ['de-part-meta.json', 'de-part-roadmap.json',
  'de-part-plays1.json', 'de-part-plays2.json', 'de-part-plays3.json', 'de-part-plays4.json'];
let loaded = 0;
for (const p of PARTS) {
  const fp = join(here, p);
  if (!existsSync(fp)) { console.error(`  (skip ${p} — not present yet)`); continue; }
  const part = JSON.parse(readFileSync(fp, 'utf8'));
  for (const k of Object.keys(TR)) if (part[k]) Object.assign(TR[k], part[k]);
  loaded++;
}
console.error(`merged ${loaded}/${PARTS.length} parts\n`);

// ── id sanity check ────────────────────────────────────────────────────────
// A translation id with no match in the EN data falls back to English silently.
// Fail loudly instead. NB: ids are compared as STRINGS — some EN ids are numeric
// (STAGE_META keys), while JSON object keys are always strings.
const idsOfArr = (arr) => new Set((arr || []).map(i => String(i.id)));
const idsOfObj = (obj) => new Set(Object.keys(obj || {}));
const allPlayIds = new Set();
for (const d of (sb.ALL_DOMAINS || [])) for (const p of (d.plays || [])) allPlayIds.add(String(p.id));
const CHECKS = [
  ['domains',          TR.domains,          idsOfArr(sb.ALL_DOMAINS)],
  ['plays',            TR.plays,            allPlayIds],
  ['pressures',        TR.pressures,        idsOfArr(sb.PRESSURES)],
  ['businessAreas',    TR.businessAreas,    idsOfArr(sb.BUSINESS_AREAS)],
  ['improvementTypes', TR.improvementTypes, idsOfArr(sb.IMPROVEMENT_TYPES)],
  ['stageMeta',        TR.stageMeta,        idsOfObj(sb.STAGE_META)],
  ['tagTooltips',      TR.tagTooltips,      idsOfObj(sb.TAG_TOOLTIPS)],
  ['speedOptions',     TR.speedOptions,     new Set((sb.SPEED_OPTIONS   || []).map(String))],
  ['reqOptions',       TR.reqOptions,       new Set((sb.REQ_OPTIONS     || []).map(String))],
  ['impactOptions',    TR.impactOptions,    new Set((sb.IMPACT_OPTIONS  || []).map(String))],
  ['roadmapNodes',     TR.roadmapNodes,     idsOfArr(sb.ROADMAP_NODES)],
  ['roadmapSteps',     TR.roadmapSteps,     idsOfArr(sb.ROADMAP_STEPS)],
  ['roadmapPathways',  TR.roadmapPathways,  idsOfArr(sb.ROADMAP_PATHWAYS)],
  ['roadmapOptions',   TR.roadmapOptions,   idsOfArr(sb.ROADMAP_READINESS_OPTIONS)],
  ['roadmapStates',    TR.roadmapStates,    idsOfArr(sb.ROADMAP_BLOCK_STATES)],
];
const hasAny = (o) => o && Object.keys(o).length > 0;
let orphans = 0;
for (const [name, tr, ids] of CHECKS) {
  if (!hasAny(tr)) { console.error(`  .. ${name}: no translations → EN fallback`); continue; }
  for (const id of Object.keys(tr)) {
    if (!ids.has(String(id))) { console.error(`  !! ${name}: unknown id "${id}" — no match in EN data`); orphans++; }
  }
  const missing = [...ids].filter(id => !(id in tr));
  if (missing.length) console.error(`  .. ${name}: ${missing.length} EN item(s) untranslated → EN fallback: ${missing.join(', ')}`);
}
if (orphans) {
  console.error(`\nABORT: ${orphans} unmatched id(s) in de-part-*.json. Fix them — they fail silently at runtime.`);
  process.exit(1);
}
console.error('  id check: OK (0 unmatched ids)\n');

// ── Overlay helpers ────────────────────────────────────────────────────────
const parts = [];
const emit = (file, name, value, count) => {
  file.push(`window.${name} = ${JSON.stringify(value)};`);
  console.error(`  ${name}: ${count} translated`);
};
const overlayLabels = (arr, map) => arr.map(x => (map[x.id] != null ? { ...x, label: map[x.id] } : { ...x }));

// ── canvas-data-de.js ──────────────────────────────────────────────────────
const canvasOut = [];

if (hasAny(TR.domains) || hasAny(TR.plays)) {
  let playCount = 0;
  const domainsDE = sb.ALL_DOMAINS.map(d => {
    const dt = TR.domains[d.id] || {};
    const plays = (d.plays || []).map(p => {
      const pt = TR.plays[String(p.id)];
      if (pt) playCount++;
      return pt ? { ...p, ...pt } : { ...p };
    });
    return { ...d, ...(dt.title ? { title: dt.title } : {}), ...(dt.subtitle ? { subtitle: dt.subtitle } : {}), ...(dt.context ? { context: dt.context } : {}), plays };
  });
  emit(canvasOut, 'ALL_DOMAINS_DE', domainsDE, `${Object.keys(TR.domains).length} domains / ${playCount} plays`);
}
if (hasAny(TR.pressures))        emit(canvasOut, 'PRESSURES_DE',         overlayLabels(sb.PRESSURES, TR.pressures), Object.keys(TR.pressures).length);
if (hasAny(TR.businessAreas))    emit(canvasOut, 'BUSINESS_AREAS_DE',    overlayLabels(sb.BUSINESS_AREAS, TR.businessAreas), Object.keys(TR.businessAreas).length);
if (hasAny(TR.improvementTypes)) emit(canvasOut, 'IMPROVEMENT_TYPES_DE', overlayLabels(sb.IMPROVEMENT_TYPES, TR.improvementTypes), Object.keys(TR.improvementTypes).length);
if (hasAny(TR.stageMeta)) {
  const sm = {}; for (const k of Object.keys(sb.STAGE_META)) sm[k] = TR.stageMeta[k] ? { ...sb.STAGE_META[k], label: TR.stageMeta[k] } : { ...sb.STAGE_META[k] };
  emit(canvasOut, 'STAGE_META_DE', sm, Object.keys(TR.stageMeta).length);
}
if (hasAny(TR.tagTooltips)) {
  const tt = {}; for (const k of Object.keys(sb.TAG_TOOLTIPS)) tt[k] = TR.tagTooltips[k] || sb.TAG_TOOLTIPS[k];
  emit(canvasOut, 'TAG_TOOLTIPS_DE', tt, Object.keys(TR.tagTooltips).length);
}
// Tag display map (EN label → DE) for badge/chip display translation at render.
const tagMap = { ...TR.speedOptions, ...TR.reqOptions, ...TR.impactOptions };
if (hasAny(tagMap)) emit(canvasOut, 'RETAIL_TAG_DE', tagMap, Object.keys(tagMap).length);

// ── roadmap-data-de.js ─────────────────────────────────────────────────────
const roadmapOut = [];
const overlayById = (arr, map, fields) => arr.map(x => {
  const t = map[String(x.id)]; if (!t) return { ...x };
  const o = { ...x }; for (const f of fields) if (t[f] != null) o[f] = t[f]; return o;
});
if (hasAny(TR.roadmapNodes))    emit(roadmapOut, 'ROADMAP_NODES_DE',    overlayById(sb.ROADMAP_NODES, TR.roadmapNodes, ['title','shortRole','executiveWhy','readinessSignals']), Object.keys(TR.roadmapNodes).length);
if (hasAny(TR.roadmapSteps)) {
  // roadmapSteps.stageLabel repeats the STAGE_META label verbatim and IS rendered
  // (roadmap step header). It is not a per-step translation — remap it through
  // the stage translations so it never leaks English.
  const stageDE = {};
  for (const k of Object.keys(sb.STAGE_META || {})) if (TR.stageMeta[k]) stageDE[sb.STAGE_META[k].label] = TR.stageMeta[k];
  const steps = overlayById(sb.ROADMAP_STEPS, TR.roadmapSteps, ['label','executiveQuestion','purpose','typicalOutputs','maturitySignal','avoid'])
    .map(s => (s.stageLabel && stageDE[s.stageLabel]) ? { ...s, stageLabel: stageDE[s.stageLabel] } : s);
  const leaks = steps.filter(s => s.stageLabel && !Object.values(stageDE).includes(s.stageLabel));
  if (leaks.length) console.error(`  !! roadmapSteps: ${leaks.length} stageLabel(s) with no stage translation → EN leak`);
  emit(roadmapOut, 'ROADMAP_STEPS_DE', steps, Object.keys(TR.roadmapSteps).length);
}
if (hasAny(TR.roadmapPathways)) emit(roadmapOut, 'ROADMAP_PATHWAYS_DE', overlayById(sb.ROADMAP_PATHWAYS, TR.roadmapPathways, ['title','executiveUseCase','readinessQuestions','diagnosticNote']), Object.keys(TR.roadmapPathways).length);
if (hasAny(TR.roadmapOptions))  emit(roadmapOut, 'ROADMAP_READINESS_OPTIONS_DE', overlayById(sb.ROADMAP_READINESS_OPTIONS, TR.roadmapOptions, ['label','meaning']), Object.keys(TR.roadmapOptions).length);
if (hasAny(TR.roadmapStates))   emit(roadmapOut, 'ROADMAP_BLOCK_STATES_DE', overlayById(sb.ROADMAP_BLOCK_STATES, TR.roadmapStates, ['label']), Object.keys(TR.roadmapStates).length);

// ── Write data files ───────────────────────────────────────────────────────
const banner = `/* AUTO-GENERATED by scripts/build-de-data.mjs — do not edit by hand.\n   Edit scripts/de-part-*.json + re-run. German first pass, pending native review. */\n`;
writeFileSync(join(root, 'canvas-data-de.js'),  banner + canvasOut.join('\n')  + '\n');
writeFileSync(join(root, 'roadmap-data-de.js'), banner + roadmapOut.join('\n') + '\n');
console.error(`\ncanvas-data-de.js (${canvasOut.length} structures) + roadmap-data-de.js (${roadmapOut.length} structures) written.`);

// ── chrome-de.js (UI labels, keyed by the English string) ──────────────────
const chromeFp = join(here, 'chrome-de.json');
if (existsSync(chromeFp)) {
  const chrome = JSON.parse(readFileSync(chromeFp, 'utf8'));
  writeFileSync(join(root, 'chrome-de.js'),
    `/* AUTO-GENERATED from scripts/chrome-de.json — retail UI labels (German). First pass, pending native review. */\nwindow.RETAIL_CHROME_DE = ${JSON.stringify(chrome, null, 1)};\n`);
  // Cross-check against the Thai table: the two should cover the same key set.
  const thFp = join(here, 'chrome-th.json');
  if (existsSync(thFp)) {
    const th = JSON.parse(readFileSync(thFp, 'utf8'));
    const missing = Object.keys(th).filter(k => !(k in chrome));
    const extra   = Object.keys(chrome).filter(k => !(k in th));
    if (missing.length) console.error(`  !! chrome-de.json: ${missing.length} key(s) present in TH but missing in DE → EN fallback`);
    if (extra.length)   console.error(`  !! chrome-de.json: ${extra.length} key(s) not in the TH table (check they exist in the app)`);
  }
  console.error(`chrome-de.js written (${Object.keys(chrome).length} labels).`);
} else {
  console.error('  (skip chrome-de.js — scripts/chrome-de.json not present)');
}

// ── kktechnologies-profile-data-de.js ─────────────────────────────────────
const profFp = join(here, 'profile-de.json');
if (existsSync(profFp)) {
  const prof = JSON.parse(readFileSync(profFp, 'utf8'));
  writeFileSync(join(root, 'kktechnologies-profile-data-de.js'),
    `/* AUTO-GENERATED from scripts/profile-de.json — retail profile (German). First pass, pending native review. */\nwindow.KKTECH_PROFILE_DE = ${JSON.stringify(prof)};\n`);
  console.error(`kktechnologies-profile-data-de.js written (${Object.keys(prof).length} sections).`);
} else {
  console.error('  (skip kktechnologies-profile-data-de.js — scripts/profile-de.json not present)');
}
