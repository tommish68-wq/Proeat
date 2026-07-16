"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, ChevronDown, Dumbbell, Flame, Leaf, TrendingDown } from "lucide-react";
import { Floaty, Orb } from "@/components/fx";

/* Mini-graphique sparkline du mockup */
function Spark() {
  return (
    <svg viewBox="0 0 200 56" className="w-full" aria-hidden>
      <defs>
        <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5fc08c" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#5fc08c" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0,10 C20,12 32,20 52,18 C72,16 82,26 102,28 C122,30 134,24 154,32 C174,40 188,40 200,44 L200,56 L0,56 Z"
        fill="url(#spark-fill)"
      />
      <path
        d="M0,10 C20,12 32,20 52,18 C72,16 82,26 102,28 C122,30 134,24 154,32 C174,40 188,40 200,44"
        fill="none"
        stroke="#7fd6a6"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="200" cy="44" r="4" fill="#7fd6a6" stroke="#0d3527" strokeWidth="2" />
    </svg>
  );
}

/* Anneau macro simplifié pour le mockup */
function MiniRing({ pct, color, label, value }: { pct: number; color: string; label: string; value: string }) {
  const c = 2 * Math.PI * 15.5;
  return (
    <div className="flex flex-col items-center gap-1">
      <svg viewBox="0 0 40 40" className="h-12 w-12 -rotate-90" aria-hidden>
        <circle cx="20" cy="20" r="15.5" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="4.5" />
        <circle
          cx="20" cy="20" r="15.5" fill="none" stroke={color} strokeWidth="4.5" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={c * (1 - pct)}
        />
      </svg>
      <span className="text-[10px] font-semibold text-white">{value}</span>
      <span className="text-[9px] text-white/50">{label}</span>
    </div>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  /* Parallaxe souris */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 20 });
  const smy = useSpring(my, { stiffness: 60, damping: 20 });
  const visualX = useTransform(smx, [-1, 1], [-14, 14]);
  const visualY = useTransform(smy, [-1, 1], [-10, 10]);
  const cardX = useTransform(smx, [-1, 1], [18, -18]);
  const cardY = useTransform(smy, [-1, 1], [12, -12]);

  /* Parallaxe scroll */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const visualScrollY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      onMouseMove={(e) => {
        if (reduce) return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
        my.set(((e.clientY - r.top) / r.height) * 2 - 1);
      }}
      className="noise relative -mt-16 overflow-hidden bg-[#0a2e22]"
    >
      {/* Fond dynamique : dégradés + sphères lumineuses */}
      <motion.div aria-hidden className="absolute inset-0" style={{ y: reduce ? 0 : bgY }}>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(70rem 42rem at 78% -12%, rgba(46,158,104,0.35), transparent 62%), radial-gradient(52rem 36rem at -8% 42%, rgba(23,96,74,0.55), transparent 60%), radial-gradient(40rem 30rem at 55% 118%, rgba(185,154,95,0.22), transparent 65%), linear-gradient(180deg, #0a2e22 0%, #0c3427 55%, #0a2e22 100%)",
          }}
        />
        <Orb
          className="blur-3xl"
          style={{ top: "8%", right: "6%", width: 320, height: 320, background: "radial-gradient(circle at 35% 35%, rgba(127,214,166,0.5), rgba(46,158,104,0.16) 55%, transparent 70%)" }}
          duration={12}
          dy={30}
          dx={-16}
        />
        <Orb
          className="blur-3xl"
          style={{ bottom: "4%", left: "2%", width: 260, height: 260, background: "radial-gradient(circle at 40% 40%, rgba(231,217,168,0.34), rgba(185,154,95,0.12) 55%, transparent 72%)" }}
          duration={14}
          dy={-24}
          dx={18}
          delay={1.5}
        />
        <Orb
          className="blur-2xl"
          style={{ top: "48%", left: "44%", width: 130, height: 130, background: "radial-gradient(circle at 40% 35%, rgba(159,224,188,0.4), transparent 70%)" }}
          duration={9}
          dy={20}
          delay={0.7}
        />
      </motion.div>

      <motion.div
        style={{ opacity: reduce ? 1 : fade }}
        className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 pb-24 pt-32 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pb-32 lg:pt-40"
      >
        {/* ---------- Texte ---------- */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-white/85"
          >
            <Leaf className="h-3.5 w-3.5 text-[#7fd6a6]" />
            Nutrition · Musculation · Bien-être
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-7 font-display text-[2.75rem] font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-[4.25rem]"
          >
            Mangez juste.
            <br />
            Entraînez-vous mieux.
            <br />
            <span className="text-gradient-tropical">Progressez.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-lg text-lg leading-relaxed text-white/65"
          >
            ProEat réunit votre nutrition, vos entraînements et votre
            progression dans un seul espace, simple et apaisant. Des outils
            précis pour des résultats durables.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/dashboard"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-[#0a2e22] shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_16px_48px_rgb(6_24_16_/_0.6),0_0_100px_rgb(46_158_104_/_0.3)] active:translate-y-0"
            >
              Commencer gratuitement
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/recettes"
              className="glass inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/15"
            >
              Voir les recettes
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="mt-8 text-sm text-white/45"
          >
            Gratuit, sans inscription — vos données restent sur votre appareil.
          </motion.p>
        </div>

        {/* ---------- Visuel : mockup en verre + cartes flottantes ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.25 }}
          style={reduce ? undefined : { x: visualX, y: visualY }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <motion.div style={reduce ? undefined : { y: visualScrollY }}>
            {/* Carte principale : tableau de bord */}
            <div className="glass shadow-glow relative rounded-3xl p-6 sm:p-7">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-white/45">
                    Tableau de bord
                  </p>
                  <p className="mt-1 font-display text-lg font-semibold text-white">
                    Bonjour, Léa 👋
                  </p>
                </div>
                <span className="glass rounded-full px-3 py-1 text-[11px] font-medium text-[#9fe0bc]">
                  Objectif : Sèche
                </span>
              </div>

              <div className="mt-5 grid grid-cols-[1.2fr_1fr] gap-4">
                <div className="rounded-2xl bg-white/[0.06] p-4">
                  <p className="text-[11px] text-white/50">Calories du jour</p>
                  <p className="mt-1 font-display text-3xl font-semibold text-white">
                    1 847
                    <span className="ml-1 text-sm font-normal text-white/45">/ 2 300</span>
                  </p>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-[#5fc08c] to-[#9fe0bc]"
                      initial={{ width: 0 }}
                      animate={{ width: "80%" }}
                      transition={{ duration: 1.4, delay: 0.9, ease: [0.21, 0.47, 0.32, 0.98] }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-around rounded-2xl bg-white/[0.06] p-3">
                  <MiniRing pct={0.78} color="#7fd6a6" label="Prot." value="132 g" />
                  <MiniRing pct={0.62} color="#e0b46a" label="Gluc." value="148 g" />
                </div>
              </div>

              <div className="mt-4 rounded-2xl bg-white/[0.06] p-4">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] text-white/50">Poids — 8 semaines</p>
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-[#9fe0bc]">
                    <TrendingDown className="h-3 w-3" />
                    −3,6 kg
                  </span>
                </div>
                <div className="mt-2">
                  <Spark />
                </div>
              </div>
            </div>

            {/* Cartes flottantes en profondeur */}
            <motion.div
              style={reduce ? undefined : { x: cardX, y: cardY }}
              className="absolute -left-6 -top-6 sm:-left-10"
            >
              <Floaty duration={5.5}>
                <div className="glass shadow-deep flex items-center gap-3 rounded-2xl px-4 py-3">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#2e9e68]/30 text-[#9fe0bc]">
                    <Dumbbell className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-white">Push — Poussée</p>
                    <p className="text-[10px] text-white/50">Séance du jour · 60 min</p>
                  </div>
                </div>
              </Floaty>
            </motion.div>

            <motion.div
              style={reduce ? undefined : { x: cardX, y: cardY }}
              className="absolute -bottom-7 -right-4 sm:-right-8"
            >
              <Floaty duration={6.5} delay={1} dy={-12}>
                <div className="glass shadow-deep flex items-center gap-3 rounded-2xl px-4 py-3">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#b99a5f]/25 text-[#e7d9a8]">
                    <Flame className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-white">Série de 12 jours</p>
                    <p className="text-[10px] text-white/50">Suivi sans interruption</p>
                  </div>
                </div>
              </Floaty>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Indicateur de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="relative flex justify-center pb-8"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-5 w-5 text-white/35" />
        </motion.div>
      </motion.div>

      {/* Fondu vers la section claire */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-background" aria-hidden />
    </section>
  );
}
