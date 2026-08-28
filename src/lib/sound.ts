/**
 * Sound + haptics feedback for key interactions.
 *
 * Pure Web Audio synthesis, so there are no audio files to ship or load.
 * Sounds are subtle and quiet, matching the understated visual language.
 *
 * Feedback is OFF until the user opts in (browsers block autoplay, and a
 * marketing page shouldn't make noise uninvited). The preference is stored in
 * localStorage and respected across pages. Vibrotactile feedback is used on
 * capable devices and only for confirmation-level events.
 */

const STORE_KEY = "grooma:feedback";

type SoundName = "click" | "select" | "confirm" | "error" | "toggle" | "swish";

let ctx: AudioContext | null = null;

/**
 * Muted until the visitor explicitly opts in. Anything other than a stored
 * "on" keeps us quiet, so a first-time visitor (and every server render)
 * makes no noise. Reading storage lazily also keeps this correct after
 * hydration, where module scope ran without a `window`.
 */
let muted: boolean | null = null;

function readMuted(): boolean {
  if (muted !== null) return muted;
  if (typeof window === "undefined") return true;
  try {
    muted = window.localStorage.getItem(STORE_KEY) !== "on";
  } catch {
    muted = true;
  }
  return muted;
}

/**
 * Sound is decoration, so a visitor who asked the OS for less motion and
 * fewer effects gets silence regardless of the stored preference.
 */
function prefersQuiet(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

function ac(): AudioContext | null {
  try {
    if (!ctx) {
      const AC: typeof AudioContext =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      ctx = new AC();
    }
    if (ctx.state === "suspended") void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

function blip(
  freq: number,
  { when = 0, dur = 0.08, type = "sine", gain = 0.05 }: {
    when?: number;
    dur?: number;
    type?: OscillatorType;
    gain?: number;
  } = {},
) {
  const a = ac();
  if (!a) return;
  const t0 = a.currentTime + when;
  const osc = a.createOscillator();
  const g = a.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(gain, t0 + 0.008);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(g).connect(a.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.02);
}

const PATTERNS: Record<SoundName, () => void> = {
  click: () => blip(320, { dur: 0.06, gain: 0.035, type: "triangle" }),
  select: () => {
    blip(440, { dur: 0.06, gain: 0.04 });
    blip(660, { when: 0.05, dur: 0.06, gain: 0.03 });
  },
  confirm: () => {
    blip(523.25, { dur: 0.09, gain: 0.045 });
    blip(783.99, { when: 0.09, dur: 0.14, gain: 0.045 });
  },
  error: () => {
    blip(220, { dur: 0.12, gain: 0.05, type: "sawtooth" });
    blip(196, { when: 0.1, dur: 0.14, gain: 0.04, type: "sawtooth" });
  },
  toggle: () => blip(540, { dur: 0.05, gain: 0.04 }),
  swish: () => {
    blip(600, { dur: 0.05, gain: 0.03 });
    blip(380, { when: 0.04, dur: 0.07, gain: 0.03 });
  },
};

/** Persistent mute preference. */
export function isFeedbackEnabled(): boolean {
  return !readMuted();
}

export function setFeedbackEnabled(on: boolean): void {
  muted = !on;
  try {
    localStorage.setItem(STORE_KEY, on ? "on" : "off");
  } catch {
    /* ignore quota / privacy issues */
  }
}

export function toggleFeedback(): boolean {
  const next = !isFeedbackEnabled();
  setFeedbackEnabled(next);
  return next;
}

/** Fully-on-first: initialize the AudioContext on the first user gesture. */
export function primeFeedback(): void {
  if (readMuted()) return;
  ac();
}

/**
 * Play a sound + (optionally) a haptic pulse. Respects the mute preference
 * and never fires without a user gesture in the call stack (that is the
 * caller's job).
 */
export function feedback(name: SoundName, { haptic = false } = {}): void {
  if (readMuted() || prefersQuiet()) return;
  try {
    PATTERNS[name]?.();
  } catch {
    /* audio is best-effort */
  }
  if (haptic && "vibrate" in navigator) {
    try {
      navigator.vibrate(HAPTIC[name] ?? 0);
    } catch {
      /* not supported */
    }
  }
}

const HAPTIC: Partial<Record<SoundName, number | number[]>> = {
  select: 8,
  confirm: [12, 30, 12],
  error: 40,
};
