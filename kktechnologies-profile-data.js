window.KKTECH_PROFILE = {
  brand: {
    officialName: 'Kitty Kat Technologies',
    shortName: 'KKTechnologies',
    canvasIdentity: 'Retail AI Canvas by KKTechnologies',
  },

  nav: [
    { id: 'company', label: 'KKTechnologies' },
    { id: 'how-we-work', label: 'How We Work' },
    { id: 'team', label: 'Team & Experts' },
    { id: 'contact', label: 'Contact' },
  ],

  company: {
    title: 'KKTechnologies',
    eyebrow: 'Business-first Data & AI consultancy',
    lead: 'We help companies move from business questions to practical AI, data, analytics, and automation solutions that can be implemented, adopted, and measured.',
    body: [
      'We combine domain expertise, process consulting, data engineering, ML/AI architecture, and delivery coordination.',
      'We find where value can be created or leakage reduced. Then we check what is feasible with the client\'s data, systems, people, and processes.',
      'The starting point is always the business objective, operating constraint, or decision that needs to improve. Technology comes after that.',
    ],
    proofPoints: [
      'Business-first, not tech-first',
      'Domain expertise and technical delivery in one team',
      'From business question to implemented solution',
    ],
    trackRecord: {
      title: 'Selected track record',
      lead: 'Representative work across retail, supply chain, customer analytics, industrial operations, and AI-enabled decision support.',
      items: [
            {
              id: 'fuel-transformation',
              label: 'Alfa Oil / Red Petroleum',
              meta: '~$600M fuel retailer, Central Asia, 220 stations · 2024–ongoing',
              focus: 'Strategic AI transformation',
              whatWeDid: 'AI readiness, roadmap, DWH/BI foundation, segmentation, fraud analytics, internal assistants, payment automation, logistics automation, and procurement optimization.',
              result: 'Reporting moved from days to minutes; the internal data team is established; first internal ML models are in production.',
              detail: {
                context: 'A multi-year program that took the client from more than fifteen disconnected legacy systems to a working data and AI operating environment.',
                role: 'We started with the readiness audit and roadmap, defended it with the executive team, then coordinated delivery from the owner side while shaping the data, BI, and AI agenda.',
                scope: [
                  'Roadmap and executive alignment around the AI and data program',
                  'Owner-side coordination of the DWH and BI foundation, including 24+ dashboards across 9 departments',
                  'Customer segmentation across 380,000+ loyalty members and fraud analytics across 30 million+ transactions',
                  'Natural-language analytics agent, internal RAG assistants, payment-process automation, logistics automation, and first procurement-optimization product',
                  'Hiring and training of the client internal data team',
                ],
                outcome: [
                  'Most of the original roadmap is delivered',
                  'The internal data team is operating independently',
                  'Reporting that took days now takes minutes',
                  'The first internally built ML models are already in production',
                ],
              },
            },
            {
              id: 'fuel-dispatch',
              label: 'Optimus fuel supply platform',
              meta: 'Fuel supply optimization platform · production deployment',
              focus: 'Fuel supply optimization, procurement control, and distribution execution',
              whatWeDid: 'Built a production platform that tracks stock levels, forecasts shortages, recommends procurement orders, manages supplier ranking, handles reserves and redirects, and gives operators a control layer for ERP-linked execution.',
              result: 'Fuel planning, order control, and execution moved into one product with shortage forecasting, procurement recommendations, distribution control, and ERP-linked shipment workflows.',
              detail: {
                context: 'Daily fuel supply planning becomes fragile when stock risk, purchase decisions, supplier options, shipment execution, and ERP facts are spread across separate tools and manual coordination.',
                role: 'We designed and built the product around the real daily workflow of operators and planners, so it supports live decisions instead of acting only as a reporting layer.',
                scope: [
                  'Stock tracking, shortage forecasting, and procurement recommendations',
                  'Purchase-order workflow with supplier ranking, reserve handling, and redirect logic',
                  'Distribution engine, shipment timeline, and conflict-control views for daily execution',
                  'ERP-linked shipment workflow so external supply facts can be reconciled against internal decisions',
                ],
                outcome: [
                  'Daily supply decisions became more controlled and traceable',
                  'Procurement, replanning, and execution control moved into one operational product',
                  'Exception visibility and ERP reconciliation now sit in the same workflow',
                ],
              },
            },
            {
              id: 'loyalty-reactivation',
              label: 'Major fuel retail loyalty program',
              meta: '380,000+ members · 2024–2025',
              focus: 'Dormant customer reactivation through segmentation',
              whatWeDid: 'Problem framing with marketing leadership, hybrid RFM-plus-clustering segmentation, in-app deployment of 11 segments, and A/B-tested campaigns.',
              result: 'About 12,000 dormant customers reactivated; segments adopted into the 2026 marketing strategy.',
              detail: {
                context: 'The loyalty program existed, but the marketing team had no working segmentation it could trust and use operationally.',
                role: 'We shaped the business problem with the client, designed and validated the segmentation logic, deployed it into the loyalty app, and supported the campaign rollout.',
                scope: [
                  'Hybrid RFM plus GMM-clustering segmentation prototype',
                  'Validation of 11 segments with the business',
                  'Deployment of segments into the loyalty mobile app',
                  'A/B-tested campaigns and automated refresh pipeline handed over to the internal data team',
                ],
                outcome: [
                  'Around 12,000 dormant customers reactivated',
                  'Segments adopted into the next marketing cycle',
                  'The automated ML pipeline now refreshes the program independently',
                ],
              },
            },
            {
              id: 'fraud-visibility',
              label: 'Major fuel retail loyalty and antifraud program',
              meta: '30+ million transactions · 2024–2025',
              focus: 'Fraud visibility and detection at full scale',
              whatWeDid: 'Baseline measurement, scenario mapping, and enhanced detection combining tightened SQL rules with ML-based scoring.',
              result: 'Fraud scope became visible and measurable; tightened rules are deployed and the ML scoring layer is in rollout.',
              detail: {
                context: 'The client had a rule engine but no way to know what it missed or how much fraud was sitting outside current controls.',
                role: 'We quantified the baseline, identified where current rules were insufficient, and designed the next detection layer.',
                scope: [
                  'Analysis of 30+ million transactions',
                  'Baseline fraud measurement and concentrated-risk mapping by customer, station, and scenario',
                  'Design of a detection layer combining tightened rules and ML scoring',
                  'Expansion path into adjacent loss vectors such as depot theft, in-transit shrinkage, and telematics-based monitoring',
                ],
                outcome: [
                  'Tightened rules deployed',
                  'ML scoring layer in active rollout',
                  'Fraud scope is no longer a guess',
                ],
              },
            },
            {
              id: 'nl-analytics',
              label: 'Large industrial enterprise',
              meta: 'Enterprise DWH · 2025',
              focus: 'Natural-language analytics agent for the executive team',
              whatWeDid: 'Business semantic layer, KPI grounding, golden training set, and multi-agent analytics architecture support.',
              result: 'More than 90 percent answer accuracy in production; internal staff are being trained for stewardship.',
              detail: {
                context: 'Management needed to query enterprise performance directly without routing every question through analysts.',
                role: 'We grounded the analytics assistant in the business model and worked with the vendor on the operating architecture.',
                scope: [
                  'KPI definitions, business hierarchies, and business-logic grounding',
                  'Golden question-answer training set used to tune accuracy',
                  'Support for a specialized multi-agent architecture by question type',
                  'Preparation of internal staff for ongoing stewardship',
                ],
                outcome: [
                  'More than 90 percent answer accuracy in production',
                  'Management can query enterprise data more directly',
                  'Internal staff are being trained to operate and improve the system',
                ],
              },
            },
            {
              id: 'dynamic-pricing',
              label: 'Major ride-hailing platform',
              meta: 'Mobility, Baltic & Nordic region · 2023',
              focus: 'Dynamic pricing architecture and feasibility',
              whatWeDid: 'Business framing, target architecture, ML prototype, implementation-contractor support, and results supervision against baseline.',
              result: 'Feasibility was demonstrated against business baselines and the target pricing architecture was defined for implementation.',
              detail: {
                context: 'The client needed a practical dynamic-pricing engine rather than a theoretical model detached from operating reality.',
                role: 'We sat on the client side of the table, translating the business problem into an architecture and implementation path that could be delivered.',
                scope: [
                  'Business problem framing for the in-app pricing engine',
                  'Target architecture definition',
                  'ML prototype to prove feasibility',
                  'Selection support for the implementation contractor and supervision of the build',
                ],
                outcome: [
                  'Feasibility demonstrated before committing to the full build',
                  'Target architecture aligned to the business use case',
                  'Implementation supervised against a measurable baseline',
                ],
              },
            },
            {
              id: 'click-grow',
              label: 'Click & Grow',
              meta: 'EU consumer hardware / D2C · 2022–2023',
              focus: 'Customer intelligence for a smart-garden D2C brand',
              whatWeDid: 'Customer analytics, segmentation, and personalization across hardware and consumables behavior.',
              result: 'Transactional and product-engagement signals were turned into retention and lifecycle-marketing logic.',
              detail: {
                context: 'The business sells both hardware and consumables, so customer value depends on understanding lifecycle behavior rather than single purchases.',
                role: 'We built the customer-intelligence layer to support retention and personalization decisions.',
                scope: [
                  'Customer analytics and segmentation across the D2C base',
                  'Combination of transactional behavior and product-engagement signals',
                  'Support for retention and lifecycle-marketing personalization',
                ],
                outcome: [
                  'Customer behavior became more usable for retention planning',
                  'Lifecycle-marketing logic was grounded in observed customer data',
                ],
              },
            },
            {
              id: 'csc-telecom',
              label: 'CSC Telecom',
              meta: 'Baltics · 2023–ongoing',
              focus: 'Customer analytics, tariff analysis, and churn modeling',
              whatWeDid: 'Behavioral segmentation, personalized communications, tariff analysis, promotional-response analysis, and initial churn models for retention action.',
              result: 'At-risk cohorts became visible and could be routed into retention action instead of being treated as general traffic movement.',
              detail: {
                context: 'The client needed both a marketing view of customer behavior and a commercial view of which tariff and package mechanics were actually moving margin.',
                role: 'We shaped the analytics program across both marketing and commercial questions.',
                scope: [
                  'Behavioral segmentation and personalized-communications design',
                  'Tariff-structure and package-configuration analysis',
                  'Promotional-response assessment by cohort',
                  'Initial churn models to route at-risk customers into retention action',
                ],
                outcome: [
                  'At-risk cohorts became visible earlier',
                  'Marketing and commercial decisions were grounded in the same customer evidence',
                ],
              },
            },
            {
              id: 'compressor-optimization',
              label: 'Major industrial gas compressor manufacturer',
              meta: '2022–2023',
              focus: 'Fuel-efficiency optimization in compressor design',
              whatWeDid: 'Business framing, architecture combining OR/ML/engineering rules, team-composition support, and build supervision.',
              result: 'The model is in active design use and fuel-efficiency gains were validated against engineering baselines.',
              detail: {
                context: 'The client needed a design-support model that respected engineering constraints rather than a purely statistical optimization approach.',
                role: 'We framed the business and engineering problem, shaped the architecture, and supervised the dedicated technical team building it.',
                scope: [
                  'Problem framing around fuel efficiency in compressor design',
                  'Architecture combining operations research, ML, and physical engineering rules',
                  'Advice on team composition and implementation setup',
                  'Supervision of the technical build',
                ],
                outcome: [
                  'Model now used in active design work',
                  'Fuel-efficiency improvements validated against engineering baselines',
                ],
              },
            },
            {
              id: 'heavy-manufacturing',
              label: 'Specialized steel structures and drilling rigs',
              meta: 'Heavy manufacturing · 2023–2024',
              focus: 'RAG assistant and CV-based crack detection',
              whatWeDid: 'Internal RAG assistant for engineering and operations plus computer-vision crack detection for predictive maintenance.',
              result: 'Both systems are deployed and in production use.',
              detail: {
                context: 'The operation was heavily manual, with staff spending too much time searching through technical procedures and inspections relying on manual crack detection.',
                role: 'We designed and delivered two production systems focused on operational friction and maintenance risk.',
                scope: [
                  'RAG-based internal assistant for engineering and operations functions',
                  'Computer-vision system for predictive maintenance and crack detection on steel structures during production',
                ],
                outcome: [
                  'Both systems are deployed',
                  'Both are being used in production rather than left at prototype stage',
                ],
              },
            },
            {
              id: 'risk-rag',
              label: 'Specialized risk consultancy',
              meta: 'Energy-sector clients · 2023',
              focus: 'Two RAG assistants for consulting and assessment work',
              whatWeDid: 'One assistant for internal operations and engagement knowledge, and one technical assistant grounded in regulatory and proprietary methodology.',
              result: 'Both assistants are deployed and in active use across consulting engagements.',
              detail: {
                context: 'The firm needed faster reuse of accumulated client and methodology knowledge without forcing consultants to dig through scattered sources each time.',
                role: 'We applied one architecture pattern to two different knowledge cuts within the same firm.',
                scope: [
                  'Internal-operations assistant surfacing client and engagement knowledge',
                  'Technical assistant grounded in regulatory guidelines, methodologies, and proprietary firm data',
                  'Deployment of both assistants into live consulting workflows',
                ],
                outcome: [
                  'Both assistants deployed',
                  'Both in active use across consulting engagements',
                ],
              },
            },
            {
              id: 'iso-auditor',
              label: 'Major Testing, Inspection & Certification company',
              meta: '2024',
              focus: 'AI agent simulating ISO auditor workflows',
              whatWeDid: 'Discovery, workflow translation, business-to-technical framing, and early prototypes to find capability boundaries for ISO-auditor simulation.',
              result: 'The project clarified feasible automation boundaries and gave the client a grounded architecture direction before scaling the concept.',
              detail: {
                context: 'The ambition was to simulate ISO-auditor logic starting with ISO 9001 and extending later to narrower standards such as ISO/TS 16949 and ISO 13485.',
                role: 'We ran the discovery process that translated the auditor workflow into something a machine could plausibly execute, then tested the capability boundaries through prototypes.',
                scope: [
                  'Discovery sessions mapping the real auditor workflow',
                  'Business-problem framing against technical reality',
                  'Prototypes to identify current capability boundaries and bottlenecks',
                  'Team setup across data engineering, ML engineering, and NLP',
                ],
                outcome: [
                  'Clearer understanding of what is feasible now and what is not',
                  'Architecture direction grounded in actual auditor work rather than abstract AI claims',
                ],
              },
            },
            {
              id: 'rgm-platform',
              label: 'Top European FMCG company',
              meta: 'Earlier team experience · 2022–2024',
              focus: 'Revenue Growth Management AI platform',
              whatWeDid: 'Design and configuration of an RGM AI platform across multiple markets alongside a broader sales-transformation program.',
              result: 'RGM AI capabilities were rolled out across multiple markets as part of a broader sales-transformation program.',
              detail: {
                context: 'A large FMCG business was rolling out an RGM AI platform across multiple markets and needed the commercial operating model, process design, and capability work around it.',
                role: 'Program leadership around the commercial, process, and capability side of the RGM AI rollout.',
                scope: [
                  'Design and configuration of an RGM AI platform across multiple markets',
                  'Sales-transformation support including process design, capability building, e-commerce strategy, and data/reporting tools',
                ],
                outcome: [
                  'RGM AI capabilities were deployed across multiple markets',
                  'Commercial processes and team capabilities were built around the platform',
                ],
              },
            },
            {
              id: 'gazprom-neft-program',
              label: 'Gazprom Neft',
              meta: 'Earlier team experience · 2014–2021',
              focus: 'Upstream digital transformation program',
              whatWeDid: 'Business architecture, digital-initiative evaluation, product KPI design, and process-efficiency work across the upstream business.',
              result: 'The program created a structured basis for evaluating digital initiatives, defining KPIs, and improving operational processes across the upstream business.',
              detail: {
                context: 'A large upstream business was running a broad digital-transformation program and needed business architecture, initiative evaluation, KPI design, and process-efficiency work across multiple areas.',
                role: 'Business architect of the upstream digital transformation program.',
                scope: [
                  'Product-management approach to digital solutions',
                  'Evaluation of digital and AI initiatives',
                  'Product KPI design',
                  'Process and operational efficiency work across the upstream business',
                ],
                outcome: [
                  'A structured basis was created for evaluating initiatives and tracking product performance',
                  'Process and operational-efficiency work was embedded into the wider transformation program',
                ],
              },
            },
      ],
    },
  },

  howWeWork: {
    title: 'How We Work',
    subtitle: 'From Question To Delivered AI/Data Solution',
    lead: 'We do not start with technology. We start with the business question, check whether AI/Data can realistically help, then move through scope, delivery, adoption, and scale.',
    steps: [
      {
        id: 'identify',
        title: 'Identify And Qualify',
        summary: 'We clarify the business question, understand the current situation, and assess whether AI, data, analytics, automation, or process redesign can realistically help.',
        outputs: [
          'A clear view of the business issue, owner, and expected result',
          'First check of available data, process reality, and feasibility',
          'Recommendation to proceed, reshape the idea, or stop early',
        ],
      },
      {
        id: 'scope',
        title: 'Scope And Prepare',
        summary: 'We turn a promising opportunity into a delivery-ready project that business and technical teams can understand.',
        outputs: [
          'What needs to change in the process and decision flow',
          'What data, systems, people, and rules are needed',
          'Delivery plan, requirements, owners, and acceptance criteria',
        ],
      },
      {
        id: 'execute',
        title: 'Execute And Coordinate',
        summary: 'We support implementation from the business side and keep technical delivery connected to business outcomes.',
        outputs: [
          'Coordinated work between business, vendors, and technical teams',
          'Regular checks that the solution still solves the business problem',
          'Testing, acceptance, stakeholder alignment, and adoption support',
        ],
      },
      {
        id: 'scale',
        title: 'Close, Adopt, And Scale',
        summary: 'We help make the solution operational, measurable, and ready for further improvement.',
        outputs: [
          'Working solution embedded into the business process',
          'Handover, user adoption, and value tracking',
          'Clear next steps for scaling or improving the solution',
        ],
      },
    ],
  },

  team: {
    title: 'Team & Experts',
    lead: 'We combine a core consulting team with a trusted expert bench across domain expertise, process consulting, data engineering, AI/ML, cloud, and solution architecture.',
    sublead: 'This allows us to work across the full path from business question to implemented solution.',
    groups: [
      {
        id: 'domain',
        title: 'Domain Expertise',
        members: [
          {
            name: 'Pavel Minyshkin',
            line: '15+ years in FMCG/Retail, RGM and Commercial Excellence',
            chips: ['PepsiCo', 'Philip Morris', 'Bonduelle', 'Efes'],
            initials: 'PM',
          },
          {
            name: 'Yana Kujrikhina',
            line: '10+ years in Oil & Gas, process consulting and digitalization',
            chips: ['EY', 'Gazprom Oil'],
            initials: 'YK',
          },
          {
            name: 'Nikolay Terentyev',
            line: '15+ years in banking, finance operations and digital transformation',
            chips: ['Gazprombank'],
            initials: 'NT',
            photo: 'team/nikolay-terentyev.png',
          },
          {
            name: 'Pavel Gabaidullin',
            line: '19+ years in enterprise procurement and international supply chains',
            chips: ['SIBUR', 'Rosatom / NovaWind', 'United Wagon Company', 'Bombardier JV'],
            initials: 'PG',
            photo: 'team/pavel-gabaidullin.jpg',
          },
          {
            name: 'Levan Buachidze',
            line: '5+ years in digital logistics, supply chain and retail category management',
            chips: ['Deutsche Bahn', 'Daily Group'],
            initials: 'LB',
          },
          {
            name: 'George Shevardenidze',
            line: '15+ years in technical consulting and operational transformation',
            chips: ['Lukoil', 'DNV', 'TUV Rheinland'],
            initials: 'GS',
          },
        ],
      },
      {
        id: 'tech',
        title: 'Tech Expertise',
        members: [
          {
            name: 'Nageye Rascid',
            line: '20+ years in enterprise data, cloud and AI platforms',
            chips: ['Microsoft', 'Snowflake', 'Cisco', 'Confluent', 'Upbound'],
            initials: 'NR',
          },
          {
            name: 'Denis Perov',
            line: '15+ years in software engineering and AI/ML solution architecture',
            chips: ['Aviasales'],
            initials: 'DP',
          },
          {
            name: 'Igor Trifonov',
            line: '10+ years in data engineering, BI and enterprise data solutions',
            chips: ['Customertimes', 'Sberbank', 'ATON'],
            initials: 'IT',
          },
        ],
      },
    ],
    benchNote: 'Plus a wider bench of data scientists, ML engineers, data engineers, analysts, domain specialists, and external experts as needed.',
  },

  contact: {
    title: 'Contact',
    lead: 'Want to discuss where Data & AI can create practical business value in your company?',
    email: 'hello@kittykat.tech',
    website: 'www.kittykat.tech',
    company: 'Kitty Kat Technologies OU',
    location: 'Tallinn, Estonia',
  },
};
