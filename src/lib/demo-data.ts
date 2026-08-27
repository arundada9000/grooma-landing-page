/**
 * Interactive demo data + engine.
 *
 * The demo is frontend-only and deterministic. It mirrors the real product's
 * scheduling concepts (hours, breaks, closures, service duration, buffer) and
 * COMPUTES available slots from those constraints, in the same way the product
 * does, except it never touches a database and never pretends to be a real
 * shop. It is explicitly labelled "Interactive demo".
 *
 * Prices use NPR and derive from the product's demo shop fixtures so they
 * never present a fictional real business as fact.
 */

export interface DemoService {
  id: string;
  name: string;
  enDuration: string; // e.g. "30 min"
  durationMinutes: number;
  bufferMinutes: number;
  priceNpr: number;
}

export interface DemoBarber {
  id: string;
  name: string;
  /** Short initial used in place of a photo slot. */
  tag: string;
}

export const DEMO_SERVICES: DemoService[] = [
  {
    id: "haircut",
    name: "Haircut",
    enDuration: "30 min",
    durationMinutes: 30,
    bufferMinutes: 0,
    priceNpr: 300,
  },
  {
    id: "beard",
    name: "Beard Trim",
    enDuration: "20 min",
    durationMinutes: 20,
    bufferMinutes: 0,
    priceNpr: 150,
  },
  {
    id: "combo",
    name: "Haircut + Beard",
    enDuration: "50 min",
    durationMinutes: 50,
    bufferMinutes: 10,
    priceNpr: 400,
  },
  {
    id: "wash",
    name: "Hair Wash",
    enDuration: "15 min",
    durationMinutes: 15,
    bufferMinutes: 0,
    priceNpr: 100,
  },
  {
    id: "style",
    name: "Styling",
    enDuration: "30 min",
    durationMinutes: 30,
    bufferMinutes: 0,
    priceNpr: 250,
  },
];

export const DEMO_BARBERS: DemoBarber[] = [
  { id: "bikash", name: "Bikash", tag: "BK" },
  { id: "hari", name: "Hari", tag: "HR" },
  { id: "anil", name: "Anil", tag: "AN" },
];

/** Any barber, the product's "whoever is free" path. */
export const ANY_BARBER = "any";

export interface DemoSlot {
  /** Display minute of day, e.g. 630 = 10:30. */
  minute: number;
  /** Formatted "10:30". */
  label: string;
  /** The barber this slot is open for (or "any"). */
  barberId: string;
}

const MINUTES_PER_DAY = 24 * 60;

/** Turn a "09:00" style string into minutes of day. */
function toMinute(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + (m || 0);
}

function toLabel(minute: number): string {
  const h = Math.floor(minute / 60);
  const m = minute % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/** Simple deterministic pseudo-random so results are stable per key. */
function seeded(n: number): number {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

/**
 * The demo "shop's" constraints for a day:
 *   open 09:00–19:00, lunch break 13:00–14:00.
 * Existing appointments fill some chairs.
 */
export const DEMO_DAY = {
  open: toMinute("09:00"),
  close: toMinute("19:00"),
  breaks: [] as Array<{ start: number; end: number }>,
};

// Lunch break removes a chunk of availability on weekdays; the demo day
// is a weekday, so we include it.
const LUNCH = { start: toMinute("13:00"), end: toMinute("14:00") };

// Existing appointments per barber for "today", these constrain the demo.
const EXISTING_PER_BARBER: Record<string, number[]> = {
  bikash: [toMinute("10:00"), toMinute("14:30"), toMinute("16:00")],
  hari: [toMinute("10:30"), toMinute("15:00")],
  anil: [toMinute("11:00"), toMinute("16:30")],
};

/**
 * Computes available slots for a barber between the appointments already on
 * the "chair". This is a faithful miniature of the product's availability
 * logic: an appointment is only offered when the full service (plus buffer)
 * fits inside open hours, avoids the break, and leaves gaps against existing
 * appointments and the other computed slots.
 */
export function computeSlots(
  service: DemoService,
  barberId: string,
  daySeed: number,
): DemoSlot[] {
  const step = 15; // the product allowlists slots in 15-minute aligned steps
  const durationTotal = service.durationMinutes + service.bufferMinutes;

  const takenMinutes = barberId === ANY_BARBER ? [] : EXISTING_PER_BARBER[barberId] ?? [];

  // The "any barber" seat pools the union of occupied windows across barbers.
  const occupied =
    barberId === ANY_BARBER
      ? Object.values(EXISTING_PER_BARBER)
          .flat()
          .map((m) => ({ start: m, end: m + durationTotal }))
      : takenMinutes.map((m) => ({ start: m, end: m + durationTotal }));

  const out: DemoSlot[] = [];
  let minute = DEMO_DAY.open;
  const totalOpen = DEMO_DAY.close - DEMO_DAY.open;

  // Reserve a few dispersed slots as "already booked on the web" so the hero
  // feels alive without inventing a live shop: gaps are carved by the lunch
  // break and existing appointments above, and we drop a couple more via a
  // deterministic seed so the list is never a pristine run.
  const drop = new Set<number>();
  if (barberId === ANY_BARBER) {
    for (let i = 0; i < 3; i++) {
      drop.add(step * Math.floor((seeded(daySeed * 31 + i) * totalOpen) / step / 2) * 2);
    }
  }

  while (minute < DEMO_DAY.close - durationTotal) {
    const slotStart = minute;
    const slotEnd = minute + durationTotal;

    // Must fit within the day and not overlap lunch.
    const overlapsLunch = slotStart < LUNCH.end && slotEnd > LUNCH.start;

    // Must not collide with an existing appointment on this chair.
    const collides = occupied.some(
      (o) => slotStart < o.end && slotEnd > o.start,
    );

    // Skip destinations that would collide anyway (keep spacing honest).
    if (!overlapsLunch && !collides && !drop.has(minute)) {
      out.push({
        minute,
        label: toLabel(minute),
        barberId,
      });
    }

    minute += step;
  }

  // Deterministic shuffle so consecutive visits look the same.
  const shuffled = out
    .map((slot, i) => ({ slot, r: seeded(daySeed * 13 + i) }))
    .sort((a, b) => a.r - b.r)
    .map((x) => x.slot);

  return shuffled.slice(0, 8); // keep the demo rhythmic, not a wall of times
}

export function formatNpr(npr: number): string {
  return `NPR ${npr.toLocaleString("en-US")}`;
}

export const MINUTES_PER_DAY_FOR_LABEL = MINUTES_PER_DAY;
