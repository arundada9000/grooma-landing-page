"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { THEME_PRESETS, type ThemePreset } from "@/lib/themes";

/** Keys must mirror the boot script in layout.tsx. */
const STORAGE_KEY = "grooma:theme";
export type Scheme = "dark" | "light";

interface StoredTheme {
  theme: ThemePreset["id"];
  scheme: Scheme;
}

export interface ThemeContextValue {
  /** The active preset id (defaults to the brand preset: copper). */
  theme: ThemePreset["id"];
  scheme: Scheme;
  /** The preset object currently active. */
  preset: ThemePreset;
  presets: ThemePreset[];
  /** Explicitly set a preset by id. */
  setTheme: (id: ThemePreset["id"]) => void;
  /** Explicitly set the scheme. */
  setScheme: (s: Scheme) => void;
  /** Flip between light and dark. */
  toggleScheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const DEFAULT_THEME = "copper";
const DEFAULT_SCHEME: Scheme = "dark";

function readStored(): StoredTheme {
  if (typeof window === "undefined") return { theme: DEFAULT_THEME, scheme: DEFAULT_SCHEME };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { theme: DEFAULT_THEME, scheme: DEFAULT_SCHEME };
    const parsed = JSON.parse(raw) as Partial<StoredTheme>;
    return {
      theme: THEME_PRESETS.some((p) => p.id === parsed.theme) ? parsed.theme! : DEFAULT_THEME,
      scheme: parsed.scheme === "light" || parsed.scheme === "dark" ? parsed.scheme : DEFAULT_SCHEME,
    };
  } catch {
    return { theme: DEFAULT_THEME, scheme: DEFAULT_SCHEME };
  }
}

function apply(theme: ThemePreset["id"], scheme: Scheme) {
  const el = document.documentElement;
  el.dataset.theme = theme;
  el.dataset.scheme = scheme;
  el.style.colorScheme = scheme;
  // Keep the browser chrome bar in sync with the surface colour.
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", getComputedStyle(el).getPropertyValue("--color-ink").trim());
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const initial = useMemo(readStored, []);
  const [theme, setThemeState] = useState<ThemePreset["id"]>(initial.theme);
  const [scheme, setSchemeState] = useState<Scheme>(initial.scheme);

  useEffect(() => {
    apply(theme, scheme);
  }, [theme, scheme]);

  const setTheme = useCallback((id: ThemePreset["id"]) => {
    setThemeState(id);
  }, []);

  const setScheme = useCallback((s: Scheme) => {
    setSchemeState(s);
  }, []);

  const toggleScheme = useCallback(() => {
    setSchemeState((s) => (s === "dark" ? "light" : "dark"));
  }, []);

  // Persist scheme when toggled (state may be async; read current state).
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ theme, scheme }));
    } catch {
      /* storage unavailable */
    }
  }, [theme, scheme]);

  const preset = useMemo(
    () => THEME_PRESETS.find((p) => p.id === theme) ?? THEME_PRESETS[0],
    [theme],
  );

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      scheme,
      preset,
      presets: THEME_PRESETS,
      setTheme,
      setScheme,
      toggleScheme,
    }),
    [theme, scheme, preset, setScheme, setTheme, toggleScheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within <ThemeProvider>");
  return ctx;
}

/** A tiny imperative way for non-React code to query the active scheme. */
export { DEFAULT_THEME, DEFAULT_SCHEME };
