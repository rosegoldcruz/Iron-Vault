"use client";

import { RefObject, useEffect } from "react";

import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export function useVaultScroll(rootRef: RefObject<HTMLElement | null>) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    let frame = 0;
    const lenis = reduceMotion
      ? null
      : new Lenis({
          duration: 1.18,
          smoothWheel: true,
          syncTouch: false,
          wheelMultiplier: 0.88,
          touchMultiplier: 1.12,
        });

    if (lenis) {
      lenis.on("scroll", ScrollTrigger.update);
      const raf = (time: number) => {
        lenis.raf(time);
        frame = requestAnimationFrame(raf);
      };

      frame = requestAnimationFrame(raf);
    }

    const context = gsap.context(() => {
      if (reduceMotion) {
        return;
      }

      gsap.utils.toArray<HTMLElement>("[data-shutter]").forEach((section) => {
        const plates = section.querySelectorAll<HTMLElement>("[data-shutter-plate]");

        gsap.fromTo(
          plates,
          { xPercent: 0, rotate: 0 },
          {
            xPercent: (index) => (index % 2 === 0 ? -106 : 106),
            rotate: (index) => (index % 2 === 0 ? -2 : 2),
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 70%",
              end: "top 14%",
              scrub: 1.15,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-assemble]").forEach((group) => {
        gsap.fromTo(
          Array.from(group.children),
          {
            opacity: 0,
            y: 68,
            rotateX: -16,
            scale: 0.96,
            filter: "blur(14px)",
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.3,
            stagger: 0.11,
            ease: "expo.out",
            scrollTrigger: {
              trigger: group,
              start: "top 80%",
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-strip]").forEach((strip) => {
        gsap.fromTo(
          strip,
          { xPercent: -4 },
          {
            xPercent: 5,
            ease: "none",
            scrollTrigger: {
              trigger: strip,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-stack]").forEach((stack) => {
        const cards = stack.querySelectorAll<HTMLElement>("[data-stack-card]");

        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            {
              y: 130 + index * 18,
              rotate: index === 0 ? -7 : index === 2 ? 7 : 0,
              scale: 0.92,
              opacity: 0.16,
              filter: "blur(14px)",
            },
            {
              y: 0,
              rotate: index === 0 ? -3 : index === 2 ? 3 : 0,
              scale: 1,
              opacity: 1,
              filter: "blur(0px)",
              ease: "power4.out",
              scrollTrigger: {
                trigger: stack,
                start: "top 82%",
                end: "top 26%",
                scrub: 1.2,
              },
            },
          );
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-metric]").forEach((metric) => {
        gsap.fromTo(
          metric,
          {
            clipPath: "inset(0 0 100% 0)",
            y: 22,
            opacity: 0,
          },
          {
            clipPath: "inset(0 0 0% 0)",
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power4.out",
            scrollTrigger: {
              trigger: metric,
              start: "top 90%",
            },
          },
        );
      });

      ScrollTrigger.matchMedia({
        "(min-width: 1024px)": () => {
          const processSection = root.querySelector<HTMLElement>("[data-process-pin]");

          if (!processSection) {
            return;
          }

          const steps = processSection.querySelectorAll<HTMLElement>("[data-process-step]");
          const progressLine = processSection.querySelector<HTMLElement>("[data-process-line]");
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: processSection,
              start: "top top",
              end: "+=130%",
              pin: true,
              scrub: 1,
            },
          });

          if (progressLine) {
            timeline.fromTo(
              progressLine,
              { scaleY: 0, transformOrigin: "top center" },
              { scaleY: 1, ease: "none" },
              0,
            );
          }

          steps.forEach((step, index) => {
            const start = index * 0.24;

            timeline.fromTo(
              step,
              {
                opacity: index === 0 ? 1 : 0.16,
                y: index === 0 ? 0 : 52,
                scale: index === 0 ? 1 : 0.96,
                filter: index === 0 ? "blur(0px)" : "blur(8px)",
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
                duration: 0.18,
                ease: "power3.out",
              },
              start,
            );

            if (index < steps.length - 1) {
              timeline.to(
                step,
                {
                  opacity: 0.4,
                  y: -26,
                  scale: 0.96,
                  filter: "blur(6px)",
                  duration: 0.16,
                  ease: "power2.inOut",
                },
                start + 0.17,
              );
            }
          });
        },
      });
    }, root);

    return () => {
      context.revert();
      if (frame) {
        cancelAnimationFrame(frame);
      }
      lenis?.destroy();
    };
  }, [reduceMotion, rootRef]);
}