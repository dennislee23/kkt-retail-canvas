// roadmap-data.js - Retail AI Canvas roadmap layer V1
// Source: RETAIL_CANVAS_ROADMAP_V1.md

window.ROADMAP_READINESS_OPTIONS = [
  {
    id: 'missing',
    label: 'No / weak',
    meaning: 'The capability is absent, inconsistent, or mostly manual.',
  },
  {
    id: 'partial',
    label: 'Partly',
    meaning: 'Some capability exists, but it is fragmented, late, or not trusted enough for decisions.',
  },
  {
    id: 'working',
    label: 'Yes / working',
    meaning: 'The capability is reliable enough to support regular management action.',
  },
];

window.ROADMAP_BLOCK_STATES = [
  {
    id: 'interesting',
    label: 'Interesting',
    behavior: 'Keep in route and show linked solution cards.',
  },
  {
    id: 'already_exists',
    label: 'Already exists',
    behavior: 'Move downstream blocks forward, but keep a light verification note.',
  },
  {
    id: 'not_relevant',
    label: 'Not relevant',
    behavior: 'Remove from route and explain any dependency impact.',
  },
  {
    id: 'later',
    label: 'Later',
    behavior: 'Keep as future option and avoid making it a current dependency unless required.',
  },
];

window.ROADMAP_DEPENDENCY_TYPES = {
  visibility: 'Something must first be measurable or observable.',
  definitions: 'KPI, product, customer, supplier, margin, or process definitions must be aligned.',
  ownership: 'Business owners and action routes must be clear.',
  process_discipline: 'Teams must follow enough standard practice for optimization to be useful.',
  data_confidence: 'Source quality and refresh logic must be trusted enough for decisions.',
  customer_access: 'Loyalty, app, CRM, service, or digital channels must create usable customer reach.',
  supplier_relevance: 'Supplier scale, funding, or category relationships must justify supplier-facing plays.',
  automation_boundaries: 'Rules, approvals, and escalation paths must exist before agents automate work.',
  operating_capacity: 'The business must have enough adoption capacity to scale beyond pilots.',
};

window.ROADMAP_STEPS = [
  {
    id: 'see',
    sequence: 1,
    label: 'See',
    stageLabel: 'Strengthen Core Operations',
    executiveQuestion: 'What must become visible before we choose where to act?',
    purpose: 'Create a common factual base and reveal value leakage.',
    typicalOutputs: ['KPI alignment', 'trusted views', 'diagnosis of leakage'],
    maturitySignal: 'Leaders can see the same problem, from the same numbers, early enough to act.',
    avoid: 'Building a broad data platform before the first business questions are clear.',
  },
  {
    id: 'control',
    sequence: 2,
    label: 'Control',
    stageLabel: 'Strengthen Core Operations',
    executiveQuestion: 'What needs ownership, rules, and response before optimization?',
    purpose: 'Improve consistency, exception handling, and management response.',
    typicalOutputs: ['exception routes', 'clear owners', 'operating controls'],
    maturitySignal: 'Teams can act on visible issues before they become margin, stock, or customer damage.',
    avoid: 'Treating dashboards as value delivery when nobody owns the action.',
  },
  {
    id: 'optimize',
    sequence: 3,
    label: 'Optimize',
    stageLabel: 'Optimize and Grow',
    executiveQuestion: 'What decisions can now be improved with better analytics?',
    purpose: 'Use evidence, forecasting, segmentation, and decision support to improve economics.',
    typicalOutputs: ['better forecasts', 'targeted decisions', 'commercial optimization'],
    maturitySignal: 'Analytics change decisions before outcomes are locked in.',
    avoid: 'Jumping to advanced models before the business trusts inputs and controls exceptions.',
  },
  {
    id: 'scale',
    sequence: 4,
    label: 'Scale',
    stageLabel: 'Optimize and Grow',
    executiveQuestion: 'What can become a repeatable operating routine?',
    purpose: 'Embed better decisions into recurring work and reduce manual dependence.',
    typicalOutputs: ['embedded recommendations', 'controlled assistants', 'scenario routines'],
    maturitySignal: 'Better decisions are used repeatedly across teams, not only in one-off analysis.',
    avoid: 'Scaling a process before the operating model works in a focused area.',
  },
  {
    id: 'expand',
    sequence: 5,
    label: 'Expand',
    stageLabel: 'Expand and Monetize',
    executiveQuestion: 'Which optional new value pools become realistic later?',
    purpose: 'Use stronger customer access, supplier relevance, and operating intelligence as strategic assets.',
    typicalOutputs: ['supplier monetization', 'customer ownership plays', 'selective partnerships'],
    maturitySignal: 'New revenue plays are supported by trusted measurement, customer access, and operating capacity.',
    avoid: 'Presenting strategic expansion as the default next step for every retailer.',
    optional: true,
  },
];

