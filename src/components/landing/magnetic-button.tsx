"use client";

import type { MouseEventHandler, ReactNode } from "react";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  variant?: "primary" | "ghost";
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
};

const springConfig = { stiffness: 240, damping: 22, mass: 0.7 };

export function MagneticButton({
  children,
  className = "",
  href,
  variant = "primary",
  type = "button",
  ...buttonProps
}: MagneticButtonProps) {
  const offsetX = useSpring(0, springConfig);
  const offsetY = useSpring(0, springConfig);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const glow = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, rgba(255,255,255,0.2), transparent 44%)`;

  const shellClassName = [
    "group relative inline-flex overflow-hidden cut-corners border text-[0.72rem] uppercase tracking-[0.32em]",
    "transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
    variant === "primary"
      ? "border-[rgba(212,176,106,0.42)] bg-[linear-gradient(135deg,rgba(212,176,106,0.22),rgba(17,17,18,0.96)_52%)] text-[#fff5e5]"
      : "border-white/12 bg-white/[0.03] text-white/78 hover:border-white/24 hover:text-white",
    className,
  ].join(" ");

  const content = (
    <>
      <motion.span
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: glow }}
      />
      <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_18%,rgba(255,255,255,0.22)_48%,transparent_70%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="relative z-10 flex items-center gap-3 px-5 py-4 lg:px-6">
        <span>{children}</span>
        <span className="font-data text-[0.62rem] text-white/50">{"//"}</span>
      </span>
    </>
  );

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const localX = event.clientX - bounds.left;
    const localY = event.clientY - bounds.top;
    const centerX = bounds.width / 2;
    const centerY = bounds.height / 2;

    offsetX.set((localX - centerX) * 0.12);
    offsetY.set((localY - centerY) * 0.16);
    glowX.set((localX / bounds.width) * 100);
    glowY.set((localY / bounds.height) * 100);
  }

  function handlePointerLeave() {
    offsetX.set(0);
    offsetY.set(0);
    glowX.set(50);
    glowY.set(50);
  }

  if (href) {
    return (
      <motion.a
        href={href}
        className={shellClassName}
        style={{ x: offsetX, y: offsetY }}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        whileTap={{ scale: 0.985 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      {...buttonProps}
      type={type}
      className={shellClassName}
      style={{ x: offsetX, y: offsetY }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      whileTap={{ scale: 0.985 }}
    >
      {content}
    </motion.button>
  );
}