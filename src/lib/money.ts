import { fx, type CurrencyCode } from "@/config/site";

export type DisplayCurrency = string; // "NPR" | "USD" | "INR" | ...

/**
 * Number of US dollars one unit of each currency is worth.
 * - USD is 1 by definition.
 * - NPR is derived from the editable `usdPerNpr` rate (NPR is the anchor).
 * - Every other currency carries its own `usd` field in the FX table.
 */
const USD_VALUE: Record<string, number> = (() => {
  const table: Record<string, number> = {};
  for (const c of fx.currencies) {
    if (c.code === "USD") table.USD = 1;
    else if (c.code === "NPR") table.NPR = fx.usdPerNpr;
    else if (typeof c.usd === "number") table[c.code] = c.usd;
  }
  return table;
})();

/**
 * Convert an amount expressed in `from` currency into `to` currency, routing
 * through USD so the convertible FX table stays the single source of rates.
 */
export function convert(value: number, from: CurrencyCode, to: string): number {
  if (to === from || !value) return value;
  const fromRate = USD_VALUE[from];
  const toRate = USD_VALUE[to];
  if (!fromRate || !toRate) return NaN;
  const usd = value * fromRate;
  return usd / toRate;
}

export function formatMoney(value: number, code: string): string {
  const rounded = Math.round(value);
  const num = new Intl.NumberFormat("en-US").format(rounded);
  const symbol = fx.currencies.find((c) => c.code === code)?.symbol;
  // Symbol-bearing currencies get the symbol; generic fall back to the code.
  const prefix = symbol && symbol !== code ? symbol : `${code} `;
  return `${prefix}${num}`;
}
