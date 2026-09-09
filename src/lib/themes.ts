/**
 * Grooma's real theme presets, ported from the product (src/lib/theme/presets.ts)
 * so the marketing site demonstrates the actual theming engine, not a fake one.
 *
 * The product emits these as CSS custom properties. Here we carry the same
 * semantic tokens (background, card, inset, label, accent, ...) in both light
 * and dark, plus the font pairing each preset suggests, and expose them so the
 * "Your shop. Your brand." demo can restyle one booking surface instantly.
 *
 * NOTE: the real product ships 7 presets; a couple are omitted here if the
 * palette shape doesn't carry a self-evident "identity". We keep them driven
 * by the same source values.
 */

export interface ThemeTokens {
  background: string;
  card: string;
  inset: string;
  label: string;
  labelSecondary: string;
  labelTertiary: string;
  separator: string;
  accent: string;
  accentSoft: string;
  onAccent: string;
  success: string;
  radius: string;
  shadow: string;
}

export interface ThemePreset {
  id: string;
  name: string;
  /** A short descriptor used in the switcher. */
  flavor: string;
  display: string; // Tailwind class name family for the marketing chrome
  light: ThemeTokens;
  dark: ThemeTokens;
  /**
   * Accent the SITE chrome uses for this preset, where it differs from the
   * product's own. The header swatch previews the site, so it reads this
   * first; the tokens above stay faithful to the product presets that the
   * booking demo renders with. Defaults to `dark.accent`.
   */
  siteAccent?: string;
}

