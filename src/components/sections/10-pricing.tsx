"use client";

import { useState } from "react";
import { pricing, fx, site } from "@/config/site";
import { convert, formatMoney } from "@/lib/money";
import { feedback } from "@/lib/sound";
import { cn } from "@/lib/cn";

/**
 * One honest plan, shown in the visitor's chosen currency.
 *
 * Base prices live in NPR (primary market) and USD. Any other currency is an
 * equivalent conversion through the config FX table, no invented "local"
 * digits, and the conversion is labelled.
 */
export function Pricing() {
  const [currency, setCurrency] = useState("NPR");
  const [mode, setMode] = useState<"monthly" | "payonce">("monthly");
  const plan = pricing.plans[0];

  const isBuyout = mode === "payonce";
  const priceAmount = isBuyout
    ? convert(plan.buyout?.NPR ?? 0, "NPR", currency)
    : convert(plan.base.NPR, "NPR", currency);
  const billingLabel = isBuyout ? "one-time / shop" : plan.billing;

  return (
    <div className="mx-auto grid max-w-4xl gap-10 lg:grid-cols-[1fr_360px] lg:items-start">
      {/* CTA / plan detail */}
      <div className="order-2 lg:order-1">
        <div className="rounded-3xl border border-copper bg-ink-soft p-8 sm:p-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-copper-soft px-3 py-1 text-xs font-medium tracking-wide text-copper-bright uppercase">
              The plan
            </span>
            <span className="font-grotesk text-sm text-metal">{plan.vibe}</span>
          </div>

          <div className="mt-6 flex items-baseline gap-2">
            <span className="font-display text-5xl font-black tracking-tight text-paper sm:text-6xl">
              {formatMoney(
                priceAmount,
                currency,
              )}
            </span>
            <span className="text-paper-dim">/ {billingLabel}</span>
          </div>

          {isBuyout && (
            <p className="mt-2 font-grotesk text-sm text-copper-bright">
              Pay once, own the software. {plan.billing.replace("per shop / ", "")} billing also available.
            </p>
          )}

          <p className="mt-4 max-w-md text-paper-dim">{plan.description}</p>

          <div className="mt-8 space-y-3">
            {plan.includes.map((item) => (
              <div key={item} className="flex items-start gap-3 text-[15px] text-paper">
                <span
                  className="mt-1.5 inline-block size-1.5 shrink-0 rounded-full bg-copper"
                  aria-hidden="true"
                />
                {item}
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={`${site.contact.whatsappLink}?text=${encodeURIComponent(
                "Hi Grooma, I'd like to start my shop",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-13 items-center gap-2 rounded-full bg-copper px-7 text-base font-semibold text-on-accent transition-colors hover:bg-copper-bright"
            >
              {plan.cta}
              <span aria-hidden="true">→</span>
            </a>
            <a
              href={`${site.contact.whatsappLink}?text=${encodeURIComponent(
                "Hi Grooma, I'd like a live demo",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-13 items-center rounded-full border border-hairline-strong px-7 text-base font-medium text-paper transition-colors hover:border-paper-dim"
            >
              Book a live demo
            </a>
          </div>

          <p className="mt-6 text-sm text-metal">
            {plan.buyoutNote} {pricing.note}.{" "}
            <a
              href={`mailto:${site.contact.email}`}
              className="underline underline-offset-4 hover:text-paper-dim"
            >
              {site.contact.email}
            </a>
          </p>
        </div>
      </div>

      {/* Billing mode + currency selector */}
      <div className="order-1 lg:order-2">
        <p
          id="billing-mode-label"
          className="font-grotesk mb-3 block text-xs tracking-[0.2em] text-metal uppercase"
        >
          How you pay
        </p>
        <div
          role="group"
          aria-labelledby="billing-mode-label"
          className="flex flex-wrap gap-2"
        >
          {(
            [
              { id: "monthly", label: "Monthly" },
              { id: "payonce", label: "One-time pay" },
            ] as const
          ).map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => {
                setMode(m.id);
                feedback("select");
              }}
              aria-pressed={mode === m.id}
              className={cn(
                "rounded-full border px-3.5 py-2 text-sm transition-colors duration-150",
                mode === m.id
                  ? "border-copper bg-copper-soft text-copper-bright"
                  : "border-hairline text-paper-dim hover:border-hairline-strong hover:text-paper",
              )}
            >
              {m.label}
            </button>
          ))}
        </div>
        <p className="mt-3 text-[13px] leading-relaxed text-metal">
          {isBuyout
            ? "Pay once for the software. Domain and deployment are set up and billed separately, so there are no surprise hosting fees bundled in."
            : "A simple monthly rate. Domain and deployment are set up and billed separately, so there are no surprise hosting fees bundled in."}
        </p>

        <p
          id="currency-label"
          className="font-grotesk mt-6 mb-3 block text-xs tracking-[0.2em] text-metal uppercase"
        >
          Show pricing in
        </p>
        <div
          role="group"
          aria-labelledby="currency-label"
          className="flex flex-wrap gap-2"
        >
          {fx.currencies.map((c) => (
            <button
              key={c.code}
              type="button"
              onClick={() => {
                setCurrency(c.code);
                feedback("select");
              }}
              aria-pressed={currency === c.code}
              className={cn(
                "rounded-full border px-3.5 py-2 text-sm transition-colors duration-150",
                currency === c.code
                  ? "border-copper bg-copper-soft text-copper-bright"
                  : "border-hairline text-paper-dim hover:border-hairline-strong hover:text-paper",
              )}
            >
              {c.code}
            </button>
          ))}
        </div>
        <p className="mt-4 text-[13px] leading-relaxed text-metal">
          Base prices are set in Nepalese Rupees and US dollars. Other
          currencies are converted at the current rate, the same amount,
          wherever you read it.
        </p>
        <p className="mt-2 text-[13px] text-metal">
          Prices update to {currency} automatically above.
        </p>
      </div>
    </div>
  );
}