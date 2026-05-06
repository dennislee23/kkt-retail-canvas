// canvas-data.js — Retail AI Canvas · Service Catalog V3.1 · 37 operating cards + 6 Stage 3 cards

// ─── Q1 PRESSURES ────────────────────────────────────────────────────────────
window.PRESSURES = [
  { id: 'margin',    label: 'Improve margin and cash control' },
  { id: 'stock',     label: 'Reduce stockouts, waste and overstock' },
  { id: 'promos',    label: 'Make promotions and pricing more profitable' },
  { id: 'customer',  label: 'Grow customer value and loyalty' },
  { id: 'stores',    label: 'Improve store execution and field control' },
  { id: 'reporting', label: 'Make reporting and decisions faster' },
  { id: 'suppliers', label: 'Improve supplier performance and claims' },
  { id: 'labor',     label: 'Improve labor productivity and scheduling' },
  { id: 'fraud',     label: 'Reduce fraud, leakage and control gaps' },
  { id: 'growth',    label: 'Explore new revenue pools beyond classic retail' },
];

// ─── Q2 BUSINESS AREAS ───────────────────────────────────────────────────────
window.BUSINESS_AREAS = [
  { id: 'commercial',  label: 'Commercial, Category & Buying' },
  { id: 'marketing',   label: 'Marketing, Loyalty & Customer' },
  { id: 'store_ops',   label: 'Store Operations' },
  { id: 'supply',      label: 'Supply Chain & Logistics' },
  { id: 'finance',     label: 'Finance & Reporting' },
  { id: 'procurement', label: 'Procurement & Supplier Management' },
  { id: 'workforce',   label: 'Workforce & HR Operations' },
  { id: 'risk',        label: 'Risk & Loss Prevention' },
  { id: 'exec',        label: 'Executive / Across the Business' },
];

// ─── Q3 IMPROVEMENT TYPES ────────────────────────────────────────────────────
window.IMPROVEMENT_TYPES = [
  { id: 'quick',     label: 'Quick practical wins in the next 90 days' },
  { id: 'deep',      label: 'Deeper optimization over 6–12 months' },
  { id: 'strategic', label: 'Strategic growth and new revenue' },
  { id: 'unsure',    label: 'Not sure yet — show me the options' },
];

// ─── TAG ENUMERATIONS (V3.1) ─────────────────────────────────────────────────
window.SPEED_OPTIONS    = ['Quick Start', 'Scoped Project', 'Strategic Build'];
window.REQ_OPTIONS      = ['Light Requirements', 'Moderate Requirements', 'High Requirements'];
window.EFFORT_OPTIONS   = ['$', '$$', '$$$', '$$$$'];
window.IMPACT_OPTIONS   = [
  'Margin & Cash', 'Control & Visibility', 'Decision Speed',
  'Customer Growth', 'Risk & Loss Reduction', 'Productivity', 'Scalable Foundation',
  // Stage 3 impact tags
  'New Revenue', 'Supplier Monetization', 'Customer Ownership', 'Strategic Expansion',
];

// ─── TAG TOOLTIPS ─────────────────────────────────────────────────────────────
window.TAG_TOOLTIPS = {
  'Quick Start':          'Can begin with limited preparation, often through configuration, focused diagnostic work, or a small pilot.',
  'Scoped Project':       'Needs a defined project, business owners, data preparation, and some process or system setup.',
  'Strategic Build':      'Larger multi-stage capability with higher dependencies, wider adoption needs, or strategic complexity.',
  'Light Requirements':   'Can start with existing documents, standard tools, limited data, or a narrow workflow.',
  'Moderate Requirements':'Needs reasonably available data, agreed business rules, and some cross-functional alignment.',
  'High Requirements':    'Depends on stronger data quality, integrations, governance, or deeper process change.',
  '$':    'Light start. Mostly ready tools, configuration, templates, training, and controlled rollout.',
  '$$':   'Focused build. Limited integration, analysis, workflow setup, or pilot implementation.',
  '$$$':  'Integrated build. Multiple systems, business rules, analytics models, or adoption work.',
  '$$$$': 'Strategic program. Multi-domain, high-dependency, platform-like, or advanced automation.',
};

// ─── STAGE META ──────────────────────────────────────────────────────────────
window.STAGE_META = {
  1: { label: 'Strengthen Core Operations', color: '#5B8AF0', dim: 'rgba(91,138,240,0.10)' },
  2: { label: 'Optimize and Grow',          color: '#C9963E', dim: 'rgba(201,150,62,0.10)'  },
  3: { label: 'Expand and Monetize',        color: '#3ECDA0', dim: 'rgba(62,205,160,0.10)'  },
};

// ─── PRESSURE → DOMAIN RELEVANCE ─────────────────────────────────────────────
window.PRESSURE_DOMAINS = {
  margin:    ['margin', 'stock', 'warehouse_transport', 'promos', 'suppliers', 'reporting'],
  stock:     ['stock', 'warehouse_transport', 'stores', 'suppliers', 'margin'],
  promos:    ['promos', 'customer', 'margin', 'suppliers'],
  customer:  ['customer', 'promos', 'reporting', 'data_foundation'],
  stores:    ['stores', 'stock', 'warehouse_transport', 'reporting', 'loss_prevention'],
  reporting: ['reporting', 'data_foundation', 'margin', 'warehouse_transport', 'stores'],
  suppliers: ['suppliers', 'stock', 'warehouse_transport', 'promos', 'margin'],
  labor:     ['workforce_ai', 'warehouse_transport', 'stores', 'margin', 'reporting'],
  fraud:     ['loss_prevention', 'margin', 'stores', 'suppliers'],
  growth:    ['customer', 'promos', 'suppliers', 'expand_monetize'],
};

// ─── DOMAIN → BUSINESS AREA ALIGNMENT ───────────────────────────────────────
window.DOMAIN_AREAS = {
  data_foundation: ['exec', 'finance', 'commercial'],
  customer:        ['marketing', 'commercial'],
  promos:          ['commercial', 'marketing'],
  stock:           ['supply', 'store_ops', 'commercial'],
  warehouse_transport: ['supply', 'store_ops', 'exec'],
  stores:          ['store_ops', 'exec', 'workforce'],
  margin:          ['finance', 'commercial', 'exec'],
  suppliers:       ['procurement', 'commercial', 'supply'],
  reporting:       ['finance', 'exec', 'commercial'],
  loss_prevention: ['risk', 'store_ops', 'finance'],
  workforce_ai:    ['workforce', 'store_ops', 'exec', 'risk'],
  expand_monetize: ['marketing', 'exec', 'commercial'],
};

