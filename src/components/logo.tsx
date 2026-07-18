export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect width="40" height="40" rx="12" fill="var(--leaf-deep)" />
      {/* Feuille tropicale stylisée */}
      <path
        d="M20 31c-6.5-2.2-10-7.4-10-14.5 0-2.6.5-5 1.4-7C18.6 10.6 24 15.8 24 23c0 3-1.4 6-4 8Z"
        fill="var(--leaf-mid)"
      />
      <path
        d="M20 31c-1-5.5-1-13 0-19"
        stroke="#22453c"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      {/* Éclair de performance */}
      <path
        d="M27 9l-5.5 9.5H26L23 30l7.5-12h-4.8L29 9h-2Z"
        fill="var(--gold)"
      />
    </svg>
  );
}

export function Logo({
  compact = false,
  onDark = false,
}: {
  compact?: boolean;
  onDark?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark />
      {!compact && (
        <span
          className={`font-display text-xl font-semibold tracking-tight transition-colors duration-300 ${
            onDark ? "text-white" : "text-ink"
          }`}
        >
          Pro
          <span className={onDark ? "text-[#8daa91]" : "text-leaf"}>Eat</span>
        </span>
      )}
    </span>
  );
}
