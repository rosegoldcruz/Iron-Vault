"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

interface CoinProps {
  symbol: string;
  label: string;
  x: string;
  y: string;
  size: number;
  delay: number;
  rotate?: number;
  tilt?: number;
}

const ease = [0.25, 0.1, 0.25, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1, delay, ease },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay: number) => ({
    opacity: 1,
    transition: { duration: 1.2, delay, ease },
  }),
};

const phases = [
  {
    id: "01",
    title: "Pre-sale",
    description:
      "Early access to Iron Vault Token plus learning modules that explain the ecosystem before members make decisions.",
  },
  {
    id: "02",
    title: "Real Estate Integration",
    description:
      "Education and participation around real-world assets, built to make complex opportunities more understandable.",
  },
  {
    id: "03",
    title: "Stablecoin",
    description:
      "The final ecosystem layer focused on practical value, long-term structure, and a more durable financial foundation.",
  },
];

const modules = [
  "Learn how real estate works in a tokenized ecosystem.",
  "Understand how tokenization creates access and utility.",
  "Study how stablecoins function, where risk lives, and why structure matters.",
  "Talk to a real person and learn before you decide anything.",
];

function CoinSVG({ symbol, size }: { symbol: string; size: number }) {
  const id = `coin-${symbol.replace(/[^a-z0-9]/gi, "")}-${size}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-2xl"
    >
      <defs>
        <radialGradient id={`${id}-metal`} cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#f9e9b5" />
          <stop offset="26%" stopColor="#e0bb60" />
          <stop offset="60%" stopColor="#8e6521" />
          <stop offset="100%" stopColor="#4b3110" />
        </radialGradient>
        <linearGradient id={`${id}-rim`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c99d3e" />
          <stop offset="25%" stopColor="#f7e3a0" />
          <stop offset="50%" stopColor="#bb8d2d" />
          <stop offset="75%" stopColor="#8f6520" />
          <stop offset="100%" stopColor="#d5ab4f" />
        </linearGradient>
        <radialGradient id={`${id}-spec`} cx="36%" cy="28%" r="36%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.75)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        <radialGradient id={`${id}-shadow`} cx="50%" cy="50%" r="50%">
          <stop offset="78%" stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.36)" />
        </radialGradient>
      </defs>

      <circle cx="60" cy="60" r="58" fill={`url(#${id}-rim)`} />
      <circle cx="60" cy="60" r="52" fill={`url(#${id}-metal)`} />
      <circle cx="60" cy="60" r="52" fill={`url(#${id}-shadow)`} />
      <circle cx="60" cy="60" r="52" fill={`url(#${id}-spec)`} />
      <circle cx="60" cy="60" r="44" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="0.75" />

      <text
        x="60"
        y="66"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="rgba(255,255,255,0.86)"
        fontSize={symbol.length > 1 ? "20" : "28"}
        fontWeight="700"
        fontFamily="system-ui, -apple-system, sans-serif"
        style={{ textShadow: "0 1px 3px rgba(0,0,0,0.55)" }}
      >
        {symbol}
      </text>
    </svg>
  );
}