// ─── DOMAINS ─────────────────────────────────────────────────────────────────
window.DOMAINS = {

  // ── 1. Data Foundation ────────────────────────────────────────────────────
  data_foundation: {
    id: 'data_foundation', stage: 1, tier: 1,
    title: 'Data Foundation',
    subtitle: 'Build the trusted base that every retail decision depends on.',
    context: 'In food retail, data problems are not abstract IT issues: they show up as unclear promo ROI, inconsistent margin views, poor fresh ordering, supplier disputes, loyalty data that never reaches buying teams, and store reports nobody fully trusts. This domain creates the shared data, master data, metric definitions, ownership, and quality checks needed for repeatable analytics and AI.',
    plays: [
      {
        id: 'df-1',
        title: 'One Trusted Retail Data Foundation',
        kktExperience: true,
        cardText: 'Connect POS, ERP, loyalty, stock, supplier, finance, and master data into one trusted base for retail decisions.',
        shortPain: 'Retail teams often have the data they need somewhere, but not in a form they can use together. Fresh availability sits in one place, promotional activity in another, loyalty behavior somewhere else, supplier claims in finance, and product hierarchies differ across systems. The result is slow analysis, repeated reconciliation, inconsistent answers, and business decisions made from partial views.',
        whatWeDo: 'Connect the highest-priority retail data sources into one governed data layer designed around real business questions, not technical completeness. Clean and align the shared master data it depends on: products, stores, suppliers, customers, categories, pricing, stock, and finance references. Start with the data needed for the first priority use cases, then extend the layer as more decisions depend on it.',
        helpImprove: 'Trusted reporting, faster analytics delivery, cleaner base for forecasting, pricing, segmentation, supplier control, store execution, and AI, and less repeated rebuilding of the same logic for every new initiative.',
        dataBehind: 'Connects POS, ERP, loyalty, stock, supplier, finance, product, store, and customer data into one reusable business layer. The analytics reconcile core retail entities, detect missing or conflicting records, and make the same product, store, supplier, and customer visible consistently across systems. This gives every future dashboard, forecast, campaign model, replenishment tool, or AI assistant a cleaner base to work from.',
        speed: 'Scoped Project', requirements: 'High Requirements', cost: '$$$',
        impact: ['Scalable Foundation', 'Decision Speed'],
        pressureRelevance: ['reporting', 'margin', 'customer', 'stores'],
        diagnosticQuestions: [
          'Can a product, store, supplier, and customer be matched consistently across POS, ERP, loyalty, stock, and finance?',
          'How much time is spent reconciling data before management meetings rather than acting on it?',
          'Which major decision today suffers most because the required data sits across disconnected systems?',
        ],
      },
      {
        id: 'df-2',
        title: 'One Version of Key Numbers',
        kktExperience: true,
        cardText: 'Define the key retail metrics once and make business owners accountable for the data areas behind them.',
        shortPain: 'Metrics like margin, availability, waste, promo ROI, shrinkage, and supplier service often mean different things to different teams. Even when reports exist, people debate the calculation before they debate the decision. Key data areas such as product, supplier, store, customer, pricing, and stock also lack clear business ownership, so quality problems repeat across projects.',
        whatWeDo: 'Define the most important retail KPIs once, in business language, with agreed calculation logic. Connect those definitions to reporting, dashboards, alerts, and analytics outputs so the same logic is reused rather than rebuilt. Assign clear business ownership for key data areas and introduce practical quality checks that catch problems before they reach decisions.',
        helpImprove: 'Less debate over numbers, faster management decisions, clearer accountability for data quality, stronger self-service reporting, and a more reliable base for AI-assisted analysis.',
        dataBehind: 'Connects KPI definitions, calculation logic, source data, business owners, and quality checks into one controlled operating layer. The analytics show when a number is calculated differently, when critical data is missing or stale, and who owns the fix. This turns data quality from a recurring project complaint into a visible management process.',
        speed: 'Scoped Project', requirements: 'Moderate Requirements', cost: '$$',
        impact: ['Scalable Foundation', 'Control & Visibility'],
        pressureRelevance: ['reporting', 'margin', 'promos'],
        diagnosticQuestions: [
          'Is there a single agreed definition of your most important KPIs that all teams calculate the same way?',
          'When a data quality problem surfaces, is there a named business owner expected to resolve it?',
          'Do data quality issues tend to get fixed permanently, or do they reappear in every new analytics project?',
        ],
      },
      {
        id: 'df-3',
        title: 'Data Input and Document Processing',
        kktExperience: true,
        cardText: 'Turn supplier files, invoices, contracts, forms, emails, photos, and spreadsheets into usable, validated business data.',
        shortPain: 'Retail data often enters the business through messy channels: PDF invoices, supplier price lists, product files, contracts, delivery notes, store audit forms, photos, emails, WhatsApp messages, and manual spreadsheets. Teams spend time copying, checking, reformatting, and chasing information before it can be used. Errors at this stage quietly affect stock, pricing, claims, master data, supplier settlement, and reporting.',
        whatWeDo: 'Automate high-volume data intake and document processing where manual handling creates delay, errors, or hidden cost. Extract key fields, validate them against business rules, flag exceptions, and route items to the right owner for approval or correction. Start with one or two painful document flows, then expand once the validation logic and ownership model are working.',
        helpImprove: 'Manual processing effort, data accuracy, supplier file handling, invoice and claim evidence capture, product data quality, speed of administrative workflows, and the reliability of downstream reporting and analytics.',
        dataBehind: 'Connects documents, forms, emails, images, spreadsheets, master data, purchase orders, invoices, delivery records, contracts, and approval workflows. AI extracts and classifies information, while validation rules check whether fields are complete, consistent, and plausible. The workflow sends clean records forward automatically and routes exceptions to people only when judgement or correction is needed.',
        speed: 'Quick Start', requirements: 'Light Requirements', cost: '$',
        impact: ['Productivity', 'Control & Visibility'],
        pressureRelevance: ['reporting', 'suppliers', 'margin'],
        diagnosticQuestions: [
          'Which recurring documents or files consume the most manual processing time today?',
          'Where do data-entry errors create downstream problems in pricing, stock, supplier claims, invoices, or reporting?',
          'Are document exceptions routed to clear owners, or do they sit in email chains and spreadsheets?',
        ],
      },
    ],
  },

  // ── 2. Customers & Loyalty ────────────────────────────────────────────────
  customer: {
    id: 'customer', stage: 2, tier: 1,
    title: 'Customers & Loyalty',
    subtitle: 'Use loyalty, transaction, basket, campaign, and feedback data to understand customers as different groups with different value, needs, and risks.',
    context: 'The goal is not personalization for its own sake. It is better commercial discipline around who to target, who to protect, what to offer, when to intervene, and which customer issues deserve action.',
    plays: [
      {
        id: 'cust-1',
        title: 'Customer Segmentation and Value Targeting',
        kktExperience: true,
        cardText: 'Segment customers by behavior, value, basket, and response so campaigns target the groups worth growing.',
        shortPain: 'Too many customers receive the same offers despite very different habits, needs, value, and future potential. Marketing budget works harder for some groups than others, but without clear segmentation and value prioritization the business cannot tell where to invest, where to protect relationships, and where it is simply funding low-return discounting.',
        whatWeDo: 'Segment customers by behavior, visit frequency, spend, margin contribution, basket composition, category attachment, lifecycle stage, and promotional response. Link those segments to differentiated offer logic, channel, and timing. Define which customers should be protected, grown, reactivated, developed into broader missions, or excluded from costly campaigns.',
        helpImprove: 'Campaign relevance, conversion rates, marketing ROI, customer profitability, reduction in wasted discounting, and stronger commercial use of loyalty data.',
        dataBehind: 'Connects loyalty transactions, visit frequency, basket behavior, category breadth, customer value, margin contribution, and campaign response to show how customer groups actually differ. The analytics turn those differences into usable commercial segments and help CRM, loyalty, and campaign teams decide who should receive which offer, through which channel, and with what expected return.',
        speed: 'Scoped Project', requirements: 'Moderate Requirements', cost: '$$',
        impact: ['Customer Growth'],
        pressureRelevance: ['customer', 'promos'],
        diagnosticQuestions: [
          'Do you currently treat customers differently based on purchase behavior and value, or does most promotional activity go to everyone?',
          'Can campaign response be tracked back to individual customers and segments?',
          'Do you know which customers are worth investing in versus which customers mainly receive discounts they would have bought without?',
        ],
      },
      {
        id: 'cust-2',
        title: 'Retention, Churn Prevention and Win-Back',
        kktExperience: true,
        cardText: 'Detect customers cooling off early and trigger targeted win-back actions before they are fully lost.',
        shortPain: 'Customers drift before they disappear. They visit less often, buy fewer categories, reduce basket value, and stop responding to campaigns. The business usually notices after they are already lost, when recovery is harder, more expensive, and less likely to work.',
        whatWeDo: 'Detect early behavioral signals that indicate a customer is cooling off: declining visit frequency, narrowing category breadth, falling basket value, and reduced promo response. Score which customers are worth recovering and what intervention is most likely to work. Support automated win-back campaigns and loyalty triggers while the customer is still reachable.',
        helpImprove: 'Customer retention, recovered visit frequency, lower reactivation cost, protection of high-value relationships, and stronger loyalty program economics.',
        dataBehind: 'Connects changes in visit frequency, basket value, category breadth, and campaign response to detect when a customer is disengaging. The analytics prioritize at-risk customers by value and likely response, then help trigger the right win-back action through CRM, app, loyalty, email, or service workflows before the customer is fully lost.',
        speed: 'Scoped Project', requirements: 'Moderate Requirements', cost: '$$',
        impact: ['Customer Growth'],
        pressureRelevance: ['customer'],
        diagnosticQuestions: [
          'Can you identify customers who are visiting less frequently before they stop entirely?',
          'Do you have a defined behavior that automatically triggers a retention or win-back action?',
          'Is your loyalty program designed to respond to disengagement, or mainly to reward customers who are already active?',
        ],
      },
      {
        id: 'cust-3',
        title: 'Basket Growth and Loyalty Economics',
        cardText: 'Use basket patterns and loyalty economics to grow visits, category trial, and personalized next-best offers.',
        shortPain: 'A large share of growth can come from existing shoppers buying more, buying across more categories, or responding to more relevant offers. But loyalty programs often rely on generic discounts that reward customers who would have bought anyway. Basket potential stays uncaptured because offer logic is not personalized and reward economics are not clearly measured.',
        whatWeDo: 'Analyze basket composition, category adjacency, purchase patterns, and loyalty response to identify which products and categories naturally travel together for which customer groups. Redesign offer, reward, and contact logic to drive specific behaviors such as visit frequency, category trial, basket growth, and repeat purchase. Deploy personalized next-best-offer logic across app, loyalty, email, and in-store touchpoints.',
        helpImprove: 'Average basket value, category attachment, repeat purchase frequency, loyalty program ROI, marketing budget efficiency, and reduction in blanket discounting.',
        dataBehind: 'Connects basket contents, product affinities, category relationships, loyalty behavior, offer uptake, reward cost, and customer response to show where existing shoppers can grow profitably. The analytics identify which combinations drive incremental behavior, which rewards change purchase decisions, and which personalized offers should be sent through each channel.',
        speed: 'Scoped Project', requirements: 'Moderate Requirements', cost: '$$$',
        impact: ['Customer Growth', 'Margin & Cash'],
        pressureRelevance: ['customer', 'promos'],
        diagnosticQuestions: [
          'Do you know which product combinations most reliably grow basket size for specific customer groups?',
          'Is your loyalty program optimized around behavior goals such as visits, categories, basket size, and repeat purchase?',
          'Can you measure the incremental value your loyalty program creates versus what customers would have bought anyway?',
        ],
      },
      {
        id: 'cust-4',
        title: 'Customer Feedback and Service Intelligence',
        kktExperience: true,
        cardText: 'Turn scattered feedback and service contacts into clear themes, satisfaction drivers, routed cases, and action workflows.',
        shortPain: 'Customer feedback arrives through surveys, app reviews, complaints, social channels, call centers, WhatsApp, and support messages. It is often scattered, processed too slowly, and rarely connected to the operational teams that can fix the root cause. Good customers can leave without the business understanding the repeated issues that pushed them away.',
        whatWeDo: 'Aggregate feedback and service contacts from active channels into one structured view. Use AI to classify by theme, store, category, sentiment, severity, and likely cause. Route recurring issues to the teams that can act on them. For routine inquiries and standard complaints, introduce AI-assisted response drafting or controlled automation so human service teams focus on cases that require judgment.',
        helpImprove: 'Customer satisfaction, speed of issue resolution, retention of at-risk customers, prioritization of operational fixes, and productivity of service teams.',
        dataBehind: 'Connects surveys, complaints, app reviews, support messages, loyalty records, customer profiles, and store context into one structured view of customer voice. The analytics group feedback by theme, store, category, sentiment, severity, and likely operational cause, then route repeated issues to the right teams. AI can draft standard responses, summarize complaint history, and prepare escalation context for human agents.',
        speed: 'Quick Start', requirements: 'Light Requirements', cost: '$',
        impact: ['Customer Growth', 'Control & Visibility'],
        pressureRelevance: ['customer', 'stores'],
        diagnosticQuestions: [
          'Is customer feedback from app, surveys, complaints, social channels, and service contacts consolidated into one view today?',
          'How quickly does a recurring complaint become visible to the team that can act on it?',
          'Do you know which operational issues, such as availability, checkout wait, freshness, or store cleanliness, most strongly drive dissatisfaction?',
        ],
      },
    ],
  },

  // ── 3. Promotions & Pricing ───────────────────────────────────────────────
  promos: {
    id: 'promos', stage: 2, tier: 1,
    title: 'Promotions & Pricing',
    subtitle: 'Spend commercial money where it creates real return, not where it only subsidizes demand that would have happened anyway.',
    context: 'Promotions, pricing, markdowns, supplier funding, competitor moves, and market signals all affect margin and customer perception. This domain helps commercial teams make sharper decisions before money is committed and learn faster after campaigns run.',
    plays: [
      {
        id: 'promo-1',
        title: 'Promotion Performance and Campaign Intelligence',
        kktExperience: true,
        cardText: 'Separate promotions that create real incremental value from campaigns that mainly subsidize existing demand.',
        shortPain: 'Promotions drive volume but not always value. Too many campaigns discount demand that would have happened anyway, and without clear performance measurement the same mechanics get repeated regardless of whether they created real incremental return. Supplier funding and trade spend can also be judged on activity delivered rather than value created.',
        whatWeDo: 'Evaluate campaigns against uplift, margin effect, mix shift, cannibalization, post-promo dip, store cluster performance, customer segment response, and supplier funding. Build a learning base so the business knows which mechanics work in which categories, for which customer groups, in which store clusters, and at which times of year. Make that intelligence available before the next campaign is planned.',
        helpImprove: 'Promotion ROI, margin protection, reduction in wasted discounting, stronger trade spend discipline, and confidence in what to repeat, redesign, or stop.',
        dataBehind: 'Connects promotion spend, supplier funding, rebates, campaign mechanics, POS results, customer response, store cluster performance, category margin, and post-promo behavior to show which commercial investments actually pay back. The analytics separate genuine incremental uplift from subsidized demand, compare mechanics across categories and segments, and turn past campaigns into evidence for the next planning cycle.',
        speed: 'Quick Start', requirements: 'Moderate Requirements', cost: '$$',
        impact: ['Margin & Cash'],
        pressureRelevance: ['promos', 'margin', 'suppliers'],
        diagnosticQuestions: [
          'Can you distinguish which promotions drove genuinely incremental sales versus demand that would have happened anyway?',
          'Do commercial teams review campaign performance by customer segment and store cluster before repeating the same mechanic?',
          'Is supplier-funded activity evaluated on sell-out, margin, and incremental response, or mainly on funding secured and volume delivered?',
        ],
      },
      {
        id: 'promo-2',
        title: 'Targeted Campaign and Offer Planning',
        kktExperience: true,
        cardText: 'Plan campaigns by customer segment, store profile, category role, and timing instead of running one broad approach.',
        shortPain: 'Many promotional calendars are built around category rotation, supplier negotiation, and commercial habit rather than customer behavior and demand signals. Campaigns go too broadly, at the wrong time, with the wrong mechanic, spending budget on customers who do not need the incentive and missing the ones who do.',
        whatWeDo: 'Shape campaigns by customer segment, store profile, category role, and seasonal demand rather than applying one approach everywhere. Match mechanics such as discount depth, bundle, multi-buy, loyalty reward, or personalized offer to the behavior the business wants to drive. Build a more disciplined campaign planning process with clearer expected return before budget is committed.',
        helpImprove: 'Campaign conversion, marketing budget efficiency, offer relevance by segment and store, reduction in blanket discounting, and stronger connection between customer data and commercial planning.',
        dataBehind: 'Connects customer segments, store clusters, category roles, purchase missions, promotional calendars, and historical response to guide who should receive which offer and when. The analytics estimate response by segment and mechanic, highlight where broad campaigns are likely to waste margin, and help commercial teams brief campaigns with clearer targeting logic and expected outcomes.',
        speed: 'Scoped Project', requirements: 'Moderate Requirements', cost: '$$',
        impact: ['Customer Growth', 'Margin & Cash'],
        pressureRelevance: ['promos', 'customer', 'margin'],
        diagnosticQuestions: [
          'Do different customer groups or store clusters currently receive differentiated promotion mechanics?',
          'Is your promotion calendar built around customer and store behavior data, or mainly around category rotation and supplier funding cycles?',
          'Can you estimate the likely financial outcome of a planned campaign before it runs?',
        ],
      },
      {
        id: 'promo-3',
        title: 'Price Decisions and Competitor Response',
        cardText: 'Use price sensitivity, cost changes, and competitor signals to respond faster without giving away margin.',
        shortPain: 'Slow price response costs margin and traffic. The business often does not know which products are true price battlegrounds and which are relatively price-insensitive, so it either overreacts across the full range or misses competitive pressure where it matters. Supplier cost changes and competitor moves translate into pricing decisions too slowly.',
        whatWeDo: 'Identify which products customers are most price-sensitive about and which carry little pricing risk. Monitor competitor pricing, supplier cost changes, and demand signals. Feed that intelligence into pricing decisions that protect value perception without giving away unnecessary margin or reacting too late where it matters most.',
        helpImprove: 'Pricing discipline, margin protection, competitive responsiveness, customer price perception, and speed of response to cost and market pressure.',
        dataBehind: 'Connects SKU prices, category margin, demand response, competitor prices, supplier cost changes, and store cluster behavior to show where price moves are commercially sensitive. The analytics distinguish key value items from lower-risk range, estimate the margin and volume trade-off of price changes, and trigger review when competitor or supplier movements require action.',
        speed: 'Scoped Project', requirements: 'High Requirements', cost: '$$$',
        impact: ['Margin & Cash'],
        pressureRelevance: ['promos', 'margin'],
        diagnosticQuestions: [
          'Do you know which products customers use most to judge your price position?',
          'How quickly does a competitor price change or supplier cost increase translate into a pricing decision?',
          'Can you model the likely margin and volume impact of a price move before making it?',
        ],
      },
      {
        id: 'promo-4',
        title: 'Markdown, Clearance and Range Optimization',
        cardText: 'Flag weak sell-through and range complexity early enough to recover value before markdowns become waste.',
        shortPain: 'Late markdowns destroy value in fresh, seasonal, and slow-moving categories. At the same time, SKU proliferation quietly erodes margin and operational capacity. Space and commercial attention can go to products that do not justify it, while stronger performers are under-invested.',
        whatWeDo: 'Flag stock moving toward expiry, poor rotation, or sell-through failure early enough for intervention to recover value. Guide markdown timing and depth based on demand pace, margin recovery, and freshness or aging risk. Analyze category, range, and SKU productivity across sales, margin, stock turns, basket role, and local demand to identify where complexity is not paying back.',
        helpImprove: 'Sell-through, waste reduction, markdown recovery, assortment discipline, category margin, and reduction in operational complexity from weak SKUs.',
        dataBehind: 'Connects sell-through rates, stock age, shelf-life, margin, markdown response, category role, basket contribution, and store-level demand to show which products need action and when. The analytics recommend earlier markdowns where value can still be recovered and highlight SKUs that create complexity without enough sales, margin, or customer role to justify the space.',
        speed: 'Quick Start', requirements: 'Moderate Requirements', cost: '$$',
        impact: ['Margin & Cash'],
        pressureRelevance: ['promos', 'stock', 'margin'],
        diagnosticQuestions: [
          'Are markdowns triggered by systematic rules or mainly by store judgment after the issue is already visible?',
          'Do you know which SKUs create operational and margin complexity without enough commercial return?',
          'Is range performance reviewed with sales, margin, stock turns, and basket role together, or mainly through sales volume?',
        ],
      },
      {
        id: 'promo-5',
        title: 'Competitive and Market Intelligence',
        cardText: 'Track competitor prices, promotions, range moves, and market signals so commercial teams are not reacting from memory.',
        shortPain: 'Competitor moves affect price perception, promotional pressure, customer traffic, and category expectations. But market intelligence is often informal: store visits, screenshots, buyer memory, supplier comments, and late reactions after the market has already moved. The business lacks a systematic view of competitor pricing, promotions, range changes, new launches, and consumer signals.',
        whatWeDo: 'Create a structured competitive and market monitoring process across priority competitors, categories, prices, promotions, range, and external signals. Turn scattered observations into comparable intelligence that commercial teams can use in pricing, campaign planning, assortment review, and supplier conversations. Focus on the categories and competitors that actually influence customer choice and margin exposure.',
        helpImprove: 'Competitive responsiveness, pricing confidence, promotion planning, range decisions, supplier negotiation quality, and leadership visibility into market movement.',
        dataBehind: 'Connects competitor price checks, promotional observations, online range data, store audits, supplier market input, public news, and consumer trend signals into one structured view. The analytics highlight material changes, compare competitor positions by category and product, and summarize market movement so commercial teams can respond deliberately rather than relying on anecdote or delayed discovery.',
        speed: 'Quick Start', requirements: 'Moderate Requirements', cost: '$$',
        impact: ['Control & Visibility'],
        pressureRelevance: ['promos', 'margin', 'suppliers'],
        diagnosticQuestions: [
          'How do commercial teams currently track competitor prices, promotions, and range changes?',
          'Which competitor moves materially change your pricing, promotional, or range decisions?',
          'Is market intelligence captured in a reusable system, or does it mostly live in buyer memory and ad hoc files?',
        ],
      },
    ],
  },

  // ── 4. Stock & Availability ───────────────────────────────────────────────
  stock: {
    id: 'stock', stage: 1, tier: 1,
    title: 'Stock & Availability',
    subtitle: 'Stop carrying too much of the wrong stock while losing sales on the right products.',
    context: 'Too much inventory ties up cash, but availability still suffers. Some products run out too early, others sit too long, and fresh categories create constant pressure around waste, markdowns, and ordering quality. Better demand understanding, smarter replenishment logic, and earlier exception signals reduce waste, stockouts, and working-capital drag together.',
    plays: [
      {
        id: 'stock-1',
        title: 'Demand Forecasting and Event Planning',
        cardText: 'Forecast demand by SKU, store, and period while accounting for seasons, promotions, events, and local demand shifts.',
        shortPain: 'Ordering decisions still rely too heavily on fixed rules, historical averages, and planner intuition. Demand shifts with seasons, holidays, promotions, weather, local events, and competitor activity, but planning methods often do not keep up. Commercial and supply teams can also work from different demand expectations for the same event.',
        whatWeDo: 'Build demand forecasts by SKU, store, and time period that incorporate sales history, seasonality, promotional uplift, local events, weather effects, and trend signals. Connect commercial calendars to supply planning so promotions and seasonal peaks are prepared before demand arrives. Make the forecast the default input into replenishment, not a separate analytical exercise.',
        helpImprove: 'Ordering accuracy, fewer stockouts and overstocks, better preparation for seasonal and promotional peaks, and stronger alignment between commercial and supply teams.',
        dataBehind: 'Connects historical sales, stock positions, promotional calendars, seasonal patterns, local events, weather, store clusters, and commercial plans to forecast demand at the level where ordering decisions are made. The analytics learn from forecast errors, separate normal seasonality from exceptional events, and feed expected demand into replenishment and supply preparation before peaks arrive.',
        speed: 'Scoped Project', requirements: 'Moderate Requirements', cost: '$$$',
        impact: ['Control & Visibility'],
        pressureRelevance: ['stock', 'margin', 'promos'],
        diagnosticQuestions: [
          'Are replenishment decisions driven by demand forecasts or mainly by fixed rules and historical order patterns?',
          'Does your current planning method account for promotional uplift, weather, local events, and store-level differences?',
          'Are commercial and supply teams working from the same demand picture when planning major events?',
        ],
      },
      {
        id: 'stock-2',
        title: 'Replenishment and Availability Protection',
        kktExperience: true,
        cardText: 'Improve ordering logic and detect stockout risk early enough to protect availability before customers feel it.',
        shortPain: 'Even with reasonable demand estimates, ordering quality suffers because supplier constraints, pack sizes, lead times, order cycles, and delivery calendars force the business into excess or shortage. Stockouts are often discovered after customers have already felt them, even though signals existed earlier in demand pace, cover, and replenishment timing.',
        whatWeDo: 'Combine forecasts with supplier constraints, lead times, pack sizes, delivery frequency, and store behavior to improve replenishment logic. Adapt rules by product type, store profile, and supplier rather than applying one method everywhere. Surface stockout risk early and prioritize the items where availability matters most. Where the control environment is mature, routine ordering can progress toward autonomous replenishment with human review only for exceptions.',
        helpImprove: 'Order quality, on-shelf availability, reduced excess caused by ordering constraints, planner productivity, and better use of supplier relationships to resolve recurring constraint problems.',
        dataBehind: 'Connects forecasts, current cover, lead times, supplier delivery calendars, pack sizes, minimum order quantities, store demand, and commercial priority to recommend better orders and flag availability risk. The analytics show where constraints force avoidable inventory build, where stockouts are likely before the next delivery, and which exceptions need planner or supplier intervention. AI agents can later execute routine orders within agreed rules and escalate only unusual cases.',
        speed: 'Scoped Project', requirements: 'Moderate Requirements', cost: '$$$',
        impact: ['Control & Visibility'],
        pressureRelevance: ['stock', 'margin', 'suppliers'],
        diagnosticQuestions: [
          'Do minimum order quantities or pack sizes regularly force you to carry more stock than demand justifies?',
          'Can you identify a product approaching stockout before it actually runs out on the shelf?',
          'How much planner time goes into routine order building versus managing real exceptions?',
        ],
      },
      {
        id: 'stock-3',
        title: 'Inventory Health and Cash Release',
        cardText: 'Identify overstock, slow movers, aging stock, and frozen cash before they become markdown or write-off problems.',
        shortPain: 'Excess stock builds quietly across thousands of SKUs before anyone notices it has become a cash or margin problem. By the time it appears in a financial report, recovery options are narrower. At the same time, the business lacks a clear view of where inventory is genuinely protecting service versus where cash is trapped in non-productive stock.',
        whatWeDo: 'Build continuous inventory health signals across cover, aging, rotation, and stock build-up by SKU, store, and category. Separate healthy buffer stock from inventory that is accumulating without sufficient demand. Show where cash can be released through smarter stock policies without damaging availability elsewhere.',
        helpImprove: 'Working capital efficiency, inventory productivity, cash discipline, earlier identification of stock health problems, and better balance between service protection and cost.',
        dataBehind: 'Connects stock depth, sales velocity, cover days, aging, rotation, forecast demand, category role, and store profile to show where inventory is productive and where it is tying up cash. The analytics prioritize exceptions by value at risk, identify slow-moving and over-protected stock, and model where stock policies can be adjusted without creating service damage.',
        speed: 'Quick Start', requirements: 'Moderate Requirements', cost: '$$',
        impact: ['Margin & Cash', 'Control & Visibility'],
        pressureRelevance: ['stock', 'margin'],
        diagnosticQuestions: [
          'Do you have a live view of products accumulating excess stock before they become markdown or write-off problems?',
          'How much safety stock is genuinely protecting service versus sitting because parameters were never updated?',
          'Is inventory reviewed as a working-capital issue as well as a supply issue?',
        ],
      },
      {
        id: 'stock-4',
        title: 'Freshness and Waste Control',
        cardText: 'Track shelf-life risk and slow sell-through early enough to guide markdowns, transfers, and order changes.',
        shortPain: 'In fresh and perishable categories, margin consequences compound quickly. Late markdowns destroy value, poor ordering creates waste, and manual routines cannot track freshness risk across hundreds of SKUs. Food waste is also a regulatory, ESG, and customer trust issue, not only a financial write-off.',
        whatWeDo: 'Track freshness, shelf-life risk, and sell-through velocity before value is already gone. Trigger earlier markdowns, order adjustments, transfers, or store actions for at-risk stock based on remaining shelf life and demand pace. Improve ordering precision in fresh categories so the business reduces waste at the source rather than only managing it downstream.',
        helpImprove: 'Fresh waste reduction, sell-through, markdown recovery, fresh margin protection, food safety visibility, and ESG reporting on food waste.',
        dataBehind: 'Connects goods-received dates, shelf-life rules, sell-through pace, stock position, waste records, markdown history, store conditions, and demand signals to identify fresh risk while action is still possible. The analytics recommend earlier intervention, show root causes by SKU and store, and connect waste patterns back to ordering, display, pricing, and demand forecasting.',
        speed: 'Quick Start', requirements: 'Moderate Requirements', cost: '$$',
        impact: ['Margin & Cash', 'Control & Visibility'],
        pressureRelevance: ['stock', 'margin', 'promos'],
        diagnosticQuestions: [
          'Are markdowns in fresh categories triggered by shelf-life and sell-through rules, or mainly by store judgment?',
          'Do you know which fresh categories create the most waste and whether the cause is ordering, display, pricing, or demand?',
          'Is food waste tracked as an accountable business KPI, or mainly visible as a write-off after the fact?',
        ],
      },
    ],
  },

  // ── 5. Warehouse & Transport Operations ──────────────────────────────────
  warehouse_transport: {
    id: 'warehouse_transport', stage: 1, tier: 2,
    title: 'Warehouse & Transport Operations',
    subtitle: 'Make warehouse and transport execution visible before depot and delivery problems hit stores.',
    context: 'A retailer can have enough stock on paper and still fail operationally between supplier, warehouse, depot, vehicle, and store. Receiving delays, stock mismatches, pick errors, poor loading discipline, weak route planning, and late delivery visibility create avoidable stockouts, excess buffers, manual escalation, and hidden logistics cost. This domain covers the WMS/TMS-level operating layer between inbound supply and store availability.',
    plays: [
      {
        id: 'wt-1',
        title: 'Warehouse Stock Accuracy and Flow Control',
        cardText: 'Make warehouse stock, receiving, put-away, and pick accuracy visible before depot errors become store availability problems.',
        shortPain: 'Retailers can have enough stock in the ERP while warehouse reality tells a different story. Receiving delays, put-away gaps, location errors, stock mismatches, uncontrolled substitutions, and weak cycle-count discipline create phantom availability, emergency corrections, and avoidable write-offs. Teams often discover the problem only when stores chase missing stock.',
        whatWeDo: 'Build a control view across receiving, put-away, location accuracy, stock adjustments, cycle counts, pick accuracy, and aging stock inside the warehouse or depot. Identify where records drift from physical reality, where throughput stalls, and where rules need tightening. Where a WMS exists, use its event trail to expose the exceptions that matter. Where it does not, start by creating the minimum transaction visibility needed for control.',
        helpImprove: 'Stock accuracy, fewer warehouse-driven availability failures, faster root-cause analysis, lower emergency rework, and cleaner replenishment execution.',
        dataBehind: 'Connects ASNs or purchase orders, goods receipt events, put-away confirmations, location data, stock adjustments, cycle counts, pick confirmations, returns, aging, and exception logs. The analytics show where warehouse stock is wrong, where flow is stalling, and which SKUs, zones, suppliers, or shifts create repeated accuracy or throughput issues.',
        speed: 'Scoped Project', requirements: 'Moderate Requirements', cost: '$$$',
        impact: ['Control & Visibility', 'Productivity'],
        pressureRelevance: ['stock', 'stores', 'margin'],
        diagnosticQuestions: [
          'How often do stores, planners, or buyers discover that warehouse stock is wrong only after availability is already affected?',
          'Can you see where receiving, put-away, pick, or cycle-count failures are concentrated by zone, SKU, shift, or supplier?',
          'If you have a WMS today, is it mainly recording transactions or actually surfacing the operational exceptions that matter?',
        ],
      },
      {
        id: 'wt-2',
        title: 'Picking, Loading and Shift Productivity',
        cardText: 'Show where warehouse labor, picking, staging, and loading effort is being lost through poor flow, bad slotting, and weak exception control.',
        shortPain: 'Warehouse labor cost rises quietly when picking paths are inefficient, slotting is outdated, loads are rebuilt repeatedly, and supervisors spend the shift chasing exceptions manually. Productivity debates then get reduced to headcount rather than exposing where flow design, rules, replenishment timing, or loading discipline are actually creating the waste.',
        whatWeDo: 'Measure warehouse productivity at the level where managers can act: picks per hour, travel time, staging delay, load completion, dock dwell, rework, and exception frequency. Separate structural problems from one-off misses. Show whether the problem sits in slotting logic, order waves, labor deployment, replenishment timing, loading sequence, or weak operating discipline.',
        helpImprove: 'Warehouse productivity, lower avoidable labor cost, cleaner loading, fewer late departures, and better use of supervisory attention.',
        dataBehind: 'Connects order waves, pick tasks, travel paths, slotting logic, staging timestamps, loading events, dock usage, labor rosters, exceptions, and departure times. The analytics show where time is being lost, which process steps create rework, and what part of the warehouse flow needs redesign rather than more manual effort.',
        speed: 'Quick Start', requirements: 'Moderate Requirements', cost: '$$',
        impact: ['Productivity', 'Margin & Cash'],
        pressureRelevance: ['labor', 'margin', 'stock'],
        diagnosticQuestions: [
          'Can you explain low warehouse productivity through measurable flow losses, or does it usually get described as a generic labor problem?',
          'Where do late departures really begin: order release, picking, staging, loading, or vehicle readiness?',
          'Is slotting and wave logic updated based on actual demand and flow patterns, or mainly through operational habit?',
        ],
      },
      {
        id: 'wt-3',
        title: 'Transport Planning and Delivery Control',
        kktExperience: true,
        cardText: 'Use TMS-style planning and exception control to improve route quality, OTIF delivery, and transport cost.',
        shortPain: 'Store replenishment and delivery movements often rely on dispatcher memory, fixed habits, and partial visibility. Vehicles leave underfilled, routes change late, unload delays accumulate, and management cannot see which failures come from planning, carrier performance, depot loading, or store readiness. Transport becomes expensive and reactive without a clear control layer.',
        whatWeDo: 'Build a transport control layer across route planning, vehicle utilization, delivery windows, stop sequence, dwell time, proof of delivery, and route exceptions. Use TMS data where available, or create a lighter control view around dispatch and GPS events where it is not. Separate planning-quality issues from execution failure so the business knows whether to fix routing rules, carrier performance, depot discipline, or store-side readiness.',
        helpImprove: 'OTIF delivery, transport cost control, route quality, vehicle utilization, earlier exception management, and fewer store-side surprises caused by transport failure.',
        dataBehind: 'Connects dispatch plans, route plans, GPS or telematics events, loading times, delivery windows, arrival and unload timestamps, proof-of-delivery records, carrier performance, and store readiness signals. The analytics show where routes are inefficient, where dwell time is excessive, where execution deviates from plan, and which transport failures are systemic rather than isolated.',
        speed: 'Scoped Project', requirements: 'Moderate Requirements', cost: '$$$',
        impact: ['Control & Visibility', 'Margin & Cash'],
        pressureRelevance: ['stock', 'margin', 'stores', 'suppliers'],
        diagnosticQuestions: [
          'How clearly can you separate route-planning mistakes from late loading, carrier failure, or store-side unload delay?',
          'Do you have one view of OTIF, vehicle utilization, dwell time, and route exceptions across the network?',
          'If you already use a TMS, does it give management a usable control view or mainly a transport transaction log?',
        ],
      },
    ],
  },

  // ── 6. Store Execution ────────────────────────────────────────────────────
  stores: {
    id: 'stores', stage: 1, tier: 2,
    title: 'Store Execution',
    subtitle: 'Make the store network closer to the plan.',
    context: 'Promotions, shelf standards, price labels, freshness routines, labor plans, and compliance processes only create value when stores execute them consistently. This domain gives head office, regional managers, field teams, and store teams better visibility into where execution is slipping, what needs action, who owns it, and whether the issue was resolved.',
    plays: [
      {
        id: 'store-1',
        title: 'Store Execution Control',
        cardText: 'Build a network-wide view of where stores are drifting from standards and where management attention matters most.',
        shortPain: 'Plans only create value when stores execute them consistently. Promotional, shelf, pricing, freshness, and compliance standards vary across the network, head office finds out too late, and management time is absorbed chasing execution rather than improving it. The business often sees the sales consequence before it sees the execution failure.',
        whatWeDo: 'Build a continuous view of execution performance by store, region, and issue type using task completion, audit findings, sales signals, and compliance checks. Define the most important standards and make deviations visible, comparable, and prioritized. Help management focus on the stores where drift is commercially significant rather than spreading attention evenly.',
        helpImprove: 'Execution consistency, faster identification of underperforming stores, better use of management and field attention, and stronger connection between head office plans and store reality.',
        dataBehind: 'Connects task completion, audit results, compliance checks, store performance, promotional execution, sales anomalies, and issue history into a network-wide execution view. The analytics benchmark stores against relevant peers, distinguish isolated misses from repeated drift, and prioritize the execution gaps most likely to affect sales, margin, availability, or compliance.',
        speed: 'Quick Start', requirements: 'Moderate Requirements', cost: '$$',
        impact: ['Control & Visibility'],
        pressureRelevance: ['stores', 'reporting'],
        diagnosticQuestions: [
          'Do you have an objective view of which stores are meeting execution standards and which are drifting?',
          'How does head office currently find out about execution failure: audit, sales data, field visit, or complaint?',
          'Is management attention directed by the biggest execution gaps or mainly by geography and habit?',
        ],
      },
      {
        id: 'store-2',
        title: 'Field Tasks and Issue Escalation',
        cardText: 'Turn store and field tasks into owned workflows with deadlines, evidence, escalation, status, and closure.',
        shortPain: 'Store and field tasks such as promotions, freshness routines, compliance checks, and merchandising often fail because ownership is unclear, completion is invisible, and follow-up happens through calls and messages. Issues that should be resolved locally drift upward slowly, and recurring problems repeat across sites without anyone connecting the pattern.',
        whatWeDo: 'Convert key store and field tasks into structured workflows with ownership, deadlines, evidence requirements, completion confirmation, and exception handling. Give field teams a consistent mobile-first way to log visits, capture photos, record findings, and raise issues. Make missed or incomplete actions visible to supervisors early enough to intervene.',
        helpImprove: 'Task completion reliability, field team accountability, supervisor visibility, reduced manual chasing, faster escalation, and stronger connection between field activity and management action.',
        dataBehind: 'Connects task plans, visit logs, geotags, timestamps, photo evidence, issue categories, completion records, and escalation status into one operating workflow. The analytics show what was done, what was missed, which issues recur across stores, and whether actions moved from insight to owner, action, status, and outcome.',
        speed: 'Quick Start', requirements: 'Light Requirements', cost: '$$',
        impact: ['Productivity', 'Control & Visibility'],
        pressureRelevance: ['stores', 'labor'],
        diagnosticQuestions: [
          'Can you see which store tasks were completed, by whom, and when across the network?',
          'When the same issue appears in multiple stores, how quickly does that pattern become visible?',
          'Do field visits feed management through structured data and workflow, or through informal reporting?',
        ],
      },
      {
        id: 'store-3',
        title: 'Shelf, Price Label and Planogram Checks',
        cardText: 'Detect shelf gaps, planogram deviations, wrong placements, and price label issues faster than manual audits alone.',
        shortPain: 'Shelf gaps, wrong placements, missing price labels, and planogram deviations cost sales and erode customer trust. Manual audits cover only a fraction of the estate at any point in time. Some expensive shelf failures are invisible to stock systems because inventory records show stock available even when the shelf is empty.',
        whatWeDo: 'Use computer vision and sales pattern analytics together to detect shelf problems faster than audit cycles alone. CV-based monitoring can identify shelf gaps, planogram deviations, and price label issues where camera infrastructure exists. Sales anomaly detection provides a complementary signal when products sell far below expected pattern. Route confirmed issues into store task workflows.',
        helpImprove: 'On-shelf availability, planogram compliance, price label accuracy, faster detection of execution failures, and reduction in lost sales from shelf gaps or phantom stock.',
        dataBehind: 'Connects shelf images, planograms, price label references, SKU-store sales patterns, stock records, promotional calendars, and peer-store comparisons to identify likely shelf execution failures. The analytics combine what cameras can see with what sales behavior suggests, then route confirmed issues to store teams for physical correction.',
        speed: 'Scoped Project', requirements: 'High Requirements', cost: '$$$',
        impact: ['Control & Visibility'],
        pressureRelevance: ['stores', 'promos', 'fraud'],
        diagnosticQuestions: [
          'How do you currently detect shelf gaps or planogram deviations: audit, complaint, camera, or sales data?',
          'Do stock records ever show product available while the shelf is actually empty?',
          'Is shelf compliance monitored continuously or dependent on audit frequency and store discipline?',
        ],
      },
      {
        id: 'store-4',
        title: 'Labor Planning and Productivity',
        cardText: 'Align staffing to traffic, transactions, deliveries, and task pressure instead of relying on fixed rota templates.',
        shortPain: 'Labor is one of the largest controllable cost lines in food retail, yet scheduling it well remains difficult. Stores can be overstaffed in quiet hours and understaffed during peaks. Rotas are built on habit, overtime creeps up, and productivity gaps across the network are not visible early enough.',
        whatWeDo: 'Align staffing to real store demand by combining traffic, transactions, delivery schedules, and operational workload into a clear picture of hourly and daily workforce need. Replace fixed rota templates with demand-driven scheduling logic. Make labor productivity visible across stores, departments, and time windows, and build early warning around overtime and absence patterns.',
        helpImprove: 'Labor cost efficiency, service quality during peaks, reduced avoidable overtime, store manager time, and network-wide productivity visibility.',
        dataBehind: 'Connects footfall, transactions, basket volumes, delivery schedules, task workload, opening hours, absence, overtime, and labor hours to show where staffing matches demand and where it does not. The analytics forecast workload by time window, compare productivity across similar stores, and flag structural overtime or absence patterns before they become embedded cost.',
        speed: 'Scoped Project', requirements: 'Moderate Requirements', cost: '$$$',
        impact: ['Productivity', 'Margin & Cash'],
        pressureRelevance: ['labor', 'stores', 'margin'],
        diagnosticQuestions: [
          'Is shift scheduling built around actual demand signals or fixed templates adjusted by manager judgment?',
          'Can you compare labor productivity across stores, departments, and time windows?',
          'Are overtime and absence problems visible as patterns early enough to address the cause?',
        ],
      },
    ],
  },

  // ── 7. Margin & Cash ──────────────────────────────────────────────────────
  margin: {
    id: 'margin', stage: 1, tier: 1,
    title: 'Margin & Cash',
    subtitle: 'Give leadership a clearer forward view of where profit and cash are moving.',
    context: 'Food retail economics are shaped by pricing, promotions, supplier terms, waste, stock, labor, energy, logistics, and payment timing. Standard month-end reporting often explains the result after the decision window has closed. This domain helps CFOs, CEOs, and commercial leaders see margin pressure, cash consequences, and financial trade-offs earlier.',
    plays: [
      {
        id: 'margin-1',
        title: 'Margin Visibility and Profitability Analytics',
        kktExperience: true,
        cardText: 'Show where margin is made or lost across stores, categories, suppliers, campaigns, and trading periods.',
        shortPain: 'Most food retailers can see total sales well enough. What they cannot see clearly or early enough is where margin is being made, where it is eroding, and which combination of commercial decisions, supplier terms, promotional activity, waste, and operating costs is driving the movement. By month-end, many corrective options are already gone.',
        whatWeDo: 'Build a granular, forward-leaning margin view across store, category, supplier, campaign, and trading period. Bring together price realization, discounting, markdowns, supplier funding, waste, shrinkage, and cost pressure so leadership can see where margin is changing while there is still room to respond.',
        helpImprove: 'Earlier identification of margin pressure, clearer management focus, faster corrective action, and stronger connection between commercial decisions and financial consequences.',
        dataBehind: 'Connects price realization, discounting, markdowns, supplier funding, waste, shrinkage, product cost, and operating cost inputs across stores, categories, suppliers, and campaigns. The analytics decompose margin movement by driver so leadership can see whether the issue is pricing, promo mechanics, supplier terms, cost inflation, waste, or execution before the period is closed.',
        speed: 'Quick Start', requirements: 'Moderate Requirements', cost: '$$',
        impact: ['Margin & Cash'],
        pressureRelevance: ['margin', 'promos', 'reporting'],
        diagnosticQuestions: [
          'Can you see margin by category, store, supplier, and campaign continuously, or mainly at month-end?',
          'When margin changes, can you quickly identify the driver: price, discounting, waste, supplier terms, or cost?',
          'Is there one view connecting commercial activity and operating choices to margin consequence?',
        ],
      },
      {
        id: 'margin-2',
        title: 'Rolling Financial Forecasting',
        cardText: 'Turn current trading signals and known plans into a rolling view of where profit and cash are heading.',
        shortPain: 'Retail leadership should not wait until month-end to understand how current trading is likely to land financially. Static budgets and backward-looking actuals explain what happened, but they do not give enough lead time to steer. The financial view is often behind the trading reality.',
        whatWeDo: 'Build a rolling financial forecast that updates as sales pace, margin trajectory, promotional commitments, stock movements, supplier terms, and cost assumptions shift. Make forecast movement explainable so leadership can understand what changed, why it changed, and what action is still possible.',
        helpImprove: 'Forecast quality, earlier visibility into financial risk, stronger preparation for corrective action, leadership confidence in the forward picture, and better use of finance team time.',
        dataBehind: 'Connects current sales pace, promotional plans, margin movement, cost changes, stock commitments, supplier terms, and payment patterns into a continuously updating forward view. The analytics translate live trading signals into expected profit and cash outcomes, explain forecast movement in business terms, and reduce the manual assembly work that delays finance updates.',
        speed: 'Scoped Project', requirements: 'High Requirements', cost: '$$$',
        impact: ['Margin & Cash', 'Decision Speed'],
        pressureRelevance: ['margin', 'reporting'],
        diagnosticQuestions: [
          'Does leadership have a forward-looking financial view that updates as trading develops?',
          'When the forecast changes, can you explain quickly which driver caused the movement?',
          'How much finance time goes into assembling the forecast versus interpreting it and improving decisions?',
        ],
      },
      {
        id: 'margin-3',
        title: 'Decision Scenarios Before Committing',
        cardText: 'Compare the financial consequences of major commercial and operating choices before leadership commits.',
        shortPain: 'Major decisions such as pricing moves, promotional investments, assortment changes, supplier negotiations, stock policy shifts, and cost programs involve financial trade-offs that are difficult to evaluate quickly. Leadership often makes these choices on instinct because credible scenarios take too long to build inside the decision window.',
        whatWeDo: 'Make scenario modeling fast enough to support the decision rather than justify it afterward. Connect commercial and operating choices to their likely P&L, cash, and risk consequences. Compare options side by side and flag commercially attractive plans that do not hold up economically before they are scaled.',
        helpImprove: 'Quality of major decisions, reduction in financially weak choices, stronger leadership challenge, better connection between trading plans and financial reality, and clearer trade-off management.',
        dataBehind: 'Connects pricing moves, campaign commitments, supplier negotiations, assortment choices, stock policies, labor changes, and cost assumptions to their likely margin, cash, and risk outcomes. The analytics compare scenarios side by side, expose hidden trade-offs, and make financial challenge visible before decisions are locked in.',
        speed: 'Strategic Build', requirements: 'High Requirements', cost: '$$$$',
        impact: ['Margin & Cash', 'Decision Speed'],
        pressureRelevance: ['margin', 'reporting', 'promos'],
        diagnosticQuestions: [
          'Can you model the financial consequence of a major price, promo, supplier, or stock decision before it is made?',
          'Are growth plans regularly challenged on cash and margin impact before approval?',
          'How long does it take to build a credible scenario, and is that fast enough for the decision window?',
        ],
      },
      {
        id: 'margin-4',
        title: 'Working Capital and Cost Efficiency',
        cardText: 'Show where cash and cost are being absorbed through stock, payments, labor, energy, waste, and logistics.',
        shortPain: 'Cash and cost pressure in food retail comes from many operating decisions: stock levels, payment terms, markdown timing, promotional inventory commitments, labor, energy, logistics, and waste. These decisions are often managed separately, so working capital drifts and cost improvement efforts spread too thin to create material impact.',
        whatWeDo: 'Translate operating decisions into a working capital and cost view. Show where cash is absorbed through inventory build, payment timing, and trading commitments. Benchmark major cost drivers across stores, formats, and categories to separate avoidable inefficiency from genuine market pressure. Help leadership prioritize the highest-return improvement opportunities.',
        helpImprove: 'Working capital discipline, cash flow visibility, cost control, earlier identification of liquidity pressure, and better integration of cash consequences into commercial and operating decisions.',
        dataBehind: 'Connects stock depth, supplier payment terms, markdown commitments, promotional inventory, accounts payable, accounts receivable, labor hours, energy, waste, and logistics costs. The analytics show where cash is trapped, where cost is above what trading volume and store profile justify, and where improvement effort is likely to release the most value.',
        speed: 'Scoped Project', requirements: 'Moderate Requirements', cost: '$$',
        impact: ['Margin & Cash'],
        pressureRelevance: ['margin', 'stock', 'suppliers'],
        diagnosticQuestions: [
          'Is working capital actively managed as a lever or mainly visible as a balance sheet line?',
          'Do commercial and supply teams understand the cash consequence of stock and supplier decisions when they make them?',
          'Can you identify which stores or categories have costs above what their trading profile should justify?',
        ],
      },
    ],
  },

  // ── 8. Supplier Performance ───────────────────────────────────────────────
  suppliers: {
    id: 'suppliers', stage: 1, tier: 2,
    title: 'Supplier Performance',
    subtitle: 'Make supplier performance, claims, and commercial value visible before problems hit stores or money is left behind.',
    context: 'Suppliers affect availability, fresh quality, promotional reliability, and margin more than most retailers see clearly enough. When supplier performance slips, stores feel it. When claims drag, money is left on the table. When supplier support is tracked loosely, value leaks quietly through weak follow-through.',
    plays: [
      {
        id: 'sup-1',
        title: 'Supplier Performance and Inbound Risk',
        cardText: 'Build a consistent view of supplier reliability and detect inbound risk before stores feel the failure.',
        shortPain: 'Supplier performance affects availability, fresh quality, promotional reliability, and what customers find on the shelf. But many retailers manage supplier performance reactively. Problems surface through store complaints, short shipments, late deliveries, substitutions, and availability gaps rather than through systematic monitoring that catches patterns early.',
        whatWeDo: 'Build a comparable view of supplier performance across fill rate, on-time delivery, quality consistency, substitution rates, short shipments, lead time variability, and claims responsiveness. Separate isolated misses from chronic underperformance. Flag supplier and SKU combinations that are drifting toward service failure before availability is affected.',
        helpImprove: 'Supplier accountability, inbound reliability, earlier detection of recurring problems, fewer availability failures caused by supplier-side issues, and stronger factual basis for supplier reviews.',
        dataBehind: 'Connects purchase orders, order confirmations, delivery records, goods receipt data, quality checks, short shipments, substitutions, lead time variability, and claims history across the supplier base. The analytics distinguish one-off failures from structural underperformance, rank suppliers by service and commercial risk, and trigger early alerts when patterns suggest inbound disruption.',
        speed: 'Scoped Project', requirements: 'Moderate Requirements', cost: '$$',
        impact: ['Control & Visibility'],
        pressureRelevance: ['suppliers', 'stock', 'margin'],
        diagnosticQuestions: [
          'Do you have a consistent view of supplier fill rate, delivery reliability, and quality across the supplier base?',
          'Can you identify a supplier drifting toward delivery failure before it hits availability?',
          'Are safety stock and contingency plans adjusted based on current supplier reliability signals?',
        ],
      },
      {
        id: 'sup-2',
        title: 'Claims, Disputes and Value Recovery',
        cardText: 'Turn supplier claims and disputes into a structured recovery process that captures what the business is owed.',
        shortPain: 'Claims, invoice discrepancies, short shipments, quality rejections, agreed deductions, and unresolved disputes consume significant manual effort. Money that should be recovered from suppliers sits open for weeks or months. Some value is never recovered because follow-up is too slow, too manual, and too dependent on individual memory.',
        whatWeDo: 'Structure the claims and dispute process from capture to evidence, follow-up, escalation, and recovery. Automate document extraction and matching where possible so claims are raised faster and with better support. Make open claims, aging disputes, and recovery progress visible to finance and buying teams in one place.',
        helpImprove: 'Claims recovery rate, dispute resolution speed, reduction in manual chasing, visibility of open supplier-side value, and protection of margin from supplier-driven leakage.',
        dataBehind: 'Connects purchase orders, delivery notes, goods receipt records, invoices, quality inspection results, supplier terms, credit notes, and communication history to identify discrepancies and build claim evidence. The analytics track open claims by supplier, age, value, and status, flag stalled recovery, and show where repeated claims point to a structural supplier problem.',
        speed: 'Scoped Project', requirements: 'Moderate Requirements', cost: '$$',
        impact: ['Margin & Cash'],
        pressureRelevance: ['suppliers', 'margin', 'promos'],
        diagnosticQuestions: [
          'Do you have a clear view of total open supplier claims by supplier, age, value, and status?',
          'How much finance and buying time goes into manually chasing and assembling claim evidence?',
          'Are there suppliers or claim types where recovery is consistently below what was agreed?',
        ],
      },
      {
        id: 'sup-3',
        title: 'Supplier Funding and Joint Planning',
        cardText: 'Track agreed supplier support, segment key relationships, and focus joint planning where it creates real return.',
        shortPain: 'Supplier value extends beyond product cost. Promotional support, rebates, listing fees, agreed deductions, service commitments, and co-investment all form part of the relationship. But this value is often tracked inconsistently, captured incompletely, and not compared clearly against what was agreed. Management time can also be spread across the full supply base instead of focused where it creates most return.',
        whatWeDo: 'Map what has been agreed with each supplier and compare it against what has actually been received, recovered, or delivered. Segment suppliers by commercial scale, dependency, substitutability, service risk, and strategic potential. Define which suppliers need tighter performance management, which need joint planning, and which can be managed efficiently at arm\'s length.',
        helpImprove: 'Supplier commercial value capture, rebate and trade fund recovery, contract compliance visibility, prioritization of supplier management effort, stronger resilience, and more productive joint planning.',
        dataBehind: 'Connects supplier contracts, funding terms, rebates, promotional commitments, received payments, service history, category importance, substitutability, and commercial dependency. The analytics show where supplier value is falling short of agreement, where concentration risk is highest, and which relationships deserve deeper joint planning on promotions, seasons, availability, and category development.',
        speed: 'Scoped Project', requirements: 'Moderate Requirements', cost: '$$$',
        impact: ['Margin & Cash', 'Control & Visibility'],
        pressureRelevance: ['suppliers', 'margin', 'promos'],
        diagnosticQuestions: [
          'Do you have a complete view of agreed supplier funding, rebates, and co-investment commitments?',
          'Is supplier management intensity based on value, risk, dependency, and strategic potential, or mainly on habit?',
          'Where supplier concentration creates resilience risk, is that risk quantified and actively managed?',
        ],
      },
    ],
  },

  // ── 9. Reporting & Decisions ──────────────────────────────────────────────
  reporting: {
    id: 'reporting', stage: 1, tier: 1,
    title: 'Reporting & Decisions',
    subtitle: 'Turn trusted data into faster management decisions.',
    context: 'Most retailers do not lack data; they lack fast, trusted answers. Too much management time is spent rebuilding reports, reconciling spreadsheets, searching for exceptions, and waiting for someone else to answer a question. This domain creates the management layer above the data foundation: KPI views, automated packs, benchmarking, alerts, self-service answers, and decision support.',
    plays: [
      {
        id: 'rep-1',
        title: 'Management Reports and Performance Views',
        kktExperience: true,
        cardText: 'Give every management level one trusted KPI view, automated packs, and comparable performance diagnostics.',
        shortPain: 'Monday meetings start with debating which spreadsheet is right. Different teams produce different answers because metrics are calculated differently across systems and reporting cycles. Management packs take too long to assemble, and store or category comparisons are hard to interpret because structural differences are mixed with genuine underperformance.',
        whatWeDo: 'Define the core KPIs management actually uses and build a consistent reporting layer so those numbers refresh automatically. Deliver the right level of detail to each management tier: executive summary, regional and category views, store and supply chain detail. Add benchmarking logic so similar stores, categories, and regions can be compared in a way that distinguishes genuine performance gaps from structural differences.',
        helpImprove: 'Trust in numbers, reduced reconciliation time, faster management discussion, automated reporting cycles, better targeting of management attention, and clearer performance conversations.',
        dataBehind: 'Connects POS, ERP, stock, finance, loyalty, supplier, labor, waste, and store execution data through agreed KPI definitions and automated reporting views. The analytics refresh recurring packs, normalize performance against store format and trading context, identify where similar stores differ materially, and show whether gaps come from labor, margin, waste, availability, execution, or category mix.',
        speed: 'Quick Start', requirements: 'Moderate Requirements', cost: '$$',
        impact: ['Decision Speed', 'Control & Visibility'],
        pressureRelevance: ['reporting', 'margin', 'stores'],
        diagnosticQuestions: [
          'Do different teams produce different answers to the same question, such as margin, availability, or waste?',
          'Can you compare store performance in a way that separates genuine underperformance from format, location, or trading-area differences?',
          'When a store underperforms peers, do you have a diagnostic starting point or does the investigation begin from scratch?',
        ],
      },
      {
        id: 'rep-2',
        title: 'Alerts and Plain-Language Answers',
        kktExperience: true,
        cardText: 'Surface the exceptions that need action and let managers ask trusted business questions without waiting for an analyst.',
        shortPain: 'Retail leaders do not need to read everything every day, but most reporting presents everything at equal weight. Important exceptions are buried in dashboards or discovered late. At the same time, managers repeatedly ask similar questions about waste, stock, stores, promotions, suppliers, and margin, but must wait for analysts or search through reports to answer them.',
        whatWeDo: 'Define the exceptions that genuinely deserve attention across sales, stock, margin, waste, supplier performance, labor, and store execution. Route alerts to the right owner with clear priority and context. Provide self-service and conversational access to trusted business data so managers can investigate routine questions during the decision window. Where useful, connect operating documents and process knowledge so the same assistant can answer practical "what do I do next" questions.',
        helpImprove: 'Management focus, earlier intervention, reduced reporting noise, fewer analyst bottlenecks, faster response to trading issues, and wider use of trusted data across the business.',
        dataBehind: 'Connects trusted KPI definitions, operational data, alert thresholds, anomaly detection, ownership rules, and self-service query logic. The analytics distinguish real exceptions from normal variation, prioritize them by commercial impact, and route them to the right person. Natural language access lets managers ask business questions against governed data and documented processes without creating inconsistent spreadsheet answers.',
        speed: 'Scoped Project', requirements: 'Moderate Requirements', cost: '$$$',
        impact: ['Decision Speed'],
        pressureRelevance: ['reporting', 'stores', 'margin', 'stock'],
        diagnosticQuestions: [
          'Do dashboards clearly signal where attention is required, or do they present everything at equal weight?',
          'How quickly does a material exception reach the person who can act on it?',
          'How long does it take a manager to get an answer to a specific question that is not already in a standard report?',
        ],
      },
    ],
  },

  // ── 10. Loss Prevention ───────────────────────────────────────────────────
  loss_prevention: {
    id: 'loss_prevention', stage: 1, tier: 2,
    title: 'Loss Prevention',
    subtitle: 'Detect leakage earlier and focus investigation where value is genuinely at risk.',
    context: 'Food retail losses rarely arrive as one obvious event. They build through repeated refunds, voids, discounts, cashier anomalies, loyalty misuse, self-checkout abuse, stock adjustments, unexplained shrinkage, and process gaps. This domain helps risk, finance, operations, and store teams separate normal operating noise from patterns worth investigation.',
    plays: [
      {
        id: 'lp-1',
        title: 'Checkout Fraud and Transaction Abuse',
        kktExperience: true,
        cardText: 'Monitor refunds, voids, discounts, loyalty activity, cashier behavior, and self-checkout patterns for suspicious abuse.',
        shortPain: 'Suspicious activity at checkout often looks like normal retail noise: refunds, voids, discounts, overrides, loyalty adjustments, no-sales, and self-checkout exceptions. Manual spot checks cannot detect repeated low-value patterns across stores, shifts, cashiers, and customer accounts. By the time the pattern is obvious, value has already leaked.',
        whatWeDo: 'Monitor transaction patterns continuously by cashier, store, shift, customer account, payment type, and exception type. Separate normal operating variation from patterns that deserve investigation. Prioritize cases by likelihood and value at risk so audit and control teams focus on meaningful patterns rather than reviewing large volumes of low-value noise.',
        helpImprove: 'Fraud and abuse detection speed, shrinkage reduction, control team productivity, earlier intervention, and stronger protection of margin from internal and external leakage.',
        dataBehind: 'Connects POS transaction lines, refunds, voids, discounts, overrides, no-sales, loyalty events, self-checkout exceptions, cashier IDs, store context, shift patterns, and historical investigation outcomes. The analytics compare behavior against normal baselines, flag unusual combinations, rank cases by value at risk, and prepare evidence packs for review.',
        speed: 'Quick Start', requirements: 'Moderate Requirements', cost: '$$',
        impact: ['Risk & Loss Reduction'],
        pressureRelevance: ['fraud', 'margin'],
        diagnosticQuestions: [
          'Do you monitor refund, discount, void, override, and loyalty patterns by cashier, store, and shift?',
          'How much investigation time goes into cases that turn out to be low value or normal variation?',
          'Can suspicious self-checkout or loyalty activity be linked back to transaction and customer behavior?',
        ],
      },
      {
        id: 'lp-2',
        title: 'Shrinkage and Stock Loss Control',
        cardText: 'Detect unusual stock adjustments, unexplained losses, and shrinkage patterns by store, category, and process.',
        shortPain: 'Shrinkage is often visible only as a total write-off after the underlying patterns have built up. Stock adjustments, unexplained losses, inventory mismatches, admin errors, waste misclassification, and store-level process failures can all sit inside the same number. Without pattern detection, the business struggles to distinguish theft, waste, process error, supplier issue, and recording failure.',
        whatWeDo: 'Analyze shrinkage and stock adjustment patterns by store, category, SKU, time period, process step, and peer-store comparison. Identify unusual loss patterns that sit outside normal trading reality and route them for investigation or operational correction. Separate likely causes so loss prevention, operations, finance, and supplier teams know which type of action is required.',
        helpImprove: 'Shrinkage visibility, investigation focus, stock control, margin protection, process discipline, and earlier detection of recurring loss patterns.',
        dataBehind: 'Connects stock records, inventory counts, adjustments, waste logs, sales patterns, goods receipts, transfers, write-offs, store context, and peer comparisons to show where stock loss is unusual. The analytics separate probable causes, identify recurring patterns by store and category, and help route issues to loss prevention, store operations, finance, or supplier control depending on the evidence.',
        speed: 'Scoped Project', requirements: 'Moderate Requirements', cost: '$$',
        impact: ['Risk & Loss Reduction', 'Margin & Cash'],
        pressureRelevance: ['fraud', 'stock', 'margin'],
        diagnosticQuestions: [
          'Is shrinkage analyzed by likely cause, or does it mostly appear as one undifferentiated write-off figure?',
          'Can you identify stores or categories where stock loss is out of line with normal trading reality?',
          'Are stock adjustments and inventory mismatches monitored continuously or mainly reviewed after periodic counts?',
        ],
      },
    ],
  },

  // ── 11. Workforce & AI Assistants ─────────────────────────────────────────
  workforce_ai: {
    id: 'workforce_ai', stage: 1, tier: 2,
    title: 'Workforce & AI Assistants',
    subtitle: 'Give store, field, head-office, HR, legal, commercial, and service teams practical AI support for the work they already do every day.',
    context: 'This domain is deliberately different from heavy analytics builds. It focuses on low-friction assistants and controlled agents that draft, summarize, search, classify, follow up, and prepare work for human approval. The aim is faster daily execution, less manual administration, better consistency, and a visible first step into AI without requiring a full data platform first.',
    plays: [
      {
        id: 'wai-1',
        title: 'AI Office, Meeting and CRM Assistants',
        kktExperience: true,
        cardText: 'Capture meetings, extract tasks, draft updates, prepare CRM notes, and reduce routine office administration.',
        shortPain: 'Retail managers and head-office teams lose time to meeting notes, follow-up messages, CRM updates, weekly summaries, action tracking, and routine document drafting. Important decisions and tasks often remain buried in calls, emails, chats, and personal notes. The issue is not lack of work ethic; it is that too much coordination still depends on manual capture and memory.',
        whatWeDo: 'Set up practical AI assistants for everyday management work:\n- meeting transcription, summaries, decisions, tasks, owners, and deadlines;\n- CRM and customer-contact notes, follow-up drafts, and call summaries;\n- weekly update drafts, action trackers, and management note preparation;\n- routine email, memo, presentation, and report drafting under company style rules.',
        helpImprove: 'Management productivity, follow-up discipline, meeting effectiveness, CRM hygiene, communication speed, and reduction in low-value administrative effort.',
        dataBehind: 'Connects meeting transcripts, calendars, emails, CRM notes, documents, task lists, and company templates. AI summarizes discussions, extracts structured actions, drafts follow-ups, and prepares updates in the agreed company style. Human review remains in control, but the first draft and task capture no longer start from a blank page.',
        speed: 'Quick Start', requirements: 'Light Requirements', cost: '$',
        impact: ['Productivity', 'Decision Speed'],
        pressureRelevance: ['labor', 'reporting'],
        diagnosticQuestions: [
          'How much management time is spent writing notes, follow-ups, summaries, and CRM updates?',
          'Do meeting decisions reliably turn into visible tasks with owners and deadlines?',
          'Which recurring office tasks could be assisted safely with AI without changing core systems?',
        ],
      },
      {
        id: 'wai-2',
        title: 'Legal, Contract and Compliance Assistant',
        cardText: 'Support legal, contract, policy, and compliance work with AI review, drafting, comparison, and issue spotting.',
        shortPain: 'Legal and compliance work often sits across supplier contracts, lease documents, employment policies, promotional terms, food safety rules, privacy requirements, and internal procedures. Teams spend time reading long documents, comparing clauses, checking whether wording follows company standards, and preparing first drafts. Delays create risk, but full legal review capacity is usually limited.',
        whatWeDo: 'Create a controlled assistant that supports legal and compliance teams without replacing professional judgement:\n- review and summarize legal documents;\n- draft standard clauses, letters, policy updates, and contract comments using company guidelines;\n- compare supplier terms, lease clauses, and contract versions;\n- flag missing clauses, unusual terms, policy conflicts, and items needing legal approval;\n- help prepare compliance checklists and evidence packs.',
        helpImprove: 'Legal team productivity, contract review speed, consistency of standard wording, earlier risk spotting, and better preparation before specialist legal review.',
        dataBehind: 'Connects contract templates, company policies, approved clause libraries, supplier terms, regulatory guidance, previous legal comments, and document versions. AI compares wording, identifies deviations from standards, drafts controlled text, and highlights issues for human review. The assistant should be configured with approval boundaries because legal responsibility remains with the company and qualified reviewers.',
        speed: 'Quick Start', requirements: 'Light Requirements', cost: '$',
        impact: ['Risk & Loss Reduction', 'Productivity'],
        pressureRelevance: ['fraud', 'suppliers'],
        diagnosticQuestions: [
          'Which legal or compliance documents are reviewed repeatedly with similar checks?',
          'Do teams have approved templates and clause standards that AI can follow?',
          'Where do contract or policy delays create business risk or slow commercial execution?',
        ],
      },
      {
        id: 'wai-3',
        title: 'HR, Recruitment and Onboarding Assistant',
        kktExperience: true,
        cardText: 'Support recruitment, onboarding, policy Q&A, training content, and employee communication with AI.',
        shortPain: 'Retail HR teams handle high-volume recruitment, onboarding, policy questions, training materials, schedule communication, and employee documentation. Store managers often repeat the same explanations to new staff, while candidates and employees wait for basic information. This slows hiring, onboarding, and daily workforce support.',
        whatWeDo: 'Set up HR assistants for practical workforce tasks:\n- screen and summarize candidate applications against agreed role criteria;\n- draft job descriptions, interview questions, and candidate communications;\n- answer employee questions from approved policies and onboarding materials;\n- create training summaries, checklists, and store-ready learning content;\n- support manager communication around absence, rota changes, and basic HR processes.',
        helpImprove: 'Recruitment speed, onboarding consistency, HR team capacity, manager productivity, employee self-service, and quality of standard workforce communication.',
        dataBehind: 'Connects job descriptions, candidate CVs, HR policies, onboarding guides, training content, FAQs, and communication templates. AI summarizes applications, drafts communications, answers policy questions from approved sources, and highlights cases that require HR judgement. The workflow should include bias, privacy, and approval controls for recruitment and employee-related use.',
        speed: 'Quick Start', requirements: 'Light Requirements', cost: '$',
        impact: ['Productivity'],
        pressureRelevance: ['labor'],
        diagnosticQuestions: [
          'Which HR questions and onboarding steps are repeated most often across stores?',
          'How much hiring or onboarding time is spent on standard communication and document preparation?',
          'Are HR policies and training materials organized well enough for an assistant to answer from approved sources?',
        ],
      },
      {
        id: 'wai-4',
        title: 'Internal Knowledge and Store Operations Assistant',
        kktExperience: true,
        cardText: 'Give staff fast answers from SOPs, policies, manuals, product guidance, and store operating procedures.',
        shortPain: 'Operational knowledge is often scattered across shared folders, PDFs, chat history, printed manuals, and individual memory. Store teams need quick answers during trading hours: how to run a promotion, handle a refund, check freshness, escalate a maintenance issue, prepare an audit, or follow a safety process. If answers are hard to find, stores improvise and execution becomes inconsistent.',
        whatWeDo: 'Create an internal knowledge assistant connected to approved company content:\n- store SOPs, operating manuals, policies, audit checklists, and process guides;\n- product handling, freshness, hygiene, and safety instructions;\n- escalation paths for maintenance, supplier, customer, HR, and compliance issues;\n- role-specific answers for store teams, field managers, and head-office users.',
        helpImprove: 'Store consistency, onboarding speed, fewer repeated internal questions, faster issue handling, better use of company knowledge, and reduced dependence on informal memory.',
        dataBehind: 'Connects approved policies, manuals, SOPs, training materials, product guides, audit requirements, and historical Q&A into a governed knowledge base. AI retrieves the relevant answer, explains it in practical language, and can show the source document or escalation owner when needed. Usage patterns also show where procedures are unclear or missing.',
        speed: 'Quick Start', requirements: 'Light Requirements', cost: '$',
        impact: ['Productivity', 'Control & Visibility'],
        pressureRelevance: ['stores', 'labor'],
        diagnosticQuestions: [
          'Where do store teams currently look when they need a reliable answer during the working day?',
          'Which questions are repeatedly asked because the documented answer is hard to find?',
          'Are operating manuals and policies current enough to become a trusted knowledge source?',
        ],
      },
      {
        id: 'wai-5',
        title: 'Customer Service and Complaint Assistant',
        kktExperience: true,
        cardText: 'Answer routine customer questions, draft complaint responses, classify issues, and escalate complex cases with context.',
        shortPain: 'Customer service teams handle repeated questions about opening hours, loyalty points, promotions, refunds, product availability, delivery, store issues, and complaint status. Routine contacts consume capacity, while complex complaints often reach a person without enough context. Slow or inconsistent responses can turn small issues into customer dissatisfaction.',
        whatWeDo: 'Deploy a customer service assistant or controlled service agent across selected channels:\n- answer routine questions from approved content;\n- draft complaint responses in the company tone;\n- classify issues by store, category, severity, and topic;\n- retrieve customer, loyalty, order, or complaint context where available;\n- escalate cases that require human judgement with a prepared summary and recommended next step.',
        helpImprove: 'Response speed, first-contact resolution, service team productivity, complaint handling consistency, customer satisfaction, and visibility of recurring service issues.',
        dataBehind: 'Connects customer messages, FAQs, loyalty records, promotion terms, order or delivery status, store information, complaint history, and escalation rules. AI classifies the issue, retrieves relevant facts, drafts a response, and routes complex cases with context already assembled. The assistant should start with controlled topics before expanding to higher-risk resolutions.',
        speed: 'Scoped Project', requirements: 'Moderate Requirements', cost: '$$',
        impact: ['Customer Growth', 'Productivity'],
        pressureRelevance: ['customer', 'stores'],
        diagnosticQuestions: [
          'Which customer questions are routine enough to answer from approved content?',
          'How much time do service teams spend gathering context before resolving a complaint?',
          'Which channels should be automated first: app, WhatsApp, email, web chat, or call-center support?',
        ],
      },
      {
        id: 'wai-6',
        title: 'Supplier Communication and Claims Follow-Up Agent',
        cardText: 'Draft supplier follow-ups, chase open claims, request credit notes, and escalate disputes before value is lost.',
        shortPain: 'Buying and finance teams spend time chasing suppliers for delivery confirmations, missing documents, claim responses, credit notes, rebate evidence, and dispute updates. This work is important, but much of it follows predictable timing and wording. When follow-up is slow, valid claims age, agreed value is missed, and teams lose time on manual reminders.',
        whatWeDo: 'Create a supplier follow-up assistant or controlled agent that supports routine supplier communication:\n- draft and send standard follow-ups for open claims, missing documents, delivery issues, and credit notes;\n- track aging items and remind suppliers based on agreed rules;\n- summarize supplier responses and update case status;\n- escalate disputed, high-value, or unusual cases to buying or finance with the evidence already prepared.',
        helpImprove: 'Claims recovery speed, supplier response discipline, buying and finance productivity, fewer missed deductions, and better control over supplier-side value leakage.',
        dataBehind: 'Connects open claims, purchase orders, delivery records, invoices, credit note status, supplier contacts, contract terms, previous correspondence, and escalation rules. AI drafts supplier-ready communication grounded in actual case data, tracks responses, updates status, and flags where human judgement or negotiation is needed.',
        speed: 'Scoped Project', requirements: 'Moderate Requirements', cost: '$$',
        impact: ['Margin & Cash', 'Productivity'],
        pressureRelevance: ['suppliers', 'margin'],
        diagnosticQuestions: [
          'How many supplier follow-ups are routine enough to follow a standard rule and template?',
          'Where is supplier value lost because claims or credit notes are chased too slowly?',
          'Which supplier communications require human judgement, and which could be safely drafted or triggered by AI?',
        ],
      },
    ],
  },

  // ── 11. Expand and Monetize (Stage 3 — optional strategic module) ─────────
  expand_monetize: {
    id: 'expand_monetize', stage: 3, tier: 3,
    title: 'Expand and Monetize',
    subtitle: 'Use stronger customer access, supplier relationships, store traffic, loyalty data, digital channels, and local trust to create new revenue pools beyond classic product margin.',
    context: 'For a mid-sized food retailer, this should not mean building a bank, marketplace, or ad-tech platform from scratch. The practical route is usually partner-led, supplier-funded, measured carefully, and built only where it strengthens the core retail business rather than distracting from it.',
    plays: [
      {
        id: 'em-1',
        title: 'Retail Media and Supplier-Funded Activation',
        cardText: 'Turn supplier funding, loyalty audiences, app reach, and campaign measurement into controlled retail media pilots.',
        shortPain: 'Suppliers already spend money to gain visibility, support promotions, and grow categories, but much of that funding still goes into broad trade support or generic discounts. The retailer may have valuable customer attention through loyalty, app, web, receipts, digital circulars, screens, checkout, and store traffic, but no structured way to package, sell, manage, and measure that attention.',
        whatWeDo: 'Design a practical retail media and supplier-funded activation model around the channels the retailer already has. Start with a small number of suppliers, categories, audiences, and touchpoints. Define campaign packages, targeting rules, customer-experience guardrails, commercial terms, and measurement before scaling. Use partner platforms or managed-service routes where building a full in-house media stack is not realistic.',
        helpImprove: 'New supplier-funded revenue, stronger campaign measurement, better supplier activation, less reliance on blanket promotions, and a more professional commercial proposition to brand partners.',
        dataBehind: 'Connects loyalty audiences, basket behavior, product categories, supplier funding, campaign exposure, redemption, POS sales, margin, and repeat purchase to show whether supplier-funded activity creates real commercial value. The analytics support audience selection, campaign measurement, closed-loop reporting, and supplier-facing performance views without turning the retailer into an unfocused advertising network.',
        speed: 'Scoped Project', requirements: 'Moderate Requirements', cost: '$$$',
        impact: ['New Revenue', 'Supplier Monetization'],
        pressureRelevance: ['growth', 'promos', 'suppliers'],
        diagnosticQuestions: [
          'Which suppliers already ask for better targeting, shopper insight, or campaign measurement?',
          'Which channels have enough reach today: app, website, email, receipts, digital circulars, screens, checkout, or end-caps?',
          'Can campaign performance be measured credibly enough to show suppliers what their money achieved?',
        ],
      },
      {
        id: 'em-2',
        title: 'Supplier Insight Products',
        cardText: 'Package category, basket, promotion, launch, and shopper insight into supplier-facing products or premium collaboration tools.',
        shortPain: 'Supplier conversations often focus on price, volume, rebates, and promotion funding, while deeper performance insight is hidden or manually prepared. Many suppliers want to understand how their products perform, who buys them, what else is in the basket, where promotions work, where availability hurts sales, and how categories are shifting. The retailer already holds much of this insight but rarely packages it as a repeatable commercial product.',
        whatWeDo: 'Create supplier-facing insight products for priority categories and suppliers. Start with recurring reports where dashboards are not yet justified, then move toward controlled supplier dashboards or portals where demand is proven. Package performance views around category trends, SKU performance, store clusters, basket affinity, promotion response, launch performance, repeat purchase, and availability issues.',
        helpImprove: 'Supplier monetization, stronger joint category planning, better supplier funding conversations, faster campaign learning, and a clearer role for the retailer as a source of commercial insight rather than only shelf access.',
        dataBehind: 'Connects POS, basket, loyalty, product hierarchy, supplier mapping, promotion history, store clusters, launch cohorts, repeat purchase, and availability data into supplier-ready views. The analytics turn internal retail data into safe, aggregated, commercially useful insight products that can be sold, bundled into strategic agreements, or used to secure better supplier support.',
        speed: 'Quick Start', requirements: 'Moderate Requirements', cost: '$$',
        impact: ['Supplier Monetization'],
        pressureRelevance: ['growth', 'suppliers'],
        diagnosticQuestions: [
          'Which suppliers would materially value better visibility into category, basket, or promotion performance?',
          'Can product, supplier, category, store, and promotion data be connected reliably enough for supplier-facing reporting?',
          'Would supplier insight be sold directly, bundled into supplier agreements, or used to strengthen collaboration?',
        ],
      },
      {
        id: 'em-3',
        title: 'In-Store and Digital Channel Monetization',
        cardText: 'Monetize high-traffic stores, screens, receipts, checkout, circulars, and digital touchpoints without damaging customer trust.',
        shortPain: 'Food retailers have valuable customer attention in stores and digital channels, but much of it is unmanaged or not monetized as a measurable asset. Customers pass entrances, fresh counters, queues, end-caps, checkout, receipts, app banners, order pages, and digital circulars. The risk is clutter: monetizing every touchpoint without relevance can damage the customer experience and weaken trust.',
        whatWeDo: 'Map the retailer\'s physical and digital attention points and define where supplier-funded or partner-funded messages can be placed responsibly. Build packages for high-traffic zones, in-store screens, end-caps, app placements, digital circulars, receipts, checkout, and order confirmation moments. Pilot with selected stores, categories, and suppliers, then measure sales response, customer reaction, operational burden, and brand fit before scaling.',
        helpImprove: 'New revenue from existing traffic, stronger supplier activation, better use of physical and digital assets, more measurable in-store campaigns, and disciplined customer-experience control.',
        dataBehind: 'Connects store traffic, dwell zones, screen or placement schedules, campaign exposure, POS uplift, basket behavior, store clusters, customer segments, and campaign response. The analytics help choose where monetization is commercially attractive, test whether messages changed sales, and control frequency and relevance so the channel does not become visual or promotional noise.',
        speed: 'Scoped Project', requirements: 'Moderate Requirements', cost: '$$$',
        impact: ['New Revenue'],
        pressureRelevance: ['growth', 'stores', 'customer'],
        diagnosticQuestions: [
          'Which physical or digital touchpoints have enough traffic to be commercially interesting?',
          'Can these channels be monetized without making the store, app, or checkout experience feel cluttered?',
          'Can sales response and customer impact be measured by store, category, supplier, or campaign?',
        ],
      },
      {
        id: 'em-4',
        title: 'Paid Loyalty and Member Benefits',
        cardText: 'Turn loyalty from discount distribution into paid benefits, supplier-funded privileges, and stronger customer commitment.',
        shortPain: 'Many loyalty programs identify customers but do not create enough commitment, frequency, or share-of-wallet. Benefits are often funded from the retailer\'s own margin, while suppliers would value targeted access to high-value shoppers. Customers may be willing to pay for focused benefits, but only when the value is clear, relevant, and operationally reliable.',
        whatWeDo: 'Test paid loyalty or member benefit concepts around specific customer value: delivery or pickup, family essentials, private label, fresh, beverages, partner perks, early access, exclusive bundles, or supplier-funded privileges. Start with a controlled segment and one focused benefit bundle rather than a broad generic subscription. Measure adoption, frequency, basket, retention, margin, supplier contribution, and customer satisfaction before expanding.',
        helpImprove: 'Customer commitment, loyalty economics, recurring or supplier-funded revenue, retention of valuable groups, and lower dependence on retailer-funded discounting.',
        dataBehind: 'Connects loyalty profiles, RFM and LTV analytics, benefit usage, supplier-funded offers, subscription or membership status, purchase frequency, basket value, churn, and margin. The analytics identify which customers are likely to value paid or exclusive benefits, track whether behavior changes after joining, and compare member economics against a control group.',
        speed: 'Scoped Project', requirements: 'Moderate Requirements', cost: '$$',
        impact: ['Customer Ownership', 'New Revenue'],
        pressureRelevance: ['growth', 'customer'],
        diagnosticQuestions: [
          'Which customer groups would value a paid or exclusive benefit enough to change behavior?',
          'Are current loyalty benefits funded mainly by retailer margin or also by suppliers and partners?',
          'Can the retailer reliably deliver the promised benefit without creating service or margin problems?',
        ],
      },
      {
        id: 'em-5',
        title: 'Partner Ecosystem and Lifecycle Offers',
        cardText: 'Use local trust and loyalty access to connect customers with relevant partner services and lifecycle offers.',
        shortPain: 'Food retailers have frequent customer contact and local trust, but the loyalty relationship often stops at grocery purchases. Customers spend in adjacent areas such as fuel, pharmacy, telecom, banking, insurance, health, delivery, household services, and family needs. If partner offers are relevant, the retailer can become a trusted access point. If they are random or intrusive, the app becomes a coupon board and customer trust declines.',
        whatWeDo: 'Identify partner categories that fit the retailer\'s brand and customer permission. Build cross-loyalty pilots, partner-funded offers, earn/burn mechanics, benefit bundles, or lifecycle offers around moments where the retailer can credibly help: family, baby, pets, health, household setup, local services, or convenience. Define consent, data sharing, commercial settlement, offer quality, relevance, and frequency rules before scaling into a broader partner ecosystem.',
        helpImprove: 'Customer stickiness, partner-funded value, loyalty relevance beyond grocery, app engagement, local ecosystem role, and selective new revenue without owning every adjacent service.',
        dataBehind: 'Connects loyalty behavior, customer segments, basket signals, lifecycle indicators, partner offer catalogs, redemption, consent, attribution, and customer feedback. The analytics identify which partner offers are relevant to which customers, measure uptake and repeat behavior, and prevent the experience from becoming generic or over-targeted.',
        speed: 'Scoped Project', requirements: 'Moderate Requirements', cost: '$$$',
        impact: ['Customer Ownership', 'Strategic Expansion'],
        pressureRelevance: ['growth', 'customer'],
        diagnosticQuestions: [
          'Which adjacent partners would customers naturally accept through the retailer\'s loyalty or app relationship?',
          'Does the retailer have enough trust and reach to be valuable to partners?',
          'Which partner offers would reinforce the core grocery business rather than distract from it?',
        ],
      },
      {
        id: 'em-6',
        title: 'Selective Platform and Partnership Models',
        cardText: 'Explore marketplace, embedded finance, fulfillment monetization, and data collaboration only where maturity and demand justify it.',
        shortPain: 'Marketplace, embedded finance, logistics monetization, and privacy-safe data collaboration can look strategically attractive, but they add operational, regulatory, customer-experience, and technology complexity. For most mid-sized food retailers, these are not first moves. They should be evaluated selectively where the retailer has clear customer permission, partner demand, operational capacity, and a strong reason to extend beyond the core.',
        whatWeDo: 'Assess which advanced models are realistic and which should be avoided. For marketplace, test curated adjacent categories through partners rather than broad open assortment. For embedded finance, use licensed partners rather than owning regulated operations. For fulfillment monetization, test only where spare capacity and economics are real. For data collaboration, define privacy, consent, aggregation, and access rules before any partner use.',
        helpImprove: 'Strategic option clarity, avoidance of distracting platform bets, better partner selection, controlled expansion beyond grocery, and stronger leadership discipline around what not to pursue.',
        dataBehind: 'Connects customer demand signals, partner economics, marketplace category fit, payment and loyalty behavior, fulfillment capacity, route density, service levels, privacy rules, and supplier or partner demand. The analytics model whether an advanced option has enough commercial upside, operational capacity, and customer fit to justify a pilot, while making the risks and prerequisites visible before investment.',
        speed: 'Strategic Build', requirements: 'High Requirements', cost: '$$$$',
        impact: ['Strategic Expansion'],
        pressureRelevance: ['growth'],
        diagnosticQuestions: [
          'Is there clear customer permission and partner demand for the advanced model being considered?',
          'Would the model strengthen the core retail business or distract management and operations from it?',
          'Can the retailer test the opportunity through a narrow partner-led pilot before committing to platform investment?',
        ],
      },
    ],
  },
};

