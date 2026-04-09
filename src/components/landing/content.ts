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
    label: "Your allocation",
    value: "250K",
    detail: "You get 250,000 tokens at the lowest price this token will ever be. Period.",
  },
  {
    label: "Presale closes",
    value: "Soon",
    detail: "Once spots fill or we hit the November 1, 2026 exchange date — this price is gone forever.",
  },
  {
    label: "Passive income",
    value: "24/7",
    detail: "Opt into royalties and earn from every single transaction on the platform. Around the clock.",
  },
];

export const tickerItems = [
  "LIMITED SPOTS REMAINING",
  "250K TOKENS AT $0.001",
  "EXCHANGE LAUNCH NOV 1 2026",
  "EARN ROYALTIES 24/7",
  "OPT IN NOW — PRESALE CLOSING",
  "BACKED BY REAL-WORLD ASSETS",
];

export const architectureCards: DetailCard[] = [
  {
    eyebrow: "Get Paid to Hold",
    title: "Earn royalties on every single transaction — automatically, 24/7.",
    body: "This isn't staking. This isn't yield farming. You opt in, and you get paid every time anyone trades IVT on the platform. While you sleep. While you're on vacation. Non-stop.",
    metric: "24/7 // INCOME",
  },
  {
    eyebrow: "Backed by Real Assets",
    title: "Shopping centers. Gas stations. Franchises. Real property backing a real token.",
    body: "The roadmap isn't theoretical — Common Wealth Ventures is acquiring commercial real estate to back a stablecoin. Your token sits inside an ecosystem with tangible, revenue-producing assets.",
    metric: "REAL // ESTATE",
  },
  {
    eyebrow: "Ground Floor Price",
    title: "You're getting in at $0.001. That's a tenth of a penny per token.",
    body: "After the exchange launch on November 1, 2026, the market sets the price. Presale participants are the only people who will ever buy at this level. This is your one shot.",
    metric: "$0.001 // ENTRY",
  },
];

export const whyCards: DetailCard[] = [
  {
    eyebrow: "This Price Disappears",
    title: "$0.001 is the presale price. Once spots fill, it's gone. No exceptions.",
    body: "Every presale that's ever mattered had a moment where the early people got in and the rest wished they had. This is that moment. The exchange opens November 1, 2026 — and the presale price vanishes.",
    metric: "01",
  },
  {
    eyebrow: "Not Another Meme Coin",
    title: "IVT is tied to real revenue, real assets, and a real company you can call on the phone.",
    body: "Common Wealth Ventures LLC is a registered US company in Peoria, AZ. Call 888-368-2502 right now if you want. This isn't anonymous devs on Discord — this is a business with a plan and a team.",
    metric: "02",
  },
  {
    eyebrow: "Generational Wealth",
    title: "Royalties from every trade. Passive income that compounds over time. For you and your family.",
    body: "When IVT hits the exchanges, every transaction generates royalty distributions for opted-in holders. That's income you didn't work for, hitting your wallet 24 hours a day, 7 days a week.",
    metric: "03",
  },
];

export const processSteps: ProcessStep[] = [
  {
    id: "01",
    label: "Drop your info",
    title: "Takes 60 seconds. Name, phone, email. That's it.",
    body: "No credit card. No commitment. No pressure. Just tell us how to reach you and we'll do the rest. You're not buying anything yet — you're getting in line.",
    note: "60 seconds",
  },
  {
    id: "02",
    label: "We call you",
    title: "A real person calls you back within 24 hours.",
    body: "Not a chatbot. Not a drip email sequence. A real representative from Common Wealth Ventures calls you, answers every question you have, and explains exactly how this works.",
    note: "Within 24 hours",
  },
  {
    id: "03",
    label: "Get the full picture",
    title: "Pricing. Royalties. Timeline. Everything laid out — no surprises.",
    body: "We walk you through the $0.001 presale price, the royalty program, the November 1st exchange date, and the real estate roadmap. If it's not for you, no hard feelings.",
    note: "Zero pressure",
  },
  {
    id: "04",
    label: "Lock your spot",
    title: "Secure 250,000 tokens at the founding price before it's gone.",
    body: "If you decide to move forward, we lock in your allocation. Your tokens are registered. Your spot is secured. You're in before the exchange opens to the public.",
    note: "You're in",
  },
];

