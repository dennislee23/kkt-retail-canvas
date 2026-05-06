# Canvas service catalog

The Retail AI Canvas defines 43 services across 11 domains and 3 stages.
Each service has a stable id (e.g. `df-1`, `cust-2`, `lp-1`). When citing a
service in a response, use the exact id below — never invent or paraphrase ids.

## Data Foundation

Stage: Strengthen Core Operations.

### `df-1` — One Trusted Retail Data Foundation

Strengthen Core Operations · Scoped Project · High Requirements · $$$ · Scalable Foundation, Decision Speed

**One-liner:** Connect POS, ERP, loyalty, stock, supplier, finance, and master data into one trusted base for retail decisions.

**Business problem:** Retail teams often have the data they need somewhere, but not in a form they can use together. Fresh availability sits in one place, promotional activity in another, loyalty behavior somewhere else, supplier claims in finance, and product hierarchies differ across systems. The result is slow analysis, repeated reconciliation, inconsistent answers, and business decisions made from partial views.

**What we do:** Connect the highest-priority retail data sources into one governed data layer designed around real business questions, not technical completeness. Clean and align the shared master data it depends on: products, stores, suppliers, customers, categories, pricing, stock, and finance references. Start with the data needed for the first priority use cases, then extend the layer as more decisions depend on it.

**Helps improve:** Trusted reporting, faster analytics delivery, cleaner base for forecasting, pricing, segmentation, supplier control, store execution, and AI, and less repeated rebuilding of the same logic for every new initiative.

**Data and analytics behind it:** Connects POS, ERP, loyalty, stock, supplier, finance, product, store, and customer data into one reusable business layer. The analytics reconcile core retail entities, detect missing or conflicting records, and make the same product, store, supplier, and customer visible consistently across systems. This gives every future dashboard, forecast, campaign model, replenishment tool, or AI assistant a cleaner base to work from.

**Diagnostic questions:**
- Can a product, store, supplier, and customer be matched consistently across POS, ERP, loyalty, stock, and finance?
- How much time is spent reconciling data before management meetings rather than acting on it?
- Which major decision today suffers most because the required data sits across disconnected systems?

### `df-2` — One Version of Key Numbers

Strengthen Core Operations · Scoped Project · Moderate Requirements · $$ · Scalable Foundation, Control & Visibility

**One-liner:** Define the key retail metrics once and make business owners accountable for the data areas behind them.

**Business problem:** Metrics like margin, availability, waste, promo ROI, shrinkage, and supplier service often mean different things to different teams. Even when reports exist, people debate the calculation before they debate the decision. Key data areas such as product, supplier, store, customer, pricing, and stock also lack clear business ownership, so quality problems repeat across projects.

**What we do:** Define the most important retail KPIs once, in business language, with agreed calculation logic. Connect those definitions to reporting, dashboards, alerts, and analytics outputs so the same logic is reused rather than rebuilt. Assign clear business ownership for key data areas and introduce practical quality checks that catch problems before they reach decisions.

**Helps improve:** Less debate over numbers, faster management decisions, clearer accountability for data quality, stronger self-service reporting, and a more reliable base for AI-assisted analysis.

**Data and analytics behind it:** Connects KPI definitions, calculation logic, source data, business owners, and quality checks into one controlled operating layer. The analytics show when a number is calculated differently, when critical data is missing or stale, and who owns the fix. This turns data quality from a recurring project complaint into a visible management process.

**Diagnostic questions:**
- Is there a single agreed definition of your most important KPIs that all teams calculate the same way?
- When a data quality problem surfaces, is there a named business owner expected to resolve it?
- Do data quality issues tend to get fixed permanently, or do they reappear in every new analytics project?

### `df-3` — Data Input and Document Processing

Strengthen Core Operations · Quick Start · Light Requirements · $ · Productivity, Control & Visibility

**One-liner:** Turn supplier files, invoices, contracts, forms, emails, photos, and spreadsheets into usable, validated business data.

**Business problem:** Retail data often enters the business through messy channels: PDF invoices, supplier price lists, product files, contracts, delivery notes, store audit forms, photos, emails, WhatsApp messages, and manual spreadsheets. Teams spend time copying, checking, reformatting, and chasing information before it can be used. Errors at this stage quietly affect stock, pricing, claims, master data, supplier settlement, and reporting.

**What we do:** Automate high-volume data intake and document processing where manual handling creates delay, errors, or hidden cost. Extract key fields, validate them against business rules, flag exceptions, and route items to the right owner for approval or correction. Start with one or two painful document flows, then expand once the validation logic and ownership model are working.

**Helps improve:** Manual processing effort, data accuracy, supplier file handling, invoice and claim evidence capture, product data quality, speed of administrative workflows, and the reliability of downstream reporting and analytics.

**Data and analytics behind it:** Connects documents, forms, emails, images, spreadsheets, master data, purchase orders, invoices, delivery records, contracts, and approval workflows. AI extracts and classifies information, while validation rules check whether fields are complete, consistent, and plausible. The workflow sends clean records forward automatically and routes exceptions to people only when judgement or correction is needed.

**Diagnostic questions:**
- Which recurring documents or files consume the most manual processing time today?
- Where do data-entry errors create downstream problems in pricing, stock, supplier claims, invoices, or reporting?
- Are document exceptions routed to clear owners, or do they sit in email chains and spreadsheets?

## Customers & Loyalty

Stage: Optimize and Grow.

### `cust-1` — Customer Segmentation and Value Targeting

Optimize and Grow · Scoped Project · Moderate Requirements · $$ · Customer Growth

**One-liner:** Segment customers by behavior, value, basket, and response so campaigns target the groups worth growing.

**Business problem:** Too many customers receive the same offers despite very different habits, needs, value, and future potential. Marketing budget works harder for some groups than others, but without clear segmentation and value prioritization the business cannot tell where to invest, where to protect relationships, and where it is simply funding low-return discounting.

**What we do:** Segment customers by behavior, visit frequency, spend, margin contribution, basket composition, category attachment, lifecycle stage, and promotional response. Link those segments to differentiated offer logic, channel, and timing. Define which customers should be protected, grown, reactivated, developed into broader missions, or excluded from costly campaigns.

**Helps improve:** Campaign relevance, conversion rates, marketing ROI, customer profitability, reduction in wasted discounting, and stronger commercial use of loyalty data.

**Data and analytics behind it:** Connects loyalty transactions, visit frequency, basket behavior, category breadth, customer value, margin contribution, and campaign response to show how customer groups actually differ. The analytics turn those differences into usable commercial segments and help CRM, loyalty, and campaign teams decide who should receive which offer, through which channel, and with what expected return.

**Diagnostic questions:**
- Do you currently treat customers differently based on purchase behavior and value, or does most promotional activity go to everyone?
- Can campaign response be tracked back to individual customers and segments?
- Do you know which customers are worth investing in versus which customers mainly receive discounts they would have bought without?

### `cust-2` — Retention, Churn Prevention and Win-Back

Optimize and Grow · Scoped Project · Moderate Requirements · $$ · Customer Growth

**One-liner:** Detect customers cooling off early and trigger targeted win-back actions before they are fully lost.

**Business problem:** Customers drift before they disappear. They visit less often, buy fewer categories, reduce basket value, and stop responding to campaigns. The business usually notices after they are already lost, when recovery is harder, more expensive, and less likely to work.

**What we do:** Detect early behavioral signals that indicate a customer is cooling off: declining visit frequency, narrowing category breadth, falling basket value, and reduced promo response. Score which customers are worth recovering and what intervention is most likely to work. Support automated win-back campaigns and loyalty triggers while the customer is still reachable.

**Helps improve:** Customer retention, recovered visit frequency, lower reactivation cost, protection of high-value relationships, and stronger loyalty program economics.

**Data and analytics behind it:** Connects changes in visit frequency, basket value, category breadth, and campaign response to detect when a customer is disengaging. The analytics prioritize at-risk customers by value and likely response, then help trigger the right win-back action through CRM, app, loyalty, email, or service workflows before the customer is fully lost.

**Diagnostic questions:**
- Can you identify customers who are visiting less frequently before they stop entirely?
- Do you have a defined behavior that automatically triggers a retention or win-back action?
- Is your loyalty program designed to respond to disengagement, or mainly to reward customers who are already active?

### `cust-3` — Basket Growth and Loyalty Economics

Optimize and Grow · Scoped Project · Moderate Requirements · $$$ · Customer Growth, Margin & Cash

**One-liner:** Use basket patterns and loyalty economics to grow visits, category trial, and personalized next-best offers.

