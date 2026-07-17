"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BadgeCheck,
  Check,
  ChevronDown,
  Crown,
  Lock,
  Minus,
  Sparkles,
  X,
} from "lucide-react";
import { Badge, Button, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { Orb, TiltCard } from "@/components/fx";

/* ------------------------------------------------------------------ */
/* L'offre : un gratuit généreux qui crée l'habitude, un Premium qui   */
/* accélère la transformation.                                         */
/* ------------------------------------------------------------------ */

const freeFeatures = [
  "Calculateur de métabolisme complet (BMR, TDEE, macros)",
  "Tracker de calories : journal du jour & suivi du poids",
  "Sélection de recettes avec macros détaillées",
  "1 programme de musculation généré",
  "Tableau de bord & badges de progression",
];

const premiumFeatures = [
  "Toutes les recettes, et des nouvelles chaque semaine",
  "Programmes illimités & progressions avancées",
  "Plans de repas générés selon vos macros",
  "Statistiques détaillées & historique complet",
  "Tous les e-books de la boutique inclus",
  "Accès prioritaire aux nouveautés",
  "Badge doré de membre fondateur",
];

const faqs = [
  {
    q: "Puis-je annuler facilement ?",
    a: "Oui, en un clic depuis votre profil, à tout moment. Aucun appel, aucun formulaire caché. Vous gardez l'accès Premium jusqu'à la fin de la période déjà payée.",
  },
  {
    q: "Et si ça ne me convient pas ?",
    a: "Satisfait ou remboursé pendant 14 jours, sans justification. Un e-mail suffit.",
  },
  {
    q: "Quand est-ce que ça ouvre ?",
    a: "Très bientôt. Les abonnements seront ouverts d'abord aux premiers membres, avec le tarif de lancement verrouillé à vie : tant que vous restez abonné, votre prix n'augmentera jamais.",
  },
  {
    q: "Le gratuit va-t-il le rester ?",
    a: "Oui. Le calculateur, le tracker et la sélection de recettes resteront gratuits. Premium ajoute, il ne retire rien.",
  },
];

export function PremiumContent() {
  const [yearly, setYearly] = useState(true);
  const [waitlist, setWaitlist] = useState(false);
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div>
      {/* ---------- En-tête sombre ---------- */}
      <section className="noise relative -mt-16 overflow-hidden bg-[#0a2e22] pb-40 pt-32">
        <Orb
          className="blur-3xl"
          style={{ top: "0%", right: "8%", width: 300, height: 300, background: "radial-gradient(circle at 40% 40%, rgba(231,217,168,0.35), transparent 70%)" }}
          duration={12}
          dy={26}
        />
        <Orb
          className="blur-3xl"
          style={{ bottom: "-10%", left: "0%", width: 340, height: 340, background: "radial-gradient(circle at 40% 40%, rgba(127,214,166,0.3), transparent 70%)" }}
          duration={14}
          dy={-24}
          delay={1}
        />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-[#e7d9a8]"
          >
            <Crown className="h-3.5 w-3.5" />
            ProEat Premium
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="mt-6 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl"
          >
            Le prix d&apos;un café par semaine.
            <br />
            <span className="text-gradient-tropical">Des résultats pour la vie.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="mx-auto mt-5 max-w-xl text-base text-white/65"
          >
            Les outils essentiels restent gratuits, pour toujours. Premium
            débloque tout ce qui accélère : recettes illimitées, programmes
            avancés et plans de repas taillés pour vos macros.
          </motion.p>

          {/* Bascule mensuel / annuel */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="mt-9 inline-flex items-center gap-1 rounded-full bg-white/10 p-1 ring-1 ring-white/15"
          >
            <button
              onClick={() => setYearly(false)}
              aria-pressed={!yearly}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                !yearly ? "bg-white text-[#0a2e22]" : "text-white/70 hover:text-white"
              }`}
            >
              Mensuel
            </button>
            <button
              onClick={() => setYearly(true)}
              aria-pressed={yearly}
              className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                yearly ? "bg-white text-[#0a2e22]" : "text-white/70 hover:text-white"
              }`}
            >
              Annuel
              <span className="rounded-full bg-[#2e9e68] px-2 py-0.5 text-[10px] font-bold text-white">
                −44 %
              </span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* ---------- Cartes de prix ---------- */}
      <section className="relative mx-auto -mt-24 max-w-4xl px-4 pb-20 sm:px-6">
        <div className="grid gap-5 md:grid-cols-2">
          {/* Gratuit */}
          <Reveal>
            <div className="card flex h-full flex-col rounded-3xl p-8">
              <h2 className="font-display text-xl font-semibold text-ink">Gratuit</h2>
              <p className="mt-1 text-sm text-muted">
                Pour construire l&apos;habitude, sans limite de temps.
              </p>
              <p className="mt-5">
                <span className="font-display text-4xl font-semibold text-ink">0 €</span>
                <span className="ml-1 text-sm text-muted">/ pour toujours</span>
              </p>
              <ul className="mt-6 flex-1 space-y-3">
                {freeFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-leaf" />
                    {f}
                  </li>
                ))}
                <li className="flex items-start gap-2.5 text-sm leading-relaxed text-muted">
                  <Minus className="mt-0.5 h-4 w-4 shrink-0" />
                  Recettes & programmes illimités
                </li>
                <li className="flex items-start gap-2.5 text-sm leading-relaxed text-muted">
                  <Minus className="mt-0.5 h-4 w-4 shrink-0" />
                  Plans de repas & statistiques avancées
                </li>
              </ul>
              <Link
                href="/dashboard"
                className="mt-8 inline-flex items-center justify-center rounded-full border border-line bg-surface px-6 py-3.5 text-sm font-semibold text-ink transition-all hover:border-leaf/40 hover:bg-leaf-faint"
              >
                Commencer gratuitement
              </Link>
            </div>
          </Reveal>

          {/* Premium */}
          <Reveal delay={0.1}>
            <TiltCard max={4} className="h-full">
              <div className="noise relative flex h-full flex-col overflow-hidden rounded-3xl bg-[#0a2e22] p-8 shadow-glow">
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(24rem 14rem at 85% -10%, rgba(185,154,95,0.3), transparent 62%), radial-gradient(20rem 12rem at 0% 110%, rgba(46,158,104,0.35), transparent 62%)",
                  }}
                />
                <div className="relative flex h-full flex-col">
                  <div className="flex items-center justify-between">
                    <h2 className="font-display text-xl font-semibold text-white">Premium</h2>
                    <Badge tone="gold" className="bg-gold text-[#1a140a]">
                      <Sparkles className="h-3 w-3" />
                      Tarif de lancement
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-white/60">
                    Pour transformer l&apos;habitude en résultats.
                  </p>
                  <div className="mt-5 flex items-baseline gap-2">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={yearly ? "y" : "m"}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="font-display text-4xl font-semibold text-white"
                      >
                        {yearly ? "3,33 €" : "5,99 €"}
                      </motion.span>
                    </AnimatePresence>
                    <span className="text-sm text-white/55">/ mois</span>
                  </div>
                  <p className="mt-1 text-xs text-white/50">
                    {yearly
                      ? "Facturé 39,99 € par an — soit 2 mois offerts et −44 %"
                      : "Sans engagement, résiliable en un clic"}
                  </p>
                  <ul className="mt-6 flex-1 space-y-3">
                    <li className="text-xs font-semibold uppercase tracking-wide text-[#9fe0bc]">
                      Tout le gratuit, plus :
                    </li>
                    {premiumFeatures.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm leading-relaxed text-white/90">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#e7d9a8]" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => setWaitlist(true)}
                    className="group mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-[#0a2e22] shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                  >
                    <Crown className="h-4 w-4" />
                    Devenir membre fondateur
                  </button>
                  <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[11px] text-white/45">
                    <Lock className="h-3 w-3" />
                    Tarif verrouillé à vie tant que vous restez abonné
                  </p>
                </div>
              </div>
            </TiltCard>
          </Reveal>
        </div>

        {/* Réassurance */}
        <Reveal>
          <div className="mt-10 grid gap-4 rounded-2xl border border-line bg-surface p-7 sm:grid-cols-3">
            {(
              [
                ["Résiliation en 1 clic", "Depuis votre profil, sans justification."],
                ["Satisfait ou remboursé", "14 jours pour changer d'avis."],
                ["Vos données vous appartiennent", "Jamais vendues, exportables à tout moment."],
              ] as const
            ).map(([title, desc]) => (
              <div key={title} className="flex items-start gap-3">
                <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-leaf" />
                <div>
                  <p className="text-sm font-semibold text-ink">{title}</p>
                  <p className="mt-1 text-xs text-muted">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Mini FAQ */}
        <div className="mt-16">
          <Reveal>
            <SectionHeading eyebrow="Questions" title="Avant de vous décider" />
          </Reveal>
          <div className="mt-8 space-y-3">
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.05}>
                <div className="card overflow-hidden rounded-2xl">
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    aria-expanded={open === i}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-medium text-ink">{f.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-muted transition-transform duration-300 ${
                        open === i ? "rotate-180 text-leaf" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {open === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <p className="px-6 pb-6 text-sm leading-relaxed text-muted">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Modal liste d'attente (paiement pas encore ouvert) ---------- */}
      <AnimatePresence>
        {waitlist && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] grid place-items-center bg-black/50 p-4 backdrop-blur-sm"
            onClick={() => setWaitlist(false)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.96 }}
              onClick={(e) => e.stopPropagation()}
              className="card relative w-full max-w-md rounded-3xl p-8 text-center"
            >
              <button
                onClick={() => setWaitlist(false)}
                aria-label="Fermer"
                className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full text-muted hover:bg-sand"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gold/15">
                <Crown className="h-7 w-7 text-gold" />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold text-ink">
                Les abonnements ouvrent très bientôt
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Le paiement en ligne est en cours d&apos;installation. Les
                premiers membres inscrits bénéficieront du{" "}
                <b className="text-ink">tarif de lancement verrouillé à vie</b>{" "}
                ({yearly ? "39,99 € / an" : "5,99 € / mois"}). En attendant,
                profitez de tous les outils gratuits.
              </p>
              <Button onClick={() => setWaitlist(false)} className="mt-6 w-full">
                Compris, je continue en gratuit
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
