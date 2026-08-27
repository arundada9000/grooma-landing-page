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

### Fixed

- Mobile layout: floating controls no longer overlap the bottom navigation.
- Demo confirmation no longer gets stuck: phone validation now accepts any
  reasonably formatted number with 6+ digits.