**Business problem:** A large share of growth can come from existing shoppers buying more, buying across more categories, or responding to more relevant offers. But loyalty programs often rely on generic discounts that reward customers who would have bought anyway. Basket potential stays uncaptured because offer logic is not personalized and reward economics are not clearly measured.

**What we do:** Analyze basket composition, category adjacency, purchase patterns, and loyalty response to identify which products and categories naturally travel together for which customer groups. Redesign offer, reward, and contact logic to drive specific behaviors such as visit frequency, category trial, basket growth, and repeat purchase. Deploy personalized next-best-offer logic across app, loyalty, email, and in-store touchpoints.

**Helps improve:** Average basket value, category attachment, repeat purchase frequency, loyalty program ROI, marketing budget efficiency, and reduction in blanket discounting.

**Data and analytics behind it:** Connects basket contents, product affinities, category relationships, loyalty behavior, offer uptake, reward cost, and customer response to show where existing shoppers can grow profitably. The analytics identify which combinations drive incremental behavior, which rewards change purchase decisions, and which personalized offers should be sent through each channel.

**Diagnostic questions:**
- Do you know which product combinations most reliably grow basket size for specific customer groups?
- Is your loyalty program optimized around behavior goals such as visits, categories, basket size, and repeat purchase?
- Can you measure the incremental value your loyalty program creates versus what customers would have bought anyway?

### `cust-4` — Customer Feedback and Service Intelligence

Optimize and Grow · Quick Start · Light Requirements · $ · Customer Growth, Control & Visibility

**One-liner:** Turn scattered feedback and service contacts into clear themes, satisfaction drivers, routed cases, and action workflows.

**Business problem:** Customer feedback arrives through surveys, app reviews, complaints, social channels, call centers, WhatsApp, and support messages. It is often scattered, processed too slowly, and rarely connected to the operational teams that can fix the root cause. Good customers can leave without the business understanding the repeated issues that pushed them away.

**What we do:** Aggregate feedback and service contacts from active channels into one structured view. Use AI to classify by theme, store, category, sentiment, severity, and likely cause. Route recurring issues to the teams that can act on them. For routine inquiries and standard complaints, introduce AI-assisted response drafting or controlled automation so human service teams focus on cases that require judgment.

**Helps improve:** Customer satisfaction, speed of issue resolution, retention of at-risk customers, prioritization of operational fixes, and productivity of service teams.

**Data and analytics behind it:** Connects surveys, complaints, app reviews, support messages, loyalty records, customer profiles, and store context into one structured view of customer voice. The analytics group feedback by theme, store, category, sentiment, severity, and likely operational cause, then route repeated issues to the right teams. AI can draft standard responses, summarize complaint history, and prepare escalation context for human agents.

**Diagnostic questions:**
- Is customer feedback from app, surveys, complaints, social channels, and service contacts consolidated into one view today?
- How quickly does a recurring complaint become visible to the team that can act on it?
- Do you know which operational issues, such as availability, checkout wait, freshness, or store cleanliness, most strongly drive dissatisfaction?

## Promotions & Pricing

Stage: Optimize and Grow.

### `promo-1` — Promotion Performance and Campaign Intelligence

Optimize and Grow · Quick Start · Moderate Requirements · $$ · Margin & Cash

**One-liner:** Separate promotions that create real incremental value from campaigns that mainly subsidize existing demand.

**Business problem:** Promotions drive volume but not always value. Too many campaigns discount demand that would have happened anyway, and without clear performance measurement the same mechanics get repeated regardless of whether they created real incremental return. Supplier funding and trade spend can also be judged on activity delivered rather than value created.

**What we do:** Evaluate campaigns against uplift, margin effect, mix shift, cannibalization, post-promo dip, store cluster performance, customer segment response, and supplier funding. Build a learning base so the business knows which mechanics work in which categories, for which customer groups, in which store clusters, and at which times of year. Make that intelligence available before the next campaign is planned.

**Helps improve:** Promotion ROI, margin protection, reduction in wasted discounting, stronger trade spend discipline, and confidence in what to repeat, redesign, or stop.

**Data and analytics behind it:** Connects promotion spend, supplier funding, rebates, campaign mechanics, POS results, customer response, store cluster performance, category margin, and post-promo behavior to show which commercial investments actually pay back. The analytics separate genuine incremental uplift from subsidized demand, compare mechanics across categories and segments, and turn past campaigns into evidence for the next planning cycle.

**Diagnostic questions:**
- Can you distinguish which promotions drove genuinely incremental sales versus demand that would have happened anyway?
- Do commercial teams review campaign performance by customer segment and store cluster before repeating the same mechanic?
- Is supplier-funded activity evaluated on sell-out, margin, and incremental response, or mainly on funding secured and volume delivered?

### `promo-2` — Targeted Campaign and Offer Planning

Optimize and Grow · Scoped Project · Moderate Requirements · $$ · Customer Growth, Margin & Cash

**One-liner:** Plan campaigns by customer segment, store profile, category role, and timing instead of running one broad approach.

**Business problem:** Many promotional calendars are built around category rotation, supplier negotiation, and commercial habit rather than customer behavior and demand signals. Campaigns go too broadly, at the wrong time, with the wrong mechanic, spending budget on customers who do not need the incentive and missing the ones who do.

**What we do:** Shape campaigns by customer segment, store profile, category role, and seasonal demand rather than applying one approach everywhere. Match mechanics such as discount depth, bundle, multi-buy, loyalty reward, or personalized offer to the behavior the business wants to drive. Build a more disciplined campaign planning process with clearer expected return before budget is committed.

**Helps improve:** Campaign conversion, marketing budget efficiency, offer relevance by segment and store, reduction in blanket discounting, and stronger connection between customer data and commercial planning.

**Data and analytics behind it:** Connects customer segments, store clusters, category roles, purchase missions, promotional calendars, and historical response to guide who should receive which offer and when. The analytics estimate response by segment and mechanic, highlight where broad campaigns are likely to waste margin, and help commercial teams brief campaigns with clearer targeting logic and expected outcomes.

**Diagnostic questions:**
- Do different customer groups or store clusters currently receive differentiated promotion mechanics?
- Is your promotion calendar built around customer and store behavior data, or mainly around category rotation and supplier funding cycles?
- Can you estimate the likely financial outcome of a planned campaign before it runs?

### `promo-3` — Price Decisions and Competitor Response

Optimize and Grow · Scoped Project · High Requirements · $$$ · Margin & Cash

**One-liner:** Use price sensitivity, cost changes, and competitor signals to respond faster without giving away margin.

**Business problem:** Slow price response costs margin and traffic. The business often does not know which products are true price battlegrounds and which are relatively price-insensitive, so it either overreacts across the full range or misses competitive pressure where it matters. Supplier cost changes and competitor moves translate into pricing decisions too slowly.

**What we do:** Identify which products customers are most price-sensitive about and which carry little pricing risk. Monitor competitor pricing, supplier cost changes, and demand signals. Feed that intelligence into pricing decisions that protect value perception without giving away unnecessary margin or reacting too late where it matters most.

**Helps improve:** Pricing discipline, margin protection, competitive responsiveness, customer price perception, and speed of response to cost and market pressure.

**Data and analytics behind it:** Connects SKU prices, category margin, demand response, competitor prices, supplier cost changes, and store cluster behavior to show where price moves are commercially sensitive. The analytics distinguish key value items from lower-risk range, estimate the margin and volume trade-off of price changes, and trigger review when competitor or supplier movements require action.

**Diagnostic questions:**
- Do you know which products customers use most to judge your price position?
- How quickly does a competitor price change or supplier cost increase translate into a pricing decision?
- Can you model the likely margin and volume impact of a price move before making it?

### `promo-4` — Markdown, Clearance and Range Optimization

Optimize and Grow · Quick Start · Moderate Requirements · $$ · Margin & Cash

**One-liner:** Flag weak sell-through and range complexity early enough to recover value before markdowns become waste.

**Business problem:** Late markdowns destroy value in fresh, seasonal, and slow-moving categories. At the same time, SKU proliferation quietly erodes margin and operational capacity. Space and commercial attention can go to products that do not justify it, while stronger performers are under-invested.

**What we do:** Flag stock moving toward expiry, poor rotation, or sell-through failure early enough for intervention to recover value. Guide markdown timing and depth based on demand pace, margin recovery, and freshness or aging risk. Analyze category, range, and SKU productivity across sales, margin, stock turns, basket role, and local demand to identify where complexity is not paying back.

**Helps improve:** Sell-through, waste reduction, markdown recovery, assortment discipline, category margin, and reduction in operational complexity from weak SKUs.

