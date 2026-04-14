"use client";

import { useEffect, useRef } from "react";

import {
  MotionConfig,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";

import { VaultMark } from "./vault-mark";

const entryEase = [0.22, 1, 0.36, 1] as const;

const phases = [
  {
    title: "Pre-sale",
    description:
      "Early access plus guided learning modules so members understand the ecosystem before taking action.",
  },
  {
    title: "Real Estate Integration",
    description:
      "Real-world asset education and participation designed to make complex markets understandable and approachable.",
  },
  {
    title: "Stablecoin",
    description:
      "The final layer of the ecosystem, focused on long-term stability, practical utility, and informed participation.",
  },
];

const educationModules = [
  "Real estate fundamentals for digital investors",
  "How tokenization works from issuance to utility",
  "Stablecoin mechanics, risks, and long-term strategy",
  "How to evaluate opportunities with discipline",
];

const heroCoins = [
  { id: "sol", symbol: "◎", x: "16%", y: "9%", size: 130, delay: 0.12, drift: 8, spin: -3 },
  { id: "ivt", symbol: "IVT", x: "42%", y: "2%", size: 112, delay: 0.28, drift: 10, spin: 4 },
  { id: "vault", symbol: "V", x: "65%", y: "14%", size: 120, delay: 0.44, drift: 7, spin: -2 },
  { id: "sig", symbol: "S", x: "79%", y: "4%", size: 94, delay: 0.58, drift: 9, spin: 3 },
];

function GoldCoin({ symbol, size }: { symbol: string; size: number }) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_228deg,_#886621,_#f6df95_17%,_#987129_35%,_#f8e6ad_54%,_#7f5f1d_75%,_#e9cf83)] shadow-[0_14px_34px_rgba(0,0,0,0.5),0_0_34px_rgba(153,69,255,0.2)]" />
      <div className="absolute inset-[7%] rounded-full bg-[radial-gradient(72%_70%_at_30%_24%,rgba(255,248,218,0.95)_0%,rgba(232,197,112,0.88)_34%,rgba(145,101,26,0.94)_74%,rgba(67,42,9,0.98)_100%)]" />
      <div className="absolute inset-[11%] rounded-full border border-white/18 bg-[radial-gradient(62%_62%_at_36%_24%,rgba(255,255,255,0.28)_0%,transparent_58%)]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="select-none text-[clamp(1rem,2vw,1.4rem)] font-semibold tracking-[-0.015em] text-white/88 drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
          {symbol}
        </span>
      </div>
    </div>
  );
}