window.ROADMAP_NODES = [
  {
    id: 'trusted-retail-facts',
    stepId: 'see',
    title: 'Trusted retail facts',
    shortRole: 'Create one reliable view of the numbers leaders use to decide.',
    primaryDomains: ['data_foundation', 'reporting', 'margin'],
    linkedCards: ['df-1', 'df-2', 'rep-1', 'margin-1'],
    dependsOn: [],
    unlocks: ['exception-led-control', 'commercial-optimization', 'scenario-led-decisions', 'controlled-assistant-operating-model'],
    dependencyTypes: ['visibility', 'definitions', 'ownership'],
    readinessSignals: [
      'Key KPIs have named business owners.',
      'Leaders no longer reconcile conflicting versions before deciding.',
      'Priority reports connect to source logic and quality checks.',
    ],
    executiveWhy: 'Without trusted numbers, later optimization only speeds up disagreement.',
    defaultWeight: 'high',
  },
  {
    id: 'margin-stock-waste-visibility',
    stepId: 'see',
    title: 'Margin, stock, and waste visibility',
    shortRole: 'Show where stock, waste, margin, and working capital are creating hidden economic pressure.',
    primaryDomains: ['stock', 'margin'],
    linkedCards: ['stock-3', 'stock-4', 'margin-1', 'margin-4'],
    dependsOn: ['trusted-retail-facts'],
    unlocks: ['stock-freshness-availability-control', 'commercial-optimization', 'forecast-planning-replenishment-quality'],
    dependencyTypes: ['visibility', 'definitions', 'data_confidence'],
    readinessSignals: [
      'Leaders can see slow-moving stock, waste risk, and margin pressure by category or store.',
      'Teams can distinguish high-value exceptions from noise.',
      'Finance and commercial teams can discuss stock cash using the same facts.',
    ],
    executiveWhy: 'A large share of practical food-retail value often starts with seeing where stock, waste, and margin leak value.',
    defaultWeight: 'high',
  },
  {
    id: 'customer-market-signal-visibility',
    stepId: 'see',
    title: 'Customer and market signal visibility',
    shortRole: 'Make customer behavior, feedback, market movement, and promotion response visible before heavier optimization.',
    primaryDomains: ['customer', 'promos'],
    linkedCards: ['cust-4', 'promo-1', 'promo-5', 'cust-1'],
    dependsOn: [],
    unlocks: ['customer-value-growth', 'commercial-optimization', 'supplier-monetization-options'],
    dependencyTypes: ['visibility', 'customer_access', 'data_confidence'],
    readinessSignals: [
      'Management can see which customers, campaigns, stores, categories, and competitors are moving.',
      'Feedback themes are routed to owners.',
      'Promotion results are measured beyond headline sales.',
    ],
    executiveWhy: 'Commercial optimization needs real signals about customers, campaigns, competitors, and stores.',
    defaultWeight: 'high',
  },
  {
    id: 'supplier-inbound-visibility',
    stepId: 'see',
    title: 'Supplier and inbound visibility',
    shortRole: 'Show where supplier service, claims, funding, inbound risk, and category dependency affect value.',
    primaryDomains: ['suppliers', 'promos'],
    linkedCards: ['sup-1', 'sup-2', 'sup-3', 'promo-1'],
    dependsOn: [],
    unlocks: ['supplier-value-control', 'supplier-monetization-options'],
    dependencyTypes: ['visibility', 'ownership', 'supplier_relevance'],
    readinessSignals: [
      'Supplier performance is visible by supplier, category, and store impact.',
      'Claims and deductions are tracked through ownership and resolution.',
      'Supplier funding is compared against what was agreed and recovered.',
    ],
    executiveWhy: 'Supplier value is often fragmented across buying, finance, supply chain, and stores.',
    defaultWeight: 'medium',
  },
  {
    id: 'exception-led-control',
    stepId: 'control',
    title: 'Exception-led operating control',
    shortRole: 'Move from seeing issues to routing the right exceptions to the right owners quickly.',
    primaryDomains: ['reporting', 'stores', 'stock'],
    linkedCards: ['rep-2', 'store-1', 'store-2', 'stock-4'],
    dependsOn: ['trusted-retail-facts'],
    unlocks: ['store-field-execution-scale', 'controlled-assistant-operating-model', 'commercial-optimization'],
    dependencyTypes: ['ownership', 'process_discipline', 'visibility'],
    readinessSignals: [
      'Exceptions are prioritized by business value and urgency.',
      'Recurring issues are assigned to owners.',
      'Leaders can see whether actions moved from insight to outcome.',
    ],
    executiveWhy: 'Dashboards do not create value unless the organization can act on exceptions reliably.',
    defaultWeight: 'high',
  },
  {
    id: 'stock-freshness-availability-control',
    stepId: 'control',
    title: 'Stock, freshness, and availability control',
    shortRole: 'Control availability, waste, replenishment exceptions, and fresh risk before more autonomous replenishment.',
    primaryDomains: ['stock', 'stores', 'suppliers'],
    linkedCards: ['stock-1', 'stock-2', 'stock-3', 'stock-4'],
    dependsOn: ['margin-stock-waste-visibility'],
    unlocks: ['forecast-planning-replenishment-quality', 'store-field-execution-scale'],
    dependencyTypes: ['visibility', 'process_discipline', 'ownership'],
    readinessSignals: [
      'Out-of-stock and waste risk are seen before customer or margin damage is locked in.',
      'Planners understand whether the cause is demand, supplier, ordering, store execution, or pricing.',
      'Exceptions have clear action rules.',
    ],
    executiveWhy: 'Optimization in stock and fresh only works when the business can first control the basic exceptions.',
    defaultWeight: 'high',
  },
  {
    id: 'supplier-value-control',
    stepId: 'control',
    title: 'Supplier value control',
    shortRole: 'Control supplier-side value leakage across service, claims, disputes, funding, and joint planning.',
    primaryDomains: ['suppliers', 'workforce_ai'],
    linkedCards: ['sup-1', 'sup-2', 'sup-3', 'wai-6'],
    dependsOn: ['supplier-inbound-visibility'],
    unlocks: ['supplier-monetization-options', 'controlled-assistant-operating-model'],
    dependencyTypes: ['ownership', 'supplier_relevance', 'process_discipline'],
    readinessSignals: [
      'Claims do not depend on manual memory.',
      'Supplier follow-up has owners and status.',
      'Buying, finance, and supply chain share one view of supplier value.',
    ],
    executiveWhy: 'Supplier funding, claims, and service issues become controllable only when they stop being scattered.',
    defaultWeight: 'medium',
  },
  {
    id: 'risk-loss-compliance-control',
    stepId: 'control',
    title: 'Risk, loss, and compliance control',
    shortRole: 'Control transaction abuse, shrinkage, stock loss, legal/compliance support, and HR risk before expanding automation.',
    primaryDomains: ['loss_prevention', 'workforce_ai'],
    linkedCards: ['lp-1', 'lp-2', 'wai-2', 'wai-3'],
    dependsOn: [],
    unlocks: ['controlled-assistant-operating-model'],
    dependencyTypes: ['automation_boundaries', 'ownership', 'data_confidence'],
    readinessSignals: [
      'Risk signals are prioritized by value and severity.',
      'Human review remains attached to sensitive decisions.',
      'Exceptions route to the right control owner based on evidence.',
    ],
    executiveWhy: 'AI support in risk-sensitive areas should increase discipline and review quality, not create uncontrolled answers.',
    defaultWeight: 'situational',
  },
  {
    id: 'commercial-optimization',
    stepId: 'optimize',
    title: 'Commercial optimization',
    shortRole: 'Improve promotions, pricing, markdowns, assortment choices, and commercial allocation using better evidence.',
    primaryDomains: ['promos', 'customer', 'margin'],
    linkedCards: ['promo-1', 'promo-2', 'promo-3', 'promo-4', 'cust-1', 'margin-1'],
    dependsOn: ['trusted-retail-facts', 'customer-market-signal-visibility', 'exception-led-control'],
    unlocks: ['scenario-led-decisions', 'supplier-monetization-options', 'customer-ownership-monetization'],
    dependencyTypes: ['data_confidence', 'definitions', 'process_discipline'],
    readinessSignals: [
      'Commercial teams can compare uplift, margin, basket, cannibalization, and stock effects.',
      'Pricing and promotion decisions are not driven only by habit or supplier pressure.',
      'Recommendations can be reviewed against business strategy.',
    ],
    executiveWhy: 'This is often one of the larger Stage 2 value pools because it directly affects margin quality and growth.',
    defaultWeight: 'high',
  },
  {
    id: 'customer-value-growth',
    stepId: 'optimize',
    title: 'Customer value growth',
    shortRole: 'Improve customer targeting, retention, basket growth, loyalty economics, and service intelligence.',
    primaryDomains: ['customer', 'promos', 'workforce_ai'],
    linkedCards: ['cust-1', 'cust-2', 'cust-3', 'cust-4', 'promo-2', 'wai-5'],
    dependsOn: ['customer-market-signal-visibility'],
    unlocks: ['customer-ownership-monetization', 'supplier-monetization-options'],
    dependencyTypes: ['customer_access', 'data_confidence', 'definitions'],
    readinessSignals: [
      'Customer groups are linked to different business actions.',
      'Loyalty investment is measured against behavior and margin.',
      'Retention and win-back activity is prioritized instead of broad messaging.',
    ],
    executiveWhy: 'Customer growth becomes more profitable when the retailer knows which customers to protect, grow, or reactivate.',
    defaultWeight: 'high',
  },
  {
    id: 'forecast-planning-replenishment-quality',
    stepId: 'optimize',
    title: 'Forecast-led planning and replenishment quality',
    shortRole: 'Use forecasting, event planning, replenishment logic, labor planning, and rolling financial views to improve forward decisions.',
    primaryDomains: ['stock', 'stores', 'margin'],
    linkedCards: ['stock-1', 'stock-2', 'store-4', 'margin-2', 'margin-4'],
    dependsOn: ['stock-freshness-availability-control'],
    unlocks: ['scenario-led-decisions', 'store-field-execution-scale'],
    dependencyTypes: ['data_confidence', 'process_discipline', 'operating_capacity'],
    readinessSignals: [
      'Forecasts are connected to actions, not just reports.',
      'Teams understand where constraints force excess or shortage.',
      'Financial risk is visible early enough for corrective action.',
    ],
    executiveWhy: 'Forward-looking analytics are valuable only when they change decisions before outcomes are locked in.',
    defaultWeight: 'high',
  },
  {
    id: 'scenario-led-decisions',
    stepId: 'scale',
    title: 'Scenario-led decisions',
    shortRole: 'Make major choices testable before they are scaled across stores, categories, suppliers, or customer groups.',
    primaryDomains: ['margin', 'promos', 'stock'],
    linkedCards: ['margin-3', 'margin-2', 'promo-3', 'stock-2'],
    dependsOn: ['trusted-retail-facts', 'commercial-optimization', 'forecast-planning-replenishment-quality'],
    unlocks: ['selective-platform-partnership-models'],
    dependencyTypes: ['definitions', 'data_confidence', 'operating_capacity'],
    readinessSignals: [
      'Options can be compared side by side.',
      'Plans are checked for P&L, cash, and risk consequences.',
      'Attractive ideas are challenged before expensive rollout.',
    ],
    executiveWhy: 'Scenario discipline helps leaders avoid scaling decisions that do not hold up economically.',
    defaultWeight: 'medium',
  },
  {
    id: 'controlled-assistant-operating-model',
    stepId: 'scale',
    title: 'Controlled assistant operating model',
    shortRole: 'Embed AI assistants and agents into daily work with approved knowledge, review rules, and escalation boundaries.',
    primaryDomains: ['workforce_ai', 'reporting'],
    linkedCards: ['wai-1', 'wai-2', 'wai-3', 'wai-4', 'wai-5', 'wai-6', 'rep-2'],
    dependsOn: ['trusted-retail-facts', 'exception-led-control', 'risk-loss-compliance-control'],
    unlocks: [],
    dependencyTypes: ['automation_boundaries', 'ownership', 'data_confidence'],
    readinessSignals: [
      'Assistants use approved sources.',
      'Humans remain in control where judgment or accountability is required.',
      'Drafting, search, follow-up, and escalation are part of recurring workflows.',
    ],
    executiveWhy: 'Assistants scale productivity only when they are attached to controlled sources and business processes.',
    defaultWeight: 'medium',
  },
  {
    id: 'store-field-execution-scale',
    stepId: 'scale',
    title: 'Store and field execution at scale',
    shortRole: 'Make operating routines, field tasks, shelf checks, labor planning, and issue escalation consistent across the network.',
    primaryDomains: ['stores', 'workforce_ai'],
    linkedCards: ['store-1', 'store-2', 'store-3', 'store-4', 'wai-4'],
    dependsOn: ['exception-led-control'],
    unlocks: ['supplier-monetization-options'],
    dependencyTypes: ['ownership', 'process_discipline', 'operating_capacity'],
    readinessSignals: [
      'Regional and store teams see what was done, missed, recurring, and resolved.',
      'Field activity connects to business outcomes.',
      'Labor and execution gaps are visible early enough to act.',
    ],
    executiveWhy: 'Retail improvements scale only when store execution follows the plan closely enough for decisions to reach customers.',
    defaultWeight: 'medium',
  },
  {
    id: 'supplier-monetization-options',
    stepId: 'expand',
    title: 'Supplier monetization options',
    shortRole: 'Use supplier relevance, campaign measurement, customer attention, and category insight to create controlled supplier-funded value pools.',
    primaryDomains: ['expand_monetize', 'suppliers', 'promos'],
    linkedCards: ['em-1', 'em-2', 'em-3', 'sup-3', 'promo-1'],
    dependsOn: ['supplier-value-control', 'commercial-optimization'],
    unlocks: [],
    dependencyTypes: ['supplier_relevance', 'data_confidence', 'customer_access'],
    readinessSignals: [
      'Priority suppliers would materially value the insight or activation.',
      'Campaign measurement is trusted enough to sell externally.',
      'The customer experience can be controlled.',
    ],
    executiveWhy: 'Supplier monetization should start where the retailer already has credible attention, supplier demand, and measurement discipline.',
    defaultWeight: 'situational',
    optional: true,
  },
  {
    id: 'customer-ownership-monetization',
    stepId: 'expand',
    title: 'Customer ownership monetization',
    shortRole: 'Use stronger customer access and loyalty economics to test paid benefits, partner offers, and lifecycle value pools.',
    primaryDomains: ['expand_monetize', 'customer'],
    linkedCards: ['em-4', 'em-5', 'cust-1', 'cust-2', 'cust-3'],
    dependsOn: ['customer-value-growth'],
    unlocks: ['selective-platform-partnership-models'],
    dependencyTypes: ['customer_access', 'data_confidence', 'operating_capacity'],
    readinessSignals: [
      'Customer segments have clear value needs.',
      'Benefit economics can be measured against a control group.',
      'The retailer can protect trust and avoid generic subscription ideas.',
    ],
    executiveWhy: 'Customer monetization becomes realistic only when the retailer understands what customers value.',
    defaultWeight: 'situational',
    optional: true,
  },
  {
    id: 'selective-platform-partnership-models',
    stepId: 'expand',
    title: 'Selective platform and partnership models',
    shortRole: 'Evaluate broader platform, marketplace, embedded finance, fulfillment, or data collaboration ideas only where maturity and demand justify them.',
    primaryDomains: ['expand_monetize', 'margin', 'data_foundation'],
    linkedCards: ['em-6', 'margin-3', 'em-5', 'df-1'],
    dependsOn: ['scenario-led-decisions', 'customer-ownership-monetization'],
    unlocks: [],
    dependencyTypes: ['operating_capacity', 'customer_access', 'data_confidence'],
    readinessSignals: [
      'The business can explain what not to pursue.',
      'Expansion options are tested against demand, operating capacity, and economics.',
      'Leadership understands prerequisite gaps before investment.',
    ],
    executiveWhy: 'Platform-style bets should be selective, evidence-led, and disciplined.',
    defaultWeight: 'situational',
    optional: true,
  },
];