**Data and analytics behind it:** Connects sell-through rates, stock age, shelf-life, margin, markdown response, category role, basket contribution, and store-level demand to show which products need action and when. The analytics recommend earlier markdowns where value can still be recovered and highlight SKUs that create complexity without enough sales, margin, or customer role to justify the space.

**Diagnostic questions:**
- Are markdowns triggered by systematic rules or mainly by store judgment after the issue is already visible?
- Do you know which SKUs create operational and margin complexity without enough commercial return?
- Is range performance reviewed with sales, margin, stock turns, and basket role together, or mainly through sales volume?

### `promo-5` — Competitive and Market Intelligence

Optimize and Grow · Quick Start · Moderate Requirements · $$ · Control & Visibility

**One-liner:** Track competitor prices, promotions, range moves, and market signals so commercial teams are not reacting from memory.

**Business problem:** Competitor moves affect price perception, promotional pressure, customer traffic, and category expectations. But market intelligence is often informal: store visits, screenshots, buyer memory, supplier comments, and late reactions after the market has already moved. The business lacks a systematic view of competitor pricing, promotions, range changes, new launches, and consumer signals.

**What we do:** Create a structured competitive and market monitoring process across priority competitors, categories, prices, promotions, range, and external signals. Turn scattered observations into comparable intelligence that commercial teams can use in pricing, campaign planning, assortment review, and supplier conversations. Focus on the categories and competitors that actually influence customer choice and margin exposure.

**Helps improve:** Competitive responsiveness, pricing confidence, promotion planning, range decisions, supplier negotiation quality, and leadership visibility into market movement.

**Data and analytics behind it:** Connects competitor price checks, promotional observations, online range data, store audits, supplier market input, public news, and consumer trend signals into one structured view. The analytics highlight material changes, compare competitor positions by category and product, and summarize market movement so commercial teams can respond deliberately rather than relying on anecdote or delayed discovery.

**Diagnostic questions:**
- How do commercial teams currently track competitor prices, promotions, and range changes?
- Which competitor moves materially change your pricing, promotional, or range decisions?
- Is market intelligence captured in a reusable system, or does it mostly live in buyer memory and ad hoc files?

## Stock & Availability

Stage: Strengthen Core Operations.

### `stock-1` — Demand Forecasting and Event Planning

Strengthen Core Operations · Scoped Project · Moderate Requirements · $$$ · Control & Visibility

**One-liner:** Forecast demand by SKU, store, and period while accounting for seasons, promotions, events, and local demand shifts.

**Business problem:** Ordering decisions still rely too heavily on fixed rules, historical averages, and planner intuition. Demand shifts with seasons, holidays, promotions, weather, local events, and competitor activity, but planning methods often do not keep up. Commercial and supply teams can also work from different demand expectations for the same event.

**What we do:** Build demand forecasts by SKU, store, and time period that incorporate sales history, seasonality, promotional uplift, local events, weather effects, and trend signals. Connect commercial calendars to supply planning so promotions and seasonal peaks are prepared before demand arrives. Make the forecast the default input into replenishment, not a separate analytical exercise.

**Helps improve:** Ordering accuracy, fewer stockouts and overstocks, better preparation for seasonal and promotional peaks, and stronger alignment between commercial and supply teams.

**Data and analytics behind it:** Connects historical sales, stock positions, promotional calendars, seasonal patterns, local events, weather, store clusters, and commercial plans to forecast demand at the level where ordering decisions are made. The analytics learn from forecast errors, separate normal seasonality from exceptional events, and feed expected demand into replenishment and supply preparation before peaks arrive.

**Diagnostic questions:**
- Are replenishment decisions driven by demand forecasts or mainly by fixed rules and historical order patterns?
- Does your current planning method account for promotional uplift, weather, local events, and store-level differences?
- Are commercial and supply teams working from the same demand picture when planning major events?

### `stock-2` — Replenishment and Availability Protection

Strengthen Core Operations · Scoped Project · Moderate Requirements · $$$ · Control & Visibility

**One-liner:** Improve ordering logic and detect stockout risk early enough to protect availability before customers feel it.

**Business problem:** Even with reasonable demand estimates, ordering quality suffers because supplier constraints, pack sizes, lead times, order cycles, and delivery calendars force the business into excess or shortage. Stockouts are often discovered after customers have already felt them, even though signals existed earlier in demand pace, cover, and replenishment timing.

**What we do:** Combine forecasts with supplier constraints, lead times, pack sizes, delivery frequency, and store behavior to improve replenishment logic. Adapt rules by product type, store profile, and supplier rather than applying one method everywhere. Surface stockout risk early and prioritize the items where availability matters most. Where the control environment is mature, routine ordering can progress toward autonomous replenishment with human review only for exceptions.

**Helps improve:** Order quality, on-shelf availability, reduced excess caused by ordering constraints, planner productivity, and better use of supplier relationships to resolve recurring constraint problems.

**Data and analytics behind it:** Connects forecasts, current cover, lead times, supplier delivery calendars, pack sizes, minimum order quantities, store demand, and commercial priority to recommend better orders and flag availability risk. The analytics show where constraints force avoidable inventory build, where stockouts are likely before the next delivery, and which exceptions need planner or supplier intervention. AI agents can later execute routine orders within agreed rules and escalate only unusual cases.

**Diagnostic questions:**
- Do minimum order quantities or pack sizes regularly force you to carry more stock than demand justifies?
- Can you identify a product approaching stockout before it actually runs out on the shelf?
- How much planner time goes into routine order building versus managing real exceptions?

### `stock-3` — Inventory Health and Cash Release

Strengthen Core Operations · Quick Start · Moderate Requirements · $$ · Margin & Cash, Control & Visibility

**One-liner:** Identify overstock, slow movers, aging stock, and frozen cash before they become markdown or write-off problems.

**Business problem:** Excess stock builds quietly across thousands of SKUs before anyone notices it has become a cash or margin problem. By the time it appears in a financial report, recovery options are narrower. At the same time, the business lacks a clear view of where inventory is genuinely protecting service versus where cash is trapped in non-productive stock.

**What we do:** Build continuous inventory health signals across cover, aging, rotation, and stock build-up by SKU, store, and category. Separate healthy buffer stock from inventory that is accumulating without sufficient demand. Show where cash can be released through smarter stock policies without damaging availability elsewhere.

**Helps improve:** Working capital efficiency, inventory productivity, cash discipline, earlier identification of stock health problems, and better balance between service protection and cost.

**Data and analytics behind it:** Connects stock depth, sales velocity, cover days, aging, rotation, forecast demand, category role, and store profile to show where inventory is productive and where it is tying up cash. The analytics prioritize exceptions by value at risk, identify slow-moving and over-protected stock, and model where stock policies can be adjusted without creating service damage.

**Diagnostic questions:**
- Do you have a live view of products accumulating excess stock before they become markdown or write-off problems?
- How much safety stock is genuinely protecting service versus sitting because parameters were never updated?
- Is inventory reviewed as a working-capital issue as well as a supply issue?

### `stock-4` — Freshness and Waste Control

Strengthen Core Operations · Quick Start · Moderate Requirements · $$ · Margin & Cash, Control & Visibility

**One-liner:** Track shelf-life risk and slow sell-through early enough to guide markdowns, transfers, and order changes.

**Business problem:** In fresh and perishable categories, margin consequences compound quickly. Late markdowns destroy value, poor ordering creates waste, and manual routines cannot track freshness risk across hundreds of SKUs. Food waste is also a regulatory, ESG, and customer trust issue, not only a financial write-off.

**What we do:** Track freshness, shelf-life risk, and sell-through velocity before value is already gone. Trigger earlier markdowns, order adjustments, transfers, or store actions for at-risk stock based on remaining shelf life and demand pace. Improve ordering precision in fresh categories so the business reduces waste at the source rather than only managing it downstream.

**Helps improve:** Fresh waste reduction, sell-through, markdown recovery, fresh margin protection, food safety visibility, and ESG reporting on food waste.

**Data and analytics behind it:** Connects goods-received dates, shelf-life rules, sell-through pace, stock position, waste records, markdown history, store conditions, and demand signals to identify fresh risk while action is still possible. The analytics recommend earlier intervention, show root causes by SKU and store, and connect waste patterns back to ordering, display, pricing, and demand forecasting.

**Diagnostic questions:**
- Are markdowns in fresh categories triggered by shelf-life and sell-through rules, or mainly by store judgment?
- Do you know which fresh categories create the most waste and whether the cause is ordering, display, pricing, or demand?
- Is food waste tracked as an accountable business KPI, or mainly visible as a write-off after the fact?

## Store Execution

Stage: Strengthen Core Operations.

### `store-1` — Store Execution Control

Strengthen Core Operations · Quick Start · Moderate Requirements · $$ · Control & Visibility