// ─── DOMAIN ORDER ─────────────────────────────────────────────────────────────
window.ALL_DOMAINS = [
  DOMAINS.data_foundation,
  DOMAINS.customer,
  DOMAINS.promos,
  DOMAINS.stock,
  DOMAINS.warehouse_transport,
  DOMAINS.stores,
  DOMAINS.margin,
  DOMAINS.suppliers,
  DOMAINS.reporting,
  DOMAINS.loss_prevention,
  DOMAINS.workforce_ai,
  DOMAINS.expand_monetize,
];

// ─── FLAT SERVICE LIST ────────────────────────────────────────────────────────
window.getAllServices = function() {
  const services = [];
  (window.ALL_DOMAINS || []).forEach(domain => {
    (domain.plays || []).forEach(play => {
      services.push({ ...play, domainId: domain.id, domainTitle: domain.title, stage: domain.stage });
    });
  });
  return services;
};

// ─── RECOMMENDATION ENGINE ────────────────────────────────────────────────────
window.getRecommendedServices = function(answers) {
  const pressures   = answers.pressures || [];
  const areas       = answers.businessAreas || [];
  const improvement = answers.improvement || '';

  const speedOrder = { 'Quick Start': 0, 'Scoped Project': 1, 'Strategic Build': 2 };
  const reqOrder   = { 'Light Requirements': 0, 'Moderate Requirements': 1, 'High Requirements': 2 };

  const allServices = window.getAllServices();

  const scored = allServices.map(svc => {
    let score = 0;
    const isStage3 = svc.stage === 3;
    const hasGrowth = pressures.includes('growth');
    const hasStrategic = improvement === 'strategic';
    const hasCustomerSupplierPromos = pressures.includes('customer') && pressures.includes('suppliers') && pressures.includes('promos');

    if (isStage3) {
      if (!hasGrowth && !hasStrategic && !hasCustomerSupplierPromos) return { ...svc, _score: 0, _reason: '' };
      score -= 2;
    }

    const pressureHits = (svc.pressureRelevance || []).filter(p => pressures.includes(p));
    score += pressureHits.length * 4;

    const domainAreas = (window.DOMAIN_AREAS || {})[svc.domainId] || [];
    const areaHits = domainAreas.filter(a => areas.includes(a));
    score += areaHits.length * 2;

    if (improvement === 'quick') {
      if (svc.speed === 'Quick Start') score += 3;
      if (svc.speed === 'Scoped Project') score += 1;
      if (svc.requirements === 'Light Requirements') score += 2;
      if (svc.requirements === 'Moderate Requirements') score += 1;
    } else if (improvement === 'deep') {
      if (svc.speed === 'Scoped Project') score += 3;
      if (svc.requirements === 'Moderate Requirements') score += 1;
      if (svc.requirements === 'High Requirements') score += 2;
    } else if (improvement === 'strategic') {
      if (svc.stage === 2) score += 2;
      if (svc.stage === 3) score += 3;
    }

    if (svc.speed === 'Strategic Build' && improvement !== 'strategic') score -= 2;

    const catalogIndex = allServices.indexOf(svc);
    score += Math.max(0, (46 - catalogIndex) * 0.1);

    let reason = '';
    if (pressureHits.length > 0) {
      const pressureLabels = pressureHits.map(p => (window.PRESSURES.find(pr => pr.id === p) || {}).label || p);
      reason = `Relevant to: ${pressureLabels.map(l => l.toLowerCase()).join(', ')}.`;
    } else if (areaHits.length > 0) {
      reason = 'Strong fit for your selected business area.';
    }

    return { ...svc, _score: score, _reason: reason };
  });

  const relevant = scored.filter(s => s._score > 0);
  relevant.sort((a, b) => b._score - a._score);
  return relevant.slice(0, 8);
};

