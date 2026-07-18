"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Pause, Play } from "lucide-react";
import { SmartImage as Image } from "@/components/smart-image";
import { asset } from "@/lib/asset";

/* ------------------------------------------------------------------ */
/* Carrousel promotionnel plein cadre, inspiré des grands sites        */
/* e-commerce sport (badge, titre XXL, CTA, points + pause).           */
/* ------------------------------------------------------------------ */

const slides = [
  {
    id: "breakfast",
    badge: "🎉 Sélection de la semaine",
    title: "Breakfast Week",
    subtitle: "Nos petits-déjeuners protéinés pour démarrer la journée du bon pied",
    cta: "Découvrir",
    href: "/recettes",
    image:
      "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=1600&q=75",
    tint: "from-[#22453c]/90 via-[#22453c]/60",
  },
  {
    id: "programme",
    badge: "💪 Nouveau générateur",
    title: "Programme Express",
    subtitle: "Votre plan d'entraînement complet, généré en 30 secondes",
    cta: "Générer le mien",
    href: "/programme",
    image: asset("/images/gym-ambiance.jpg"),
    tint: "from-[#1d3a32]/90 via-[#1d3a32]/60",
  },
  {
    id: "seche",
    badge: "🔥 Objectif de saison",
    title: "Opération Sèche",
    subtitle: "Calculez votre déficit idéal, puis suivez-le jour après jour",
    cta: "Calculer mes calories",
    href: "/calculateur",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1600&q=75",
    tint: "from-[#26493f]/90 via-[#26493f]/60",
  },
];

const DELAY = 5500;

export function Promo() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const hovering = useRef(false);

  const next = useCallback(
    () => setIndex((i) => (i + 1) % slides.length),
    []
  );

  useEffect(() => {
    if (paused || reduce) return;
    const t = setInterval(() => {
      if (!hovering.current) next();
    }, DELAY);
    return () => clearInterval(t);
  }, [paused, reduce, next]);

  const slide = slides[index];

  return (
    <section
      aria-roledescription="carrousel"
      aria-label="Promotions ProEat"
      className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8"
      onMouseEnter={() => (hovering.current = true)}
      onMouseLeave={() => (hovering.current = false)}
    >
      <div className="shadow-deep relative overflow-hidden rounded-[2rem] border border-line">
        <div className="relative min-h-[420px] sm:min-h-[460px]">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="absolute inset-0"
            >
              <div className="absolute inset-0 bg-[#26493f]">
                <Image
                  src={slide.image}
                  alt=""
                  fill
                  sizes="(max-width: 1280px) 100vw, 1216px"
                  className="object-cover"
                  priority={index === 0}
                  fallbackTone="dark"
                />
              </div>
              <div
                className={`absolute inset-0 bg-gradient-to-r ${slide.tint} to-transparent`}
                aria-hidden
              />
            </motion.div>
          </AnimatePresence>

          {/* Contenu du slide */}
          <div className="relative flex min-h-[420px] flex-col items-start justify-center gap-5 px-7 py-14 sm:min-h-[460px] sm:px-14">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="max-w-xl"
              >
                <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-white">
                  {slide.badge}
                </span>
                <h2 className="mt-5 font-sans text-4xl font-black uppercase leading-[0.98] tracking-tight text-white sm:text-6xl">
                  {slide.title}
                </h2>
                <p className="mt-4 max-w-md text-base leading-relaxed text-white/80 sm:text-lg">
                  {slide.subtitle}
                </p>
                <Link
                  href={slide.href}
                  className="group mt-7 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-[#22453c] shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
                >
                  {slide.cta}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Points + pause */}
          <div className="absolute inset-x-7 bottom-5 flex items-center justify-between sm:inset-x-14">
            <div className="flex items-center gap-2" role="tablist" aria-label="Diapositives">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Diapositive ${i + 1} : ${s.title}`}
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    i === index
                      ? "w-9 bg-white"
                      : "w-2 bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setPaused(!paused)}
              aria-label={paused ? "Reprendre le défilement" : "Mettre en pause"}
              className="glass grid h-9 w-9 place-items-center rounded-full text-white transition-transform hover:scale-105 active:scale-95"
            >
              {paused ? (
                <Play className="h-3.5 w-3.5" />
              ) : (
                <Pause className="h-3.5 w-3.5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Carte produit large, façon bannière secondaire */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="shadow-deep relative mt-6 overflow-hidden rounded-[2rem] border border-line bg-[#1d3a32]"
      >
        <div className="grid items-center sm:grid-cols-[0.9fr_1.1fr]">
          <div className="relative aspect-[16/10] sm:aspect-auto sm:self-stretch">
            <div className="absolute inset-0 bg-[#26493f]">
              <Image
                src="https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=1200&q=75"
                alt="Porridge protéiné aux fruits rouges"
                fill
                sizes="(max-width: 640px) 100vw, 45vw"
                className="object-cover"
                fallbackTone="dark"
              />
            </div>
            <div
              className="absolute inset-0 bg-gradient-to-t from-[#1d3a32] via-transparent to-transparent sm:bg-gradient-to-r sm:from-transparent sm:via-transparent sm:to-[#1d3a32]"
              aria-hidden
            />
          </div>
          <div className="px-7 pb-10 pt-2 text-center sm:px-12 sm:py-14 sm:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b9d0bd]">
              Recette du moment
            </p>
            <h3 className="mt-3 font-sans text-3xl font-black uppercase leading-none tracking-tight text-white sm:text-4xl">
              Porridge Protéiné
            </h3>
            <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-white/70 sm:mx-0 sm:text-base">
              Votre <b className="text-white">petit-déjeuner gagnant</b> commence
              par la bonne base : 38 g de protéines, prêt en 10 minutes.
            </p>
            <Link
              href="/recettes"
              className="group mt-7 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-[#22453c] shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
            >
              Essayer
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
