# Contributing

Thank you for your interest in this project.

## Important

This repository is **proprietary** and **not open source**. See [`LICENSE`](LICENSE).
By submitting a contribution, you agree that:

- Your contribution becomes the property of the copyright holder (Arun Neupane).
- You will not submit code or assets you do not have the right to share.
- You may be asked to sign a contributor agreement for your work to be accepted.

External code is not required for most contributions; issues, feedback and
design critique are just as welcome.

## Ways to contribute

- **Report a bug**: open an issue with steps to reproduce.
- **Propose a change**: open an issue *before* writing a pull request so we can
  agree on scope.
- **Polish the site**: copy, visual design, accessibility, performance.
- **Fix a reproducible bug**: only after a maintainer has invited a fix.

## Before you open a PR

1. Fork the repository (if your license permits) or work on a feature branch.
2. Follow the existing code style: this project uses TypeScript strict mode,
   Tailwind tokens, `cn()` for class merging, and no stray inline hex values.
3. Run `pnpm install`, then `pnpm build` and confirm it passes.
4. Keep changes small and focused. One logical change per pull request.
5. Update the relevant docs if your change affects them.

## Code style notes

- Colors must use semantic tokens (`text-paper`, `bg-ink`, `text-copper-bright`),
  never hardcoded hex values, so the theming engine keeps working.
- No emojis in UI copy; use inline SVGs.
- Touch targets should be at least 44px and every clickable needs a visible
  focus ring and `cursor-pointer`.
- Respect `prefers-reduced-motion`.
- Never invent test data: no fake testimonials, metrics, or reviews.

## Our standards

- Ask before adding dependencies.
- Match the honesty rules described in the `README`: no fake customer data.
- Be respectful in every interaction (see `CODE_OF_CONDUCT`).

## Questions

Open an issue or contact the maintainer directly. See the `LICENSE` for contact
details.