window.getRecommendedDomains = function(answers) {
  const pressures = answers.pressures || (answers.pressure ? [answers.pressure] : []);
  const scores = {};
  pressures.forEach(pid => {
    (PRESSURE_DOMAINS[pid] || []).forEach((did, i) => {
      scores[did] = (scores[did] || 0) + (5 - i);
    });
  });
  return (window.ALL_DOMAINS || [])
    .filter(d => scores[d.id])
    .sort((a, b) => (scores[b.id] || 0) - (scores[a.id] || 0))
    .slice(0, 4);
};

// ─── SORT PLAYS ───────────────────────────────────────────────────────────────
window.sortPlays = function(plays, sortBy = 'default') {
  const speedOrder = { 'Quick Start': 0, 'Scoped Project': 1, 'Strategic Build': 2 };
  const reqOrder   = { 'Light Requirements': 0, 'Moderate Requirements': 1, 'High Requirements': 2 };
  const costOrder  = { '$': 0, '$$': 1, '$$$': 2, '$$$$': 3 };
  if (sortBy === 'speed')        return [...plays].sort((a,b) => speedOrder[a.speed] - speedOrder[b.speed]);
  if (sortBy === 'requirements') return [...plays].sort((a,b) => reqOrder[a.requirements] - reqOrder[b.requirements]);
  if (sortBy === 'cost')         return [...plays].sort((a,b) => costOrder[a.cost] - costOrder[b.cost]);
  return [...plays].sort((a,b) => {
    const s = speedOrder[a.speed] - speedOrder[b.speed];
    if (s !== 0) return s;
    return reqOrder[a.requirements] - reqOrder[b.requirements];
  });
};