**One-liner:** Build a network-wide view of where stores are drifting from standards and where management attention matters most.

**Business problem:** Plans only create value when stores execute them consistently. Promotional, shelf, pricing, freshness, and compliance standards vary across the network, head office finds out too late, and management time is absorbed chasing execution rather than improving it. The business often sees the sales consequence before it sees the execution failure.

**What we do:** Build a continuous view of execution performance by store, region, and issue type using task completion, audit findings, sales signals, and compliance checks. Define the most important standards and make deviations visible, comparable, and prioritized. Help management focus on the stores where drift is commercially significant rather than spreading attention evenly.

**Helps improve:** Execution consistency, faster identification of underperforming stores, better use of management and field attention, and stronger connection between head office plans and store reality.

**Data and analytics behind it:** Connects task completion, audit results, compliance checks, store performance, promotional execution, sales anomalies, and issue history into a network-wide execution view. The analytics benchmark stores against relevant peers, distinguish isolated misses from repeated drift, and prioritize the execution gaps most likely to affect sales, margin, availability, or compliance.

**Diagnostic questions:**
- Do you have an objective view of which stores are meeting execution standards and which are drifting?
- How does head office currently find out about execution failure: audit, sales data, field visit, or complaint?
- Is management attention directed by the biggest execution gaps or mainly by geography and habit?

### `store-2` — Field Tasks and Issue Escalation

Strengthen Core Operations · Quick Start · Light Requirements · $$ · Productivity, Control & Visibility

**One-liner:** Turn store and field tasks into owned workflows with deadlines, evidence, escalation, status, and closure.

**Business problem:** Store and field tasks such as promotions, freshness routines, compliance checks, and merchandising often fail because ownership is unclear, completion is invisible, and follow-up happens through calls and messages. Issues that should be resolved locally drift upward slowly, and recurring problems repeat across sites without anyone connecting the pattern.

**What we do:** Convert key store and field tasks into structured workflows with ownership, deadlines, evidence requirements, completion confirmation, and exception handling. Give field teams a consistent mobile-first way to log visits, capture photos, record findings, and raise issues. Make missed or incomplete actions visible to supervisors early enough to intervene.

**Helps improve:** Task completion reliability, field team accountability, supervisor visibility, reduced manual chasing, faster escalation, and stronger connection between field activity and management action.

**Data and analytics behind it:** Connects task plans, visit logs, geotags, timestamps, photo evidence, issue categories, completion records, and escalation status into one operating workflow. The analytics show what was done, what was missed, which issues recur across stores, and whether actions moved from insight to owner, action, status, and outcome.

**Diagnostic questions:**
- Can you see which store tasks were completed, by whom, and when across the network?
- When the same issue appears in multiple stores, how quickly does that pattern become visible?
- Do field visits feed management through structured data and workflow, or through informal reporting?

### `store-3` — Shelf, Price Label and Planogram Checks

Strengthen Core Operations · Scoped Project · High Requirements · $$$ · Control & Visibility

**One-liner:** Detect shelf gaps, planogram deviations, wrong placements, and price label issues faster than manual audits alone.

**Business problem:** Shelf gaps, wrong placements, missing price labels, and planogram deviations cost sales and erode customer trust. Manual audits cover only a fraction of the estate at any point in time. Some expensive shelf failures are invisible to stock systems because inventory records show stock available even when the shelf is empty.

**What we do:** Use computer vision and sales pattern analytics together to detect shelf problems faster than audit cycles alone. CV-based monitoring can identify shelf gaps, planogram deviations, and price label issues where camera infrastructure exists. Sales anomaly detection provides a complementary signal when products sell far below expected pattern. Route confirmed issues into store task workflows.

**Helps improve:** On-shelf availability, planogram compliance, price label accuracy, faster detection of execution failures, and reduction in lost sales from shelf gaps or phantom stock.

**Data and analytics behind it:** Connects shelf images, planograms, price label references, SKU-store sales patterns, stock records, promotional calendars, and peer-store comparisons to identify likely shelf execution failures. The analytics combine what cameras can see with what sales behavior suggests, then route confirmed issues to store teams for physical correction.

**Diagnostic questions:**
- How do you currently detect shelf gaps or planogram deviations: audit, complaint, camera, or sales data?
- Do stock records ever show product available while the shelf is actually empty?
- Is shelf compliance monitored continuously or dependent on audit frequency and store discipline?

### `store-4` — Labor Planning and Productivity

Strengthen Core Operations · Scoped Project · Moderate Requirements · $$$ · Productivity, Margin & Cash

**One-liner:** Align staffing to traffic, transactions, deliveries, and task pressure instead of relying on fixed rota templates.

**Business problem:** Labor is one of the largest controllable cost lines in food retail, yet scheduling it well remains difficult. Stores can be overstaffed in quiet hours and understaffed during peaks. Rotas are built on habit, overtime creeps up, and productivity gaps across the network are not visible early enough.

**What we do:** Align staffing to real store demand by combining traffic, transactions, delivery schedules, and operational workload into a clear picture of hourly and daily workforce need. Replace fixed rota templates with demand-driven scheduling logic. Make labor productivity visible across stores, departments, and time windows, and build early warning around overtime and absence patterns.

**Helps improve:** Labor cost efficiency, service quality during peaks, reduced avoidable overtime, store manager time, and network-wide productivity visibility.

**Data and analytics behind it:** Connects footfall, transactions, basket volumes, delivery schedules, task workload, opening hours, absence, overtime, and labor hours to show where staffing matches demand and where it does not. The analytics forecast workload by time window, compare productivity across similar stores, and flag structural overtime or absence patterns before they become embedded cost.

**Diagnostic questions:**
- Is shift scheduling built around actual demand signals or fixed templates adjusted by manager judgment?
- Can you compare labor productivity across stores, departments, and time windows?
- Are overtime and absence problems visible as patterns early enough to address the cause?

## Margin & Cash

Stage: Strengthen Core Operations.

### `margin-1` — Margin Visibility and Profitability Analytics

Strengthen Core Operations · Quick Start · Moderate Requirements · $$ · Margin & Cash

**One-liner:** Show where margin is made or lost across stores, categories, suppliers, campaigns, and trading periods.

**Business problem:** Most food retailers can see total sales well enough. What they cannot see clearly or early enough is where margin is being made, where it is eroding, and which combination of commercial decisions, supplier terms, promotional activity, waste, and operating costs is driving the movement. By month-end, many corrective options are already gone.

**What we do:** Build a granular, forward-leaning margin view across store, category, supplier, campaign, and trading period. Bring together price realization, discounting, markdowns, supplier funding, waste, shrinkage, and cost pressure so leadership can see where margin is changing while there is still room to respond.

**Helps improve:** Earlier identification of margin pressure, clearer management focus, faster corrective action, and stronger connection between commercial decisions and financial consequences.

**Data and analytics behind it:** Connects price realization, discounting, markdowns, supplier funding, waste, shrinkage, product cost, and operating cost inputs across stores, categories, suppliers, and campaigns. The analytics decompose margin movement by driver so leadership can see whether the issue is pricing, promo mechanics, supplier terms, cost inflation, waste, or execution before the period is closed.

**Diagnostic questions:**
- Can you see margin by category, store, supplier, and campaign continuously, or mainly at month-end?
- When margin changes, can you quickly identify the driver: price, discounting, waste, supplier terms, or cost?
- Is there one view connecting commercial activity and operating choices to margin consequence?

### `margin-2` — Rolling Financial Forecasting

Strengthen Core Operations · Scoped Project · High Requirements · $$$ · Margin & Cash, Decision Speed

**One-liner:** Turn current trading signals and known plans into a rolling view of where profit and cash are heading.

**Business problem:** Retail leadership should not wait until month-end to understand how current trading is likely to land financially. Static budgets and backward-looking actuals explain what happened, but they do not give enough lead time to steer. The financial view is often behind the trading reality.

**What we do:** Build a rolling financial forecast that updates as sales pace, margin trajectory, promotional commitments, stock movements, supplier terms, and cost assumptions shift. Make forecast movement explainable so leadership can understand what changed, why it changed, and what action is still possible.

**Helps improve:** Forecast quality, earlier visibility into financial risk, stronger preparation for corrective action, leadership confidence in the forward picture, and better use of finance team time.

**Data and analytics behind it:** Connects current sales pace, promotional plans, margin movement, cost changes, stock commitments, supplier terms, and payment patterns into a continuously updating forward view. The analytics translate live trading signals into expected profit and cash outcomes, explain forecast movement in business terms, and reduce the manual assembly work that delays finance updates.

