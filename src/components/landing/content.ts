export type HeroStat = {
  label: string;
  value: string;
  detail: string;
};

export type DetailCard = {
  eyebrow: string;
  title: string;
  body: string;
  metric: string;
};

export type ProcessStep = {
  id: string;
  label: string;
  title: string;
  body: string;
  note: string;
};

export type ModuleCard = {
  eyebrow: string;
  title: string;
  body: string;
  metric: string;
  desktopClassName: string;
};

export type TrustPanel = {
  eyebrow: string;
  title: string;
  body: string;
  points: string[];
};

export type FaqItem = {
  question: string;
  answer: string;
};

export const heroStats: HeroStat[] = [
  {
    label: "Presale package",
    value: "250K",
    detail: "Each presale participant receives 250,000 Iron Vault Tokens at presale pricing.",
  },
  {
    label: "Exchange launch",
    value: "Nov 1",
    detail: "IVT launches on multiple exchanges November 1, 2026. Presale closes before that date.",
  },
  {
    label: "Royalty distribution",
    value: "24/7",
    detail: "Opt-in royalty participants earn from every transaction on-chain, around the clock.",
  },
];

export const tickerItems = [
  "PRESALE NOW OPEN",
  "250,000 TOKENS PER PACKAGE",
  "EXCHANGE LAUNCH NOV 1 2026",
  "ROYALTY PARTICIPATION AVAILABLE",
  "REAL-WORLD ASSET ROADMAP",
  "COMMON WEALTH VENTURES LLC",
];

export const architectureCards: DetailCard[] = [
  {
    eyebrow: "Utility Token",
    title: "IVT is the transactional and participation layer of the Common Wealth Ventures platform.",
    body: "Iron Vault Token facilitates participation within the ecosystem, supports community growth, and enables royalty-based participation tied to platform trading activity.",
    metric: "UTILITY // DEFINED",
  },
  {
    eyebrow: "Royalty Program",
    title: "Opt in and get paid 24/7 on every transaction with Iron Vault Token.",
    body: "Participants who enroll in the royalty program receive a share of platform trading volume fees, distributed automatically on-chain. This creates ongoing passive income from trading activity.",
    metric: "ROYALTIES // ON-CHAIN",
  },
  {
    eyebrow: "Real-World Assets",
    title: "Building toward a stablecoin backed by commercial real estate holdings.",
    body: "The long-term roadmap includes acquiring commercial properties — shopping centers, gas stations, franchise locations — to support a sister stablecoin anchored in real economic activity.",
    metric: "RWA // ROADMAP",
  },
];

export const whyCards: DetailCard[] = [
  {
    eyebrow: "Early Access",
    title: "The presale is the earliest point of entry. There is no second chance at presale pricing.",
    body: "Once the allocation fills or the exchange launches November 1, 2026, presale pricing ends permanently. After that, IVT is only available at public market price.",
    metric: "01",
  },
  {
    eyebrow: "Real Ecosystem",
    title: "IVT has a defined role in a real, operating ecosystem — not just a speculative ticker.",
    body: "Common Wealth Ventures is building a platform where blockchain infrastructure funds real-world asset acquisition, creating tangible value behind the token.",
    metric: "02",
  },
  {
    eyebrow: "Generational Wealth",
    title: "Royalty income from trading volume creates life-changing and generational income.",
    body: "When the token launches on exchanges, transaction volume drives royalty distributions to opted-in participants — creating passive income for you and your family.",
    metric: "03",
  },
];

export const processSteps: ProcessStep[] = [
  {
    id: "01",
    label: "Opt in",
    title: "Submit your information to receive presale details.",
    body: "Fill out a short form with your name, phone, and email. No commitment and no payment required. A representative will reach out to walk you through everything.",
    note: "Takes 60 seconds",
  },
  {
    id: "02",
    label: "Consultation",
    title: "Speak with a real representative about the opportunity.",
    body: "A trained Common Wealth Ventures representative contacts you within one business day. The call is informational — we answer your questions first and explain the presale terms.",
    note: "Within 1 business day",
  },
  {
    id: "03",
    label: "Review",
    title: "Understand token allocation, royalties, and the exchange roadmap.",
    body: "We walk you through presale pricing, the royalty participation model, the November 1st exchange launch timeline, and the real-world asset roadmap. You decide if it is right for you.",
    note: "Full details disclosed",
  },
  {
    id: "04",
    label: "Secure tokens",
    title: "Lock in your presale allocation before the window closes.",
    body: "If you choose to proceed, we guide you through the onboarding process step by step. Your 250,000 tokens are registered and your position is secured before the exchange opens.",
    note: "Position locked",
  },
];