// ─── CO-PILOT SYSTEM PROMPT ──────────────────────────────────────────────────
window.COPILOT_SYSTEM = `You are a retail transformation advisor embedded in the Retail AI Canvas — a strategic tool for senior leaders at mid-sized food retailers.

Stage model:
- Stage 1 (Strengthen Core Operations): Data Foundation, Stock & Availability, Warehouse & Transport Operations, Store Execution, Margin & Cash, Supplier Performance, Reporting & Decisions, Loss Prevention, Workforce & AI Assistants
- Stage 2 (Optimize and Grow): Customers & Loyalty, Promotions & Pricing
- Stage 3 (Expand and Monetize): optional strategic expansion — retail media, supplier activation, paid loyalty, partner ecosystems, new revenue pools — only relevant when the core is mature

Tone rules:
- Speak in retail business language: margin, waste, availability, basket, promotions, stock cover, working capital
- Stay under 120 words unless asked for more depth
- Lead with the business problem, not the technology
- Explain trade-offs clearly and honestly — including sequencing and complexity
- Admit when a diagnostic is needed before recommending a path
- Avoid: "digital transformation", "hyper-personalization", "game-changing", "state-of-the-art"
- Do not promise fixed financial results
- Do not push platform-first programs by default — recommend pragmatic entry points
- Stage 3 is optional and strategic. Do not recommend it as a default starting point.

When asked where to start: ask one clarifying question about their biggest pressure, then recommend 2–3 relevant areas with brief rationale.
When asked about a specific domain or play: explain the business problem first, the improvement second, what would need to be true third.`;