**Diagnostic questions:**
- Does leadership have a forward-looking financial view that updates as trading develops?
- When the forecast changes, can you explain quickly which driver caused the movement?
- How much finance time goes into assembling the forecast versus interpreting it and improving decisions?

### `margin-3` — Decision Scenarios Before Committing

Strengthen Core Operations · Strategic Build · High Requirements · $$$$ · Margin & Cash, Decision Speed

**One-liner:** Compare the financial consequences of major commercial and operating choices before leadership commits.

**Business problem:** Major decisions such as pricing moves, promotional investments, assortment changes, supplier negotiations, stock policy shifts, and cost programs involve financial trade-offs that are difficult to evaluate quickly. Leadership often makes these choices on instinct because credible scenarios take too long to build inside the decision window.

**What we do:** Make scenario modeling fast enough to support the decision rather than justify it afterward. Connect commercial and operating choices to their likely P&L, cash, and risk consequences. Compare options side by side and flag commercially attractive plans that do not hold up economically before they are scaled.

**Helps improve:** Quality of major decisions, reduction in financially weak choices, stronger leadership challenge, better connection between trading plans and financial reality, and clearer trade-off management.

**Data and analytics behind it:** Connects pricing moves, campaign commitments, supplier negotiations, assortment choices, stock policies, labor changes, and cost assumptions to their likely margin, cash, and risk outcomes. The analytics compare scenarios side by side, expose hidden trade-offs, and make financial challenge visible before decisions are locked in.

**Diagnostic questions:**
- Can you model the financial consequence of a major price, promo, supplier, or stock decision before it is made?
- Are growth plans regularly challenged on cash and margin impact before approval?
- How long does it take to build a credible scenario, and is that fast enough for the decision window?

### `margin-4` — Working Capital and Cost Efficiency

Strengthen Core Operations · Scoped Project · Moderate Requirements · $$ · Margin & Cash

**One-liner:** Show where cash and cost are being absorbed through stock, payments, labor, energy, waste, and logistics.

**Business problem:** Cash and cost pressure in food retail comes from many operating decisions: stock levels, payment terms, markdown timing, promotional inventory commitments, labor, energy, logistics, and waste. These decisions are often managed separately, so working capital drifts and cost improvement efforts spread too thin to create material impact.

**What we do:** Translate operating decisions into a working capital and cost view. Show where cash is absorbed through inventory build, payment timing, and trading commitments. Benchmark major cost drivers across stores, formats, and categories to separate avoidable inefficiency from genuine market pressure. Help leadership prioritize the highest-return improvement opportunities.

**Helps improve:** Working capital discipline, cash flow visibility, cost control, earlier identification of liquidity pressure, and better integration of cash consequences into commercial and operating decisions.

**Data and analytics behind it:** Connects stock depth, supplier payment terms, markdown commitments, promotional inventory, accounts payable, accounts receivable, labor hours, energy, waste, and logistics costs. The analytics show where cash is trapped, where cost is above what trading volume and store profile justify, and where improvement effort is likely to release the most value.

**Diagnostic questions:**
- Is working capital actively managed as a lever or mainly visible as a balance sheet line?
- Do commercial and supply teams understand the cash consequence of stock and supplier decisions when they make them?
- Can you identify which stores or categories have costs above what their trading profile should justify?

## Supplier Performance

Stage: Strengthen Core Operations.

### `sup-1` — Supplier Performance and Inbound Risk

Strengthen Core Operations · Scoped Project · Moderate Requirements · $$ · Control & Visibility

**One-liner:** Build a consistent view of supplier reliability and detect inbound risk before stores feel the failure.

**Business problem:** Supplier performance affects availability, fresh quality, promotional reliability, and what customers find on the shelf. But many retailers manage supplier performance reactively. Problems surface through store complaints, short shipments, late deliveries, substitutions, and availability gaps rather than through systematic monitoring that catches patterns early.

**What we do:** Build a comparable view of supplier performance across fill rate, on-time delivery, quality consistency, substitution rates, short shipments, lead time variability, and claims responsiveness. Separate isolated misses from chronic underperformance. Flag supplier and SKU combinations that are drifting toward service failure before availability is affected.

**Helps improve:** Supplier accountability, inbound reliability, earlier detection of recurring problems, fewer availability failures caused by supplier-side issues, and stronger factual basis for supplier reviews.

**Data and analytics behind it:** Connects purchase orders, order confirmations, delivery records, goods receipt data, quality checks, short shipments, substitutions, lead time variability, and claims history across the supplier base. The analytics distinguish one-off failures from structural underperformance, rank suppliers by service and commercial risk, and trigger early alerts when patterns suggest inbound disruption.

**Diagnostic questions:**
- Do you have a consistent view of supplier fill rate, delivery reliability, and quality across the supplier base?
- Can you identify a supplier drifting toward delivery failure before it hits availability?
- Are safety stock and contingency plans adjusted based on current supplier reliability signals?

### `sup-2` — Claims, Disputes and Value Recovery

Strengthen Core Operations · Scoped Project · Moderate Requirements · $$ · Margin & Cash

**One-liner:** Turn supplier claims and disputes into a structured recovery process that captures what the business is owed.

**Business problem:** Claims, invoice discrepancies, short shipments, quality rejections, agreed deductions, and unresolved disputes consume significant manual effort. Money that should be recovered from suppliers sits open for weeks or months. Some value is never recovered because follow-up is too slow, too manual, and too dependent on individual memory.

**What we do:** Structure the claims and dispute process from capture to evidence, follow-up, escalation, and recovery. Automate document extraction and matching where possible so claims are raised faster and with better support. Make open claims, aging disputes, and recovery progress visible to finance and buying teams in one place.

**Helps improve:** Claims recovery rate, dispute resolution speed, reduction in manual chasing, visibility of open supplier-side value, and protection of margin from supplier-driven leakage.

**Data and analytics behind it:** Connects purchase orders, delivery notes, goods receipt records, invoices, quality inspection results, supplier terms, credit notes, and communication history to identify discrepancies and build claim evidence. The analytics track open claims by supplier, age, value, and status, flag stalled recovery, and show where repeated claims point to a structural supplier problem.

**Diagnostic questions:**
- Do you have a clear view of total open supplier claims by supplier, age, value, and status?
- How much finance and buying time goes into manually chasing and assembling claim evidence?
- Are there suppliers or claim types where recovery is consistently below what was agreed?

### `sup-3` — Supplier Funding and Joint Planning

Strengthen Core Operations · Scoped Project · Moderate Requirements · $$$ · Margin & Cash, Control & Visibility

**One-liner:** Track agreed supplier support, segment key relationships, and focus joint planning where it creates real return.

**Business problem:** Supplier value extends beyond product cost. Promotional support, rebates, listing fees, agreed deductions, service commitments, and co-investment all form part of the relationship. But this value is often tracked inconsistently, captured incompletely, and not compared clearly against what was agreed. Management time can also be spread across the full supply base instead of focused where it creates most return.

**What we do:** Map what has been agreed with each supplier and compare it against what has actually been received, recovered, or delivered. Segment suppliers by commercial scale, dependency, substitutability, service risk, and strategic potential. Define which suppliers need tighter performance management, which need joint planning, and which can be managed efficiently at arm's length.

**Helps improve:** Supplier commercial value capture, rebate and trade fund recovery, contract compliance visibility, prioritization of supplier management effort, stronger resilience, and more productive joint planning.

**Data and analytics behind it:** Connects supplier contracts, funding terms, rebates, promotional commitments, received payments, service history, category importance, substitutability, and commercial dependency. The analytics show where supplier value is falling short of agreement, where concentration risk is highest, and which relationships deserve deeper joint planning on promotions, seasons, availability, and category development.

**Diagnostic questions:**
- Do you have a complete view of agreed supplier funding, rebates, and co-investment commitments?
- Is supplier management intensity based on value, risk, dependency, and strategic potential, or mainly on habit?
- Where supplier concentration creates resilience risk, is that risk quantified and actively managed?

## Reporting & Decisions

Stage: Strengthen Core Operations.

### `rep-1` — Management Reports and Performance Views

Strengthen Core Operations · Quick Start · Moderate Requirements · $$ · Decision Speed, Control & Visibility

**One-liner:** Give every management level one trusted KPI view, automated packs, and comparable performance diagnostics.

**Business problem:** Monday meetings start with debating which spreadsheet is right. Different teams produce different answers because metrics are calculated differently across systems and reporting cycles. Management packs take too long to assemble, and store or category comparisons are hard to interpret because structural differences are mixed with genuine underperformance.

