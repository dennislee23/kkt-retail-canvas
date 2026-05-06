# Capability roadmap

Five progression steps:
- `see`
- `control`
- `optimize`
- `scale`
- `expand`

Use these step ids exactly. If no roadmap step fits, return `null`.

Important:
- This is **not** a calendar timeline.
- It is a progression model.
- The purpose is to explain what must come first, what depends on what, and what becomes realistic later.

## Steps

### `see` — See

Stage: Strengthen Core Operations.

Executive question: What must become visible before we choose where to act?

Purpose: Create a common factual base and reveal value leakage.

Maturity signal: Leaders can see the same problem, from the same numbers, early enough to act.

Avoid: Building a broad platform before the first business questions are clear.

### `control` — Control

Stage: Strengthen Core Operations.

Executive question: What needs ownership, rules, and response before optimization?

Purpose: Improve consistency, exception handling, and management response.

Maturity signal: Teams can act on visible issues before they become margin, stock, customer, or cost damage.

Avoid: Treating dashboards as value delivery when nobody owns the action.

### `optimize` — Optimize

Stage: Optimize and Grow.

Executive question: What decisions can now be improved with better analytics?

Purpose: Use forecasting, segmentation, scenario logic, and decision support to improve economics.

Maturity signal: Analytics change decisions before outcomes are locked in.

Avoid: Jumping to advanced models before the business trusts inputs and controls exceptions.

### `scale` — Scale

Stage: Optimize and Grow.

Executive question: What can become a repeatable operating routine?

Purpose: Embed better decisions into recurring work and reduce manual dependence.

Maturity signal: Better decisions are used repeatedly across teams, not only in one-off analysis.

Avoid: Scaling a process before the operating model works in a focused area.

### `expand` — Expand

Stage: Expand and Monetize.

Executive question: Which optional new value pools become realistic later?

Purpose: Use stronger customer access, supplier relevance, and operating intelligence as strategic assets.

Maturity signal: New revenue plays are supported by trusted measurement, customer access, and operating capacity.

Avoid: Presenting strategic expansion as the default next step for every retailer.

## Capability nodes

### `trusted-retail-facts` (see)

Trusted retail facts — Create one reliable view of the numbers leaders use to decide.

Why it matters: Without trusted numbers, later optimization only speeds up disagreement.

Related card ids: `df-1`, `df-2`, `rep-1`, `margin-1`

### `margin-stock-waste-visibility` (see)

Margin, stock, and waste visibility — Show where stock, waste, margin, and working capital are creating hidden economic pressure.

Why it matters: A large share of practical value often starts with seeing where stock, waste, and margin leak value.

Depends on: `trusted-retail-facts`

Related card ids: `stock-3`, `stock-4`, `margin-1`, `margin-4`

### `customer-market-signal-visibility` (see)

Customer and market signal visibility — Make customer behavior, feedback, market movement, and promotion response visible before heavier optimization.

Why it matters: Commercial optimization needs real signals about customers, campaigns, competitors, and stores.

Related card ids: `cust-1`, `cust-4`, `promo-1`, `promo-5`

### `supplier-inbound-visibility` (see)

Supplier and inbound visibility — Show where supplier service, claims, funding, inbound risk, and category dependency affect value.

Why it matters: Supplier value is often fragmented across buying, finance, supply chain, and stores.

Related card ids: `sup-1`, `sup-2`, `sup-3`, `promo-1`

### `warehouse-transport-visibility` (see)

Warehouse and transport visibility — Make warehouse flow, dispatch quality, inbound friction, route execution, and delivery risk visible before trying to optimize the network.

Why it matters: Stock issues often look like forecasting problems when the real issue sits in warehouse or transport execution.

Related card ids: `wt-1`, `wt-2`, `wt-3`, `stock-2`

### `exception-led-control` (control)

Exception-led operating control — Move from seeing issues to routing the right exceptions to the right owners quickly.

Why it matters: Dashboards do not create value unless the organization can act on exceptions reliably.

Depends on: `trusted-retail-facts`

Related card ids: `rep-2`, `store-1`, `store-2`, `stock-4`

### `stock-freshness-availability-control` (control)

Stock, freshness, and availability control — Control availability, waste, replenishment exceptions, and fresh risk before more autonomous replenishment.

Why it matters: Optimization in stock and fresh only works when the business can first control the basic exceptions.

Depends on: `margin-stock-waste-visibility`

Related card ids: `stock-1`, `stock-2`, `stock-3`, `stock-4`

### `warehouse-transport-control` (control)

Warehouse and transport control — Control stock accuracy, warehouse flow, loading quality, route exceptions, and delivery discipline before treating logistics as an optimization problem only.

Why it matters: WMS/TMS value depends on stronger execution control, not just better planning screens.

