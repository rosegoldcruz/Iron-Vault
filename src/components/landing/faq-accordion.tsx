"use client";

import { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import type { FaqItem } from "./content";

type FAQAccordionProps = {
  items: FaqItem[];
};

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [activeItem, setActiveItem] = useState(0);

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const open = index === activeItem;

        return (
          <div
            key={item.question}
            className="panel-surface cut-corners overflow-hidden border-white/8"
          >
            <button
              type="button"
              className="faq-button flex w-full items-center justify-between gap-6 px-5 py-5 text-left lg:px-7"
              data-state={open ? "open" : "closed"}
              onClick={() => setActiveItem(open ? -1 : index)}
            >
              <span className="max-w-3xl text-base font-medium tracking-[0.01em] text-white lg:text-lg">
                {item.question}
              </span>
              <motion.span
                className="font-data flex h-9 w-9 shrink-0 items-center justify-center border border-white/10 text-sm text-[var(--gold)]"
                animate={{ rotate: open ? 45 : 0, scale: open ? 1.04 : 1 }}
                transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
              >
                +
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open ? (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    height: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                    opacity: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
                  }}
                >
                  <div className="px-5 pb-6 pr-14 text-sm leading-7 text-[rgba(245,239,229,0.68)] lg:px-7 lg:text-[0.98rem]">
                    {item.answer}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}