window.ROADMAP_PATHWAYS = [
  {
    id: 'margin-cash-path',
    title: 'Margin and cash discipline',
    triggerPressures: ['margin', 'stock', 'promos', 'suppliers', 'reporting'],
    triggerBusinessAreas: ['finance', 'commercial', 'exec', 'procurement'],
    executiveUseCase: 'Understand where margin, stock cash, supplier value, and commercial decisions are leaking value.',
    steps: [
      { stepId: 'see', nodeIds: ['trusted-retail-facts', 'margin-stock-waste-visibility'] },
      { stepId: 'control', nodeIds: ['exception-led-control', 'supplier-value-control'] },
      { stepId: 'optimize', nodeIds: ['commercial-optimization', 'forecast-planning-replenishment-quality'] },
      { stepId: 'scale', nodeIds: ['scenario-led-decisions'] },
      { stepId: 'expand', nodeIds: ['supplier-monetization-options'], optional: true },
    ],
    primaryLinkedCards: ['df-2', 'margin-1', 'stock-3', 'stock-4', 'sup-2', 'sup-3', 'promo-3', 'promo-4', 'margin-3', 'em-2'],
    readinessQuestions: [
      'Do leadership, finance, and commercial teams trust the same margin numbers?',
      'Can you see margin, stock cash, waste, and working capital pressure by category, store, or supplier?',
      'Are major margin leaks assigned to owners with clear follow-up?',
      'Can you compare promotion, pricing, stock, and supplier decisions against margin impact?',
      'Do you test major commercial or stock decisions before scaling them?',
    ],
    diagnosticNote: 'The starting point should be whichever leakage is largest and currently least controlled: margin visibility, stock cash, waste, supplier value, or promotion economics.',
  },
  {
    id: 'stock-freshness-path',
    title: 'Stock, freshness, and availability',
    triggerPressures: ['stock', 'margin', 'stores', 'suppliers'],
    triggerBusinessAreas: ['supply', 'store_ops', 'commercial', 'finance'],
    executiveUseCase: 'Reduce stockouts, overstock, fresh waste, working capital pressure, and availability surprises.',
    steps: [
      { stepId: 'see', nodeIds: ['margin-stock-waste-visibility'] },
      { stepId: 'control', nodeIds: ['stock-freshness-availability-control', 'exception-led-control'] },
      { stepId: 'optimize', nodeIds: ['forecast-planning-replenishment-quality'] },
      { stepId: 'scale', nodeIds: ['store-field-execution-scale', 'controlled-assistant-operating-model'] },
    ],
    primaryLinkedCards: ['stock-3', 'stock-4', 'stock-1', 'stock-2', 'store-1', 'store-2', 'store-4', 'rep-2', 'wai-4'],
    readinessQuestions: [
      'Can you see stockouts, overstock, ageing stock, and fresh waste early enough to act?',
      'Do you understand the likely causes: demand, ordering, supplier constraints, store execution, shelf life, or pricing?',
      'Are replenishment exceptions routed to clear owners?',
      'Are fresh markdown, transfer, and waste actions handled before value is lost?',
      'Are store execution and supplier constraints included in replenishment decisions?',
    ],
    diagnosticNote: 'Do not jump to autonomous replenishment before exceptions, lead-time logic, supplier constraints, and store execution behavior are controlled.',
  },
  {
    id: 'promotions-pricing-path',
    title: 'Promotions, pricing, and commercial growth',
    triggerPressures: ['promos', 'margin', 'customer', 'growth'],
    triggerBusinessAreas: ['commercial', 'marketing', 'finance'],
    executiveUseCase: 'Improve promotion effectiveness, pricing confidence, markdown discipline, targeted offers, and commercial margin quality.',
    steps: [
      { stepId: 'see', nodeIds: ['customer-market-signal-visibility', 'trusted-retail-facts'] },
      { stepId: 'control', nodeIds: ['exception-led-control'] },
      { stepId: 'optimize', nodeIds: ['commercial-optimization', 'customer-value-growth'] },
      { stepId: 'scale', nodeIds: ['scenario-led-decisions'] },
      { stepId: 'expand', nodeIds: ['supplier-monetization-options'], optional: true },
    ],
    primaryLinkedCards: ['promo-1', 'promo-5', 'margin-1', 'promo-2', 'promo-3', 'promo-4', 'cust-1', 'cust-3', 'margin-3', 'em-1'],
    readinessQuestions: [
      'Can you measure promotion results beyond headline sales?',
      'Do you understand margin, cannibalization, stock, and basket effects after campaigns?',
      'Do pricing decisions use competitor and customer signals, not only habit or supplier pressure?',
      'Can you target offers to meaningful customer groups?',
      'Can commercial plans be tested before they are rolled out widely?',
    ],
    diagnosticNote: 'Pricing and promotion work needs clean margin logic and campaign measurement before advanced optimization can be trusted.',
  },
  {
    id: 'customer-loyalty-path',
    title: 'Customer and loyalty value',
    triggerPressures: ['customer', 'growth', 'promos'],
    triggerBusinessAreas: ['marketing', 'commercial', 'exec'],
    executiveUseCase: 'Use customer understanding to improve retention, basket growth, loyalty economics, service quality, and future customer-owned plays.',
    steps: [
      { stepId: 'see', nodeIds: ['customer-market-signal-visibility'] },
      { stepId: 'control', nodeIds: ['exception-led-control'] },
      { stepId: 'optimize', nodeIds: ['customer-value-growth', 'commercial-optimization'] },
      { stepId: 'scale', nodeIds: ['controlled-assistant-operating-model'] },
      { stepId: 'expand', nodeIds: ['customer-ownership-monetization'], optional: true },
    ],
    primaryLinkedCards: ['cust-4', 'cust-1', 'cust-2', 'cust-3', 'promo-2', 'wai-5', 'em-4', 'em-5'],
    readinessQuestions: [
      'Do you have usable customer, loyalty, basket, and campaign data?',
      'Can you identify which customers to protect, grow, reactivate, or stop over-subsidizing?',
      'Are customer feedback and service issues visible by store, category, or theme?',
      'Can offers be differentiated by customer behavior and value?',
      'Can you measure whether loyalty or service actions change behavior and margin?',
    ],
    diagnosticNote: 'Customer maturity depends on usable loyalty/customer data, communication reach, consent, offer discipline, and clear value economics.',
  },
  {
    id: 'store-execution-path',
    title: 'Store execution and field control',
    triggerPressures: ['stores', 'stock', 'labor', 'fraud', 'reporting'],
    triggerBusinessAreas: ['store_ops', 'workforce', 'exec', 'risk'],
    executiveUseCase: 'Improve store compliance, shelf execution, field issue escalation, labor productivity, and management response.',
    steps: [
      { stepId: 'see', nodeIds: ['trusted-retail-facts'] },
      { stepId: 'control', nodeIds: ['exception-led-control'] },
      { stepId: 'optimize', nodeIds: ['forecast-planning-replenishment-quality'] },
      { stepId: 'scale', nodeIds: ['store-field-execution-scale', 'controlled-assistant-operating-model'] },
      { stepId: 'expand', nodeIds: ['supplier-monetization-options'], optional: true },
    ],
    primaryLinkedCards: ['rep-1', 'rep-2', 'store-1', 'store-2', 'store-3', 'store-4', 'wai-4', 'em-3'],
    readinessQuestions: [
      'Can head office and field teams see which stores are off-plan and why?',
      'Are shelf, price-label, promo, freshness, and compliance issues routed to owners?',
      'Can managers see whether field tasks were completed and resolved?',
      'Do labor plans reflect store demand and operating conditions?',
      'Can store teams access approved operating guidance without manual chasing?',
    ],
    diagnosticNote: 'Store execution paths should stay close to action ownership. A visibility layer without task routing and resolution tracking will not change operating behavior.',
  },
  {
    id: 'supplier-value-path',
    title: 'Supplier performance and supplier value',
    triggerPressures: ['suppliers', 'margin', 'stock', 'promos', 'growth'],
    triggerBusinessAreas: ['procurement', 'commercial', 'supply', 'finance'],
    executiveUseCase: 'Improve inbound reliability, claims recovery, supplier funding, joint planning, and future supplier monetization.',
    steps: [
      { stepId: 'see', nodeIds: ['supplier-inbound-visibility'] },
      { stepId: 'control', nodeIds: ['supplier-value-control'] },
      { stepId: 'optimize', nodeIds: ['commercial-optimization'] },
      { stepId: 'scale', nodeIds: ['controlled-assistant-operating-model'] },
      { stepId: 'expand', nodeIds: ['supplier-monetization-options'], optional: true },
    ],
    primaryLinkedCards: ['sup-1', 'sup-2', 'sup-3', 'wai-6', 'promo-1', 'promo-2', 'em-1', 'em-2'],
    readinessQuestions: [
      'Can you see supplier service, inbound risk, claims, funding, and disputes in one management view?',
      'Are claims and deductions tracked through ownership, status, and recovery?',
      'Do buying, finance, and supply chain share the same supplier-value picture?',
      'Can supplier-funded promotions be measured credibly?',
      'Do priority suppliers have enough scale or appetite for insight products or funded activation?',
    ],
    diagnosticNote: 'Supplier monetization is premature if claims, funding, service, and promotion measurement are not yet credible internally.',
  },
  {
    id: 'workforce-ai-path',
    title: 'Workforce and AI assistant adoption',
    triggerPressures: ['labor', 'reporting', 'stores', 'customer', 'suppliers', 'fraud'],
    triggerBusinessAreas: ['workforce', 'store_ops', 'exec', 'risk', 'procurement', 'marketing'],
    executiveUseCase: 'Create visible productivity gains while keeping AI use controlled, business-relevant, and attached to approved sources.',
    steps: [
      { stepId: 'see', nodeIds: ['trusted-retail-facts'] },
      { stepId: 'control', nodeIds: ['risk-loss-compliance-control', 'exception-led-control'] },
      { stepId: 'optimize', nodeIds: ['customer-value-growth', 'supplier-value-control'] },
      { stepId: 'scale', nodeIds: ['controlled-assistant-operating-model'] },
    ],
    primaryLinkedCards: ['wai-1', 'wai-2', 'wai-3', 'wai-4', 'wai-5', 'wai-6', 'rep-2', 'df-2'],
    readinessQuestions: [
      'Which daily work is most painful: meetings, documents, HR, legal, store support, customer service, or supplier follow-up?',
      'Are approved sources available for the assistant to use?',
      'Are review, approval, privacy, and escalation boundaries clear?',
      'Is the use case low-risk drafting/search support, or will it answer customers, suppliers, HR, legal, or financial questions?',
      'Can the assistant output connect to a real workflow or owner?',
    ],
    diagnosticNote: 'Assistants can start quickly, but the roadmap must distinguish low-risk drafting/search support from assistants that answer from company data, speak to customers, handle legal/HR content, or trigger follow-up actions.',
  },
];