function Coin({ symbol, label, x, y, size, delay, rotate = 0, tilt = 0 }: CoinProps) {
  return (
    <motion.div
      className="absolute z-10"
      style={{ left: x, top: y }}
      custom={delay}
      variants={fadeIn}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        animate={{
          y: [0, -8, 0],
          rotateY: [tilt, tilt + 4, tilt],
          rotateZ: [rotate, rotate + 1.4, rotate],
        }}
        transition={{
          duration: 5 + delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="cursor-default"
        title={label}
      >
        <CoinSVG symbol={symbol} size={size} />
      </motion.div>
    </motion.div>
  );
}

function PurpleTube({ side, delay }: { side: "left" | "right"; delay: number }) {
  const isLeft = side === "left";

  return (
    <motion.div
      className={`absolute ${isLeft ? "-left-8 top-[8%]" : "-right-8 top-[13%]"} z-0`}
      custom={delay}
      variants={fadeIn}
      initial="hidden"
      animate="visible"
    >
      <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}>
        <div
          className="relative"
          style={{
            width: isLeft ? 92 : 104,
            height: isLeft ? 390 : 410,
            transform: isLeft ? "rotate(25deg)" : "rotate(-20deg)",
          }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: isLeft
                ? "linear-gradient(180deg, #9a5dff 0%, #7c3aed 28%, #5420a8 72%, rgba(20,241,149,0.32) 100%)"
                : "linear-gradient(180deg, #a56bff 0%, #8b5cf6 28%, #5922b4 74%, rgba(20,241,149,0.34) 100%)",
              boxShadow: `
                0 0 46px rgba(153, 69, 255, 0.34),
                0 0 90px rgba(153, 69, 255, 0.16),
                0 0 26px rgba(20, 241, 149, 0.12),
                inset -8px 0 20px rgba(0,0,0,0.34),
                inset 8px 0 20px rgba(255,255,255,0.08)
              `,
            }}
          />

          <div
            className="absolute rounded-full"
            style={{
              top: "5%",
              left: "20%",
              width: "25%",
              height: "90%",
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 50%, rgba(255,255,255,0.12) 100%)",
              filter: "blur(3px)",
            }}
          />

          <div
            className="absolute -inset-8 rounded-full"
            style={{
              background: "radial-gradient(ellipse at center, rgba(153,69,255,0.14) 0%, rgba(20,241,149,0.06) 36%, transparent 72%)",
              filter: "blur(24px)",
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

function SectionCard({
  eyebrow,
  title,
  body,
  delay,
}: {
  eyebrow: string;
  title: string;
  body: string;
  delay: number;
}) {
  return (
    <motion.article
      custom={delay}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      className="group relative overflow-hidden rounded-[1.75rem] border border-white/[0.06] bg-white/[0.03] p-6 backdrop-blur-xl transition-colors duration-500 hover:border-white/[0.12] hover:bg-white/[0.045] lg:p-7"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#b38cff]">{eyebrow}</p>
      <h3 className="mt-4 text-[1.35rem] font-semibold leading-tight tracking-[-0.02em] text-white">{title}</h3>
      <p className="mt-4 text-[14px] leading-7 text-white/52">{body}</p>
    </motion.article>
  );
}

function Particles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 24 }).map((_, index) => (
        <motion.div
          key={index}
          className="absolute h-[1px] w-[1px] rounded-full bg-white/20"
          style={{
            left: `${(index * 17) % 100}%`,
            top: `${(index * 29) % 100}%`,
          }}
          animate={{ opacity: [0, 0.6, 0], scale: [0, 1.5, 0] }}
          transition={{
            duration: 4 + (index % 5),
            repeat: Infinity,
            delay: index * 0.18,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function GridOverlay() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.025]"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
      }}
    />
  );
}

