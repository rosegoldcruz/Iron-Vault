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
    label: "Desk response",
    value: "24h",
    detail: "Every serious request enters a reviewed queue, not a public scramble.",
  },
  {
    label: "Reserve discipline",
    value: "38%",
    detail: "Treasury allocation remains ring-fenced for runway, security, and launch stability.",
  },
  {
    label: "Unlock rhythm",
    value: "8 / 12 / 24",
    detail: "Release cadence is staged to preserve pressure control across launch phases.",
  },
];

export const tickerItems = [
  "PHASE 01 // VERIFIED INTAKE",
  "MULTISIG TREASURY LANE",
  "CONSULT-LED ACCESS",
  "STRUCTURED UNLOCK ARCHITECTURE",
  "WHITE-GLOVE ONBOARDING",
  "SECURITY REVIEW WINDOW // 24H",
];

export const architectureCards: DetailCard[] = [
  {
    eyebrow: "Structured Access",
    title: "Iron Vault Token is a presale system, not a public stampede.",
    body: "Every allocation request enters through a private desk workflow. Intent is qualified, lane placement is deliberate, and access is earned before capital moves.",
    metric: "ACCESS // CONTROLLED",
  },
  {
    eyebrow: "Treasury Discipline",
    title: "Supply management is designed to survive attention, not just attract it.",
    body: "Operating float, reserve holdings, and launch liquidity sit in separate layers so the project can respond with precision under pressure instead of improvisation.",
    metric: "TREASURY // RING-FENCED",
  },
  {
    eyebrow: "Release Architecture",
    title: "Momentum is staged through sequence, not noise.",
    body: "Unlocks, access windows, and operator checkpoints are pre-planned to keep the launch narrative coherent while preserving trust with long-horizon participants.",
    metric: "RELEASE // PHASED",
  },
];

export const whyCards: DetailCard[] = [
  {
    eyebrow: "Signal",
    title: "Weak attention wants instant access. Serious capital respects friction.",
    body: "Iron Vault uses controlled entry to filter noise, anchor conviction, and establish tone before speculation dilutes the room.",
    metric: "01",
  },
  {
    eyebrow: "Authority",
    title: "Clarity replaces theatre when structure is visible.",
    body: "The experience exposes process, reserve logic, and operator intent so trust is felt as an operating standard rather than a promise.",
    metric: "02",
  },
  {
    eyebrow: "Continuity",
    title: "The launch should still feel controlled after demand arrives.",
    body: "Every system layer is designed to keep the project stable when traffic, attention, and expectation all spike at once.",
    metric: "03",
  },
];

export const processSteps: ProcessStep[] = [
  {
    id: "01",
    label: "Register intent",
    title: "Submit a desk-grade access request.",
    body: "Prospective participants provide capital profile, preferred lane, and wallet routing details through a narrow intake path built for serious buyers.",
    note: "Initial qualification and routing",
  },
  {
    id: "02",
    label: "Review",
    title: "Allocation logic is applied before invitations move.",
    body: "The desk reviews concentration, timing fit, and operational readiness so allocations serve launch stability instead of vanity volume.",
    note: "Lane placement and confirmation",
  },
  {
    id: "03",
    label: "Onboard",
    title: "Wallet readiness and security posture are cleared.",
    body: "Qualified participants receive a guided onboarding path covering settlement instructions, access timing, and support channels before the window opens.",
    note: "Security and settlement checks",
  },
  {
    id: "04",
    label: "Activate",
    title: "Vault access opens on sequenced terms.",
    body: "Confirmed participants enter the presale through a controlled activation window tied to the release schedule, not a race condition.",
    note: "Final allocation execution",
  },
];