window.getRoadmapPathwaySuggestions = function(answers) {
  const pressures = answers?.pressures || [];
  const businessAreas = answers?.businessAreas || [];
  const improvement = answers?.improvement || '';

  const scored = (window.ROADMAP_PATHWAYS || []).map(path => {
    const pressureHits = (path.triggerPressures || []).filter(p => pressures.includes(p));
    const areaHits = (path.triggerBusinessAreas || []).filter(a => businessAreas.includes(a));
    let score = pressureHits.length * 3 + areaHits.length * 2;

    if (improvement === 'strategic' && (path.steps || []).some(s => s.stepId === 'expand')) score += 2;
    if (improvement === 'quick' && path.id === 'workforce-ai-path') score += 1;
    if (improvement === 'deep' && ['margin-cash-path', 'stock-freshness-path', 'promotions-pricing-path'].includes(path.id)) score += 1;
    if (pressures.includes('customer') && path.id === 'customer-loyalty-path') score += 2;
    if (pressures.includes('promos') && path.id === 'promotions-pricing-path') score += 2;
    if (pressures.includes('stock') && path.id === 'stock-freshness-path') score += 2;
    if (pressures.includes('suppliers') && path.id === 'supplier-value-path') score += 2;
    if (pressures.includes('stores') && path.id === 'store-execution-path') score += 2;
    if (pressures.includes('labor') && path.id === 'workforce-ai-path') score += 2;
    if (pressures.includes('margin') && path.id === 'margin-cash-path') score += 2;

    return {
      ...path,
      _score: score,
      _reason: pressureHits.length
        ? `Strong fit for selected pressure${pressureHits.length > 1 ? 's' : ''}.`
        : areaHits.length
          ? 'Relevant to selected business area.'
          : 'General roadmap option.',
    };
  });

  return scored
    .filter(path => path._score > 0)
    .sort((a, b) => b._score - a._score)
    .slice(0, 2);
};

