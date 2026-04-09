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
  "Capital deserves doors that resist.",
  "Iron Vault opens only on verified intent.",
];

const navItems = [
  { label: "What it is", href: "#what" },
  { label: "Why it matters", href: "#why" },
  { label: "Process", href: "#process" },
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
                  Token access desk
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
              Request access
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
                Private presale interface
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
                Iron Vault Token is a controlled-access presale engineered to feel
                like entering a protected system. Allocation is reviewed, onboarding is
                guided, and every release decision is framed around trust, pressure
                control, and operational composure.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 1.58, ease: heroEase }}
                className="mt-10 flex flex-col gap-4 sm:flex-row"
              >
                <MagneticButton href="#intake">Secure presale access</MagneticButton>
                <MagneticButton href="#proof" variant="ghost">
                  Inspect proof layer
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
                  Phase 01 armed
                </div>
                <div className="relative grid gap-6 lg:grid-cols-[0.78fr_1fr]">
                  <div className="flex flex-col justify-between gap-6">
                    <div>
                      <p className="font-data text-[0.62rem] uppercase tracking-[0.32em] text-white/42">
                        Vault emblem
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
                    <div className="data-pill w-fit">Verified intent only</div>
                  </div>

                  <div className="space-y-4">
                    <div className="panel-surface cut-corners p-5">
                      <div className="flex items-center justify-between gap-4 border-b border-white/8 pb-4">
                        <div>
                          <p className="font-data text-[0.62rem] uppercase tracking-[0.32em] text-white/42">
                            Private terminal
                          </p>
                          <p className="mt-2 text-xl tracking-[0.02em] text-white">
                            Presale control room
                          </p>
                        </div>
                        <div className="data-pill">live</div>
                      </div>
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-[1.15rem] border border-white/8 bg-white/[0.025] p-4">
                          <p className="font-data text-[0.58rem] uppercase tracking-[0.3em] text-white/40">
                            Allocation pool
                          </p>
                          <p className="mt-3 font-data text-2xl text-[#f0cf86]">12.5M IVT</p>
                        </div>
                        <div className="rounded-[1.15rem] border border-white/8 bg-white/[0.025] p-4">
                          <p className="font-data text-[0.58rem] uppercase tracking-[0.3em] text-white/40">
                            Access lane
                          </p>
                          <p className="mt-3 font-data text-2xl text-white">Consult-led</p>
                        </div>
                      </div>
                    </div>

                    <div className="panel-surface cut-corners p-5">
                      <p className="font-data text-[0.62rem] uppercase tracking-[0.32em] text-white/42">
                        System notes
                      </p>
                      <div className="mt-4 space-y-3 text-sm text-[rgba(245,239,229,0.68)]">
                        <div className="flex items-start gap-3 border-b border-white/6 pb-3">
                          <span className="font-data text-[0.62rem] text-[#f0cf86]">01</span>
                          <p>Steel-band access gates withdraw only after validation enters the room.</p>
                        </div>
                        <div className="flex items-start gap-3 border-b border-white/6 pb-3">
                          <span className="font-data text-[0.62rem] text-[#f0cf86]">02</span>
                          <p>Support stays human where trust has real monetary consequence.</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="font-data text-[0.62rem] text-[#f0cf86]">03</span>
                          <p>Release timing is sequenced to preserve authority once demand accelerates.</p>
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
                <span className="section-kicker">What Iron Vault is</span>
                <h2 className="font-display mt-6 text-4xl leading-[0.95] tracking-[-0.04em] text-white lg:text-[4.3rem]">
                  A token launch authored like a controlled financial system.
                </h2>
                <p className="mt-6 max-w-2xl text-base leading-8 text-[rgba(245,239,229,0.68)] lg:text-lg">
                  The experience is cinematic because the operating doctrine is serious.
                  Iron Vault Token treats access, reserve policy, and onboarding as
                  parts of the product, not invisible backend details.
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
              <span className="section-kicker">Why it matters</span>
              <h2 className="font-display mt-6 text-4xl leading-[0.95] tracking-[-0.04em] text-white lg:text-[4rem]">
                The right investors do not need a louder room. They need a cleaner one.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-[rgba(245,239,229,0.68)] lg:text-lg">
                Controlled friction signals intent. Sequenced access signals maturity.
                Operational transparency signals that the team expects scrutiny and is built
                to survive it.
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
                  <span className="section-kicker">How the process works</span>
                  <h2 className="font-display mt-6 text-4xl leading-[0.95] tracking-[-0.04em] text-white lg:text-[4rem]">
                    Each layer clears before the next one moves.
                  </h2>
                  <p className="mt-6 max-w-xl text-base leading-8 text-[rgba(245,239,229,0.68)] lg:text-lg">
                    Scroll through the launch sequence like you are descending through
                    deeper security bands. The motion mirrors the actual operating logic:
                    nothing opens before the prior state is settled.
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="panel-surface cut-corners p-5">
                    <p className="font-data text-[0.62rem] uppercase tracking-[0.3em] text-white/42">
                      Presale posture
                    </p>
                    <p className="mt-4 text-lg text-white">Designed for disciplined entry, not impulse.</p>
                  </div>
                  <div className="panel-surface cut-corners p-5">
                    <p className="font-data text-[0.62rem] uppercase tracking-[0.3em] text-white/42">
                      Onboarding mode
                    </p>
                    <p className="mt-4 text-lg text-white">Operator-guided where stakes justify precision.</p>
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
            <span className="section-kicker">Operational modules</span>
            <h2 className="font-display mt-6 text-4xl leading-[0.95] tracking-[-0.04em] text-white lg:text-[4rem]">
              A premium bento system assembled like secure instrumentation.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[rgba(245,239,229,0.68)] lg:text-lg">
              These cards are not decorative. Each one expresses a pressure point in the
              launch design: timing, support, access, value routing, and ecosystem control.
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
              <span className="section-kicker">Trust / proof</span>
              <h2 className="font-display mt-6 text-4xl leading-[0.95] tracking-[-0.04em] text-white lg:text-[4rem]">
                Transparency with structure feels operational. That is the point.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-[rgba(245,239,229,0.68)] lg:text-lg">
                Iron Vault avoids soft trust language. The proof layer shows how the
                system is staffed, timed, and governed so participants can audit the tone
                against the mechanics.
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
              <span className="section-kicker">FAQ</span>
              <h2 className="font-display mt-6 text-4xl leading-[0.95] tracking-[-0.04em] text-white lg:text-[4rem]">
                Direct answers for people who expect signal, not spin.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-[rgba(245,239,229,0.68)] lg:text-lg">
                The tone stays restrained because the product is trying to create trust,
                not borrow it. These are the practical questions the page should answer.
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
                <span className="section-kicker">CTA / lead capture</span>
                <h2 className="font-display mt-6 text-4xl leading-[0.95] tracking-[-0.04em] text-white lg:text-[4rem]">
                  Enter the desk on purpose.
                </h2>
                <p className="mt-6 max-w-xl text-base leading-8 text-[rgba(245,239,229,0.68)] lg:text-lg">
                  If the system feels heavy, that is intentional. Serious access should feel
                  consequential. Submit your request and the desk will route you through the
                  correct lane.
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
                      Allocation intake
                    </p>
                    <p className="mt-2 text-xl text-white">Secure request terminal</p>
                  </div>
                  <div className="data-pill">desk open</div>
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
                Access desk
              </p>
              <p className="mt-1 text-sm text-white">Request presale entry</p>
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
                    System coming online
                  </p>
                </div>
                <div className="flex items-center gap-3 font-data text-[0.62rem] uppercase tracking-[0.32em] text-[#d4b06a]">
                  <span className="h-2 w-2 rounded-full bg-[#d4b06a] shadow-[0_0_20px_rgba(212,176,106,0.5)] [animation:pulse-glow_1.6s_ease-in-out_infinite]" />
                  Security bands disengaging
                </div>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </main>
    </MotionConfig>
  );
}