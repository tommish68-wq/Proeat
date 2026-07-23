import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/* ---------- Bouton ---------- */

const buttonStyles = {
  primary:
    "bg-leaf-deep text-white hover:bg-leaf shadow-sm hover:shadow-md",
  secondary:
    "border border-line bg-surface text-ink hover:border-leaf/40 hover:bg-leaf-faint",
  ghost: "text-muted hover:text-ink hover:bg-sand",
} as const;

type ButtonVariant = keyof typeof buttonStyles;

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 hover:-translate-y-px active:translate-y-0 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<"button"> & { variant?: ButtonVariant }) {
  return (
    <button
      className={`${buttonBase} ${buttonStyles[variant]} ${className}`}
      {...props}
    />
  );
}

export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: ButtonVariant }) {
  return (
    <Link
      className={`${buttonBase} ${buttonStyles[variant]} ${className}`}
      {...props}
    />
  );
}

/* ---------- Badge ---------- */

const badgeStyles = {
  leaf: "bg-leaf-soft text-leaf-deep",
  sand: "bg-sand text-ink",
  gold: "bg-gold/15 text-[#7c5a33]",
  outline: "border border-line text-muted",
} as const;

export function Badge({
  tone = "leaf",
  className = "",
  children,
}: {
  tone?: keyof typeof badgeStyles;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${badgeStyles[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

/* ---------- En-tête de section ---------- */

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}) {
  return (
    <div
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted">
          {description}
        </p>
      )}
    </div>
  );
}

/* ---------- Champs ---------- */

export function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-sm font-medium text-ink"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

/* ---------- Barre de progression ---------- */

export function ProgressBar({
  value,
  max,
  tone = "var(--leaf)",
}: {
  value: number;
  max: number;
  tone?: string;
}) {
  const pct = max > 0 ? Math.min(100, (value / max) * 100) : 0;
  return (
    <div
      className="h-2 w-full overflow-hidden rounded-full bg-sand"
      role="progressbar"
      aria-valuenow={Math.round(value)}
      aria-valuemin={0}
      aria-valuemax={Math.round(max)}
    >
      <div
        className="h-full rounded-full transition-[width] duration-700 ease-out"
        style={{ width: `${pct}%`, background: tone }}
      />
    </div>
  );
}

/* ---------- Skeleton ---------- */

export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`skeleton ${className}`} aria-hidden="true" />;
}
