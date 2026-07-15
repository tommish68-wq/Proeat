"use client";

import { useId, useMemo, useState } from "react";

/* ------------------------------------------------------------------ */
/* Courbe d'évolution (une seule série) — crosshair + tooltip          */
/* ------------------------------------------------------------------ */

export function LineChart({
  data,
  unit = "",
  height = 220,
  color = "var(--leaf)",
}: {
  data: { label: string; value: number }[];
  unit?: string;
  height?: number;
  color?: string;
}) {
  const id = useId();
  const [hover, setHover] = useState<number | null>(null);
  const W = 640;
  const H = height;
  const pad = { top: 16, right: 12, bottom: 26, left: 44 };

  const { points, min, max, ticks } = useMemo(() => {
    const values = data.map((d) => d.value);
    const lo = Math.min(...values);
    const hi = Math.max(...values);
    const span = hi - lo || 1;
    const min = lo - span * 0.15;
    const max = hi + span * 0.15;
    const innerW = W - pad.left - pad.right;
    const innerH = H - pad.top - pad.bottom;
    const points = data.map((d, i) => ({
      x: pad.left + (data.length === 1 ? innerW / 2 : (i / (data.length - 1)) * innerW),
      y: pad.top + innerH - ((d.value - min) / (max - min)) * innerH,
      ...d,
    }));
    const ticks = [min, (min + max) / 2, max].map((v) => ({
      v,
      y: pad.top + innerH - ((v - min) / (max - min)) * innerH,
    }));
    return { points, min, max, ticks };
  }, [data, H, pad.left, pad.right, pad.top, pad.bottom]);

  if (data.length === 0) return null;

  const path = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(" ");
  const area = `${path} L${points[points.length - 1].x},${H - pad.bottom} L${points[0].x},${H - pad.bottom} Z`;
  const h = hover !== null ? points[hover] : null;

  return (
    <div className="relative w-full">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label={`Évolution : de ${data[0].value}${unit} à ${data[data.length - 1].value}${unit}`}
        onMouseLeave={() => setHover(null)}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * W;
          let best = 0;
          points.forEach((p, i) => {
            if (Math.abs(p.x - x) < Math.abs(points[best].x - x)) best = i;
          });
          setHover(best);
        }}
      >
        <defs>
          <linearGradient id={`${id}-fill`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.18" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        {ticks.map((t) => (
          <g key={t.v}>
            <line
              x1={pad.left}
              x2={W - pad.right}
              y1={t.y}
              y2={t.y}
              stroke="var(--viz-grid)"
              strokeWidth="1"
            />
            <text
              x={pad.left - 8}
              y={t.y + 3.5}
              textAnchor="end"
              fontSize="11"
              fill="var(--muted)"
            >
              {Math.round(t.v)}
            </text>
          </g>
        ))}
        <path d={area} fill={`url(#${id}-fill)`} />
        <path
          d={path}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {points.map((p, i) => {
          const showLabel =
            i === 0 || i === points.length - 1 || points.length <= 2;
          return (
            <g key={i}>
              {showLabel && (
                <text
                  x={p.x}
                  y={p.y - 10}
                  textAnchor={i === 0 ? "start" : i === points.length - 1 ? "end" : "middle"}
                  fontSize="11"
                  fontWeight="600"
                  fill="var(--ink)"
                >
                  {p.value}
                  {unit}
                </text>
              )}
              <text
                x={p.x}
                y={H - 8}
                textAnchor="middle"
                fontSize="10"
                fill="var(--muted)"
              >
                {points.length > 10 && i % 2 === 1 ? "" : p.label}
              </text>
            </g>
          );
        })}
        {h && (
          <g pointerEvents="none">
            <line
              x1={h.x}
              x2={h.x}
              y1={pad.top}
              y2={H - pad.bottom}
              stroke="var(--muted)"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
            <circle cx={h.x} cy={h.y} r="5" fill={color} stroke="var(--card)" strokeWidth="2" />
          </g>
        )}
      </svg>
      {h && (
        <div
          className="pointer-events-none absolute -translate-x-1/2 rounded-lg border border-line bg-card px-3 py-1.5 text-xs shadow-lg"
          style={{
            left: `${(h.x / W) * 100}%`,
            top: `${(h.y / H) * 100}%`,
            transform: "translate(-50%, -130%)",
          }}
        >
          <span className="font-medium text-muted">{h.label}</span>{" "}
          <span className="font-semibold text-ink">
            {h.value}
            {unit}
          </span>
        </div>
      )}
      <span className="sr-only">
        Min {Math.round(min)}, max {Math.round(max)}.
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Barres (une série) — extrémités arrondies 4px, gaps, hover          */
/* ------------------------------------------------------------------ */

