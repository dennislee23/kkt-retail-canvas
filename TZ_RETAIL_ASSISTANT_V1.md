# Retail Canvas — Assistant Pattern Refresh

**Project:** `retail.kittykat.tech` (Retail AI Canvas V3)
**Files involved:**
- `Retail_AI_Canvas_V3.html` — main file, all changes here
- `canvas-data.js` — only `COPILOT_SYSTEM` updated (small append for structured output)
- `roadmap-data.js` — no changes

**Goal:** Replace the legacy floating chat-bubble UX with KKT's contemporary assistant pattern: contextual entry points, side-docked panel with a reasoning side panel, `⌘K` global shortcut, scenario-based prompts, notebook-style conversation rendering.

**Scope (v1):** Visual + UX refresh only. No document drop, no `/ask` URL, no conversation persistence — those are explicitly out of scope and queued for a later iteration.

---

## 1. Current state (audit)

The existing implementation is mostly correct in intent but trapped in 2023 chat-bubble UI conventions. What's there:

| Element | File / Lines | Status |
|---|---|---|
| Floating round button (48×48, `borderRadius:50%`, bottom-right, `◎` icon) | `Retail_AI_Canvas_V3.html` 1513–1516 | **REMOVE** |
| `CopilotPanel` — 380×510 floating bottom-right panel with chat-bubble messages | 1194–1280 | **TRANSFORM** (keep logic, redesign layout) |
| `CopilotNudge` — inline `btn-ghost` style "Ask the retail advisor" links on screens | 271–275 | **KEEP** (already correct pattern) |
| `STARTER_PROMPTS` — 4 starter prompts | 1187–1192 | **REPLACE** with situated scenarios |
| Context passing (`{pressures, domain, play}`) | 1493–1497 | **KEEP** |
| Prefill from card-level "Tell me more about X" buttons | 1174 | **KEEP** |
| `window.claude.complete()` API integration | 1221–1223 | **REPLACE** with real backend `fetch` (see §10) — `window.claude.complete` is a Claude.ai artifacts-only API that does not work in production, and the existing chat is currently a hardcoded mock |
| Welcome message ("I'm here to help you navigate the canvas...") | 1195 | **REPHRASE** to fit new analyst tone |
| Loading indicator (3 dots) | 1251–1255 | **KEEP** style; reposition |

Inline nudges currently exist on these screens (line refs for orientation):
- LandingScreen (line 330)
- QuestionsScreen (line 432)
- RecommendedScreen (line 531)
- DomainScreen (line 1091)

These are good. Add one more in v1:
- SolutionCardPanel — already has the "Tell me more" button (line 1174), which opens copilot with prefill. Keep as is.

---

## 2. What stays (don't touch)

Do not modify any of the following:

- `canvas-data.js` data structures (`DOMAINS`, `STAGE_META`, `PRESSURES`, etc.).
- `roadmap-data.js` entirely.
- The `getRecommendedServices` / `getRecommendedDomains` / `sortPlays` engine functions.
- The 7 screen state machine (`landing`, `questions`, `recommended`, `roadmap`, `domains`, `browse`, `domain`).
- The visual design system: cream palette (`--bg: #F5F3EF` etc.), DM Sans + Playfair, all CSS variables in `:root`, `--accent` theming via TweaksPanel.
- The `CopilotNudge` component and its usage on each screen.
- Context passing: `copilotContext = { pressures, domain, play }`.
- The card-level "Tell me more" button on `SolutionCardPanel` (line 1174).

The refresh is targeted. Anything not explicitly listed in §3 below stays.

---

## 3. Required changes

### 3.1 Remove the floating round button

**File:** `Retail_AI_Canvas_V3.html`
**Lines:** 1513–1516

Delete the entire `<button>` element with `position:fixed; bottom:24px; right:24px; ...; borderRadius:'50%'`. This is the legacy chat-bubble pattern and is the single most important visual change in this refresh.

After deletion, line 1511 (`<CopilotPanel ...>`) sits directly above line 1518 (`<TweaksPanel>`).

### 3.2 Add `⌘K` / `Ctrl+K` global shortcut + header link

**Where:** Inside the `App` component (around line 1449+).

**Behavior:**
- Listen globally for `⌘K` on macOS (`event.metaKey && event.key === 'k'`) and `Ctrl+K` on other platforms (`event.ctrlKey && event.key === 'k'`).
- On match, `event.preventDefault()` and call `setCopilot(c => !c)`.
- Hook is scoped to App level via `useEffect` with `window.addEventListener('keydown', ...)` — clean up on unmount.
- Also escape key (`Escape`) closes the copilot when open. Add this same hook.