window.getRoadmapPathwayById = function(pathwayId) {
  return (window.ROADMAP_PATHWAYS || []).find(path => path.id === pathwayId) || null;
};

window.getRoadmapNodeById = function(nodeId) {
  return (window.ROADMAP_NODES || []).find(node => node.id === nodeId) || null;
};

window.getRoadmapStepById = function(stepId) {
  return (window.ROADMAP_STEPS || []).find(step => step.id === stepId) || null;
};

window.getRoadmapStartStep = function(readinessAnswers) {
  const values = Object.values(readinessAnswers || {});
  if (!values.length) return 'see';

  const counts = values.reduce((acc, value) => {
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});

  if ((counts.working || 0) >= 4) return 'optimize';
  if ((counts.working || 0) >= 3 && (counts.partial || 0) >= 1) return 'control';
  if ((counts.partial || 0) >= 3) return 'control';
  return 'see';
};

window.buildRoadmapRoute = function(pathwayId, readinessAnswers = {}, blockStates = {}) {
  const pathway = window.getRoadmapPathwayById(pathwayId);
  if (!pathway) return null;

  const startStepId = window.getRoadmapStartStep(readinessAnswers);
  const startStep = window.getRoadmapStepById(startStepId);
  const startSequence = startStep?.sequence || 1;

  const steps = (pathway.steps || []).map(stepRef => {
    const step = window.getRoadmapStepById(stepRef.stepId);
    const nodes = (stepRef.nodeIds || [])
      .map(nodeId => window.getRoadmapNodeById(nodeId))
      .filter(Boolean)
      .map(node => ({
        ...node,
        userState: blockStates[node.id] || 'interesting',
        assumedReady: blockStates[node.id] === 'already_exists',
        hiddenByUser: blockStates[node.id] === 'not_relevant',
        future: blockStates[node.id] === 'later' || stepRef.optional || node.optional || false,
      }));

    return {
      ...stepRef,
      step,
      nodes,
      currentFocus: step && step.sequence >= startSequence,
    };
  });

  return {
    pathway,
    startStepId,
    steps,
    explanation: window.getRoadmapRouteExplanation(startStepId),
  };
};

window.getRoadmapRouteExplanation = function(startStepId) {
  if (startStepId === 'optimize') {
    return 'Most readiness answers suggest the basics are working, so the route can focus on optimization and scaling while keeping earlier assumptions visible for validation.';
  }
  if (startStepId === 'control') {
    return 'The route should start with control: the business has some visibility, but ownership, rules, and response need to be stronger before heavier optimization.';
  }
  return 'The route should start with visibility: the first priority is to make the relevant issue measurable and trusted before asking teams to optimize it.';
};
