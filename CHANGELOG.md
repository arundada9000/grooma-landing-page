# Changelog

All notable changes to this repository are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and
this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added

- Full multipage site structure: Home, Features, Pricing, For barbershops,
  About, and a dedicated Demo page.
- Global site theming engine mirrored from the Grooma product: 7 theme presets
  × light/dark, persisted to `localStorage`, applied before first paint
  (no flash), with a header theme picker and scheme toggle.
- Live, browser-only interactive demos: the booking flow, the availability
  engine, a no-double-booking concurrency demo, and the theme switcher.
- Product "render" illustrations (dashboard, offline, QR) alongside a small set
  of stock barbershop photography.
- SEO, AEO and GEO metadata per page: page titles/descriptions, canonical URLs,
  breadcrumbs, JSON-LD structured data, sitemap, robots, and a generated
  social/OG image.
- Scroll progress indicator, scroll-to-top, smooth scroll, and a mobile bottom
  nav.
- Web Audio sound effects + haptics, gated behind a user-facing toggle and
  `prefers-reduced-motion`.

### Changed

- Moved application code from the repo root into a `src/` directory.
- Centralized site config (`url`, brand, contact, pricing) in
  `src/config/site.ts`.
- **Minimal** is now the default theme preset (was Copper). The pre-paint boot
  script, the `:root` fallback tokens, `theme-color` and the generated social
  images all moved with it, so first paint never flashes the old palette.
- Structured data is emitted as one linked `@graph` per page instead of four
  standalone scripts. Nodes cross-reference by `@id`, and each page now carries
  a `WebPage` node with its own `primaryImageOfPage`. Added `HowTo` (the guest
  booking journey), `speakable`, `ContactPoint`, product screenshots, an
  audience, and both real price points as `Offer`s. Ratings and usage counts
  are still deliberately absent.
- Every route generates its own social / search preview image from a shared
  template in `src/lib/og.tsx`, so a shared link describes the page it points
  at rather than the site in general.
- The product surface previews (dashboard, offline app, QR) are a shared
  section and now appear on the home page as well as Features.

### Fixed

- Mobile layout: floating controls no longer overlap the bottom navigation.
- Demo confirmation no longer gets stuck: phone validation now accepts any
  reasonably formatted number with 6+ digits.
- Theming: the scheme-derived tokens used descendant selectors
  (`html[data-theme] [data-scheme]`) for attributes that both sit on `<html>`,
  so they never matched. Every theme rendered its accent highlights in copper,
  and light schemes fell to 1.85:1 contrast. All theme x scheme combinations
  now clear WCAG AA.
- Theming: `--color-ok` was referenced but never defined, and `--color-ok` /
  `--color-bad` / `--color-warn` were fixed dark-surface values. They now track
  the scheme like the accent does.
- Guest-journey demo: the unattended booking walkthrough read its slot list and
  validity flag from a closure captured at mount, when both were still empty,
  so it never advanced past the service step. It is now step-driven, loops, and
  only runs while on screen.
- Concurrency demo: the outcome badges were gated on two mutually exclusive
  phases and never rendered, and the "winner" swapped customers halfway through
  the story.
- Booking demo: the confirmation halo used `var(--demo-ok)20`, which is not a
  parseable colour, so it rendered transparent.
- Availability demo: the reveal was capped at 5 slots, leaving the other 12
  computed times permanently dimmed as if unavailable.
- Sound is genuinely off until opted in (it defaulted to on despite the docs)
  and now also stays silent under `prefers-reduced-motion`.
- The mobile bottom navigation no longer covers the last rows of the footer.
- Smooth scrolling: back-to-top and the hero's in-page link drive Lenis instead
  of racing it with a native `scrollTo`, and clear the fixed header.
- FAQ structured data is emitted on every page that actually renders the FAQ.
- Contact links (WhatsApp) and the primary nav come from `src/config/site.ts`
  instead of being hardcoded in components.
- Full-bleed photography requested a half-width source set.
- Assorted: duplicate section number, 404 with two identical buttons, accent
  buttons using a panel colour for their label, and a copy typo.
- Scrolling could jam partway down the page until a reload. `<html>` carried
  `h-full`, pinning its box to the viewport while the content ran far longer,
  so the ResizeObserver Lenis uses to recompute the scroll limit never fired as
  the page grew (an FAQ answer opening, a taller demo step, a late font). The
  document now grows with its content, and the shell re-measures immediately
  instead of waiting on Lenis's 250ms debounce.
- The scroll indicator no longer trails the page: progress was React state
  updated every scroll frame, re-rendering the component continuously. It is
  now written straight to the DOM from the Lenis scroll callback, and the
  back-to-top button carries the same progress as a ring around it.
- Interior pages emitted no `og:image` or `twitter:image` at all, so every
  shared link but the home page unfurled without a picture.
- `barbershop-4.jpg` is a tall portrait and was being cropped into a 21:9 band,
  discarding most of the frame. Photographs now sit in slots shaped like them,
  and the unused fifth plate is in service.
- The scroll reveals rendered `opacity: 0` into the SERVER HTML, so 52% of the
  home page's text (the `<h1>` included) was invisible until a ~900KB bundle
  downloaded and hydrated. On the patchy connections this product is sold for
  that is a blank page, and it also printed blank and showed nothing at all if
  the bundle failed. The settled state is now the default and the reveal is
  armed afterwards, only for content below the fold. Every route ships 0
  hidden elements.
- Added a one-time probe for IntersectionObserver: screenshot services, PDF
  renderers and some embedded webviews construct one and never fire it, which
  would leave every armed reveal hidden forever. If it turns out inert,
  nothing hides.
- Minimal, now the default preset, made the accent the same colour as body
  text (1.07:1), silently deleting every highlight in the design: the
  emphasised half of each headline, the eyebrows, section numbers and prices
  all flattened into the paragraph around them. Its surfaces stay neutral but
  the accent keeps the brand copper (1.39:1 dark / 1.77:1 light, plus a hue
  difference), and the header swatch follows.
- Heading outline: the booking demo's step labels were `<h3>` under the hero's
  `<h1>` with no `<h2>` between, and the availability mechanism cards were
  `<h4>` under an `<h2>`.