**Header link:** Add a small text link in each screen's header next to existing right-side controls. The Wordmark is on the left; existing right-side typically has "Browse all solutions →" or similar.

**Example for LandingScreen header (line 312–317):**

```jsx
<Page header={
  <>
    <Wordmark />
    <div style={{ display:'flex', alignItems:'center', gap:'20px' }}>
      <button onClick={onCopilot} style={{
        fontSize:'12px',
        color:'var(--text-muted)',
        background:'none',
        border:'none',
        cursor:'pointer',
        display:'flex',
        alignItems:'center',
        gap:'6px',
        fontFamily:'DM Sans',
      }}>
        <kbd style={{
          fontSize:'10px',
          fontFamily:'ui-monospace, SFMono-Regular, monospace',
          background:'var(--surface-alt)',
          border:'1px solid var(--border)',
          borderRadius:'3px',
          padding:'1px 5px',
          color:'var(--text-secondary)',
        }}>⌘K</kbd>
        Ask the advisor
      </button>
      <button onClick={onBrowse} style={{ fontSize:'13px', color:'var(--text-secondary)', background:'none', border:'none', cursor:'pointer' }}>
        Browse all solutions →
      </button>
    </div>
  </>
}>
```

Apply the same pattern to all screens that have a header (Landing, Questions, Recommended, Roadmap, Domains, Browse, Domain). The exact right-side controls vary per screen — preserve them, add the `⌘K Ask the advisor` link as the leftmost item in the right group.

For browsers without `⌘`/`Ctrl` (touch devices), the `kbd` chip is still informative and the click handler works fine — no need for special handling.

### 3.3 Transform `CopilotPanel`: side-dock + two-column layout

**File:** `Retail_AI_Canvas_V3.html`, `CopilotPanel` component starting line 1194.

**Before:** 380×510 floating bottom-right panel.
**After:** Right-docked, full-height panel with two columns (transcript + reasoning panel).

**Container:**
```css
position: fixed;
top: 0;
right: 0;
bottom: 0;
width: 720px;          /* desktop default */
max-width: 100vw;      /* mobile */
background: var(--surface);
border-left: 1px solid var(--border);
box-shadow: -16px 0 48px rgba(0, 0, 0, 0.08);
z-index: 40;
display: flex;
flex-direction: column;
```

Animation: slide in from right, ~280ms ease. Use the existing `slideIn` keyframe (line 46) — it already does `translateX(36px)` to `0` with opacity. Increase its translation to `120%` for the larger panel: define a new `slideInPanel` keyframe to avoid breaking other uses of `slideIn`.

```css
@keyframes slideInPanel {
  from { transform: translateX(100%); opacity: 0.4; }
  to   { transform: translateX(0);    opacity: 1;   }
}
.slide-in-panel { animation: slideInPanel .28s cubic-bezier(.32,.72,.32,1) both; }
```

**Inside the panel — two-column layout on desktop:**

```
┌────────────────────────────────────────┐
│ Header: "Retail Advisor" + close (×)   │
├────────────────────────────────────────┤
│                    │                   │
│  Conversation      │  Reasoning panel  │
│  transcript        │                   │
│  ~60% width        │  ~40% width       │
│                    │                   │
│  [scenarios]       │                   │
│  [input]           │                   │
└────────────────────────────────────────┘
```

On viewports narrower than 720px, collapse to single column: transcript fills width, reasoning panel becomes a collapsible section (button `Show reasoning ▾` above the input).

**Desktop layout (≥ 900px):**
- Transcript column: 60% width, `overflow-y: auto`, conversation flows top-to-bottom (oldest at top, newest at bottom — natural reading order).
- Reasoning column: 40% width, `border-left: 1px solid var(--border)`, `background: var(--card)` for subtle differentiation, `overflow-y: auto`.

**Header (top of panel):**
```jsx
<div style={{ padding:'18px 24px', borderBottom:'1px solid var(--border)', display:'flex', justifyContent:'space-between', alignItems:'center', flexShrink:0 }}>
  <div>
    <div style={{ fontSize:'15px', fontWeight:600, color:'var(--text-primary)', fontFamily:'Playfair Display', fontStyle:'italic' }}>
      Retail Advisor
    </div>
    <div style={{ fontSize:'11px', color:'var(--text-muted)', marginTop:'2px', letterSpacing:'.02em' }}>
      Practical · Grounded · Reasoning visible
    </div>
  </div>
  <button onClick={onClose} aria-label="Close advisor" style={{
    background:'none', border:'1px solid var(--border)', borderRadius:'4px',
    color:'var(--text-secondary)', cursor:'pointer', fontSize:'12px',
    padding:'4px 9px', fontFamily:'DM Sans',
    display:'flex', alignItems:'center', gap:'5px',
  }}>
    Close <kbd style={{ fontSize:'10px', opacity:.7 }}>esc</kbd>
  </button>
</div>
```

