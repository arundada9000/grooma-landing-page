import { cn } from "@/lib/cn";

/**
 * Themed primitives for the interactive demos.
 *
 * These read the `--demo-*` custom properties emitted by the theme switcher,
 * so the SAME booking component restyles between barbershop identities
 * without re-rendering its tree. This is the product's actual theming story,
 * demonstrated with the product's tokens.
 */

export function DemoButton({
  className,
  variant = "filled",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "filled" | "outline" | "ghost";
}) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex h-11 select-none items-center justify-center gap-2 rounded-full px-6 text-[15px] font-medium",
        "transition-[transform,background-color,color,box-shadow] duration-150 ease-out active:scale-[0.97]",
        "disabled:pointer-events-none disabled:opacity-40",
        variant === "filled" &&
          "text-[color:var(--demo-on-accent)] bg-[color:var(--demo-accent)] hover:opacity-90",
        variant === "outline" &&
          "border text-[color:var(--demo-label)] border-[color:var(--demo-hairline)] hover:bg-[color:var(--demo-inset)]",
        variant === "ghost" &&
          "text-[color:var(--demo-accent)] hover:bg-[color:var(--demo-accent-soft)]",
        className,
      )}
    />
  );
}

export function DemoCard({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        "rounded-2xl",
        className,
      )}
      style={Object.assign(
        {
          backgroundColor: "var(--demo-card)",
          border: "1px solid var(--demo-hairline)",
          boxShadow: "var(--demo-shadow)",
        },
        props.style,
      )}
    />
  );
}

export function DemoSelectCard({
  selected,
  onSelect,
  children,
  className,
}: {
  selected: boolean;
  onSelect: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      className={cn(
        "w-full rounded-xl p-4 text-left select-none transition-colors duration-150",
        "touch-manipulation",
        selected
          ? "bg-[color:var(--demo-accent-soft)] ring-[1.5px] ring-[color:var(--demo-accent)]"
          : "border border-[color:var(--demo-hairline)] bg-[color:var(--demo-card)] hover:bg-[color:var(--demo-inset)]",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function DemoField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: "text" | "tel";
  placeholder?: string;
  inputMode?: "tel" | "text";
}) {
  return (
    <label className="block">
      <span
        className="mb-1.5 block text-sm font-medium"
        style={{ color: "var(--demo-label)" }}
      >
        {label}
      </span>
      <input
        type={type}
        value={value}
        inputMode={inputMode}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full rounded-xl px-4 text-[15px] outline-none transition-shadow placeholder:text-[color:var(--demo-label-3)]"
        style={{
          backgroundColor: "var(--demo-inset)",
          color: "var(--demo-label)",
          border: "1px solid var(--demo-hairline)",
        }}
      />
    </label>
  );
}

export function DemoProgress({ step, total }: { step: number; total: number }) {
  return (
    <div aria-hidden="true" className="flex gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className="h-1 flex-1 rounded-full transition-colors duration-200"
          style={{
            backgroundColor: i <= step ? "var(--demo-accent)" : "var(--demo-hairline)",
          }}
        />
      ))}
    </div>
  );
}
