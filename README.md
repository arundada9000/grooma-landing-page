# Grooma - Landing Site

The marketing site for **Grooma**, a barbershop booking and shop-management
software built Nepal-first. The barber's floor, digitized.

This repository contains the public landing site, which is live at
**[grooma.vercel.app](https://grooma.vercel.app)**.

> This is a **proprietary** project. You may view it, but you may not use,
> copy, or redistribute it without permission. See the [LICENSE](LICENSE).

## What the site does

A full production marketing website that both presents the product and lets
people try its core ideas live in the browser. It is honest by design: it never
invents customers, metrics, ratings, or availability. Everything that looks like
a booking or a schedule is a real, browser-only simulation, and the demos are
labeled as such.

## Pages

| Route                 | Purpose                                            |
| --------------------- | -------------------------------------------------- |
| `/`                   | Home, hero with the product UI, numbered stories   |
| `/features`           | Product features and capabilities                  |
| `/pricing`            | Transparent pricing for Nepal-first shops          |
| `/for-barbershops`    | A pitch aimed at barbershop owners                 |
| `/about`              | About the product and its principles               |
| `/demo`               | Interactive, browser-only demos                    |

## Highlights

- **Global theming** mirrored from the product: 7 theme presets × a light/dark
  scheme, persisted to `localStorage`, applied before first paint (no flash),
  and controlled from the header.
- **Live demos**: booking flow, availability engine, a no-double-booking
  concurrency demo, and the theme switcher.
- **Product renders + stock photography**: a small set of barbershop imagery
  and hand-built product illustrations.
- **SEO / AEO / GEO**: per-page metadata, canonical URLs, breadcrumbs, JSON-LD
  structured data, sitemap, robots, and a generated social preview image.
- **Polish**: scroll progress, scroll-to-top, smooth scrolling, mobile bottom
  nav, Web Audio sound effects and haptics gated behind a toggle.

## Tech stack

- [Next.js](https://nextjs.org) 16 (App Router, `src/` dir, static output)
- [React](https://react.dev) 19
- [TypeScript](https://www.typescriptlang.org) (strict)
- [Tailwind CSS](https://tailwindcss.com) v4
- [Framer Motion](https://www.framer.com/motion) 13
- [Lenis](https://lenis.darkroom.engineering) for smooth scroll
- [pnpm](https://pnpm.io) as the package manager

## Getting started

Requirements: Node.js 18.17+ and pnpm 9+ (10 recommended).

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production build

```bash
pnpm build
pnpm start
```

## Project structure

```
src/
  app/            # Routes, layouts, sitemap, robots, OG image
  components/
    site/         # Header, footer, mobile nav, theming UI, demos
  config/         # Central site config: url, brand, pricing, seo
  lib/            # Theming presets and shared utilities
public/
  images/         # Static photography
```

The single source of truth for the site URL and brand details lives in
`src/config/site.ts` - change it in one place to reflect everywhere.

## Theming

Theme presets live in `src/lib/theme/presets.ts` and are applied via a
centralized token layer in `src/app/globals.css`. Components use semantic
tokens (`text-paper`, `bg-ink`, `text-copper-bright`) so the whole site
re-themes without touching component code. Keep colors token-driven when you
contribute.

## Contributing

Issues, feedback, and design critique are welcome. Because this is a
proprietary project, please read [CONTRIBUTING](CONTRIBUTING) before opening a
pull request, and review [SECURITY](SECURITY) and [CODE_OF_CONDUCT](CODE_OF_CONDUCT).

## Changelog

See [CHANGELOG](CHANGELOG.md).

## License

Proprietary. Copyright Arun Neupane 2026. See [LICENSE](LICENSE). No part of
this site or its design may be reused without explicit written permission.