### 3.4 Add the reasoning panel

**Purpose:** This is the single most important new feature in this refresh. It shows users *what the assistant retrieved from the canvas* to inform its answer — making the AI's reasoning visible and citable.

**Visual structure (right column):**

```jsx
<div style={{
  width:'40%',
  borderLeft:'1px solid var(--border)',
  background:'var(--card)',
  overflowY:'auto',
  padding:'24px 22px',
  display:'flex',
  flexDirection:'column',
  gap:'24px',
}}>
  <div>
    <SectionLabel>What the advisor read</SectionLabel>
    {/* Cards retrieved appear here */}
  </div>
  <div>
    <SectionLabel>Where in the roadmap</SectionLabel>
    {/* Roadmap step appears here */}
  </div>
  <div>
    <SectionLabel>Reasoning summary</SectionLabel>
    {/* 1-2 sentence summary of why these */}
  </div>
</div>
```

`SectionLabel` already exists in the codebase (line 209), reuse it.

**Card item format** in "What the advisor read":
```jsx
<div style={{
  padding:'14px 16px',
  background:'var(--surface)',
  border:'1px solid var(--border)',
  borderRadius:'4px',
  marginBottom:'10px',
  cursor:'pointer',
  transition:'border-color .15s',
}} onClick={() => navigateToCard(cardId)}>
  <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'6px' }}>
    <StageBadge stage={card.stage} />
    <span style={{ fontSize:'10px', color:'var(--text-muted)', letterSpacing:'.05em' }}>{card.domainTitle}</span>
  </div>
  <div style={{ fontSize:'13px', fontWeight:500, color:'var(--text-primary)', lineHeight:1.4 }}>
    {card.title}
  </div>
  <div style={{ fontSize:'11px', color:'var(--accent-text)', marginTop:'8px' }}>
    Open card →
  </div>
</div>
```

When clicked, the card item should:
1. Close the copilot panel (`onClose()`).
2. Navigate to the card via existing app state: `setDomain(card._domain); setPlay(card)`.
   - `App` will need to expose a `goToCard(cardId)` helper that finds the card by id in `_ALL_DOMAINS` (use the existing `findServiceAndDomainById` helper at line 227) and updates state.
   - Pass `goToCard` into `CopilotPanel` as a prop.

**Empty state of reasoning panel** (before any user message):
```jsx
<div style={{ fontSize:'12px', color:'var(--text-muted)', lineHeight:1.6, fontStyle:'italic' }}>
  When you ask a question, this panel will show which canvas cards, roadmap steps, and stage logic informed the advisor's answer. Click any reference to open it.
</div>
```

### 3.5 Get reasoning data from the model: structured output

**File:** `canvas-data.js`, `COPILOT_SYSTEM` (line 1064–1084).

**Append** the following section to `COPILOT_SYSTEM` (do not replace — extend):

```
RESPONSE FORMAT — STRUCTURED OUTPUT

Always respond as valid JSON matching this shape, and nothing else:

{
  "answer": string,                  // your spoken response, plain text, max ~120 words
  "cited_card_ids": string[],        // 0–3 card ids you drew on (e.g. "df-1", "cust-2", "promo-3")
  "cited_roadmap_step": string|null, // one of: "see", "control", "optimize", "scale", "expand"; or null
  "reasoning_summary": string        // 1–2 sentences explaining why these cards/step, max 40 words
}

Rules for structured output:
- Output JSON only. No prose before or after. No code fences.
- Use card ids exactly as they appear in the canvas (df-1, df-2, cust-1, promo-1, stock-2, etc.).
- If your answer doesn't naturally cite specific cards (e.g. an abstract methodological question), return cited_card_ids: [] and a roadmap_step that fits.
- "reasoning_summary" is read by a senior buyer and should be substantive, not "I picked these because they are relevant."
```

**File:** `Retail_AI_Canvas_V3.html`, in the `send` function of `CopilotPanel` (line 1209–1229).

Modify the response handling to parse JSON:

```jsx
const send = async text => {
  if (!text.trim() || loading) return;
  setMsgs(m => [...m, { role: 'user', text }]);
  setInput('');
  setLoading(true);

  try {
    const response = await fetch('https://api.kittykat.tech/v1/retail-advisor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: text,
        context: {
          pressures: context?.pressures || [],
          domain: context?.domain || null,
          play: context?.play || null,
        },
      }),
    });

    if (!response.ok) throw new Error(`Backend returned ${response.status}`);

    const parsed = await response.json();
    // Backend returns { answer, cited_card_ids, cited_roadmap_step, reasoning_summary }
    // (already JSON-parsed and validated server-side — see §10)

    setMsgs(m => [...m, {
      role: 'assistant',
      text: parsed.answer || '',
      reasoning: {
        cardIds: parsed.cited_card_ids || [],
        roadmapStep: parsed.cited_roadmap_step || null,
        summary: parsed.reasoning_summary || '',
      },
    }]);
  } catch (err) {
    setMsgs(m => [...m, {
      role: 'assistant',
      text: err.message?.includes('429')
        ? 'Too many requests right now — please wait a moment and try again.'
        : 'Something went wrong — please try again.',
    }]);
  }
  setLoading(false);
};
```

The backend URL above (`https://api.kittykat.tech/v1/retail-advisor`) is a placeholder — the real URL is set during backend deployment per §10. The frontend code reads it from a constant at the top of the file:

```jsx
// Near the top of <script type="text/babel"> block, alongside other constants
const RETAIL_ADVISOR_API = 'https://api.kittykat.tech/v1/retail-advisor';
```

This makes it trivial to repoint to a different backend (staging vs production, or future migration) without hunting through the file.

The reasoning panel reads from the **most recent assistant message's `reasoning` field**. Resolve `cardIds` to card objects via `findServiceAndDomainById(id)` (existing helper, line 227).

For the roadmap step, look up the step from `_ROADMAP_STEPS` (already in scope, line 95) by `id`.

### 3.6 Replace chat bubbles with notebook-style messages

**File:** `Retail_AI_Canvas_V3.html`, message rendering inside `CopilotPanel` (line 1244–1250).

The existing chat-bubble styling (rounded corners with one corner squared, alternating left/right alignment, dark filled user message, light filled assistant message) is replaced by a notebook-style transcript:

```jsx
<div style={{ display:'flex', flexDirection:'column', gap:'18px' }}>
  {msgs.map((m, i) => (
    <div key={i} style={{
      display:'flex',
      flexDirection:'column',
      gap:'4px',
      paddingLeft: m.role === 'user' ? '0' : '14px',
      borderLeft: m.role === 'assistant' ? '2px solid var(--accent)' : 'none',
    }}>
      <div style={{
        fontSize:'10px',
        textTransform:'uppercase',
        letterSpacing:'.12em',
        color: m.role === 'user' ? 'var(--text-muted)' : 'var(--accent-text)',
        fontWeight:600,
      }}>
        {m.role === 'user' ? 'You' : 'Advisor'}
      </div>
      <div style={{
        fontSize:'14px',
        color:'var(--text-primary)',
        lineHeight:1.7,
        fontWeight: m.role === 'user' ? 500 : 400,
      }}>
        {m.text}
      </div>
    </div>
  ))}
</div>
```

User messages: no border, label "You", slightly heavier weight on body.
Assistant messages: thin amber-accent left border (using `--accent`), label "Advisor", regular weight body, more line-height.

This reads as an analyst's working notebook rather than an iMessage thread. The accent border is the signature visual moment.

### 3.7 Replace `STARTER_PROMPTS` with situated scenarios

**File:** `Retail_AI_Canvas_V3.html`, line 1187–1192.

Replace with:

```js
const STARTER_PROMPTS = [
  '200-store grocery, shrinkage rising 0.4 pts/year — where do I start?',
  'Just acquired 60 stores. No clean master data. What\'s the Stage 1 priority?',
  'BI exists, but management still doesn\'t trust the numbers. What\'s broken?',
  'Loyalty program identifies customers but they\'re not changing behavior. What now?',
];
```

Display them in the empty conversation state (when `msgs.length === 1`) with the existing chip styling at line 1258–1268, but adjust to fit the wider panel:

- Stack them vertically as full-width buttons (not horizontal chips), since the panel is wider and these are longer.
- Use `text-align: left`, regular DM Sans weight 400, color `--text-secondary`.
- Border `1px solid var(--border)`, on hover `--border-hover`.
- Padding `12px 16px`, fontSize `13px`.