export const moduleCards: ModuleCard[] = [
  {
    eyebrow: "Launch Timing",
    title: "Three timed gates keep the market narrative coherent.",
    body: "Desk review opens on 09 May. Allocation confirmations lock across a fourteen-day presale band. Vault activation follows security sign-off and treasury sync.",
    metric: "T-21 / T-7 / T+0",
    desktopClassName: "lg:col-span-2 lg:row-span-2",
  },
  {
    eyebrow: "Consultation Process",
    title: "Every serious allocation can route through a human desk.",
    body: "Private consultation is available for strategic wallets, family office allocations, and operators who need structured support before committing.",
    metric: "1:1 // DESK",
    desktopClassName: "lg:col-span-2",
  },
  {
    eyebrow: "Ecosystem Layers",
    title: "Treasury, access, governance, and partner rails stay isolated by design.",
    body: "The architecture separates execution concerns so no single attention spike compromises treasury judgement or operational continuity.",
    metric: "4 // LAYERS",
    desktopClassName: "lg:col-span-1",
  },
  {
    eyebrow: "Royalty Model",
    title: "Secondary activity routes value back into resilience.",
    body: "A 2.5% royalty stream is reserved for treasury reinforcement, security maintenance, and high-touch participant operations where applicable.",
    metric: "2.5% // ROUTED",
    desktopClassName: "lg:col-span-1",
  },
  {
    eyebrow: "Presale Access",
    title: "Foundation, Strategic, and Institutional lanes keep entry calibrated.",
    body: "Different access tiers allow the desk to protect concentration, sequence approvals, and maintain room for aligned long-term holders.",
    metric: "3 // LANES",
    desktopClassName: "lg:col-span-2",
  },
  {
    eyebrow: "Security / Support / Onboarding",
    title: "Operational transparency is built into the journey.",
    body: "From wallet hygiene to post-allocation support, the onboarding layer is designed to reduce avoidable errors without diluting the premium feel.",
    metric: "24H // SUPPORT",
    desktopClassName: "lg:col-span-2",
  },
];

export const trustMetrics = [
  { label: "Allocation review", value: "Manual + ruleset" },
  { label: "Custody posture", value: "Multisig routed" },
  { label: "Support lane", value: "Operator led" },
  { label: "Launch sequencing", value: "Three checkpoints" },
];

export const trustPanels: TrustPanel[] = [
  {
    eyebrow: "Operating Dossier",
    title: "Trust is presented as procedure, not marketing copy.",
    body: "Iron Vault exposes the logic behind its launch stack so sophisticated buyers can judge the system as an operator would.",
    points: [
      "Capital intake reviewed before allocation release",
      "Treasury, reserve, and liquidity layers separated",
      "Security sign-off gates tied to launch timing",
    ],
  },
  {
    eyebrow: "Structure",
    title: "The launch stack is engineered for composure under demand.",
    body: "Legal sequence, treasury process, and support responsibilities are visible up front to reduce ambiguity when the room gets crowded.",
    points: [
      "Entity and documentation track prepared in parallel",
      "Operator access limited by role and phase",
      "Support path remains active through activation",
    ],
  },
  {
    eyebrow: "Launch Rails",
    title: "Timing, approvals, and participant experience stay synchronized.",
    body: "The same choreography that shapes the page also shapes the operational flow: review, confirm, onboard, activate.",
    points: [
      "Phase windows are fixed before public movement",
      "Desk support remains available during settlement",
      "Post-activation updates follow a predictable cadence",
    ],
  },
];

export const operatingRoles = [
  {
    title: "Capital Desk",
    body: "Routes serious interest into the right access lane and keeps allocation logic defensible.",
  },
  {
    title: "Treasury Control",
    body: "Protects reserve posture, liquidity sequencing, and operational runway across phases.",
  },
  {
    title: "Security Support",
    body: "Guides onboarding, wallet readiness, and participant handling through launch execution.",
  },
];

export const faqItems: FaqItem[] = [
  {
    question: "Is Iron Vault Token positioned as a public memecoin launch?",
    answer:
      "No. The brand is built around controlled access, operational seriousness, and a staged launch experience designed for participants who value process over spectacle.",
  },
  {
    question: "Why use a consultation-led presale instead of open access?",
    answer:
      "Because open access optimizes for speed, not quality. A consultation-led lane allows concentration control, cleaner onboarding, and a more stable release sequence.",
  },
  {
    question: "How does the presale flow protect participants?",
    answer:
      "Requests are reviewed before allocations are issued, onboarding guidance is provided before settlement, and the launch window is sequenced rather than left to chaos.",
  },
  {
    question: "Can smaller participants still request access?",
    answer:
      "Yes. The system includes multiple access lanes so intent can be assessed relative to fit, timing, and operational readiness rather than raw size alone.",
  },
  {
    question: "What happens after I submit the intake form?",
    answer:
      "Your request enters the desk queue, the preferred access lane is reviewed, and you receive the next instruction set once the operating team clears the request.",
  },
];

export const ctaSignals = [
  "Private desk review",
  "Structured lane assignment",
  "Guided onboarding",
  "Sequenced activation",
];