function tokens(lightPartial: Partial<ThemeTokens>, darkPartial: Partial<ThemeTokens>): {
  light: ThemeTokens;
  dark: ThemeTokens;
} {
  const lightBase: ThemeTokens = {
    background: "#f2f2f7",
    card: "#ffffff",
    inset: "rgba(118,118,128,0.12)",
    label: "#111113",
    labelSecondary: "rgba(60,60,67,0.66)",
    labelTertiary: "rgba(60,60,67,0.33)",
    separator: "rgba(60,60,67,0.14)",
    accent: "#006edb",
    accentSoft: "rgba(0,110,219,0.12)",
    onAccent: "#ffffff",
    success: "#176428",
    radius: "1rem",
    shadow: "0 1px 2px rgb(0 0 0 / 0.04), 0 4px 16px rgb(0 0 0 / 0.04)",
  };
  const darkBase: ThemeTokens = {
    background: "#0a0a0c",
    card: "#1c1c1e",
    inset: "rgba(120,120,128,0.26)",
    label: "#f5f5f7",
    labelSecondary: "rgba(235,235,245,0.66)",
    labelTertiary: "rgba(235,235,245,0.52)",
    separator: "rgba(84,84,88,0.55)",
    accent: "#3f9bff",
    accentSoft: "rgba(63,155,255,0.22)",
    onAccent: "#071018",
    success: "#4cd964",
    radius: "1rem",
    shadow: "0 8px 30px rgb(0 0 0 / 0.12)",
  };
  return {
    light: { ...lightBase, ...lightPartial },
    dark: { ...darkBase, ...darkPartial },
  };
}

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: "classic-barbershop",
    name: "Classic Barbershop",
    flavor: "Warm, barber-tonic and chrome",
    display: "oswald",
    ...tokens(
      {
        background: "#f6f3ee",
        card: "#fffdf9",
        inset: "rgba(74,56,36,0.09)",
        label: "#231a10",
        labelSecondary: "rgba(74,58,38,0.78)",
        separator: "rgba(74,58,38,0.16)",
        accent: "#84572a",
        accentSoft: "rgba(132,87,42,0.13)",
        onAccent: "#fdf7ee",
      },
      {
        background: "#14100c",
        card: "#201a14",
        inset: "rgba(222,189,152,0.11)",
        label: "#f3ece1",
        labelSecondary: "rgba(240,228,210,0.76)",
        separator: "rgba(230,208,178,0.16)",
        accent: "#cf9d61",
        accentSoft: "rgba(207,157,97,0.18)",
        onAccent: "#241708",
      },
    ),
  },
  {
    id: "midnight",
    name: "Midnight",
    flavor: "Cool, deep, after-hours",
    display: "geist",
    ...tokens(
      {
        background: "#10141f",
        card: "#171d2c",
        inset: "rgba(125,155,225,0.13)",
        label: "#e9eef9",
        labelSecondary: "rgba(214,224,245,0.72)",
        separator: "rgba(160,180,220,0.16)",
        accent: "#96abff",
        accentSoft: "rgba(150,171,255,0.16)",
        onAccent: "#0a1024",
      },
      {
        background: "#070a12",
        card: "#0e1422",
        inset: "rgba(125,155,225,0.16)",
        separator: "rgba(140,165,215,0.15)",
        accent: "#a3b6ff",
        accentSoft: "rgba(163,182,255,0.2)",
      },
    ),
  },
  {
    id: "minimal",
    name: "Minimal",
    flavor: "Quiet, precise, editorial",
    display: "geist",
    // Neutral surfaces, warm accent: see the Minimal block in globals.css for
    // why the site keeps a hue here even though the product preset does not.
    siteAccent: "#cf9d61",
    ...tokens(
      {
        background: "#fafafa",
        card: "#ffffff",
        inset: "#efefef",
        label: "#111111",
        labelSecondary: "rgba(17,17,17,0.62)",
        separator: "#e5e5e5",
        accent: "#111111",
        accentSoft: "rgba(0,0,0,0.06)",
      },
      {
        background: "#0a0a0a",
        card: "#161616",
        inset: "#232323",
        label: "#ededed",
        labelSecondary: "rgba(237,237,237,0.62)",
        separator: "#2e2e2e",
        accent: "#ededed",
        accentSoft: "rgba(237,237,237,0.1)",
        onAccent: "#111111",
      },
    ),
  },
  {
    id: "copper",
    name: "Copper",
    flavor: "Warm metal, tooled leather",
    display: "oswald",
    ...tokens(
      {
        background: "#f5f1ec",
        card: "#fdfaf6",
        inset: "rgba(93,64,38,0.09)",
        label: "#2b1d10",
        labelSecondary: "rgba(93,68,44,0.84)",
        separator: "rgba(93,68,44,0.16)",
        accent: "#9c5122",
        accentSoft: "rgba(156,81,34,0.13)",
        onAccent: "#fbede0",
      },
      {
        background: "#161009",
        card: "#221912",
        inset: "rgba(230,180,130,0.11)",
        label: "#f5ede3",
        labelSecondary: "rgba(240,225,205,0.76)",
        separator: "rgba(235,210,180,0.16)",
        accent: "#e29a5e",
        accentSoft: "rgba(226,154,94,0.18)",
        onAccent: "#241203",
      },
    ),
  },
  {
    id: "emerald",
    name: "Emerald",
    flavor: "Cool calm, barber green",
    display: "geist",
    ...tokens(
      {
        background: "#f2f7f4",
        card: "#ffffff",
        inset: "rgba(15,90,60,0.09)",
        label: "#10241a",
        labelSecondary: "rgba(25,70,50,0.76)",
        separator: "rgba(25,70,50,0.15)",
        accent: "#0e7a54",
        accentSoft: "rgba(14,122,84,0.13)",
        onAccent: "#edfaf3",
      },
      {
        background: "#0a120e",
        card: "#13201a",
        inset: "rgba(140,220,180,0.11)",
        label: "#e9f5ee",
        labelSecondary: "rgba(220,240,228,0.74)",
        separator: "rgba(190,230,205,0.15)",
        accent: "#46d68f",
        accentSoft: "rgba(70,214,143,0.16)",
        onAccent: "#06231a",
      },
    ),
  },
  {
    id: "ocean",
    name: "Ocean",
    flavor: "Airy, coastal, light",
    display: "geist",
    ...tokens(
      {
        background: "#f0f5f7",
        card: "#ffffff",
        inset: "rgba(20,80,110,0.09)",
        label: "#0e2029",
        labelSecondary: "rgba(30,75,95,0.8)",
        separator: "rgba(30,75,95,0.15)",
        accent: "#0d6e8c",
        accentSoft: "rgba(13,110,140,0.12)",
        onAccent: "#e9f6fb",
      },
      {
        background: "#081117",
        card: "#101c24",
        inset: "rgba(120,190,220,0.11)",
        label: "#e9f3f7",
        labelSecondary: "rgba(215,235,245,0.74)",
        separator: "rgba(185,220,235,0.15)",
        accent: "#4cc7e0",
        accentSoft: "rgba(76,199,224,0.16)",
        onAccent: "#04252e",
      },
    ),
  },
  {
    id: "editorial",
    name: "Editorial",
    flavor: "High-contrast, printed",
    display: "playfair",
    ...tokens(
      {
        background: "#faf9f6",
        card: "#ffffff",
        inset: "rgba(20,20,20,0.06)",
        label: "#141414",
        labelSecondary: "rgba(20,20,20,0.64)",
        separator: "rgba(20,20,20,0.14)",
        accent: "#1a1a1a",
        accentSoft: "rgba(0,0,0,0.06)",
        onAccent: "#fafaf7",
      },
      {
        background: "#0c0c0c",
        card: "#181817",
        inset: "rgba(235,232,225,0.09)",
        label: "#f2f0ea",
        labelSecondary: "rgba(235,232,225,0.64)",
        separator: "rgba(225,222,215,0.15)",
        accent: "#ece9e2",
        accentSoft: "rgba(236,233,226,0.1)",
        onAccent: "#141414",
      },
    ),
  },
];

export function themeCssVars(t: ThemeTokens): Record<string, string> {
  return {
    "--demo-bg": t.background,
    "--demo-card": t.card,
    "--demo-inset": t.inset,
    "--demo-label": t.label,
    "--demo-label-2": t.labelSecondary,
    "--demo-label-3": t.labelTertiary,
    "--demo-hairline": t.separator,
    "--demo-accent": t.accent,
    "--demo-accent-soft": t.accentSoft,
    "--demo-on-accent": t.onAccent,
    "--demo-ok": t.success,
    "--demo-radius": t.radius,
    "--demo-shadow": t.shadow,
  };
}