```jsx
{msgs.length === 1 && (
  <div style={{ marginTop: '24px', display:'flex', flexDirection:'column', gap:'8px' }}>
    <SectionLabel style={{ marginBottom:'8px' }}>Or start with one of these</SectionLabel>
    {STARTER_PROMPTS.map((p, i) => (
      <button key={i} onClick={() => send(p)}
        style={{
          textAlign: 'left',
          padding: '12px 16px',
          fontSize: '13px',
          color: 'var(--text-secondary)',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '4px',
          cursor: 'pointer',
          fontFamily: 'DM Sans',
          fontWeight: 400,
          lineHeight: 1.5,
          transition: 'border-color .15s, color .15s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'var(--border-hover)';
          e.currentTarget.style.color = 'var(--text-primary)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'var(--border)';
          e.currentTarget.style.color = 'var(--text-secondary)';
        }}>
        {p}
      </button>
    ))}
  </div>
)}
```

### 3.8 Update the welcome message

**File:** `Retail_AI_Canvas_V3.html`, line 1195.

Replace:
> "I'm here to help you navigate the canvas. Ask me about any business pressure, solution area, or where to start. I keep it practical and grounded."

With:
> "I work through retail situations the way our consulting team does — drawing on the 43 cards in this canvas, the staged model, and the roadmap. Ask about a pressure, a domain, or where to start. The right-hand panel shows what I'm reading."

This sets the right expectation and explicitly references the reasoning panel.

### 3.9 Update the input field

**File:** `Retail_AI_Canvas_V3.html`, line 1271–1277.

The bottom input row stays in the transcript column (left 60%). Larger input field, taller button:

```jsx
<div style={{
  padding: '18px 22px',
  borderTop: '1px solid var(--border)',
  display: 'flex',
  gap: '10px',
  flexShrink: 0,
  background: 'var(--surface)',
}}>
  <input ref={inputRef}
    value={input}
    onChange={e => setInput(e.target.value)}
    onKeyDown={e => e.key === 'Enter' && send(input)}
    placeholder="Describe a pressure, ask about a domain, or click a scenario above…"
    style={{
      flex: 1,
      background: 'var(--surface-alt)',
      border: '1px solid var(--border)',
      borderRadius: '4px',
      padding: '12px 14px',
      fontSize: '13px',
      color: 'var(--text-primary)',
      fontFamily: 'DM Sans',
      outline: 'none',
    }} />
  <button onClick={() => send(input)} disabled={!input.trim() || loading}
    style={{
      padding: '12px 22px',
      background: 'var(--text-primary)',
      color: '#FFF',
      border: 'none',
      borderRadius: '4px',
      cursor: input.trim() && !loading ? 'pointer' : 'not-allowed',
      fontSize: '13px',
      fontWeight: 600,
      fontFamily: 'DM Sans',
      opacity: input.trim() && !loading ? 1 : .35,
    }}>
    Ask →
  </button>
</div>
```

---

## 4. Implementation notes

### 4.1 Card lookup pattern

When the assistant returns `cited_card_ids`, resolve them via the existing helper:

```jsx
const citedCards = (msg.reasoning?.cardIds || [])
  .map(id => findServiceAndDomainById(id))
  .filter(Boolean)
  .map(({ play, domain }) => ({ ...play, _domain: domain }));
```

`findServiceAndDomainById` is at line 227 and already returns `{ play, domain }`.

### 4.2 Roadmap step lookup

```jsx
const citedStep = msg.reasoning?.roadmapStep
  ? (_ROADMAP_STEPS || []).find(s => s.id === msg.reasoning.roadmapStep)
  : null;
```

Display in the reasoning panel as: step `label` with its `executiveQuestion` as a small caption below.

### 4.3 Mobile / narrow viewport

Below 720px viewport width: panel takes full width (`width: 100vw`), reasoning column collapses into a sticky-bottom toggle button `Show reasoning ▾` that expands the reasoning panel above the input field. v1 doesn't need to be exquisite on mobile — workable is enough.

### 4.4 Accessibility

- Panel is a modal: `role="dialog"`, `aria-modal="true"`, focus trap inside.
- On open, focus the input automatically.
- On close (`Escape` or close button), return focus to whatever opened the panel (the most recent `CopilotNudge` if available, else `document.body`).
- Keyboard navigation: `Tab` cycles through scenario buttons → input → close button.
- Reasoning panel cards are `role="link"` with `tabindex="0"`, activatable with Enter/Space.

---

## 5. Visual specifications summary