export const moduleCards: ModuleCard[] = [
  {
    eyebrow: "Three-Phase Roadmap",
    title: "Community launch, asset acquisition, and stablecoin — all mapped out.",
    body: "Phase 1 builds the founding community at $0.001 presale pricing. Phase 2 generates revenue through trading volume and acquires commercial real estate. Phase 3 launches the stablecoin backed by those assets.",
    metric: "3 // PHASES",
    desktopClassName: "lg:col-span-2 lg:row-span-2",
  },
  {
    eyebrow: "Consultation Process",
    title: "Every participant speaks with a real person before committing.",
    body: "No bots, no automated funnels. A live representative explains the presale, answers your questions, and makes sure you have the full picture before any decision.",
    metric: "1:1 // HUMAN",
    desktopClassName: "lg:col-span-2",
  },
  {
    eyebrow: "Ecosystem Layers",
    title: "Utility token, royalty program, real estate assets, and stablecoin.",
    body: "Each layer of the ecosystem serves a specific purpose — from community participation to asset-backed currency — creating long-term value across the entire platform.",
    metric: "4 // LAYERS",
    desktopClassName: "lg:col-span-1",
  },
  {
    eyebrow: "Royalty Model",
    title: "Earn from every transaction on the platform, automatically.",
    body: "The royalty program distributes a share of trading volume fees to opted-in participants. Distributions run on-chain, 24/7. Details are reviewed during your consultation call.",
    metric: "24/7 // PASSIVE",
    desktopClassName: "lg:col-span-1",
  },
  {
    eyebrow: "Presale Tiers",
    title: "Presale packages are available through direct consultation only.",
    body: "250,000 tokens per presale package at $0.001 per token. Allocation is first-come, first-consulted. The presale closes when supply fills or the exchange launches.",
    metric: "250K // TOKENS",
    desktopClassName: "lg:col-span-2",
  },
  {
    eyebrow: "Referral Program",
    title: "Refer others and earn 10% commission on everything they invest.",
    body: "Anyone you refer to Common Wealth Ventures earns you a 10% commission paid within 24 hours. This applies to anything they ever spend with the company, even years down the line.",
    metric: "10% // COMMISSION",
    desktopClassName: "lg:col-span-2",
  },
];

export const trustMetrics = [
  { label: "Entity", value: "US registered LLC" },
  { label: "Contact", value: "888-368-2502" },
  { label: "Launch date", value: "November 1, 2026" },
  { label: "Consultation", value: "Live human reps" },
];

export const trustPanels: TrustPanel[] = [
  {
    eyebrow: "Registered Entity",
    title: "Common Wealth Ventures LLC is a registered US company.",
    body: "We operate as a legitimate business entity based in Peoria, Arizona. Our team is reachable by phone at 888-368-2502 any time.",
    points: [
      "Registered limited liability company",
      "US-based operations out of Peoria, AZ",
      "Direct phone line staffed by real people",
    ],
  },
  {
    eyebrow: "Transparent Process",
    title: "All presale terms are disclosed before any commitment.",
    body: "Royalty mechanics, distribution methods, and opt-in processes are reviewed in full on every consultation call. Nothing is hidden behind fine print.",
    points: [
      "Royalty terms explained on every call",
      "No pressure — you decide if and when to proceed",
      "Follow-up support available through activation",
    ],
  },
  {
    eyebrow: "Published Timeline",
    title: "November 1, 2026 exchange launch across multiple platforms.",
    body: "The roadmap is public and the presale has a defined end. All participants receive direct communication about exchange listing updates and milestones.",
    points: [
      "Exchange partnerships being finalized",
      "Presale participants notified of all updates",
      "Predictable milestone cadence through launch",
    ],
  },
];

export const operatingRoles = [
  {
    title: "Presale Support",
    body: "Guides you through the opt-in process, answers questions, and ensures you understand every detail before proceeding.",
  },
  {
    title: "Royalty Program",
    body: "Explains the royalty participation model, distribution mechanics, and how to opt in for 24/7 passive income from trading volume.",
  },
  {
    title: "Onboarding",
    body: "Walks you through securing your token allocation, account setup, and everything you need before the November exchange launch.",
  },
];

export const faqItems: FaqItem[] = [
  {
    question: "What exactly is Iron Vault Token?",
    answer:
      "Iron Vault Token (IVT) is the utility and transactional layer of the Common Wealth Ventures ecosystem. It facilitates participation within the platform, supports community growth, and enables royalty-based participation tied to trading activity. It has a defined functional role — not just a speculative ticker.",
  },
  {
    question: "Why do I need to get on a call? Why can't I just buy tokens online?",
    answer:
      "The presale is structured through consultation by design. Token participation involves a real financial decision, and we believe people make better decisions when they understand what they're participating in. The call is informational — not a sales pitch. After November 1, 2026, tokens will be publicly available on exchanges.",
  },
  {
    question: "How does the royalty program work?",
    answer:
      "The royalty program is an opt-in feature tied to transaction volume on the IVT platform. Participants who enroll receive an allocation from the trading fee pool, distributed automatically on-chain 24/7. The exact mechanics — rates, distribution frequency, and enrollment — are reviewed in full on your consultation call.",
  },
  {
    question: "Is this risky? What is the worst-case scenario?",
    answer:
      "All digital asset participation carries risk. The worst case is that the exchange launch is delayed or the token does not perform as intended. We are not licensed financial advisors and cannot predict performance. The project has a registered entity, a real team, an active call center, and a published roadmap. Only participate with capital you can afford to risk.",
  },
  {
    question: "What happens after I submit the form?",
    answer:
      "You will receive a confirmation email shortly after submitting. A representative will contact you by phone within one business day at your preferred time window. The first call is typically 10 to 20 minutes. No obligation if you are not ready to decide.",
  },
];

export const ctaSignals = [
  "250,000 presale tokens",
  "Royalty participation",
  "Exchange launch Nov 1, 2026",
  "888-368-2502",
];