**What we do:** Define the core KPIs management actually uses and build a consistent reporting layer so those numbers refresh automatically. Deliver the right level of detail to each management tier: executive summary, regional and category views, store and supply chain detail. Add benchmarking logic so similar stores, categories, and regions can be compared in a way that distinguishes genuine performance gaps from structural differences.

**Helps improve:** Trust in numbers, reduced reconciliation time, faster management discussion, automated reporting cycles, better targeting of management attention, and clearer performance conversations.

**Data and analytics behind it:** Connects POS, ERP, stock, finance, loyalty, supplier, labor, waste, and store execution data through agreed KPI definitions and automated reporting views. The analytics refresh recurring packs, normalize performance against store format and trading context, identify where similar stores differ materially, and show whether gaps come from labor, margin, waste, availability, execution, or category mix.

**Diagnostic questions:**
- Do different teams produce different answers to the same question, such as margin, availability, or waste?
- Can you compare store performance in a way that separates genuine underperformance from format, location, or trading-area differences?
- When a store underperforms peers, do you have a diagnostic starting point or does the investigation begin from scratch?

### `rep-2` — Alerts and Plain-Language Answers

Strengthen Core Operations · Scoped Project · Moderate Requirements · $$$ · Decision Speed

**One-liner:** Surface the exceptions that need action and let managers ask trusted business questions without waiting for an analyst.

**Business problem:** Retail leaders do not need to read everything every day, but most reporting presents everything at equal weight. Important exceptions are buried in dashboards or discovered late. At the same time, managers repeatedly ask similar questions about waste, stock, stores, promotions, suppliers, and margin, but must wait for analysts or search through reports to answer them.

**What we do:** Define the exceptions that genuinely deserve attention across sales, stock, margin, waste, supplier performance, labor, and store execution. Route alerts to the right owner with clear priority and context. Provide self-service and conversational access to trusted business data so managers can investigate routine questions during the decision window. Where useful, connect operating documents and process knowledge so the same assistant can answer practical "what do I do next" questions.

**Helps improve:** Management focus, earlier intervention, reduced reporting noise, fewer analyst bottlenecks, faster response to trading issues, and wider use of trusted data across the business.

**Data and analytics behind it:** Connects trusted KPI definitions, operational data, alert thresholds, anomaly detection, ownership rules, and self-service query logic. The analytics distinguish real exceptions from normal variation, prioritize them by commercial impact, and route them to the right person. Natural language access lets managers ask business questions against governed data and documented processes without creating inconsistent spreadsheet answers.

**Diagnostic questions:**
- Do dashboards clearly signal where attention is required, or do they present everything at equal weight?
- How quickly does a material exception reach the person who can act on it?
- How long does it take a manager to get an answer to a specific question that is not already in a standard report?

## Loss Prevention

Stage: Strengthen Core Operations.

### `lp-1` — Checkout Fraud and Transaction Abuse

Strengthen Core Operations · Quick Start · Moderate Requirements · $$ · Risk & Loss Reduction

**One-liner:** Monitor refunds, voids, discounts, loyalty activity, cashier behavior, and self-checkout patterns for suspicious abuse.

**Business problem:** Suspicious activity at checkout often looks like normal retail noise: refunds, voids, discounts, overrides, loyalty adjustments, no-sales, and self-checkout exceptions. Manual spot checks cannot detect repeated low-value patterns across stores, shifts, cashiers, and customer accounts. By the time the pattern is obvious, value has already leaked.

**What we do:** Monitor transaction patterns continuously by cashier, store, shift, customer account, payment type, and exception type. Separate normal operating variation from patterns that deserve investigation. Prioritize cases by likelihood and value at risk so audit and control teams focus on meaningful patterns rather than reviewing large volumes of low-value noise.

**Helps improve:** Fraud and abuse detection speed, shrinkage reduction, control team productivity, earlier intervention, and stronger protection of margin from internal and external leakage.

**Data and analytics behind it:** Connects POS transaction lines, refunds, voids, discounts, overrides, no-sales, loyalty events, self-checkout exceptions, cashier IDs, store context, shift patterns, and historical investigation outcomes. The analytics compare behavior against normal baselines, flag unusual combinations, rank cases by value at risk, and prepare evidence packs for review.

**Diagnostic questions:**
- Do you monitor refund, discount, void, override, and loyalty patterns by cashier, store, and shift?
- How much investigation time goes into cases that turn out to be low value or normal variation?
- Can suspicious self-checkout or loyalty activity be linked back to transaction and customer behavior?

### `lp-2` — Shrinkage and Stock Loss Control

Strengthen Core Operations · Scoped Project · Moderate Requirements · $$ · Risk & Loss Reduction, Margin & Cash

**One-liner:** Detect unusual stock adjustments, unexplained losses, and shrinkage patterns by store, category, and process.

**Business problem:** Shrinkage is often visible only as a total write-off after the underlying patterns have built up. Stock adjustments, unexplained losses, inventory mismatches, admin errors, waste misclassification, and store-level process failures can all sit inside the same number. Without pattern detection, the business struggles to distinguish theft, waste, process error, supplier issue, and recording failure.

**What we do:** Analyze shrinkage and stock adjustment patterns by store, category, SKU, time period, process step, and peer-store comparison. Identify unusual loss patterns that sit outside normal trading reality and route them for investigation or operational correction. Separate likely causes so loss prevention, operations, finance, and supplier teams know which type of action is required.

**Helps improve:** Shrinkage visibility, investigation focus, stock control, margin protection, process discipline, and earlier detection of recurring loss patterns.

**Data and analytics behind it:** Connects stock records, inventory counts, adjustments, waste logs, sales patterns, goods receipts, transfers, write-offs, store context, and peer comparisons to show where stock loss is unusual. The analytics separate probable causes, identify recurring patterns by store and category, and help route issues to loss prevention, store operations, finance, or supplier control depending on the evidence.

**Diagnostic questions:**
- Is shrinkage analyzed by likely cause, or does it mostly appear as one undifferentiated write-off figure?
- Can you identify stores or categories where stock loss is out of line with normal trading reality?
- Are stock adjustments and inventory mismatches monitored continuously or mainly reviewed after periodic counts?

## Workforce & AI Assistants

Stage: Strengthen Core Operations.

### `wai-1` — AI Office, Meeting and CRM Assistants

Strengthen Core Operations · Quick Start · Light Requirements · $ · Productivity, Decision Speed

**One-liner:** Capture meetings, extract tasks, draft updates, prepare CRM notes, and reduce routine office administration.

**Business problem:** Retail managers and head-office teams lose time to meeting notes, follow-up messages, CRM updates, weekly summaries, action tracking, and routine document drafting. Important decisions and tasks often remain buried in calls, emails, chats, and personal notes. The issue is not lack of work ethic; it is that too much coordination still depends on manual capture and memory.

**What we do:** Set up practical AI assistants for everyday management work:
- meeting transcription, summaries, decisions, tasks, owners, and deadlines;
- CRM and customer-contact notes, follow-up drafts, and call summaries;
- weekly update drafts, action trackers, and management note preparation;
- routine email, memo, presentation, and report drafting under company style rules.

**Helps improve:** Management productivity, follow-up discipline, meeting effectiveness, CRM hygiene, communication speed, and reduction in low-value administrative effort.

**Data and analytics behind it:** Connects meeting transcripts, calendars, emails, CRM notes, documents, task lists, and company templates. AI summarizes discussions, extracts structured actions, drafts follow-ups, and prepares updates in the agreed company style. Human review remains in control, but the first draft and task capture no longer start from a blank page.

**Diagnostic questions:**
- How much management time is spent writing notes, follow-ups, summaries, and CRM updates?
- Do meeting decisions reliably turn into visible tasks with owners and deadlines?
- Which recurring office tasks could be assisted safely with AI without changing core systems?

### `wai-2` — Legal, Contract and Compliance Assistant

Strengthen Core Operations · Quick Start · Light Requirements · $ · Risk & Loss Reduction, Productivity

**One-liner:** Support legal, contract, policy, and compliance work with AI review, drafting, comparison, and issue spotting.

**Business problem:** Legal and compliance work often sits across supplier contracts, lease documents, employment policies, promotional terms, food safety rules, privacy requirements, and internal procedures. Teams spend time reading long documents, comparing clauses, checking whether wording follows company standards, and preparing first drafts. Delays create risk, but full legal review capacity is usually limited.

**What we do:** Create a controlled assistant that supports legal and compliance teams without replacing professional judgement:
- review and summarize legal documents;
- draft standard clauses, letters, policy updates, and contract comments using company guidelines;
- compare supplier terms, lease clauses, and contract versions;
- flag missing clauses, unusual terms, policy conflicts, and items needing legal approval;
- help prepare compliance checklists and evidence packs.

