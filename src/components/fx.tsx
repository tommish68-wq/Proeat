"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* Carte avec inclinaison 3D au survol + reflet suivant la souris      */
/* ------------------------------------------------------------------ */

export function TiltCard({
  children,
  className = "",
  max = 7,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), {
    stiffness: 180,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), {
    stiffness: 180,
    damping: 22,
  });
  const glareX = useTransform(px, [0, 1], ["20%", "80%"]);
  const glareY = useTransform(py, [0, 1], ["15%", "85%"]);
  const glare = useTransform(
    [glareX, glareY],
    ([x, y]) =>
      `radial-gradient(24rem 24rem at ${x} ${y}, rgba(255,255,255,0.14), transparent 65%)`
  );

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <div
      style={{ perspective: 900 }}
      className={`group ${className}`}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width);
        py.set((e.clientY - r.top) / r.height);
      }}
      onMouseLeave={() => {
        px.set(0.5);
        py.set(0.5);
      }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative h-full will-change-transform"
      >
        {children}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: glare }}
        />
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Sphère lumineuse flottante (fond dynamique)                         */
/* ------------------------------------------------------------------ */

export function Orb({
  className = "",
  style,
  duration = 11,
  dx = 0,
  dy = 26,
  delay = 0,
}: {
  className?: string;
  style?: CSSProperties;
  duration?: number;
  dx?: number;
  dy?: number;
  delay?: number;
}) {
  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none absolute rounded-full ${className}`}
      style={style}
      animate={{ y: [0, dy, 0], x: [0, dx, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Élément flottant en boucle douce                                    */
/* ------------------------------------------------------------------ */

export function Floaty({
  children,
  className = "",
  duration = 5,
  dy = -10,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  duration?: number;
  dy?: number;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, dy, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