export function VaultPage() {
  const rootRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(42);
  const glowX = useSpring(mouseX, { stiffness: 24, damping: 22, mass: 1.15 });
  const glowY = useSpring(mouseY, { stiffness: 24, damping: 22, mass: 1.15 });

  const glowLeft = useTransform(glowX, (value) => `${value}%`);
  const glowTop = useTransform(glowY, (value) => `${value}%`);

  useEffect(() => {
    const handlePointer = (event: PointerEvent) => {
      const root = rootRef.current;
      if (!root) return;

      const rect = root.getBoundingClientRect();
      const localX = ((event.clientX - rect.left) / rect.width) * 100;
      const localY = ((event.clientY - rect.top) / rect.height) * 100;

      mouseX.set(Math.max(0, Math.min(100, localX)));
      mouseY.set(Math.max(0, Math.min(100, localY)));
    };

    window.addEventListener("pointermove", handlePointer);
    return () => window.removeEventListener("pointermove", handlePointer);
  }, [mouseX, mouseY]);

  return (
    <MotionConfig reducedMotion="user">
      <main ref={rootRef} className="relative overflow-hidden bg-[#05030b] text-white">
        <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[rgba(6,5,12,0.6)] backdrop-blur-xl">
          <div className="mx-auto flex max-w-[90rem] items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
            <a href="#hero" className="flex items-center gap-3">
              <VaultMark className="h-10 w-10" />
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/95">Iron Vault</p>
                <p className="text-[0.62rem] uppercase tracking-[0.28em] text-white/48">Education-first ecosystem</p>
              </div>
            </a>
            <div className="flex items-center gap-3">
              <a
                href="#community"
                className="rounded-full border border-white/20 bg-white/[0.04] px-4 py-2 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-white/84 transition-colors duration-300 hover:bg-white/[0.08]"
              >
                Join the Community
              </a>
            </div>
          </div>
        </header>

        <section
          id="hero"
          className="relative isolate min-h-screen overflow-hidden px-6 pb-16 pt-28 sm:px-10 lg:px-16 xl:px-20"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(140%_120%_at_10%_10%,rgba(153,69,255,0.22)_0%,rgba(7,5,12,0.94)_50%,#05030b_100%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(108deg,rgba(153,69,255,0.08),transparent_42%,rgba(20,241,149,0.06)_80%,transparent)]" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)] [background-size:74px_74px]" />

          <motion.div
            aria-hidden
            className="pointer-events-none absolute z-0 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
            style={{
              left: glowLeft,
              top: glowTop,
              background:
                "radial-gradient(circle, rgba(153,69,255,0.2), rgba(20,241,149,0.08) 34%, transparent 68%)",
            }}
          />

          <div className="relative z-10 mx-auto grid min-h-[calc(100svh-7rem)] max-w-[1380px] items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
            <div className="max-w-[700px]">
              <motion.h1
                initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{ duration: 1.05, ease: entryEase }}
                className="text-[clamp(2.6rem,7.8vw,6.2rem)] font-semibold leading-[0.9] tracking-[-0.045em] text-white"
              >
                Iron Vault Token - Access the Future
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{ duration: 0.95, delay: 0.14, ease: entryEase }}
                className="mt-7 max-w-[38rem] text-[clamp(1rem,1.75vw,1.28rem)] leading-relaxed text-white/70"
              >
                Education. Community. Long-term vision. Built in three phases.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{ duration: 0.95, delay: 0.22, ease: entryEase }}
                className="mt-5 max-w-[40rem] text-base leading-8 text-white/56"
              >
                We are building something legendary. Come learn with us. Speak to a real person.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{ duration: 0.92, delay: 0.3, ease: entryEase }}
                className="mt-10 flex flex-wrap items-center gap-4"
              >
                <a
                  href="#community"
                  className="rounded-full bg-white px-7 py-3.5 text-sm font-medium tracking-[-0.01em] text-[#0b0916] shadow-[0_8px_28px_rgba(255,255,255,0.14)] transition-colors duration-300 hover:bg-[#f2efff]"
                >
                  Join the Community
                </a>
                <a
                  href="#representative"
                  className="rounded-full border border-white/20 bg-white/[0.03] px-7 py-3.5 text-sm font-medium tracking-[-0.01em] text-white/84 backdrop-blur-md transition-all duration-300 hover:border-white/35 hover:bg-white/[0.08]"
                >
                  Speak to a Representative
                </a>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 1.1, delay: 0.2, ease: entryEase }}
              className="relative mx-auto h-[510px] w-full max-w-[620px] lg:h-[600px]"
            >
              <div className="absolute -left-6 top-[10%] h-[430px] w-[138px] rotate-[22deg] rounded-[999px] bg-[linear-gradient(180deg,rgba(183,130,255,0.8),rgba(153,69,255,0.66)_34%,rgba(67,24,126,0.78)_76%,rgba(20,241,149,0.26)_100%)] shadow-[0_0_70px_rgba(153,69,255,0.28),0_0_18px_rgba(20,241,149,0.16),inset_-14px_0_22px_rgba(0,0,0,0.36),inset_10px_0_16px_rgba(255,255,255,0.1)]" />
              <div className="absolute -right-8 top-[16%] h-[460px] w-[150px] -rotate-[17deg] rounded-[999px] bg-[linear-gradient(180deg,rgba(191,151,255,0.78),rgba(153,69,255,0.62)_32%,rgba(75,31,140,0.82)_74%,rgba(20,241,149,0.29)_100%)] shadow-[0_0_75px_rgba(153,69,255,0.3),0_0_20px_rgba(20,241,149,0.18),inset_-14px_0_24px_rgba(0,0,0,0.35),inset_10px_0_16px_rgba(255,255,255,0.11)]" />

              <div className="absolute left-[13%] top-[18%] h-[320px] w-[74%] rounded-[3rem] bg-[radial-gradient(72%_56%_at_50%_35%,rgba(153,69,255,0.28)_0%,rgba(20,241,149,0.08)_45%,transparent_78%)] blur-3xl" />

              {heroCoins.map((coin) => (
                <motion.div
                  key={coin.id}
                  className="absolute z-10"
                  style={{ left: coin.x, top: coin.y }}
                  initial={{ opacity: 0, y: 16, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 1, delay: coin.delay, ease: entryEase }}
                >
                  <motion.div
                    animate={
                      reduceMotion
                        ? undefined
                        : {
                            y: [0, -coin.drift, 0],
                            rotateZ: [0, coin.spin, 0],
                          }
                    }
                    transition={{
                      duration: 14 + coin.delay * 4,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    <GoldCoin symbol={coin.symbol} size={coin.size} />
                  </motion.div>
                </motion.div>
              ))}

              <div className="pointer-events-none absolute inset-x-12 bottom-8 h-16 rounded-full bg-[radial-gradient(55%_82%_at_50%_50%,rgba(153,69,255,0.22)_0%,rgba(20,241,149,0.08)_44%,transparent_76%)] blur-2xl" />
            </motion.div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(to_top,rgba(5,3,11,0.96),transparent)]" />
        </section>

        <section id="what" className="px-6 pb-8 pt-16 sm:px-10 lg:px-16 xl:px-20">
          <div className="mx-auto max-w-[1180px] rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl sm:p-10 lg:p-12">
            <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#c6a9ff]">What is Iron Vault Token?</p>
            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl">
              A platform access token with an education portal at its core.
            </h2>
            <p className="mt-6 max-w-4xl text-base leading-8 text-white/66 lg:text-lg">
              Iron Vault Token is designed to give members access to a guided ecosystem where education comes first. The token unlocks pathways into learning, community, and practical participation so people can make informed decisions in evolving markets.
            </p>
          </div>
        </section>

        <section id="phases" className="px-6 pb-8 pt-12 sm:px-10 lg:px-16 xl:px-20">
          <div className="mx-auto max-w-[1180px]">
            <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#c6a9ff]">The Three Phases</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">Built for long-term education and participation.</h2>
            <div className="mt-9 grid gap-4 md:grid-cols-3">
              {phases.map((phase, index) => (
                <motion.article
                  key={phase.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.78, delay: index * 0.08, ease: entryEase }}
                  className="rounded-[1.6rem] border border-white/10 bg-[linear-gradient(170deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-6"
                >
                  <p className="text-[0.62rem] uppercase tracking-[0.26em] text-white/42">Phase 0{index + 1}</p>
                  <h3 className="mt-4 text-xl font-semibold tracking-[-0.015em] text-white">{phase.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-white/64">{phase.description}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="education" className="px-6 pb-8 pt-12 sm:px-10 lg:px-16 xl:px-20">
          <div className="mx-auto max-w-[1180px] rounded-[2rem] border border-white/10 bg-[linear-gradient(140deg,rgba(153,69,255,0.12),rgba(20,241,149,0.06),rgba(255,255,255,0.02))] p-8 sm:p-10 lg:p-12">
            <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#c6a9ff]">Education Modules</p>
            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl">
              Learn how real estate, tokenization, and stablecoins actually work.
            </h2>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {educationModules.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.72, delay: index * 0.07, ease: entryEase }}
                  className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/25 p-4"
                >
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#9945FF] shadow-[0_0_0_4px_rgba(153,69,255,0.2)]" />
                  <p className="text-sm leading-7 text-white/74">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="community" className="px-6 pb-16 pt-12 sm:px-10 lg:px-16 xl:px-20">
          <div className="mx-auto max-w-[1180px] rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 sm:p-10 lg:p-12">
            <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#c6a9ff]">Community</p>
            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl">
              Join the movement.
            </h2>
            <p className="mt-6 max-w-4xl text-base leading-8 text-white/66 lg:text-lg">
              This community is for people who want clarity, conviction, and real conversation. We are building something legendary with education at the center, and we invite you to learn alongside us.
            </p>

            <div id="representative" className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#"
                className="rounded-full bg-white px-7 py-3.5 text-sm font-medium tracking-[-0.01em] text-[#0b0916] shadow-[0_8px_28px_rgba(255,255,255,0.14)] transition-colors duration-300 hover:bg-[#f2efff]"
              >
                Speak to a Representative
              </a>
              <a
                href="#"
                className="rounded-full border border-white/20 bg-white/[0.03] px-7 py-3.5 text-sm font-medium tracking-[-0.01em] text-white/84 transition-all duration-300 hover:border-white/35 hover:bg-white/[0.08]"
              >
                Join the Community
              </a>
            </div>
          </div>
        </section>
      </main>
    </MotionConfig>
  );
}