**Helps improve:** Legal team productivity, contract review speed, consistency of standard wording, earlier risk spotting, and better preparation before specialist legal review.

**Data and analytics behind it:** Connects contract templates, company policies, approved clause libraries, supplier terms, regulatory guidance, previous legal comments, and document versions. AI compares wording, identifies deviations from standards, drafts controlled text, and highlights issues for human review. The assistant should be configured with approval boundaries because legal responsibility remains with the company and qualified reviewers.

**Diagnostic questions:**
- Which legal or compliance documents are reviewed repeatedly with similar checks?
- Do teams have approved templates and clause standards that AI can follow?
- Where do contract or policy delays create business risk or slow commercial execution?

### `wai-3` — HR, Recruitment and Onboarding Assistant

Strengthen Core Operations · Quick Start · Light Requirements · $ · Productivity

**One-liner:** Support recruitment, onboarding, policy Q&A, training content, and employee communication with AI.

**Business problem:** Retail HR teams handle high-volume recruitment, onboarding, policy questions, training materials, schedule communication, and employee documentation. Store managers often repeat the same explanations to new staff, while candidates and employees wait for basic information. This slows hiring, onboarding, and daily workforce support.

**What we do:** Set up HR assistants for practical workforce tasks:
- screen and summarize candidate applications against agreed role criteria;
- draft job descriptions, interview questions, and candidate communications;
- answer employee questions from approved policies and onboarding materials;
- create training summaries, checklists, and store-ready learning content;
- support manager communication around absence, rota changes, and basic HR processes.

**Helps improve:** Recruitment speed, onboarding consistency, HR team capacity, manager productivity, employee self-service, and quality of standard workforce communication.

**Data and analytics behind it:** Connects job descriptions, candidate CVs, HR policies, onboarding guides, training content, FAQs, and communication templates. AI summarizes applications, drafts communications, answers policy questions from approved sources, and highlights cases that require HR judgement. The workflow should include bias, privacy, and approval controls for recruitment and employee-related use.

**Diagnostic questions:**
- Which HR questions and onboarding steps are repeated most often across stores?
- How much hiring or onboarding time is spent on standard communication and document preparation?
- Are HR policies and training materials organized well enough for an assistant to answer from approved sources?

### `wai-4` — Internal Knowledge and Store Operations Assistant

Strengthen Core Operations · Quick Start · Light Requirements · $ · Productivity, Control & Visibility

**One-liner:** Give staff fast answers from SOPs, policies, manuals, product guidance, and store operating procedures.

**Business problem:** Operational knowledge is often scattered across shared folders, PDFs, chat history, printed manuals, and individual memory. Store teams need quick answers during trading hours: how to run a promotion, handle a refund, check freshness, escalate a maintenance issue, prepare an audit, or follow a safety process. If answers are hard to find, stores improvise and execution becomes inconsistent.

**What we do:** Create an internal knowledge assistant connected to approved company content:
- store SOPs, operating manuals, policies, audit checklists, and process guides;
- product handling, freshness, hygiene, and safety instructions;
- escalation paths for maintenance, supplier, customer, HR, and compliance issues;
- role-specific answers for store teams, field managers, and head-office users.

**Helps improve:** Store consistency, onboarding speed, fewer repeated internal questions, faster issue handling, better use of company knowledge, and reduced dependence on informal memory.

**Data and analytics behind it:** Connects approved policies, manuals, SOPs, training materials, product guides, audit requirements, and historical Q&A into a governed knowledge base. AI retrieves the relevant answer, explains it in practical language, and can show the source document or escalation owner when needed. Usage patterns also show where procedures are unclear or missing.

**Diagnostic questions:**
- Where do store teams currently look when they need a reliable answer during the working day?
- Which questions are repeatedly asked because the documented answer is hard to find?
- Are operating manuals and policies current enough to become a trusted knowledge source?

### `wai-5` — Customer Service and Complaint Assistant

Strengthen Core Operations · Scoped Project · Moderate Requirements · $$ · Customer Growth, Productivity

**One-liner:** Answer routine customer questions, draft complaint responses, classify issues, and escalate complex cases with context.

**Business problem:** Customer service teams handle repeated questions about opening hours, loyalty points, promotions, refunds, product availability, delivery, store issues, and complaint status. Routine contacts consume capacity, while complex complaints often reach a person without enough context. Slow or inconsistent responses can turn small issues into customer dissatisfaction.

**What we do:** Deploy a customer service assistant or controlled service agent across selected channels:
- answer routine questions from approved content;
- draft complaint responses in the company tone;
- classify issues by store, category, severity, and topic;
- retrieve customer, loyalty, order, or complaint context where available;
- escalate cases that require human judgement with a prepared summary and recommended next step.

**Helps improve:** Response speed, first-contact resolution, service team productivity, complaint handling consistency, customer satisfaction, and visibility of recurring service issues.

**Data and analytics behind it:** Connects customer messages, FAQs, loyalty records, promotion terms, order or delivery status, store information, complaint history, and escalation rules. AI classifies the issue, retrieves relevant facts, drafts a response, and routes complex cases with context already assembled. The assistant should start with controlled topics before expanding to higher-risk resolutions.

**Diagnostic questions:**
- Which customer questions are routine enough to answer from approved content?
- How much time do service teams spend gathering context before resolving a complaint?
- Which channels should be automated first: app, WhatsApp, email, web chat, or call-center support?

### `wai-6` — Supplier Communication and Claims Follow-Up Agent

Strengthen Core Operations · Scoped Project · Moderate Requirements · $$ · Margin & Cash, Productivity

**One-liner:** Draft supplier follow-ups, chase open claims, request credit notes, and escalate disputes before value is lost.

**Business problem:** Buying and finance teams spend time chasing suppliers for delivery confirmations, missing documents, claim responses, credit notes, rebate evidence, and dispute updates. This work is important, but much of it follows predictable timing and wording. When follow-up is slow, valid claims age, agreed value is missed, and teams lose time on manual reminders.

**What we do:** Create a supplier follow-up assistant or controlled agent that supports routine supplier communication:
- draft and send standard follow-ups for open claims, missing documents, delivery issues, and credit notes;
- track aging items and remind suppliers based on agreed rules;
- summarize supplier responses and update case status;
- escalate disputed, high-value, or unusual cases to buying or finance with the evidence already prepared.

**Helps improve:** Claims recovery speed, supplier response discipline, buying and finance productivity, fewer missed deductions, and better control over supplier-side value leakage.

**Data and analytics behind it:** Connects open claims, purchase orders, delivery records, invoices, credit note status, supplier contacts, contract terms, previous correspondence, and escalation rules. AI drafts supplier-ready communication grounded in actual case data, tracks responses, updates status, and flags where human judgement or negotiation is needed.

**Diagnostic questions:**
- How many supplier follow-ups are routine enough to follow a standard rule and template?
- Where is supplier value lost because claims or credit notes are chased too slowly?
- Which supplier communications require human judgement, and which could be safely drafted or triggered by AI?

## Expand and Monetize

Stage: Expand and Monetize.

### `em-1` — Retail Media and Supplier-Funded Activation

Expand and Monetize · Scoped Project · Moderate Requirements · $$$ · New Revenue, Supplier Monetization

**One-liner:** Turn supplier funding, loyalty audiences, app reach, and campaign measurement into controlled retail media pilots.

**Business problem:** Suppliers already spend money to gain visibility, support promotions, and grow categories, but much of that funding still goes into broad trade support or generic discounts. The retailer may have valuable customer attention through loyalty, app, web, receipts, digital circulars, screens, checkout, and store traffic, but no structured way to package, sell, manage, and measure that attention.

**What we do:** Design a practical retail media and supplier-funded activation model around the channels the retailer already has. Start with a small number of suppliers, categories, audiences, and touchpoints. Define campaign packages, targeting rules, customer-experience guardrails, commercial terms, and measurement before scaling. Use partner platforms or managed-service routes where building a full in-house media stack is not realistic.

**Helps improve:** New supplier-funded revenue, stronger campaign measurement, better supplier activation, less reliance on blanket promotions, and a more professional commercial proposition to brand partners.

**Data and analytics behind it:** Connects loyalty audiences, basket behavior, product categories, supplier funding, campaign exposure, redemption, POS sales, margin, and repeat purchase to show whether supplier-funded activity creates real commercial value. The analytics support audience selection, campaign measurement, closed-loop reporting, and supplier-facing performance views without turning the retailer into an unfocused advertising network.

**Diagnostic questions:**
- Which suppliers already ask for better targeting, shopper insight, or campaign measurement?
- Which channels have enough reach today: app, website, email, receipts, digital circulars, screens, checkout, or end-caps?
- Can campaign performance be measured credibly enough to show suppliers what their money achieved?