Depends on: `warehouse-transport-visibility`, `exception-led-control`

Related card ids: `wt-1`, `wt-2`, `wt-3`

### `supplier-value-control` (control)

Supplier value control — Control supplier-side value leakage across service, claims, disputes, funding, and joint planning.

Why it matters: Supplier funding, claims, and service issues become controllable only when they stop being scattered.

Depends on: `supplier-inbound-visibility`

Related card ids: `sup-1`, `sup-2`, `sup-3`, `wai-6`

### `risk-loss-compliance-control` (control)

Risk, loss, and compliance control — Control transaction abuse, shrinkage, stock loss, legal/compliance support, and HR risk before expanding automation.

Why it matters: AI support in risk-sensitive areas should increase discipline and review quality, not create uncontrolled answers.

Related card ids: `lp-1`, `lp-2`, `wai-2`, `wai-3`

### `commercial-optimization` (optimize)

Commercial optimization — Improve promotions, pricing, markdowns, assortment choices, and commercial allocation using better evidence.

Why it matters: This is often one of the larger Stage 2 value pools because it directly affects margin quality and growth.

Depends on: `trusted-retail-facts`, `customer-market-signal-visibility`, `exception-led-control`

Related card ids: `promo-1`, `promo-2`, `promo-3`, `promo-4`, `cust-1`, `margin-1`

### `customer-value-growth` (optimize)

Customer value growth — Improve customer targeting, retention, basket growth, loyalty economics, and service intelligence.

Why it matters: Customer growth becomes more profitable when the retailer knows which customers to protect, grow, or reactivate.

Depends on: `customer-market-signal-visibility`

Related card ids: `cust-1`, `cust-2`, `cust-3`, `cust-4`, `promo-2`, `wai-5`

### `forecast-planning-replenishment-quality` (optimize)

Forecast-led planning and replenishment quality — Use forecasting, event planning, replenishment logic, labor planning, and rolling financial views to improve forward decisions.

Why it matters: Forward-looking analytics are valuable only when they change decisions before outcomes are locked in.

Depends on: `stock-freshness-availability-control`, `warehouse-transport-control`

Related card ids: `stock-1`, `stock-2`, `store-4`, `margin-2`, `margin-4`, `wt-3`

### `scenario-led-decisions` (scale)

Scenario-led decisions — Make major choices testable before they are scaled across stores, categories, suppliers, or customer groups.

Why it matters: Scenario discipline helps leaders avoid scaling decisions that do not hold up economically.

Depends on: `trusted-retail-facts`, `commercial-optimization`, `forecast-planning-replenishment-quality`

Related card ids: `margin-3`, `margin-2`, `promo-3`, `stock-2`

### `controlled-assistant-operating-model` (scale)

Controlled assistant operating model — Embed AI assistants and agents into daily work with approved knowledge, review rules, and escalation boundaries.

Why it matters: Assistants scale productivity only when they are attached to controlled sources and business processes.

Depends on: `trusted-retail-facts`, `exception-led-control`, `risk-loss-compliance-control`

Related card ids: `wai-1`, `wai-2`, `wai-3`, `wai-4`, `wai-5`, `wai-6`, `rep-2`

### `store-field-execution-scale` (scale)

Store and field execution at scale — Make operating routines, field tasks, shelf checks, labor planning, and issue escalation consistent across the network.

Why it matters: Retail improvements scale only when store execution follows the plan closely enough for decisions to reach customers.

Depends on: `exception-led-control`

Related card ids: `store-1`, `store-2`, `store-3`, `store-4`, `wai-4`

### `supplier-monetization-options` (expand)

Supplier monetization options — Use supplier relevance, campaign measurement, customer attention, and category insight to create controlled supplier-funded value pools.

Why it matters: Supplier monetization should start where the retailer already has credible attention, supplier demand, and measurement discipline.

Depends on: `supplier-value-control`, `commercial-optimization`

Related card ids: `em-1`, `em-2`, `em-3`, `sup-3`, `promo-1`

### `customer-ownership-monetization` (expand)

Customer ownership monetization — Use stronger customer access and loyalty economics to test paid benefits, partner offers, and lifecycle value pools.

Why it matters: Customer monetization becomes realistic only when the retailer understands what customers value.

Depends on: `customer-value-growth`

Related card ids: `em-4`, `em-5`, `cust-1`, `cust-2`, `cust-3`

### `selective-platform-partnership-models` (expand)

Selective platform and partnership models — Evaluate broader platform, marketplace, embedded finance, fulfillment, or data collaboration ideas only where maturity and demand justify them.

Why it matters: Platform-style bets should be selective, evidence-led, and disciplined.

Depends on: `scenario-led-decisions`, `customer-ownership-monetization`

Related card ids: `em-6`, `margin-3`, `em-5`, `df-1`
