"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { asset } from "@/lib/asset";

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

        <div className="grid gap-10 py-14 lg:grid-cols-2 lg:gap-0 lg:py-20">
          {/* ---------- Colonne texte ---------- */}
          <div className="lg:pr-12">
            <motion.p
              {...fadeUp(0)}
              className="font-tech text-xs uppercase tracking-[0.18em] text-leaf"
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

            {/* CTA rectangulaires nets */}
            <motion.div {...fadeUp(0.24)} className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/dashboard"
                className="group inline-flex items-center gap-3 border-2 border-ink bg-ink px-7 py-4 font-tech text-xs font-medium uppercase tracking-[0.16em] text-background transition-colors duration-200 hover:bg-leaf-deep hover:border-leaf-deep dark:hover:bg-leaf dark:hover:border-leaf"
              >
                Commencer gratuitement
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                href="/recettes"
                className="inline-flex items-center gap-3 border-2 border-ink px-7 py-4 font-tech text-xs font-medium uppercase tracking-[0.16em] text-ink transition-colors duration-200 hover:bg-ink hover:text-background"
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

      {/* Bandeau défilant façon marque athlétique */}
      <div
        className="overflow-hidden border-t border-line bg-ink py-3"
        aria-hidden
      >
        <div className="animate-marquee flex w-max">
          {[0, 1].map((copy) => (
            <span
              key={copy}
              className="flex shrink-0 items-center font-poster text-lg uppercase tracking-wide text-background"
            >
              {[
                "Nutrition",
                "Musculation",
                "Progression",
                "100 % gratuit",
                "Recettes & macros",
                "Zéro pub",
              ].map((word) => (
                <span key={word} className="flex items-center">
                  <span className="px-6">{word}</span>
                  <span className="text-leaf">✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