### `em-2` — Supplier Insight Products

Expand and Monetize · Quick Start · Moderate Requirements · $$ · Supplier Monetization

**One-liner:** Package category, basket, promotion, launch, and shopper insight into supplier-facing products or premium collaboration tools.

**Business problem:** Supplier conversations often focus on price, volume, rebates, and promotion funding, while deeper performance insight is hidden or manually prepared. Many suppliers want to understand how their products perform, who buys them, what else is in the basket, where promotions work, where availability hurts sales, and how categories are shifting. The retailer already holds much of this insight but rarely packages it as a repeatable commercial product.

**What we do:** Create supplier-facing insight products for priority categories and suppliers. Start with recurring reports where dashboards are not yet justified, then move toward controlled supplier dashboards or portals where demand is proven. Package performance views around category trends, SKU performance, store clusters, basket affinity, promotion response, launch performance, repeat purchase, and availability issues.

**Helps improve:** Supplier monetization, stronger joint category planning, better supplier funding conversations, faster campaign learning, and a clearer role for the retailer as a source of commercial insight rather than only shelf access.

**Data and analytics behind it:** Connects POS, basket, loyalty, product hierarchy, supplier mapping, promotion history, store clusters, launch cohorts, repeat purchase, and availability data into supplier-ready views. The analytics turn internal retail data into safe, aggregated, commercially useful insight products that can be sold, bundled into strategic agreements, or used to secure better supplier support.

**Diagnostic questions:**
- Which suppliers would materially value better visibility into category, basket, or promotion performance?
- Can product, supplier, category, store, and promotion data be connected reliably enough for supplier-facing reporting?
- Would supplier insight be sold directly, bundled into supplier agreements, or used to strengthen collaboration?

### `em-3` — In-Store and Digital Channel Monetization

Expand and Monetize · Scoped Project · Moderate Requirements · $$$ · New Revenue

**One-liner:** Monetize high-traffic stores, screens, receipts, checkout, circulars, and digital touchpoints without damaging customer trust.

**Business problem:** Food retailers have valuable customer attention in stores and digital channels, but much of it is unmanaged or not monetized as a measurable asset. Customers pass entrances, fresh counters, queues, end-caps, checkout, receipts, app banners, order pages, and digital circulars. The risk is clutter: monetizing every touchpoint without relevance can damage the customer experience and weaken trust.

**What we do:** Map the retailer's physical and digital attention points and define where supplier-funded or partner-funded messages can be placed responsibly. Build packages for high-traffic zones, in-store screens, end-caps, app placements, digital circulars, receipts, checkout, and order confirmation moments. Pilot with selected stores, categories, and suppliers, then measure sales response, customer reaction, operational burden, and brand fit before scaling.

**Helps improve:** New revenue from existing traffic, stronger supplier activation, better use of physical and digital assets, more measurable in-store campaigns, and disciplined customer-experience control.

**Data and analytics behind it:** Connects store traffic, dwell zones, screen or placement schedules, campaign exposure, POS uplift, basket behavior, store clusters, customer segments, and campaign response. The analytics help choose where monetization is commercially attractive, test whether messages changed sales, and control frequency and relevance so the channel does not become visual or promotional noise.

**Diagnostic questions:**
- Which physical or digital touchpoints have enough traffic to be commercially interesting?
- Can these channels be monetized without making the store, app, or checkout experience feel cluttered?
- Can sales response and customer impact be measured by store, category, supplier, or campaign?

### `em-4` — Paid Loyalty and Member Benefits

Expand and Monetize · Scoped Project · Moderate Requirements · $$ · Customer Ownership, New Revenue

**One-liner:** Turn loyalty from discount distribution into paid benefits, supplier-funded privileges, and stronger customer commitment.

**Business problem:** Many loyalty programs identify customers but do not create enough commitment, frequency, or share-of-wallet. Benefits are often funded from the retailer's own margin, while suppliers would value targeted access to high-value shoppers. Customers may be willing to pay for focused benefits, but only when the value is clear, relevant, and operationally reliable.

**What we do:** Test paid loyalty or member benefit concepts around specific customer value: delivery or pickup, family essentials, private label, fresh, beverages, partner perks, early access, exclusive bundles, or supplier-funded privileges. Start with a controlled segment and one focused benefit bundle rather than a broad generic subscription. Measure adoption, frequency, basket, retention, margin, supplier contribution, and customer satisfaction before expanding.

**Helps improve:** Customer commitment, loyalty economics, recurring or supplier-funded revenue, retention of valuable groups, and lower dependence on retailer-funded discounting.

**Data and analytics behind it:** Connects loyalty profiles, RFM and LTV analytics, benefit usage, supplier-funded offers, subscription or membership status, purchase frequency, basket value, churn, and margin. The analytics identify which customers are likely to value paid or exclusive benefits, track whether behavior changes after joining, and compare member economics against a control group.

**Diagnostic questions:**
- Which customer groups would value a paid or exclusive benefit enough to change behavior?
- Are current loyalty benefits funded mainly by retailer margin or also by suppliers and partners?
- Can the retailer reliably deliver the promised benefit without creating service or margin problems?

### `em-5` — Partner Ecosystem and Lifecycle Offers

Expand and Monetize · Scoped Project · Moderate Requirements · $$$ · Customer Ownership, Strategic Expansion

**One-liner:** Use local trust and loyalty access to connect customers with relevant partner services and lifecycle offers.

**Business problem:** Food retailers have frequent customer contact and local trust, but the loyalty relationship often stops at grocery purchases. Customers spend in adjacent areas such as fuel, pharmacy, telecom, banking, insurance, health, delivery, household services, and family needs. If partner offers are relevant, the retailer can become a trusted access point. If they are random or intrusive, the app becomes a coupon board and customer trust declines.

**What we do:** Identify partner categories that fit the retailer's brand and customer permission. Build cross-loyalty pilots, partner-funded offers, earn/burn mechanics, benefit bundles, or lifecycle offers around moments where the retailer can credibly help: family, baby, pets, health, household setup, local services, or convenience. Define consent, data sharing, commercial settlement, offer quality, relevance, and frequency rules before scaling into a broader partner ecosystem.

**Helps improve:** Customer stickiness, partner-funded value, loyalty relevance beyond grocery, app engagement, local ecosystem role, and selective new revenue without owning every adjacent service.

**Data and analytics behind it:** Connects loyalty behavior, customer segments, basket signals, lifecycle indicators, partner offer catalogs, redemption, consent, attribution, and customer feedback. The analytics identify which partner offers are relevant to which customers, measure uptake and repeat behavior, and prevent the experience from becoming generic or over-targeted.

**Diagnostic questions:**
- Which adjacent partners would customers naturally accept through the retailer's loyalty or app relationship?
- Does the retailer have enough trust and reach to be valuable to partners?
- Which partner offers would reinforce the core grocery business rather than distract from it?

### `em-6` — Selective Platform and Partnership Models

Expand and Monetize · Strategic Build · High Requirements · $$$$ · Strategic Expansion

**One-liner:** Explore marketplace, embedded finance, fulfillment monetization, and data collaboration only where maturity and demand justify it.

**Business problem:** Marketplace, embedded finance, logistics monetization, and privacy-safe data collaboration can look strategically attractive, but they add operational, regulatory, customer-experience, and technology complexity. For most mid-sized food retailers, these are not first moves. They should be evaluated selectively where the retailer has clear customer permission, partner demand, operational capacity, and a strong reason to extend beyond the core.

**What we do:** Assess which advanced models are realistic and which should be avoided. For marketplace, test curated adjacent categories through partners rather than broad open assortment. For embedded finance, use licensed partners rather than owning regulated operations. For fulfillment monetization, test only where spare capacity and economics are real. For data collaboration, define privacy, consent, aggregation, and access rules before any partner use.

**Helps improve:** Strategic option clarity, avoidance of distracting platform bets, better partner selection, controlled expansion beyond grocery, and stronger leadership discipline around what not to pursue.

**Data and analytics behind it:** Connects customer demand signals, partner economics, marketplace category fit, payment and loyalty behavior, fulfillment capacity, route density, service levels, privacy rules, and supplier or partner demand. The analytics model whether an advanced option has enough commercial upside, operational capacity, and customer fit to justify a pilot, while making the risks and prerequisites visible before investment.

**Diagnostic questions:**
- Is there clear customer permission and partner demand for the advanced model being considered?
- Would the model strengthen the core retail business or distract management and operations from it?
- Can the retailer test the opportunity through a narrow partner-led pilot before committing to platform investment?