export const moduleCards: ModuleCard[] = [
  {
    eyebrow: "The Roadmap Is Real",
    title: "Phase 1: You buy at $0.001. Phase 2: Revenue + real estate. Phase 3: Stablecoin.",
    body: "This isn't a white paper sitting in a Google Doc. The plan is already in motion. Presale builds the community, trading volume funds commercial real estate acquisition, and the stablecoin launches backed by those assets.",
    metric: "3 // PHASES",
    desktopClassName: "lg:col-span-2 lg:row-span-2",
  },
  {
    eyebrow: "Talk to a Human",
    title: "You'll speak with a real person before you spend a single dollar.",
    body: "We don't hide behind a checkout page. You get a live call with someone who can answer every question. If you're not convinced, you walk away. Simple.",
    metric: "1:1 // CALL",
    desktopClassName: "lg:col-span-2",
  },
  {
    eyebrow: "4 Revenue Layers",
    title: "Token utility + royalties + real estate + stablecoin.",
    body: "Four separate layers of value built into one ecosystem. Each one generates revenue. Each one feeds the next. This is how generational wealth gets built.",
    metric: "4 // LAYERS",
    desktopClassName: "lg:col-span-1",
  },
  {
    eyebrow: "Get Paid 24/7",
    title: "Royalties hit your wallet every time someone trades. Non-stop.",
    body: "Opt into the royalty program and you earn from every single transaction on the platform. Not once a month. Not quarterly. Every transaction. Every hour. Every day.",
    metric: "24/7 // INCOME",
    desktopClassName: "lg:col-span-1",
  },
  {
    eyebrow: "250K Tokens Yours",
    title: "Each presale package: 250,000 IVT at $0.001. First come, first served.",
    body: "When the presale allocation is gone, it's gone. There is no waitlist after this. No second round. No \"we'll open more spots.\" You either get in now or you buy on the exchange at market price.",
    metric: "250K // YOURS",
    desktopClassName: "lg:col-span-2",
  },
  {
    eyebrow: "Earn 10% Referrals",
    title: "Tell your people. Earn 10% on everything they invest — paid in 24 hours.",
    body: "Refer a friend, family member, or anyone. You earn a 10% commission paid within 24 hours. And it's not just their first purchase — it's everything they ever spend with the company. Forever.",
    metric: "10% // FOREVER",
    desktopClassName: "lg:col-span-2",
  },
];

export const trustMetrics = [
  { label: "Real company", value: "US registered LLC" },
  { label: "Call us right now", value: "888-368-2502" },
  { label: "Exchange launch", value: "Nov 1, 2026" },
  { label: "Real people", value: "Live reps on every call" },
];

export const trustPanels: TrustPanel[] = [
  {
    eyebrow: "We're Not Anonymous",
    title: "Real company. Real address. Real phone number. Call us.",
    body: "Common Wealth Ventures LLC is registered in the United States, based in Peoria, Arizona. Pick up the phone and call 888-368-2502 right now — a real person will answer.",
    points: [
      "Registered LLC — look us up",
      "Peoria, Arizona HQ — not a PO box",
      "888-368-2502 — call any time",
    ],
  },
  {
    eyebrow: "No Hidden Terms",
    title: "Everything is explained before you commit a single dollar.",
    body: "On your consultation call, we break down every detail: presale pricing, royalty rates, distribution mechanics, the exchange timeline. If something doesn't sit right, you walk away. Zero pressure.",
    points: [
      "Full royalty terms disclosed on every call",
      "No auto-billing, no fine-print gotchas",
      "You decide when — and if — you're ready",
    ],
  },
  {
    eyebrow: "The Clock Is Ticking",
    title: "November 1, 2026 — IVT launches on multiple exchanges.",
    body: "This date is public and locked. When the exchange opens, the presale is over. Early participants get direct updates on exchange partnerships, milestones, and everything leading to launch day.",
    points: [
      "Exchange partnerships actively being finalized",
      "Presale holders get first-priority updates",
      "Every milestone published — no guessing",
    ],
  },
];

export const operatingRoles = [
  {
    title: "Your Rep",
    body: "A dedicated human who answers your questions, walks you through everything, and doesn't hang up until you're 100% clear.",
  },
  {
    title: "Royalty Setup",
    body: "Shows you exactly how the 24/7 passive income works — what you earn, how it's distributed, and how to opt in on the spot.",
  },
  {
    title: "Token Onboarding",
    body: "Guides you step-by-step through securing your 250K tokens, setting up your account, and getting locked in before launch.",
  },
];

export const faqItems: FaqItem[] = [
  {
    question: "Why should I trust this? There are a million token projects out there.",
    answer:
      "Fair question. Here's the difference: Common Wealth Ventures is a registered US company based in Peoria, Arizona. We have a phone number you can call right now — 888-368-2502. We have a published roadmap with a locked exchange date. And we put every participant on a live call with a real person before they spend a dime. How many other projects do that?",
  },
  {
    question: "Why can't I just buy online? Why do I have to talk to someone?",
    answer:
      "Because this is a real financial decision and you deserve to understand exactly what you're getting into. The call is 100% informational — not a sales pitch. We answer your questions, explain the royalty program, walk you through the timeline. If you're not interested, no hard feelings. After November 1, 2026, tokens will be available on public exchanges with no call required.",
  },
  {
    question: "How do the royalties actually work? What do I earn?",
    answer:
      "When IVT launches on exchanges, every transaction generates a fee. A portion of that fee is distributed to royalty participants automatically, on-chain, 24/7. The more people trade, the more you earn. The exact rates, distribution schedule, and opt-in process are explained in detail on your consultation call.",
  },
  {
    question: "What's the catch? What's the worst that could happen?",
    answer:
      "We're going to be straight with you: all digital assets carry risk. The worst case is the exchange launch gets delayed or the token doesn't perform the way we all hope. We're not financial advisors and we can't guarantee returns. But we can show you a registered company, a real team, a working phone line, and a plan that's already in motion. Only invest what you can afford to risk.",
  },
  {
    question: "What happens after I fill out the form?",
    answer:
      "You get a confirmation email immediately. Within 24 hours, a representative calls you at your preferred time. The first call is 10–20 minutes — just enough to answer your questions and explain everything. If you're not ready, that's fine. No follow-up spam, no pressure.",
  },
];

export const ctaSignals = [
  "250K tokens at $0.001",
  "24/7 passive royalties",
  "Presale closing soon",
  "Call us: 888-368-2502",
];