export function BarChart({
  data,
  unit = "",
  target,
  height = 200,
  color = "var(--leaf)",
}: {
  data: { label: string; value: number }[];
  unit?: string;
  target?: number;
  height?: number;
  color?: string;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const W = 640;
  const H = height;
  const pad = { top: 20, right: 12, bottom: 26, left: 12 };
  const innerW = W - pad.left - pad.right;
  const innerH = H - pad.top - pad.bottom;
  const max = Math.max(...data.map((d) => d.value), target ?? 0) * 1.1 || 1;
  const band = innerW / data.length;
  const barW = Math.min(band * 0.55, 48);

  return (
    <div className="relative w-full">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="Histogramme des derniers jours"
        onMouseLeave={() => setHover(null)}
      >
        {target !== undefined && target > 0 && (
          <g>
            <line
              x1={pad.left}
              x2={W - pad.right}
              y1={pad.top + innerH - (target / max) * innerH}
              y2={pad.top + innerH - (target / max) * innerH}
              stroke="var(--muted)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <text
              x={W - pad.right}
              y={pad.top + innerH - (target / max) * innerH - 5}
              textAnchor="end"
              fontSize="10"
              fill="var(--muted)"
            >
              Objectif {target}
              {unit}
            </text>
          </g>
        )}
        {data.map((d, i) => {
          const hgt = (d.value / max) * innerH;
          const x = pad.left + band * i + (band - barW) / 2;
          const y = pad.top + innerH - hgt;
          const active = hover === i;
          return (
            <g
              key={i}
              onMouseEnter={() => setHover(i)}
              className="cursor-default"
            >
              {/* zone de survol plus large que la barre */}
              <rect
                x={pad.left + band * i}
                y={pad.top}
                width={band}
                height={innerH}
                fill="transparent"
              />
              <path
                d={`M${x},${y + Math.min(4, hgt)} q0,-4 4,-4 h${barW - 8} q4,0 4,4 v${Math.max(hgt - 4, 0)} h${-barW} Z`}
                fill={color}
                opacity={active ? 1 : 0.82}
                style={{ transition: "opacity 0.15s ease" }}
              />
              {active && (
                <text
                  x={x + barW / 2}
                  y={y - 7}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="600"
                  fill="var(--ink)"
                >
                  {Math.round(d.value)}
                  {unit}
                </text>
              )}
              <text
                x={x + barW / 2}
                y={H - 8}
                textAnchor="middle"
                fontSize="10"
                fill="var(--muted)"
              >
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Anneau de progression (macro) — étiquette directe au centre         */
/* ------------------------------------------------------------------ */

export function MacroRing({
  label,
  value,
  max,
  unit = "g",
  color,
  size = 120,
}: {
  label: string;
  value: number;
  max: number;
  unit?: string;
  color: string;
  size?: number;
}) {
  const r = 44;
  const c = 2 * Math.PI * r;
  const pct = max > 0 ? Math.min(1, value / max) : 0;
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          viewBox="0 0 100 100"
          className="h-full w-full -rotate-90"
          role="img"
          aria-label={`${label} : ${Math.round(value)}${unit} sur ${Math.round(max)}${unit}`}
        >
          <circle
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke="var(--viz-grid)"
            strokeWidth="8"
          />
          <circle
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={c * (1 - pct)}
            style={{ transition: "stroke-dashoffset 0.8s cubic-bezier(0.2,0.8,0.2,1)" }}
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <div className="text-center">
            <div className="text-lg font-bold leading-none text-ink">
              {Math.round(value)}
            </div>
            <div className="mt-0.5 text-[10px] text-muted">
              / {Math.round(max)}
              {unit}
            </div>
          </div>
        </div>
      </div>
      <span className="text-xs font-medium text-muted">{label}</span>
    </div>
  );
}
