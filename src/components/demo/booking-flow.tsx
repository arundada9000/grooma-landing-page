"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import {
  ANY_BARBER,
  DEMO_BARBERS,
  DEMO_SERVICES,
  computeSlots,
  formatNpr,
} from "@/lib/demo-data";
import { cn } from "@/lib/cn";
import { feedback } from "@/lib/sound";
import {
  DemoButton,
  DemoCard,
  DemoField,
  DemoProgress,
  DemoSelectCard,
} from "./primitives";

type Step = "service" | "barber" | "computing" | "time" | "details" | "confirm";

/**
 * The interactive booking demo, a faithful miniature of Grooma's guest
 * journey. Frontend-only, deterministic, explicitly an "Interactive demo".
 *
 * Themed entirely through --demo-* variables so the theme switcher can restyle
 * it in place. Motion here demonstrates the product (state transitions,
 * "computing" the slots) rather than decorating the page.
 */

export function BookingFlow({
  auto = false,
  showHeader = true,
}: {
  /** When true, the demo walks itself for a passive viewer (section 02). */
  auto?: boolean;
  showHeader?: boolean;
}) {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  // Autoplay only while the surface is actually on screen: an unattended
  // loop running behind three screenfuls of page is pure battery drain.
  const onScreen = useInView(rootRef, { amount: 0.3 });
  const [dir, setDir] = useState<1 | -1>(1);
  const [step, setStep] = useState<Step>("service");
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [barberId, setBarberId] = useState<string | null>(null);
  const [slotLabel, setSlotLabel] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const service = useMemo(
    () => DEMO_SERVICES.find((s) => s.id === serviceId) ?? null,
    [serviceId],
  );

  // Deterministic seed for the demo "day".
  const daySeed = 42;

  const goTo = useCallback((next: Step, direction: 1 | -1) => {
    setDir(direction);
    setStep(next);
  }, []);

  // The unattended demo never makes noise: sound belongs to a real tap.
  const cue: typeof feedback = useCallback(
    (nameArg, opts) => {
      if (auto) return;
      feedback(nameArg, opts);
    },
    [auto],
  );

  // Slots are "computed" when the barber is chosen, a brief pause that
  // shows the engine at work, then the derived slots arrive.
  useEffect(() => {
    if (step !== "computing") return;
    const t = setTimeout(() => {
      setStep("time");
      setDir(1);
    }, reduce ? 50 : 900);
    return () => clearTimeout(t);
  }, [step, reduce]);

  const slots = useMemo(() => {
    if (!service || !barberId) return [];
    return computeSlots(service, barberId, daySeed);
  }, [service, barberId, daySeed]);

  const chooseService = (id: string) => {
    setServiceId(id);
    setBarberId(null);
    setSlotLabel(null);
    goTo("barber", 1);
    cue("click");
  };
  const chooseBarber = (id: string) => {
    setBarberId(id);
    setSlotLabel(null);
    setStep("computing");
    setDir(1);
    cue("select", { haptic: true });
  };
  const chooseSlot = (label: string) => {
    setSlotLabel(label);
    goTo("details", 1);
    cue("select");
  };
  const confirm = () => {
    goTo("confirm", 1);
    cue("confirm", { haptic: true });
  };
  const reset = () => {
    setName("");
    setPhone("");
    setSlotLabel(null);
    setBarberId(null);
    setServiceId(null);
    goTo("service", -1);
  };

  // A friendly validation: any name of >= 2 characters and a phone with at
  // least 6 digits (formatting ignored), so a normal guest never gets stuck.
  const detailsValid =
    name.trim().length >= 2 &&
    /^[0-9]{6,15}$/.test(phone.replace(/[^\d]/g, ""));

  // Autoplay: a passive visitor (section 02) watches the journey unfold.
  //
  // The script advances one step per effect run and re-subscribes on every
  // step change, so each beat reads the state the previous beat produced. A
  // single "fire everything on a timeline" effect cannot work here: the slots
  // and the validity flag only exist AFTER a service and barber are picked,
  // so a timeline captured at mount would always see an empty slot list and
  // stall on the time step.
  useEffect(() => {
    if (!auto || !onScreen) return;
    const wait = (ms: number) => (reduce ? 120 : ms);

    let t: ReturnType<typeof setTimeout> | undefined;
    if (step === "service") {
      t = setTimeout(() => chooseService("haircut"), wait(900));
    } else if (step === "barber") {
      t = setTimeout(() => chooseBarber(ANY_BARBER), wait(1400));
    } else if (step === "time" && slots.length > 0) {
      t = setTimeout(() => chooseSlot(slots[0].label), wait(1600));
    } else if (step === "details") {
      t = setTimeout(() => {
        setName("Sam");
        setPhone("9812 34567");
      }, wait(1000));
    } else if (step === "confirm") {
      // Loop the story so a visitor arriving mid-cycle still sees it whole.
      t = setTimeout(reset, wait(5200));
    }
    return () => clearTimeout(t);
    // `chooseService` and friends are recreated each render but only ever
    // call stable state setters, so the step/slots pair is the real trigger.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auto, onScreen, reduce, step, slots]);

  // Once the scripted details are filled in and pass the same validation a
  // real guest faces, the autoplay confirms.
  useEffect(() => {
    if (!auto || !onScreen || step !== "details" || !detailsValid) return;
    const t = setTimeout(confirm, reduce ? 120 : 1200);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auto, onScreen, reduce, step, detailsValid]);

  const stepIndex = ["service", "barber", "time", "details"].indexOf(step);
  const showStepper = step !== "confirm" && step !== "computing" && stepIndex >= 0;

  return (
    <div
      ref={rootRef}
      className="relative overflow-hidden rounded-[22px]"
      style={{
        backgroundColor: "var(--demo-bg)",
        border: "1px solid var(--demo-hairline)",
      }}
    >
      {showHeader && (
        <div
          className="flex items-center justify-between border-b px-5 py-3"
          style={{ borderColor: "var(--demo-hairline)" }}
        >
          <div className="flex items-baseline gap-2">
            <span
              className="text-[15px] font-semibold tracking-tight"
              style={{ color: "var(--demo-label)" }}
            >
              Book a chair
            </span>
            <span className="text-xs" style={{ color: "var(--demo-label-3)" }}>
              interactive demo
            </span>
          </div>
          <button
            type="button"
            onClick={reset}
            className="text-xs underline-offset-2 hover:underline"
            style={{ color: "var(--demo-accent)" }}
          >
            Restart
          </button>
        </div>
      )}

      <div className="px-5 py-5">
        {showStepper && <DemoProgress step={stepIndex} total={4} />}

        <div className="mt-4 min-h-[340px]">
          <AnimatePresence mode="wait" initial={false} custom={dir}>
            <motion.div
              key={step}
              custom={dir}
              initial={
                reduce ? { opacity: 0 } : { opacity: 0, x: 16 * dir }
              }
              animate={{ opacity: 1, x: 0 }}
              exit={
                reduce ? { opacity: 0 } : { opacity: 0, x: -16 * dir }
              }
              transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
            >
              {step === "service" && <ServiceStep onChoose={chooseService} />}
              {step === "barber" && (
                <BarberStep
                  onChoose={chooseBarber}
                  onBack={() => goTo("service", -1)}
                />
              )}
              {step === "computing" && <ComputingStep service={service} />}
              {step === "time" && (
                <TimeStep
                  slots={slots}
                  service={service}
                  onChoose={chooseSlot}
                  onBack={() => goTo("barber", -1)}
                />
              )}
              {step === "details" && (
                <DetailsStep
                  name={name}
                  setName={setName}
                  phone={phone}
                  setPhone={setPhone}
                  valid={detailsValid}
                  onConfirm={confirm}
                  onBack={() => goTo("time", -1)}
                  price={service ? service.priceNpr : 0}
                />
              )}
              {step === "confirm" && (
                <ConfirmStep
                  service={service}
                  barber={
                    barberId === ANY_BARBER
                      ? "first available"
                      : DEMO_BARBERS.find((b) => b.id === barberId)?.name ?? ""
                  }
                  slotLabel={slotLabel}
                  onRestart={reset}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function ServiceStep({ onChoose }: { onChoose: (id: string) => void }) {
  return (
    <div>
      <StepTitle step={1} title="Choose a service" />
      <div className="space-y-2.5">
        {DEMO_SERVICES.map((s) => (
          <DemoSelectCard key={s.id} selected={false} onSelect={() => onChoose(s.id)}>
            <div className="flex items-baseline justify-between gap-3">
              <span className="font-medium" style={{ color: "var(--demo-label)" }}>
                {s.name}
              </span>
              <span
                className="text-sm font-semibold"
                style={{ color: "var(--demo-accent)" }}
              >
                {formatNpr(s.priceNpr)}
              </span>
            </div>
            <span className="mt-0.5 block text-[13px]" style={{ color: "var(--demo-label-3)" }}>
              {s.enDuration}
            </span>
          </DemoSelectCard>
        ))}
      </div>
    </div>
  );
}

function BarberStep({
  onChoose,
  onBack,
}: {
  onChoose: (id: string) => void;
  onBack: () => void;
}) {
  return (
    <div>
      <StepTitle step={2} title="Choose a barber" />
      <div className="space-y-2.5">
        <DemoSelectCard selected={false} onSelect={() => onChoose(ANY_BARBER)}>
          <span className="font-medium" style={{ color: "var(--demo-label)" }}>
            First available
          </span>
          <span className="mt-0.5 block text-[13px]" style={{ color: "var(--demo-label-3)" }}>
            Whoever is free, no waiting on a name.
          </span>
        </DemoSelectCard>
        {DEMO_BARBERS.map((b) => (
          <DemoSelectCard key={b.id} selected={false} onSelect={() => onChoose(b.id)}>
            <span
              className="inline-flex size-8 items-center justify-center rounded-full text-xs font-semibold"
              style={{
                backgroundColor: "var(--demo-accent-soft)",
                color: "var(--demo-accent)",
              }}
            >
              {b.tag}
            </span>
            <span className="ml-3 font-medium" style={{ color: "var(--demo-label)" }}>
              {b.name}
            </span>
          </DemoSelectCard>
        ))}
      </div>
      <div className="mt-4">
        <DemoButton variant="ghost" onClick={onBack}>
          ← Back
        </DemoButton>
      </div>
    </div>
  );
}

function ComputingStep({
  service,
}: {
  service: { durationMinutes: number; name: string } | null;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <div
        className="mb-4 size-10 animate-spin rounded-full border-2"
        style={{
          borderColor: "var(--demo-hairline)",
          borderTopColor: "var(--demo-accent)",
        }}
        aria-hidden="true"
      />
      <p className="text-[15px] font-medium" style={{ color: "var(--demo-label)" }}>
        Checking the chair&apos;s schedule…
      </p>
      <p className="mt-1 text-[13px]" style={{ color: "var(--demo-label-3)" }}>
        Hours · breaks · {service?.durationMinutes ?? 0} min · what&apos;s already booked
      </p>
    </div>
  );
}

function TimeStep({
  slots,
  service,
  onChoose,
  onBack,
}: {
  slots: { barberId: string; label: string }[];
  service: { durationMinutes: number } | null;
  onChoose: (label: string) => void;
  onBack: () => void;
}) {
  return (
    <div>
      <StepTitle step={3} title="Pick an available time" />
      <p
        className="mb-3 mt-1 text-[13px]"
        style={{ color: "var(--demo-label-3)" }}
      >
        Computed from open hours, the {service?.durationMinutes ?? 0}-min service, and today&apos;s
        bookings.
      </p>
      <div className="grid grid-cols-3 gap-2.5">
        {slots.map((s) => (
          <button
            key={s.label}
            type="button"
            onClick={() => onChoose(s.label)}
            className="rounded-xl py-3 text-center text-[15px] font-semibold select-none transition-transform duration-150 ease-out active:scale-[0.96]"
            style={{
              backgroundColor: "var(--demo-inset)",
              color: "var(--demo-label)",
              border: "1px solid var(--demo-hairline)",
            }}
          >
            {s.label}
          </button>
        ))}
      </div>
      <div className="mt-4">
        <DemoButton variant="ghost" onClick={onBack}>
          ← Back
        </DemoButton>
      </div>
    </div>
  );
}

function DetailsStep({
  name,
  setName,
  phone,
  setPhone,
  valid,
  onConfirm,
  onBack,
  price,
}: {
  name: string;
  setName: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  valid: boolean;
  onConfirm: () => void;
  onBack: () => void;
  price: number;
}) {
  return (
    <div>
      <StepTitle step={4} title="Almost there" />
      <div className="space-y-3">
        <DemoField label="Name" value={name} onChange={setName} placeholder="Your name" />
        <DemoField
          label="Phone"
          value={phone}
          onChange={setPhone}
          type="tel"
          inputMode="tel"
          placeholder="98xx · xxxxx"
        />
      </div>
      <p
        className="mb-4 mt-3 text-[13px]"
        style={{ color: "var(--demo-label-3)" }}
      >
        No account. No app. The shop remembers this chair by your number.
      </p>
      <div className="space-y-2">
        <DemoButton className="w-full" variant="filled" disabled={!valid} onClick={onConfirm}>
          Confirm · {formatNpr(price)}
        </DemoButton>
        <DemoButton className="w-full" variant="ghost" onClick={onBack}>
          ← Back
        </DemoButton>
      </div>
    </div>
  );
}

function ConfirmStep({
  service,
  barber,
  slotLabel,
  onRestart,
}: {
  service: { name: string } | null;
  barber: string;
  slotLabel: string | null;
  onRestart: () => void;
}) {
  return (
    <div className="py-4 text-center">
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full"
        // `var(--demo-ok)20` is not a colour: appending hex alpha to a var()
        // reference never parses, so the halo silently rendered transparent.
        style={{
          backgroundColor:
            "color-mix(in srgb, var(--demo-ok) 18%, transparent)",
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" className="size-7">
          <path
            d="M6 12.5 10.2 16.5 18 8"
            stroke="var(--demo-ok)"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
      <p className="text-xl font-semibold tracking-tight" style={{ color: "var(--demo-label)" }}>
        You&apos;re booked.
      </p>
      <p className="mt-1 text-[15px]" style={{ color: "var(--demo-label-2)" }}>
        {service?.name}
        {barber ? ` · ${barber}` : ""}
        {slotLabel ? ` · ${slotLabel}` : ""}
      </p>
      <p className="mt-1 text-[13px]" style={{ color: "var(--demo-label-3)" }}>
        Your link can reschedule or cancel, no password.
      </p>
      <div className="mt-6 grid grid-cols-2 gap-3">
        <DemoButton variant="outline">Reschedule</DemoButton>
        <DemoButton variant="outline">Cancel</DemoButton>
      </div>
      <div className="mt-4">
        <DemoButton variant="ghost" onClick={onRestart}>
          Book again
        </DemoButton>
      </div>
    </div>
  );
}

function StepTitle({ step, title }: { step: number; title: string }) {
  return (
    <h3
      className="mb-3 flex items-center gap-2 text-lg font-semibold tracking-tight"
      style={{ color: "var(--demo-label)" }}
    >
      <span className="font-grotesk text-sm tracking-widest" style={{ color: "var(--demo-accent)" }}>
        {String(step).padStart(2, "0")}
      </span>
      {title}
    </h3>
  );
}
