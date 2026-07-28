"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { asset } from "@/lib/asset";
import { Floaty, Orb } from "@/components/fx";

/* Feuille abstraite flottante — clin d'œil organique dans la grille */
function LeafShape({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden
      className={`pointer-events-none ${className}`}
      fill="none"
    >
      <path
        d="M24 44C12 39 6 29 6 16 6 10 8 5 10 2c14 2 26 10 30 22 2.5 7.5.5 15-4 20-4-.5-9-1-12 0Z"
        fill="var(--leaf-mid)"
        opacity="0.35"
      />
      <path
        d="M24 44C15 32 14 18 18 6"
        stroke="var(--leaf-deep)"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Hero éditorial athlétique : grille apparente, typographie poster    */
/* condensée, annotations techniques monospace, cadre à repères.       */
/* ------------------------------------------------------------------ */

const specs = [
  { label: "BMR · TDEE", value: "2 MIN" },
  { label: "PROGRAMME", value: "30 S" },
  { label: "DONNÉES", value: "100 % LOCALES" },
];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] as const },
});

/* Repères techniques aux coins du cadre photo */
function CornerTicks() {
  const pos = [
    "left-0 top-0 border-l-2 border-t-2",
    "right-0 top-0 border-r-2 border-t-2",
    "left-0 bottom-0 border-l-2 border-b-2",
    "right-0 bottom-0 border-r-2 border-b-2",
  ];
  return (
    <>
      {pos.map((p) => (
        <span
          key={p}
          aria-hidden
          className={`absolute h-5 w-5 border-ink ${p}`}
        />
      ))}
    </>
  );
}

export function Hero() {
  return (
    <section className="border-b border-line bg-background">
      {/* Bande méta technique */}
      <div className="border-b border-line">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 font-tech text-[11px] uppercase tracking-[0.14em] text-muted sm:px-6 lg:px-8">
          <span className="truncate">ProEat — Plateforme nutrition &amp; musculation</span>
          <span className="hidden shrink-0 sm:inline">Paris · FR</span>
          <span className="shrink-0">V1.0 — 2026</span>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Lignes de grille verticales */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px bg-line lg:block"
        />

        {/* Touches organiques : sphère sauge diffuse + feuille flottante */}
        <Orb
          className="blur-3xl"
          style={{ top: "6%", right: "-4%", width: 300, height: 300, background: "radial-gradient(circle at 40% 40%, rgba(94,124,116,0.35), transparent 70%)" }}
          duration={13}
          dy={24}
        />
        <Floaty duration={7} dy={-10} className="absolute right-[46%] top-10 hidden lg:block">
          <LeafShape className="h-10 w-10 rotate-12" />
        </Floaty>

        <div className="grid gap-10 py-14 lg:grid-cols-2 lg:gap-0 lg:py-20">
          {/* ---------- Colonne texte ---------- */}
          <div className="lg:pr-12">
            <motion.p
              {...fadeUp(0)}
              className="font-tech text-xs uppercase tracking-[0.18em] text-gold"
            >
              01 / Nutrition · Musculation · Bien-être
            </motion.p>

            <motion.h1
              {...fadeUp(0.08)}
              className="mt-6 font-poster text-[clamp(3.2rem,8.5vw,6.8rem)] uppercase leading-[0.92] tracking-tight text-ink"
            >
              Mangez juste.
              <br />
              Entraînez-
              <br className="sm:hidden" />
              vous mieux.
              <br />
              <span className="text-outline-leaf">Progressez.</span>
            </motion.h1>

            <motion.p
              {...fadeUp(0.16)}
              className="mt-7 max-w-md text-base leading-relaxed text-muted"
            >
              ProEat réunit votre nutrition, vos entraînements et votre
              progression dans un seul espace. Des outils précis, pour des
              résultats durables.
            </motion.p>

            {/* CTA pilule — pétrole plein / pierre en contour */}
            <motion.div {...fadeUp(0.24)} className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/dashboard"
                className="group inline-flex items-center gap-3 rounded-full bg-leaf-deep px-7 py-4 font-tech text-xs font-medium uppercase tracking-[0.16em] text-white transition-colors duration-200 hover:bg-leaf-dark"
              >
                Commencer gratuitement
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                href="/recettes"
                className="inline-flex items-center gap-3 rounded-full border border-sand-deep bg-sand/50 px-7 py-4 font-tech text-xs font-medium uppercase tracking-[0.16em] text-leaf-deep transition-colors duration-200 hover:bg-sand-deep"
              >
                Voir les recettes
              </Link>
            </motion.div>

            <motion.p
              {...fadeUp(0.32)}
              className="mt-7 font-tech text-[11px] uppercase tracking-[0.14em] text-muted"
            >
              Gratuit, sans inscription — vos données restent sur votre appareil.
            </motion.p>
          </div>

          {/* ---------- Colonne visuelle ---------- */}
          <div className="lg:pl-12">
            <motion.figure
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="relative"
            >
              <div className="relative p-3">
                <CornerTicks />
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={asset("/images/gym-training.jpg")}
                    alt="Membres ProEat en pleine séance de musculation : rowing haltère, développé couché et poulie"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <figcaption className="flex items-center justify-between px-3 pt-2 font-tech text-[11px] uppercase tracking-[0.14em] text-muted">
                <span>Fig. 01 — Séance Push</span>
                <span>60 min · 6 exercices</span>
              </figcaption>
            </motion.figure>

            {/* Fiche technique */}
            <motion.dl {...fadeUp(0.35)} className="mt-8 border-t border-ink">
              {specs.map((s) => (
                <div
                  key={s.label}
                  className="flex items-baseline justify-between border-b border-line py-3.5"
                >
                  <dt className="font-tech text-[11px] uppercase tracking-[0.16em] text-muted">
                    {s.label}
                  </dt>
                  <dd className="font-poster text-2xl uppercase tracking-tight text-ink">
                    {s.value}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>
        </div>
      </div>

    </section>
  );
}
