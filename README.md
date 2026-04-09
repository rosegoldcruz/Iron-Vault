# Iron Vault Token

Iron Vault Token is a cinematic presale landing page built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, GSAP ScrollTrigger, and Lenis.

The experience is designed to feel like entering a controlled financial system rather than browsing a generic crypto landing page. Motion is deliberately heavy, tactile, and sequenced around the product narrative.

## Stack

- Next.js 16 App Router
- TypeScript
- Tailwind CSS v4
- Framer Motion
- GSAP + ScrollTrigger
- Lenis smooth scrolling

## Experience Layers

- Opening hero sequence with steel-panel vault reveal
- Pointer-reactive hero card and floating emblem
- Animated presale ticker strip
- Scroll-driven shutter, stack, and pinned process choreography
- Premium modular bento section
- Operational trust / proof panels
- Animated FAQ accordion
- Lead capture form backed by `/api/intake`
- Sticky mobile CTA

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Validation

```bash
npm run lint
npm run build
```

Both commands pass on the current implementation.

## Structure

```text
src/
  app/
    api/intake/route.ts
    globals.css
    layout.tsx
    page.tsx
  components/
    landing/
      content.ts
      faq-accordion.tsx
      intake-form.tsx
      magnetic-button.tsx
      use-vault-scroll.ts
      vault-mark.tsx
      vault-page.tsx
```

## Notes

- The intake endpoint currently validates and acknowledges requests without persistence.
- Typography uses `next/font` and is optimized for performance.
- The heavier GSAP pinning behavior is constrained to larger breakpoints to protect mobile feel and performance.
# Iron-Vault