| Property | Value |
|---|---|
| Panel position | Right-docked, full viewport height |
| Panel width (desktop) | 720px |
| Panel width (< 720px viewport) | 100vw |
| Panel background | `var(--surface)` |
| Panel border | `1px solid var(--border)` left edge |
| Panel shadow | `-16px 0 48px rgba(0, 0, 0, 0.08)` |
| Animation | `slideInPanel` 280ms cubic-bezier(.32,.72,.32,1) |
| Transcript column | 60% width, padding 24px |
| Reasoning column | 40% width, `border-left: 1px solid var(--border)`, `background: var(--card)`, padding 24px |
| Message gap | 18px |
| Assistant message left border | `2px solid var(--accent)` (amber #B8832A) |
| Header padding | 18px 24px |
| Header title font | Playfair Display italic 15px / 600 |
| Section labels | reuse `SectionLabel` (existing component, line 209) |
| Cmd+K chip in header | monospace 10px, surface-alt background, 1px border |
| Card item hover | `border-color: var(--border-hover)` |

---

## 6. Out of scope (explicitly NOT in this refresh)

The following are intentionally deferred. Don't implement them in this iteration:

- **Document drop / file upload.** No paperclip, no drop zone. Comes in v2.
- **Stable `/ask` URL.** Conversation state stays component-local. URL routing comes when retail.kittykat.tech adds proper SPA routing.
- **Conversation persistence.** State resets on close. No localStorage.
- **Streaming responses.** Backend returns the full response in a single JSON payload. SSE / streaming requires backend changes and is deferred — for the navigation/recommendation use case here, the latency without streaming is acceptable.
- **Voice input.** Phase 2 of the broader strategy.
- **Conversation export / share.** Deferred.
- **Multi-conversation history.** One active conversation at a time.

---

## 7. Acceptance criteria

The refresh is complete when:

1. ☐ The floating round button at bottom-right is gone. There is no `borderRadius: 50%` element anywhere related to the copilot.
2. ☐ Pressing `⌘K` (macOS) or `Ctrl+K` (Windows/Linux) anywhere on the site opens the copilot. Pressing `Escape` closes it.
3. ☐ Every screen header shows the small `⌘K Ask the advisor` text link in the right-side controls group, alongside any existing right-side controls.
4. ☐ Inline `CopilotNudge` links continue to work on Landing, Questions, Recommended, and Domain screens (no regressions).
5. ☐ The "Tell me more about [card title]" button on the SolutionCardPanel still opens the copilot with the prefilled question.
6. ☐ The opened copilot panel slides in from the right edge, fills the full viewport height, and is 720px wide on desktop.
7. ☐ The panel has two columns on desktop: conversation transcript on the left, reasoning panel on the right.
8. ☐ User messages have label "You" with the accent-amber left border ABSENT. Assistant messages have label "Advisor" with the accent-amber left border PRESENT. No bubbles, no rounded message blobs.
9. ☐ The frontend's `send` function uses `fetch` against the `RETAIL_ADVISOR_API` constant — not `window.claude.complete`. The constant is defined once at the top of the script block.
10. ☐ When the backend returns a valid response, the `answer` appears in the transcript; the `cited_card_ids` populate the reasoning panel as clickable card items; the `cited_roadmap_step` shows in the reasoning panel; the `reasoning_summary` shows in the reasoning panel.
11. ☐ Backend errors (HTTP 4xx, 5xx, network failures) result in graceful inline error messages in the transcript, not silent failures or thrown exceptions.
12. ☐ Clicking any cited card in the reasoning panel closes the copilot and navigates the app to that card's detail panel (`SolutionCardPanel`).
13. ☐ The 4 starter prompts are the new situated scenarios from §3.7.
14. ☐ Below 720px viewport, the panel takes full width; the reasoning panel becomes a togglable section.
15. ☐ The visual treatment uses the existing CSS variables. No hardcoded colors. No new fonts loaded.
16. ☐ No regressions to any non-copilot functionality (diagnostic flow, recommendation engine, roadmap, browse, domain pages, card detail panels, theme tweaker).
17. ☐ Any test stubs intercepting the fetch call have been removed before final delivery. The only remaining call site is the real `fetch` against `RETAIL_ADVISOR_API`.
18. ☐ The new `/v1/retail-advisor` endpoint is deployed to the same backend that powers fuel.kittykat.tech and alfa.kittykat.tech, following the same architectural conventions per §10.
19. ☐ End-to-end test passes: opening retail.kittykat.tech, opening the advisor, sending a question, and receiving a real Claude-generated response with populated reasoning panel — all working without modifications to localhost or DevTools.

---

## 8. Suggested commit structure

If using version control, suggested commit sequence for clean review:

1. `chore: remove legacy floating chat button`
2. `feat(copilot): add Cmd+K shortcut and header link on all screens`
3. `refactor(copilot): replace window.claude.complete with backend fetch + RETAIL_ADVISOR_API constant`
4. `feat(copilot): structured JSON output from system prompt`
5. `feat(copilot): redesign panel as right-docked two-column layout`
6. `feat(copilot): reasoning panel with cited cards and roadmap step`
7. `feat(copilot): notebook-style message rendering`
8. `feat(copilot): situated starter scenarios`
9. `polish: welcome message, input placeholder, error handling, accessibility`

---

## 9. Reference files (for context)

The agent should read these files in full before starting:

- `Retail_AI_Canvas_V3.html` — the entire HTML/JSX source.
- `canvas-data.js` — for `COPILOT_SYSTEM`, `_ALL_DOMAINS`, `findServiceAndDomainById`-target data, `STAGE_META`.
- `roadmap-data.js` — for `ROADMAP_STEPS` (used by the reasoning panel's "Where in the roadmap" section).

No other files are involved in this refresh.

---

## 10. Backend integration

### 10.1 Why this section exists

The existing chat in `Retail_AI_Canvas_V3.html` calls `window.claude.complete(...)` — an API that exists **only inside Claude.ai artifacts** and does not exist on the public web. The current production chat at retail.kittykat.tech is a hardcoded mock; this refresh delivers a real working chat for the first time.

A working chat requires a server-side proxy that holds the Anthropic API key. The frontend cannot call Claude API directly without leaking the key to anyone with browser DevTools.

**Two existing KKT sites already have working Claude API backends:**

- `fuel.kittykat.tech` — Central Asian fuel network deployment of Optimus, with the AI Briefing assistant.
- `alfa.kittykat.tech` — Alfa Oil deployment of Optimus, same architecture.

The agent executing this TZ has prior context on how those backends are built. **Reuse that existing pattern** for retail.kittykat.tech rather than inventing a new architecture. This section describes only the *retail-specific* differences from the existing pattern; everything else (deployment infrastructure, hosting, secrets management, language/framework choices, error logging style, request validation library) should match what already runs on fuel.* and alfa.*.

The agent is therefore responsible for **both** the frontend changes (§3) and adding the new `/v1/retail-advisor` endpoint to the existing backend.

### 10.2 Endpoint contract

**URL:** `POST https://api.kittykat.tech/v1/retail-advisor` (or whatever URL the backend team assigns; the frontend reads this from `RETAIL_ADVISOR_API` constant per §3.5).

**Request body (JSON):**

```json
{
  "message": "200-store grocery, shrinkage rising 0.4 pts/year — where do I start?",
  "context": {
    "pressures": ["margin", "stock"],
    "domain": "Stock & Availability",
    "play": null
  }
}
```

- `message`: string, required, max 2000 chars (server should reject longer with HTTP 400).
- `context.pressures`: array of pressure ids selected in the diagnostic flow, can be empty.
- `context.domain`: string title of the currently viewed domain, or null.
- `context.play`: string title of the currently viewed service card, or null.

**Response body (JSON), HTTP 200:**

```json
{
  "answer": "For a 200-store grocery, the fastest move on rising shrinkage is...",
  "cited_card_ids": ["loss-1", "stock-3"],
  "cited_roadmap_step": "control",
  "reasoning_summary": "Shrinkage at this scale typically responds first to exception-led control on the floor, supported by stock-level visibility — both Stage 1 plays."
}
```

- `answer`: required, string, ~120 words max (per system prompt).
- `cited_card_ids`: array of 0–3 card ids drawn from the canvas. Card ids match those in `canvas-data.js` (`df-1`, `cust-2`, `promo-3`, `stock-4`, etc.).
- `cited_roadmap_step`: one of `"see"`, `"control"`, `"optimize"`, `"scale"`, `"expand"`, or `null`.
- `reasoning_summary`: 1–2 sentences, max 40 words.

**Errors:**

| HTTP | Reason | Frontend behavior |
|---|---|---|
| 400 | Bad request (message empty, too long, malformed JSON) | Show "Something went wrong — please try again." |
| 429 | Rate limit hit | Show "Too many requests right now — please wait a moment and try again." |
| 5xx | Backend or upstream error | Show "Something went wrong — please try again." |

### 10.3 Backend implementation requirements

The new endpoint extends the existing fuel.*/alfa.* backend. **Match the existing pattern** for everything not listed below. The retail-specific adaptations are:

1. **Anonymous public endpoint.** Unlike the operator endpoints powering Optimus on fuel.* and alfa.* (which sit behind authenticated customer portals), `/v1/retail-advisor` is anonymous. Anyone visiting retail.kittykat.tech can use the chat without logging in. Auth middleware on this route should be disabled or skipped explicitly.

2. **System prompt = `COPILOT_SYSTEM`** from `canvas-data.js` (lines 1064–1084 of the original file, plus the JSON-output appendix added per §3.5 of this TZ). This is the **retail advisor voice** — different from the operator-mode prompt powering Optimus on fuel.*/alfa.*. They are different personas for different audiences. Keep them as separate prompt constants, do not merge.

3. **Model: Claude Sonnet 4.6.** Adequate quality for navigation/recommendation use case, low latency, lower cost than Opus. (Whatever model is currently used by the Optimus AI Briefing on fuel.*/alfa.* may differ — that decision was made for that voice. Retail advisor is its own decision and Sonnet 4.6 is the right pick here.)

4. **Structured output enforcement.** The system prompt asks for JSON output. The backend parses and validates the model's response server-side before returning to the client:
    - Strip accidental code fences (` ```json `).
    - `JSON.parse` the result.
    - Validate shape against a schema (`answer` is string, `cited_card_ids` is array of strings, `cited_roadmap_step` is one of the allowed values or null, etc.).
    - If validation fails, retry once with a stricter "respond ONLY with valid JSON, no preamble" instruction; on second failure, return `{ answer: <raw model output>, cited_card_ids: [], cited_roadmap_step: null, reasoning_summary: '' }` so the frontend still gets *something* useful.
    - This shields the frontend from model formatting glitches.

5. **Rate limiting per IP:** 10 requests per minute per IP, sliding window. Return HTTP 429 with `Retry-After` header on hit. The endpoint is public, abuse protection is mandatory. Reuse whatever rate-limit infrastructure already exists on fuel.*/alfa.* — the operator endpoints likely have request limits already, lift the same approach.

6. **CORS:** allow `Origin: https://retail.kittykat.tech` (and during development, `http://localhost:*` if needed for local frontend testing). Methods: `POST, OPTIONS`. Headers: `Content-Type`. No credentials.

7. **Zero Data Retention.** The user's `message` and `context` must NOT be written to backend logs, NOT stored in any database, NOT persisted to disk. Pass to Claude API with the appropriate ZDR configuration. The fuel.*/alfa.* backends already enforce this for operator data — same posture, same enforcement. Verify the workspace and API key have ZDR enabled for the new endpoint too.

8. **Timeout:** 25 seconds upstream timeout to Claude API. If exceeded, return HTTP 504. In practice Sonnet should respond in under 5 seconds for this prompt size.

9. **Logging:** counts and latencies are fine to log (number of requests, p50/p95 latency, error rates per type, model token counts for cost tracking). User content is not.

If anything in this list contradicts how it's already done on fuel.*/alfa.* — flag it explicitly in the delivery message and propose alignment, rather than silently diverging.

### 10.4 Implementation sequencing

Frontend and backend changes can be developed in parallel by the same agent in one work session:

1. **Backend extension first** — add the new public `/v1/retail-advisor` endpoint to the existing fuel.*/alfa.* backend. Reuse existing patterns (auth scaffolding, rate limiting, ZDR config, error format). Test with `curl` against the running backend.
2. **Frontend changes** per §3 of this TZ. Until step 1 is deployed, the frontend's `fetch` call will fail in production — but every other change in this TZ (UX layout, reasoning panel, scenarios, Cmd+K) can be visually verified locally with a temporary stubbed response.
3. **Wire up.** Once both are ready, set the `RETAIL_ADVISOR_API` constant to the real backend URL, deploy backend, deploy frontend.
4. **FTP frontend to retail.kittykat.tech.** Production go-live.

### 10.5 What this means for the agent

The agent doing this work owns **both halves**: the frontend per §3 and the new backend endpoint per §10.

For the backend half, the agent should:
- Inspect the existing fuel.kittykat.tech and alfa.kittykat.tech backend code first.
- Identify the file/route structure where existing AI endpoints (Optimus AI Briefing, etc.) are registered.
- Add `/v1/retail-advisor` as a new route in the same place, following the same structural conventions.
- Adapt only what §10.3 calls out as retail-specific. Don't restyle code that's working.
- Deploy the new endpoint to whatever environment fuel.*/alfa.* currently deploy to.

For the frontend half, the agent codes the `fetch` call against the contract in §10.2 and uses a temporary stub during local testing for visual verification. **All stubs must be removed before final delivery.**

If the agent finds that fuel.*/alfa.* don't share a single backend (e.g. each has its own deployment), pick whichever is more appropriate for hosting a public anonymous endpoint, and flag the choice in the delivery message.
