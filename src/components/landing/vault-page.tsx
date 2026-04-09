"use client";

import { useEffect, useRef, useState } from "react";

import {
  AnimatePresence,
  MotionConfig,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import {
  architectureCards,
  ctaSignals,
  faqItems,
  heroStats,
  moduleCards,
  operatingRoles,
  processSteps,
  tickerItems,
  trustMetrics,
  trustPanels,
  whyCards,
} from "./content";
import { FAQAccordion } from "./faq-accordion";
import { IntakeForm } from "./intake-form";
import { MagneticButton } from "./magnetic-button";
import { useVaultScroll } from "./use-vault-scroll";
import { VaultMark } from "./vault-mark";

const heroEase = [0.16, 1, 0.3, 1] as const;
const panelEase = [0.76, 0, 0.24, 1] as const;

const headlineLines = [
  "250,000 tokens. $0.001 each.",
  "This window doesn't stay open.",
];

const navItems = [
  { label: "The opportunity", href: "#what" },
  { label: "Why now", href: "#why" },
  { label: "How it works", href: "#process" },
  { label: "Proof", href: "#proof" },
  { label: "FAQ", href: "#faq" },
];

const shutterPlateClassNames = ["left-0 w-1/4", "left-1/4 w-1/4", "left-2/4 w-1/4", "left-3/4 w-1/4"];

const whyCardPositionClassNames = [
  "lg:left-0 lg:top-0",
  "lg:right-0 lg:top-[7.5rem]",
  "lg:bottom-0 lg:left-[4.375rem]",
];

export function VaultPage() {
  const rootRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [booted, setBooted] = useState(Boolean(reduceMotion));

  const cardRotateX = useSpring(0, { stiffness: 130, damping: 18, mass: 0.95 });
  const cardRotateY = useSpring(0, { stiffness: 130, damping: 18, mass: 0.95 });
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const heroGlow = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, rgba(240,207,134,0.24), transparent 44%)`;

  useVaultScroll(rootRef);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroLift = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const heroGridShift = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.3]);

  useEffect(() => {
    if (reduceMotion) {
      setBooted(true);
      return;
    }

    const timeout = window.setTimeout(() => {
      setBooted(true);
    }, 1700);

    return () => window.clearTimeout(timeout);
  }, [reduceMotion]);

  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    let frame = 0;

    const handlePointerMove = (event: PointerEvent) => {
      if (frame) {
        cancelAnimationFrame(frame);
      }

      frame = requestAnimationFrame(() => {
        root.style.setProperty("--pointer-x", `${(event.clientX / window.innerWidth) * 100}%`);
        root.style.setProperty("--pointer-y", `${(event.clientY / window.innerHeight) * 100}%`);
      });
    };

    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      if (frame) {
        cancelAnimationFrame(frame);
      }
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  function handleCardPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const localX = event.clientX - bounds.left;
    const localY = event.clientY - bounds.top;
    const centerX = bounds.width / 2;
    const centerY = bounds.height / 2;

    cardRotateX.set(-((localY - centerY) / centerY) * 6.5);
    cardRotateY.set(((localX - centerX) / centerX) * 8.5);
    glowX.set((localX / bounds.width) * 100);
    glowY.set((localY / bounds.height) * 100);
  }

  function handleCardPointerLeave() {
    cardRotateX.set(0);
    cardRotateY.set(0);
    glowX.set(50);
    glowY.set(50);
  }

  function scrollToIntake() {
    document.getElementById("intake")?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  }

  return (
    <MotionConfig reducedMotion="user">
      <main ref={rootRef} className="vault-shell relative overflow-hidden">
        <header className="fixed inset-x-0 top-0 z-40 border-b border-white/8 bg-[rgba(6,6,6,0.56)] backdrop-blur-xl">
          <div className="mx-auto flex max-w-[90rem] items-center justify-between px-4 py-4 lg:px-8">
            <a href="#top" className="flex items-center gap-3">
              <VaultMark className="h-11 w-11" />
              <div>
                <p className="font-display text-lg uppercase tracking-[0.24em] text-white/92">
                  Iron Vault
                </p>
                <p className="font-data text-[0.62rem] uppercase tracking-[0.32em] text-white/40">
                  Presale closing soon
                </p>
              </div>
            </a>
            <nav className="hidden items-center gap-6 lg:flex">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="font-data text-[0.66rem] uppercase tracking-[0.32em] text-white/46 transition-colors duration-300 hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <MagneticButton href="#intake" className="hidden lg:inline-flex">
              Get your tokens
            </MagneticButton>
          </div>
        </header>

        <section
          id="top"
          ref={heroRef}
          className="relative flex min-h-screen items-end overflow-hidden pt-24"
        >
          <motion.div style={{ y: heroGridShift }} className="vault-grid absolute inset-0 opacity-30" />
          <motion.div
            style={{ y: heroLift, opacity: heroOpacity }}
            className="absolute inset-x-[12%] top-[12%] h-[28rem] rounded-full bg-[radial-gradient(circle,rgba(212,176,106,0.14),transparent_56%)] blur-3xl"
          />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,transparent,rgba(6,6,6,0.94))]" />

          <div className="vault-section grid min-h-[calc(100svh-6rem)] items-center gap-12 pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:pt-20">
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 1.05, ease: heroEase }}
                className="section-kicker"
              >
                Limited presale — act now
              </motion.div>
              <div className="mt-6 max-w-4xl space-y-2">
                {headlineLines.map((line, index) => (
                  <span key={line} className="headline-mask block">
                    <motion.span
                      initial={{ y: "115%", filter: "blur(14px)" }}
                      animate={{ y: 0, filter: "blur(0px)" }}
                      transition={{ duration: 1.1, delay: 1.15 + index * 0.12, ease: heroEase }}
                      className="font-display block text-[clamp(3.2rem,8vw,7.4rem)] leading-[0.9] tracking-[-0.04em] text-white"
                    >
                      {line}
                    </motion.span>
                  </span>
                ))}
              </div>
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 1.45, ease: heroEase }}
                className="mt-8 max-w-2xl text-base leading-8 text-[rgba(245,239,229,0.68)] lg:text-lg"
              >
                You&apos;re looking at 250,000 tokens at a tenth of a penny each —
                before Iron Vault Token hits exchanges on November 1, 2026. Once
                this presale fills, there is no second round. Opt in below, talk
                to a real person, and decide if this is for you.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 1.58, ease: heroEase }}
                className="mt-10 flex flex-col gap-4 sm:flex-row"
              >
                <MagneticButton href="#intake">Claim your spot now</MagneticButton>
                <MagneticButton href="#proof" variant="ghost">
                  See why people trust us
                </MagneticButton>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 1.68, ease: heroEase }}
                className="mt-12 grid gap-4 md:grid-cols-3"
              >
                {heroStats.map((item) => (
                  <article key={item.label} className="metric-chip cut-corners px-5 py-5">
                    <p className="font-data text-[0.62rem] uppercase tracking-[0.3em] text-white/42">
                      {item.label}
                    </p>
                    <p className="mt-4 font-data text-3xl text-[#f4d89e] lg:text-[2.3rem]">
                      {item.value}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-[rgba(245,239,229,0.64)]">
                      {item.detail}
                    </p>
                  </article>
                ))}
              </motion.div>
            </div>

            <motion.div style={{ y: heroLift }} className="relative z-10">
              <motion.div
                onPointerMove={handleCardPointerMove}
                onPointerLeave={handleCardPointerLeave}
                style={{
                  rotateX: cardRotateX,
                  rotateY: cardRotateY,
                  transformStyle: "preserve-3d",
                }}
                className="section-frame hero-shadow cut-corners panel-outline relative mx-auto max-w-[34rem] p-5 lg:p-7"
              >
                <motion.div
                  style={{ background: heroGlow }}
                  className="pointer-events-none absolute inset-0 opacity-80"
                />
                <div className="absolute inset-0 metal-hatch opacity-45" />
                <div className="absolute right-5 top-5 data-pill hidden lg:inline-flex">
                  Filling fast
                </div>
                <div className="relative grid gap-6 lg:grid-cols-[0.78fr_1fr]">
                  <div className="flex flex-col justify-between gap-6">
                    <div>
                      <p className="font-data text-[0.62rem] uppercase tracking-[0.32em] text-white/42">
                        IVT emblem
                      </p>
                      <motion.div
                        className="mt-5"
                        animate={
                          reduceMotion
                            ? undefined
                            : {
                                y: [0, -10, 0],
                                rotateZ: [0, 2, 0],
                              }
                        }
                        transition={{
                          duration: 8,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                        drag={!reduceMotion}
                        dragConstraints={{ top: -12, bottom: 12, left: -12, right: 12 }}
                        dragElastic={0.08}
                      >
                        <VaultMark className="mx-auto h-48 w-48 lg:h-56 lg:w-56" />
                      </motion.div>
                    </div>
                    <div className="data-pill w-fit">Limited allocation</div>
                  </div>

                  <div className="space-y-4">
                    <div className="panel-surface cut-corners p-5">
                      <div className="flex items-center justify-between gap-4 border-b border-white/8 pb-4">
                        <div>
                          <p className="font-data text-[0.62rem] uppercase tracking-[0.32em] text-white/42">
                            Your presale
                          </p>
                          <p className="mt-2 text-xl tracking-[0.02em] text-white">
                            What you get
                          </p>
                        </div>
                        <div className="data-pill">live</div>
                      </div>
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-[1.15rem] border border-white/8 bg-white/[0.025] p-4">
                          <p className="font-data text-[0.58rem] uppercase tracking-[0.3em] text-white/40">
                            Presale price
                          </p>
                          <p className="mt-3 font-data text-2xl text-[#f0cf86]">$0.001</p>
                        </div>
                        <div className="rounded-[1.15rem] border border-white/8 bg-white/[0.025] p-4">
                          <p className="font-data text-[0.58rem] uppercase tracking-[0.3em] text-white/40">
                            Per package
                          </p>
                          <p className="mt-3 font-data text-2xl text-white">250K tokens</p>
                        </div>
                      </div>
                    </div>

                    <div className="panel-surface cut-corners p-5">
                      <p className="font-data text-[0.62rem] uppercase tracking-[0.32em] text-white/42">
                        Why people are opting in
                      </p>
                      <div className="mt-4 space-y-3 text-sm text-[rgba(245,239,229,0.68)]">
                        <div className="flex items-start gap-3 border-b border-white/6 pb-3">
                          <span className="font-data text-[0.62rem] text-[#f0cf86]">01</span>
                          <p>You talk to a real person before spending a dime. No bots. No runaround.</p>
                        </div>
                        <div className="flex items-start gap-3 border-b border-white/6 pb-3">
                          <span className="font-data text-[0.62rem] text-[#f0cf86]">02</span>
                          <p>Royalties pay you 24/7 from every trade on the platform. Automatically.</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="font-data text-[0.62rem] text-[#f0cf86]">03</span>
                          <p>November 1, 2026 exchange launch — your presale price disappears after that.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          <div className="absolute inset-x-0 bottom-0 z-20 overflow-hidden border-y border-white/8 bg-black/35 backdrop-blur-lg">
            <motion.div data-strip className="marquee-track py-3">
              {[...tickerItems, ...tickerItems].map((item, index) => (
                <div
                  key={`${item}-${index}`}
                  className="font-data flex items-center gap-4 px-5 text-[0.68rem] uppercase tracking-[0.3em] text-white/56"
                >
                  <span>{item}</span>
                  <span className="text-[#d4b06a]">/</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        <section id="what" data-shutter className="vault-section">
          <div className="section-frame cut-corners relative px-6 py-8 lg:px-10 lg:py-12">
            <div className="pointer-events-none absolute inset-0 hidden lg:block">
              {shutterPlateClassNames.map((plateClassName, index) => (
                <div
                  key={index}
                  data-shutter-plate
                  className={`absolute inset-y-0 metal-hatch border-r border-white/8 bg-[linear-gradient(180deg,rgba(48,52,58,0.74),rgba(12,12,14,0.96))] ${plateClassName}`}
                />
              ))}
            </div>
            <div className="relative z-10">
              <div className="max-w-3xl">
                <span className="section-kicker">The opportunity</span>
                <h2 className="font-display mt-6 text-4xl leading-[0.95] tracking-[-0.04em] text-white lg:text-[4.3rem]">
                  Passive income. Real assets. One token. And you&apos;re early.
                </h2>
                <p className="mt-6 max-w-2xl text-base leading-8 text-[rgba(245,239,229,0.68)] lg:text-lg">
                  Iron Vault Token pays royalties from every trade on the platform. It&apos;s
                  backed by a roadmap to acquire commercial real estate. And right now,
                  you can get in at $0.001 per token — before anyone else.
                </p>
              </div>

              <div data-assemble className="mt-12 grid gap-5 lg:grid-cols-3">
                {architectureCards.map((card) => (
                  <article key={card.eyebrow} className="panel-surface cut-corners p-6 lg:p-7">
                    <p className="font-data text-[0.62rem] uppercase tracking-[0.3em] text-white/42">
                      {card.eyebrow}
                    </p>
                    <h3 className="mt-5 text-2xl leading-tight tracking-[0.01em] text-white">
                      {card.title}
                    </h3>
                    <p className="mt-5 text-sm leading-7 text-[rgba(245,239,229,0.66)] lg:text-base">
                      {card.body}
                    </p>
                    <div className="mt-6 data-pill">{card.metric}</div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="why" className="vault-section">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div>
              <span className="section-kicker">Why right now</span>
              <h2 className="font-display mt-6 text-4xl leading-[0.95] tracking-[-0.04em] text-white lg:text-[4rem]">
                This price vanishes the second the exchange opens. There is no round two.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-[rgba(245,239,229,0.68)] lg:text-lg">
                The people who got into Bitcoin early, Ethereum early, Solana early — they
                all had one thing in common: they moved before everyone else. This is your
                window. $0.001 per token. Once it closes, it&apos;s market price only.
              </p>
              <div className="mt-8 glow-divider max-w-xl" />
            </div>

            <div data-stack className="relative grid gap-4 lg:min-h-[32rem]">
              {whyCards.map((card, index) => (
                <article
                  key={card.eyebrow}
                  data-stack-card
                  className={`panel-surface cut-corners p-6 lg:absolute lg:w-[78%] lg:p-7 ${whyCardPositionClassNames[index]}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-data text-[0.62rem] uppercase tracking-[0.3em] text-white/42">
                        {card.eyebrow}
                      </p>
                      <h3 className="mt-4 text-2xl leading-tight text-white">{card.title}</h3>
                    </div>
                    <span className="font-data text-xl text-[#d4b06a]">{card.metric}</span>
                  </div>
                  <p className="mt-5 max-w-lg text-sm leading-7 text-[rgba(245,239,229,0.66)] lg:text-base">
                    {card.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="vault-section">
          <div data-process-pin className="section-frame cut-corners px-6 py-8 lg:px-10 lg:py-12">
            <div className="grid gap-10 lg:h-[38rem] lg:grid-cols-[0.82fr_1.18fr]">
              <div className="flex flex-col justify-between gap-6">
                <div>
                  <span className="section-kicker">It&apos;s simple</span>
                  <h2 className="font-display mt-6 text-4xl leading-[0.95] tracking-[-0.04em] text-white lg:text-[4rem]">
                    Drop your info. We call you. You decide. That&apos;s it.
                  </h2>
                  <p className="mt-6 max-w-xl text-base leading-8 text-[rgba(245,239,229,0.68)] lg:text-lg">
                    No checkout page. No pressure. Just a 60-second form and a call
                    from a real person who actually answers your questions. If it&apos;s not
                    for you, you walk away — zero strings attached.
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="panel-surface cut-corners p-5">
                    <p className="font-data text-[0.62rem] uppercase tracking-[0.3em] text-white/42">
                      Your price
                    </p>
                    <p className="mt-4 text-lg text-white">$0.001 per token — this will never be this low again.</p>
                  </div>
                  <div className="panel-surface cut-corners p-5">
                    <p className="font-data text-[0.62rem] uppercase tracking-[0.3em] text-white/42">
                      Questions?
                    </p>
                    <p className="mt-4 text-lg text-white">Call us right now: 888-368-2502.</p>
                  </div>
                </div>
              </div>

              <div className="relative flex gap-5 lg:pl-6">
                <div className="relative hidden w-6 lg:block">
                  <div className="absolute bottom-0 left-1/2 top-2 w-px -translate-x-1/2 bg-white/10" />
                  <div
                    data-process-line
                    className="absolute bottom-0 left-1/2 top-2 w-px -translate-x-1/2 bg-[linear-gradient(180deg,rgba(240,207,134,0.08),rgba(240,207,134,0.92))]"
                  />
                </div>
                <div className="flex-1 space-y-4 lg:space-y-5">
                  {processSteps.map((step) => (
                    <article
                      key={step.id}
                      data-process-step
                      className="panel-surface cut-corners p-5 lg:p-6"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-data text-[0.62rem] uppercase tracking-[0.3em] text-[#d4b06a]">
                            {step.id}
                            {" // "}
                            {step.label}
                          </p>
                          <h3 className="mt-4 text-xl leading-tight text-white lg:text-[1.45rem]">
                            {step.title}
                          </h3>
                        </div>
                        <span className="data-pill shrink-0">{step.note}</span>
                      </div>
                      <p className="mt-5 text-sm leading-7 text-[rgba(245,239,229,0.66)] lg:text-base">
                        {step.body}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="modules" className="vault-section">
          <div className="max-w-3xl">
            <span className="section-kicker">What&apos;s inside</span>
            <h2 className="font-display mt-6 text-4xl leading-[0.95] tracking-[-0.04em] text-white lg:text-[4rem]">
              Not just a token. An entire ecosystem built to pay you.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[rgba(245,239,229,0.68)] lg:text-lg">
              Royalties. Real estate. A stablecoin roadmap. A referral program that
              pays 10% forever. This is what&apos;s behind Iron Vault Token.
            </p>
          </div>

          <div className="mt-10 overflow-x-auto pb-4 lg:overflow-visible">
            <div
              data-assemble
              className="grid auto-cols-[84vw] grid-flow-col grid-rows-1 gap-4 snap-x snap-mandatory lg:auto-cols-auto lg:grid-flow-row lg:grid-cols-4 lg:grid-rows-3"
            >
              {moduleCards.map((card) => (
                <article
                  key={card.eyebrow}
                  className={`panel-surface cut-corners snap-start p-6 lg:p-7 ${card.desktopClassName}`}
                >
                  <div className="flex h-full flex-col justify-between gap-8">
                    <div>
                      <p className="font-data text-[0.62rem] uppercase tracking-[0.3em] text-white/42">
                        {card.eyebrow}
                      </p>
                      <h3 className="mt-5 text-2xl leading-tight text-white lg:text-[2rem]">
                        {card.title}
                      </h3>
                      <p className="mt-5 text-sm leading-7 text-[rgba(245,239,229,0.66)] lg:text-base">
                        {card.body}
                      </p>
                    </div>
                    <div className="data-pill w-fit">{card.metric}</div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="proof" className="vault-section">
          <div className="grid gap-10 lg:grid-cols-[0.84fr_1.16fr]">
            <div>
              <span className="section-kicker">We&apos;re the real deal</span>
              <h2 className="font-display mt-6 text-4xl leading-[0.95] tracking-[-0.04em] text-white lg:text-[4rem]">
                Real company. Real phone number. Real people. Call us right now.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-[rgba(245,239,229,0.68)] lg:text-lg">
                Common Wealth Ventures LLC — Peoria, Arizona. Pick up the phone and dial
                888-368-2502. A human answers. We&apos;ll tell you everything. No secrets,
                no fine print, no runaround.
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {trustMetrics.map((metric) => (
                  <article key={metric.label} data-metric className="metric-chip cut-corners px-5 py-5">
                    <p className="font-data text-[0.62rem] uppercase tracking-[0.3em] text-white/42">
                      {metric.label}
                    </p>
                    <p className="mt-4 text-lg text-white">{metric.value}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              <div data-assemble className="grid gap-5 lg:grid-cols-3">
                {trustPanels.map((panel) => (
                  <article key={panel.eyebrow} className="panel-surface cut-corners p-6">
                    <p className="font-data text-[0.62rem] uppercase tracking-[0.3em] text-white/42">
                      {panel.eyebrow}
                    </p>
                    <h3 className="mt-4 text-xl leading-tight text-white">{panel.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-[rgba(245,239,229,0.66)]">
                      {panel.body}
                    </p>
                    <div className="mt-5 space-y-3">
                      {panel.points.map((point) => (
                        <div key={point} className="flex items-start gap-3 text-sm text-[rgba(245,239,229,0.7)]">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d4b06a] shadow-[0_0_12px_rgba(212,176,106,0.48)]" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </article>
                ))}
              </div>

              <div data-assemble className="grid gap-4 md:grid-cols-3">
                {operatingRoles.map((role) => (
                  <article key={role.title} className="panel-surface cut-corners p-5 steel-sweep">
                    <p className="font-data text-[0.62rem] uppercase tracking-[0.3em] text-white/42">
                      {role.title}
                    </p>
                    <p className="mt-4 text-sm leading-7 text-[rgba(245,239,229,0.66)]">
                      {role.body}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="vault-section">
          <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr]">
            <div>
              <span className="section-kicker">Questions?</span>
              <h2 className="font-display mt-6 text-4xl leading-[0.95] tracking-[-0.04em] text-white lg:text-[4rem]">
                Everything you&apos;re probably wondering — answered.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-[rgba(245,239,229,0.68)] lg:text-lg">
                Still skeptical? Good. Read every answer below. Then call 888-368-2502 or
                drop your info in the form and let us prove it on the phone.
              </p>
            </div>
            <FAQAccordion items={faqItems} />
          </div>
        </section>

        <section id="intake" className="vault-section pb-28 lg:pb-32">
          <div className="section-frame cut-corners overflow-hidden px-6 py-8 lg:px-10 lg:py-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,176,106,0.16),transparent_24%),linear-gradient(180deg,transparent,rgba(0,0,0,0.36))]" />
            <div className="relative grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
              <div>
                <span className="section-kicker">Don&apos;t wait on this</span>
                <h2 className="font-display mt-6 text-4xl leading-[0.95] tracking-[-0.04em] text-white lg:text-[4rem]">
                  60 seconds. That&apos;s all it takes to claim your spot.
                </h2>
                <p className="mt-6 max-w-xl text-base leading-8 text-[rgba(245,239,229,0.68)] lg:text-lg">
                  Name. Phone. Email. That&apos;s it. We call you within 24 hours, answer
                  every question, and if you want in — we lock your 250,000 tokens
                  at $0.001 before anyone else.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {ctaSignals.map((signal) => (
                    <div key={signal} className="data-pill">
                      {signal}
                    </div>
                  ))}
                </div>
              </div>

              <div className="panel-surface cut-corners p-5 lg:p-7">
                <div className="mb-6 flex items-center justify-between gap-4 border-b border-white/8 pb-5">
                  <div>
                    <p className="font-data text-[0.62rem] uppercase tracking-[0.3em] text-white/42">
                      Claim your tokens
                    </p>
                    <p className="mt-2 text-xl text-white">Lock in your presale spot</p>
                  </div>
                  <div className="data-pill">filling fast</div>
                </div>
                <IntakeForm />
              </div>
            </div>
          </div>
        </section>

        <div className="fixed inset-x-4 bottom-4 z-40 lg:hidden">
          <motion.button
            type="button"
            onClick={scrollToIntake}
            whileTap={{ scale: 0.985 }}
            className="panel-surface cut-corners flex w-full items-center justify-between px-5 py-4"
          >
            <div className="text-left">
              <p className="font-data text-[0.62rem] uppercase tracking-[0.3em] text-white/42">
                Limited spots left
              </p>
              <p className="mt-1 text-sm text-white">Get your tokens now</p>
            </div>
            <span className="data-pill">enter</span>
          </motion.button>
        </div>

        <AnimatePresence>
          {!booted ? (
            <motion.div
              className="fixed inset-0 z-[80] overflow-hidden bg-[#050505]"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.38, ease: heroEase }}
            >
              <div className="vault-grid absolute inset-0 opacity-35" />
              <motion.div
                className="absolute inset-y-0 left-0 w-1/2 bg-[linear-gradient(180deg,rgba(67,70,76,0.9),rgba(14,14,16,0.98))] metal-hatch"
                exit={{ x: "-102%" }}
                transition={{ duration: 1.18, delay: 0.34, ease: panelEase }}
              />
              <motion.div
                className="absolute inset-y-0 right-0 w-1/2 bg-[linear-gradient(180deg,rgba(67,70,76,0.9),rgba(14,14,16,0.98))] metal-hatch"
                exit={{ x: "102%" }}
                transition={{ duration: 1.18, delay: 0.34, ease: panelEase }}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.72, filter: "blur(14px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.12, filter: "blur(18px)" }}
                transition={{ duration: 1.1, ease: heroEase }}
                className="absolute inset-0 flex flex-col items-center justify-center gap-6"
              >
                <VaultMark className="h-28 w-28 lg:h-36 lg:w-36" />
                <div className="text-center">
                  <p className="font-data text-[0.68rem] uppercase tracking-[0.36em] text-white/42">
                    Iron Vault Token
                  </p>
                  <p className="mt-3 font-display text-3xl tracking-[0.14em] text-white lg:text-5xl">
                    Iron Vault Token
                  </p>
                </div>
                <div className="flex items-center gap-3 font-data text-[0.62rem] uppercase tracking-[0.32em] text-[#d4b06a]">
                  <span className="h-2 w-2 rounded-full bg-[#d4b06a] shadow-[0_0_20px_rgba(212,176,106,0.5)] [animation:pulse-glow_1.6s_ease-in-out_infinite]" />
                  Presale loading
                </div>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </main>
    </MotionConfig>
  );
}