export function VaultPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlightX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const spotlightY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  useEffect(() => {
    const handleMouse = (event: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(event.clientX - rect.left);
      mouseY.set(event.clientY - rect.top);
    };

    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  const coins: CoinProps[] = [
    { symbol: "IVT", label: "Iron Vault Token", x: "8%", y: "12%", size: 118, delay: 0.2, rotate: -12, tilt: 8 },
    { symbol: "◎", label: "Solana", x: "29%", y: "6%", size: 100, delay: 0.35, rotate: 5, tilt: -4 },
    { symbol: "V", label: "Vault", x: "49%", y: "3%", size: 104, delay: 0.5, rotate: -3, tilt: 6 },
    { symbol: "S", label: "Stablecoin", x: "67%", y: "8%", size: 94, delay: 0.65, rotate: 8, tilt: -6 },
    { symbol: "R", label: "Real Estate", x: "82%", y: "5%", size: 108, delay: 0.8, rotate: -6, tilt: 10 },
  ];

  return (
    <main className="bg-black text-white">
      <section
        id="hero"
        ref={containerRef}
        className="relative min-h-screen w-full overflow-hidden bg-black"
        style={{ fontFamily: "'SF Pro Display', 'Inter', system-ui, -apple-system, sans-serif" }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(32,12,56,0.55) 0%, rgba(0,0,0,0.96) 70%, #000 100%)",
          }}
        />

        <motion.div
          className="pointer-events-none absolute z-0"
          style={{
            x: spotlightX,
            y: spotlightY,
            width: 620,
            height: 620,
            marginLeft: -310,
            marginTop: -310,
            background: "radial-gradient(circle, rgba(153,69,255,0.06) 0%, rgba(20,241,149,0.02) 28%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        <GridOverlay />
        <Particles />
        <PurpleTube side="left" delay={0.3} />
        <PurpleTube side="right" delay={0.5} />

        {coins.map((coin) => (
          <Coin key={coin.label} {...coin} />
        ))}

        <header className="relative z-30 mx-auto flex w-full max-w-[1400px] items-center justify-between px-8 pt-6 sm:px-12 lg:px-20">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl border border-white/10 bg-white/[0.03] shadow-[0_0_24px_rgba(153,69,255,0.12)] backdrop-blur-xl" />
            <div>
              <p className="text-[0.98rem] font-semibold tracking-[0.24em] text-white">IRON VAULT</p>
              <p className="text-[0.65rem] uppercase tracking-[0.28em] text-white/38">Education-first ecosystem</p>
            </div>
          </div>

          <nav className="hidden items-center gap-6 rounded-full border border-white/[0.08] bg-white/[0.03] px-5 py-3 backdrop-blur-xl lg:flex">
            <a href="#what" className="text-[11px] uppercase tracking-[0.24em] text-white/52 transition-colors hover:text-white/88">What</a>
            <a href="#phases" className="text-[11px] uppercase tracking-[0.24em] text-white/52 transition-colors hover:text-white/88">Phases</a>
            <a href="#education" className="text-[11px] uppercase tracking-[0.24em] text-white/52 transition-colors hover:text-white/88">Education</a>
            <a href="#community" className="text-[11px] uppercase tracking-[0.24em] text-white/52 transition-colors hover:text-white/88">Community</a>
          </nav>

          <a
            href="#community"
            className="rounded-full border border-[#b78cff]/30 bg-[#a660ff]/10 px-5 py-3 text-[11px] font-medium uppercase tracking-[0.24em] text-white/92 backdrop-blur-xl transition-colors hover:bg-[#a660ff]/16"
          >
            Connect Wallet
          </a>
        </header>

        <div className="relative z-20 mx-auto flex min-h-screen max-w-[1400px] flex-col justify-end px-8 pb-20 pt-32 sm:px-12 lg:px-20">
          <div className="flex flex-col gap-14 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-[760px]">
              <motion.h1
                custom={0.6}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="text-[clamp(3rem,7vw,6.1rem)] font-bold uppercase leading-[0.9] tracking-[-0.045em] text-white"
              >
                REVOLUTIONIZING
                <br />
                <span className="inline-flex items-baseline gap-6">
                  CRYPTO
                  <motion.span
                    custom={0.9}
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    className="inline-block max-w-[250px] self-center text-[13px] font-light normal-case leading-[1.6] tracking-normal text-white/35"
                  >
                    Access. Automation. Value. Built for what&apos;s next, with real education and a real community behind it.
                  </motion.span>
                </span>
                <br />
                INVESTMENTS
              </motion.h1>

              <motion.div
                custom={1.1}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="mt-10 flex flex-wrap items-center gap-4"
              >
                <a className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-[#9eff5a] px-7 py-3.5 text-[14px] font-semibold tracking-[-0.01em] text-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(153,69,255,0.25)]" href="#community">
                  <span className="relative z-10">Connect Wallet</span>
                  <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">+</span>
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                </a>

                <a className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-transparent px-7 py-3.5 text-[14px] font-medium tracking-[-0.01em] text-white/70 transition-all duration-300 hover:border-white/25 hover:text-white/90" href="#what">
                  Explore Platform
                </a>
              </motion.div>
            </div>

            <motion.div
              custom={1.3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="w-full max-w-[360px] rounded-[1.75rem] border border-white/[0.08] bg-white/[0.04] p-5 backdrop-blur-xl"
            >
              <div className="rounded-[1.35rem] border border-white/[0.08] bg-black/50 p-5">
                <p className="text-[11px] uppercase tracking-[0.24em] text-white/42">Zero fees on trades</p>
                <p className="mt-3 text-[1.15rem] font-semibold tracking-[-0.02em] text-white">Education first. Access next.</p>
                <p className="mt-3 text-[13px] leading-6 text-white/42">
                  Learn how real estate, tokenization, and stablecoins actually work before you move.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </section>

      <section id="what" className="relative overflow-hidden px-8 py-24 sm:px-12 lg:px-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(153,69,255,0.08),transparent_30%)]" />
        <div className="relative mx-auto max-w-[1400px]">
          <motion.div custom={0.1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
            <p className="text-[11px] uppercase tracking-[0.32em] text-[#b78cff]">What Is Iron Vault Token?</p>
            <h2 className="mt-5 max-w-[900px] text-[clamp(2.4rem,4.5vw,4.6rem)] font-bold leading-[0.94] tracking-[-0.04em] text-white">
              A platform access token and education portal built to make the future easier to understand.
            </h2>
            <p className="mt-6 max-w-[780px] text-[16px] leading-8 text-white/52 lg:text-[18px]">
              Iron Vault Token is designed as an entry point into a broader learning ecosystem. It gives people access to education, conversation, and structured pathways into real estate, tokenization, and stablecoin concepts without the usual noise.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            <SectionCard
              eyebrow="Platform Access"
              title="One token. One clean entry point."
              body="The token acts as a gateway into the ecosystem, connecting members to learning, community, and long-term platform access."
              delay={0.15}
            />
            <SectionCard
              eyebrow="Education Portal"
              title="Learn before you participate."
              body="The goal is clarity first: understanding how the ecosystem works before anyone makes a move or commits capital."
              delay={0.25}
            />
            <SectionCard
              eyebrow="Real People"
              title="Speak to a representative, not a bot."
              body="The experience is built around direct conversation, guided onboarding, and an actual human presence behind the project."
              delay={0.35}
            />
          </div>
        </div>
      </section>

      <section id="phases" className="relative overflow-hidden px-8 py-24 sm:px-12 lg:px-20">
        <div className="relative mx-auto max-w-[1400px]">
          <motion.div custom={0.1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
            <p className="text-[11px] uppercase tracking-[0.32em] text-[#b78cff]">The Three Phases</p>
            <h2 className="mt-5 max-w-[860px] text-[clamp(2.2rem,4.2vw,4.2rem)] font-bold leading-[0.94] tracking-[-0.04em] text-white">
              Education-focused growth, built in layers.
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {phases.map((phase, index) => (
              <motion.article
                key={phase.id}
                custom={0.2 + index * 0.1}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                className="relative overflow-hidden rounded-[1.75rem] border border-white/[0.06] bg-white/[0.03] p-7 backdrop-blur-xl"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <p className="text-[11px] uppercase tracking-[0.28em] text-white/34">Phase {phase.id}</p>
                <h3 className="mt-4 text-[1.45rem] font-semibold tracking-[-0.02em] text-white">{phase.title}</h3>
                <p className="mt-4 text-[14px] leading-7 text-white/50">{phase.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="education" className="relative overflow-hidden px-8 py-24 sm:px-12 lg:px-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(153,69,255,0.1),transparent_32%)]" />
        <div className="relative mx-auto max-w-[1400px] rounded-[2rem] border border-white/[0.06] bg-white/[0.03] p-8 backdrop-blur-xl lg:p-10">
          <motion.div custom={0.15} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
            <p className="text-[11px] uppercase tracking-[0.32em] text-[#b78cff]">Education Modules</p>
            <h2 className="mt-5 max-w-[900px] text-[clamp(2.2rem,4.2vw,4.1rem)] font-bold leading-[0.94] tracking-[-0.04em] text-white">
              Learn how real estate, tokenization, and stablecoins actually work.
            </h2>
          </motion.div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {modules.map((module, index) => (
              <motion.div
                key={module}
                custom={0.22 + index * 0.08}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="flex items-start gap-4 rounded-[1.4rem] border border-white/[0.06] bg-black/40 p-5"
              >
                <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-[#9945FF] shadow-[0_0_0_4px_rgba(153,69,255,0.2)]" />
                <p className="text-[14px] leading-7 text-white/58">{module}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="community" className="relative overflow-hidden px-8 py-24 sm:px-12 lg:px-20">
        <div className="relative mx-auto max-w-[1400px]">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div custom={0.15} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="rounded-[2rem] border border-white/[0.06] bg-white/[0.03] p-8 backdrop-blur-xl lg:p-10">
              <p className="text-[11px] uppercase tracking-[0.32em] text-[#b78cff]">Community</p>
              <h2 className="mt-5 text-[clamp(2.2rem,4vw,4rem)] font-bold leading-[0.94] tracking-[-0.04em] text-white">
                Join the movement.
              </h2>
              <p className="mt-6 max-w-[700px] text-[16px] leading-8 text-white/54">
                We&apos;re building something legendary. Come learn with us. Speak to a real person. The community is meant to feel clear, informed, and intentional instead of loud and chaotic.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <a className="inline-flex items-center rounded-full bg-[#9eff5a] px-7 py-3.5 text-[14px] font-semibold text-black transition-colors hover:bg-[#b6ff7f]" href="#hero">
                  Join the Community
                </a>
                <a className="inline-flex items-center rounded-full border border-white/[0.12] px-7 py-3.5 text-[14px] font-medium text-white/74 transition-colors hover:border-white/24 hover:text-white" href="#hero">
                  Speak to a Representative
                </a>
              </div>
            </motion.div>

            <SectionCard
              eyebrow="Tone"
              title="Quiet confidence over noisy hype."
              body="The entire experience should feel premium, restrained, and intentional, with a visual system that carries the hero language through the rest of the page."
              delay={0.3}
            />
          </div>
        </div>
      </section>
    </main>
  );
}