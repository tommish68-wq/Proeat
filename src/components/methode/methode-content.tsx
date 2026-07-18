"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  HeartHandshake,
  Leaf,
  ShieldCheck,
} from "lucide-react";
import { SectionHeading } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { Orb, TiltCard } from "@/components/fx";

const steps = [
  {
    number: "01",
    title: "Calculez vos besoins",
    description:
      "Deux minutes suffisent pour connaître votre métabolisme et vos calories cibles, selon votre objectif.",
    href: "/calculateur",
    cta: "Calculer maintenant",
  },
  {
    number: "02",
    title: "Recevez votre plan",
    description:
      "Programme d'entraînement adapté à votre matériel et recettes alignées sur vos macros.",
    href: "/programme",
    cta: "Générer mon programme",
  },
  {
    number: "03",
    title: "Suivez votre progression",
    description:
      "Trackez vos repas et votre poids : les graphiques racontent votre transformation.",
    href: "/tracker",
    cta: "Ouvrir le tracker",
  },
];

const commitments = [
  {
    icon: HeartHandshake,
    title: "Jamais culpabilisant",
    text: "Pas de compte à rebours anxiogène, pas de chantage au physique. ProEat vous aide à progresser, il ne vous juge pas.",
  },
  {
    icon: ShieldCheck,
    title: "Vos données restent à vous",
    text: "Repas, poids, objectifs : tout est stocké sur votre appareil. Rien n'est vendu, rien n'est partagé — jamais.",
  },
  {
    icon: Leaf,
    title: "L'essentiel restera gratuit",
    text: "Calculateur, tracker et sélection de recettes sont gratuits pour toujours. Le premium ajoute, il ne retire rien.",
  },
];

const faqs = [
  {
    q: "ProEat est-il adapté aux débutants ?",
    a: "Absolument. Le générateur de programme propose des séances spécifiques débutant avec des mouvements simples, et le calculateur vous guide pas à pas pour définir vos calories. Chaque outil est pensé pour être utilisable sans aucune connaissance préalable.",
  },
  {
    q: "Les outils sont-ils gratuits ?",
    a: "Oui, tous les outils actuels — calculateur, générateur de programme, recettes et tracker — sont 100 % gratuits. Des contenus premium arriveront plus tard, mais l'essentiel restera gratuit.",
  },
  {
    q: "Comment sont calculées mes calories ?",
    a: "Nous utilisons l'équation de Mifflin-St Jeor, la référence scientifique actuelle, combinée à votre niveau d'activité physique pour estimer votre dépense énergétique totale (TDEE), puis nous l'ajustons selon votre objectif.",
  },
  {
    q: "Puis-je m'entraîner sans matériel ?",
    a: "Oui. Le générateur de programme propose un mode « poids du corps » complet, avec des progressions adaptées pour continuer à évoluer sans salle de sport.",
  },
  {
    q: "Mes données sont-elles privées ?",
    a: "Vos données de suivi (repas, poids, progression) sont stockées localement sur votre appareil. Elles ne quittent jamais votre navigateur.",
  },
];

export function MethodeContent() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div>
      {/* ---------- Étapes ---------- */}
      <section className="noise relative overflow-hidden bg-[#30505c] py-24">
        <Orb
          className="blur-3xl"
          style={{ top: "10%", left: "-4%", width: 300, height: 300, background: "radial-gradient(circle at 40% 40%, rgba(94,124,116,0.28), transparent 70%)" }}
          duration={12}
          dy={26}
        />
        <Orb
          className="blur-3xl"
          style={{ bottom: "-8%", right: "0%", width: 340, height: 340, background: "radial-gradient(circle at 40% 40%, rgba(217,197,165,0.2), transparent 70%)" }}
          duration={15}
          dy={-28}
          delay={1}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#d9c5a5]">
                La méthode ProEat
              </p>
              <h1 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                Trois étapes vers votre transformation
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-base text-white/60">
                Pas de magie, pas de recette secrète : une méthode simple,
                appliquée avec constance. Chaque étape a son outil.
              </p>
            </div>
          </Reveal>
          <Stagger className="mt-14 grid gap-5 md:grid-cols-3">
            {steps.map((s) => (
              <StaggerItem key={s.number} className="h-full">
                <TiltCard className="h-full" max={5}>
                  <div className="glass flex h-full flex-col rounded-3xl p-8">
                    <span className="text-gradient-tropical font-display text-5xl font-semibold">
                      {s.number}
                    </span>
                    <h2 className="mt-5 text-lg font-semibold text-white">{s.title}</h2>
                    <p className="mt-2.5 flex-1 text-sm leading-relaxed text-white/60">
                      {s.description}
                    </p>
                    <Link
                      href={s.href}
                      className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#c6d6d3]"
                    >
                      {s.cta}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---------- Engagements ---------- */}
      <section className="relative overflow-hidden bg-sand/50 py-24">
        <Orb
          className="blur-3xl"
          style={{ top: "20%", right: "-5%", width: 320, height: 320, background: "radial-gradient(circle at 40% 40%, color-mix(in srgb, var(--gold) 25%, transparent), transparent 70%)" }}
          duration={13}
          dy={24}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Nos engagements"
              title="Ce que ProEat vous promet"
              description="Trois principes non négociables, écrits noir sur blanc dès le premier jour."
            />
          </Reveal>
          <Stagger className="mt-14 grid gap-5 md:grid-cols-3">
            {commitments.map((c) => (
              <StaggerItem key={c.title} className="h-full">
                <TiltCard className="h-full" max={5}>
                  <div className="glass-card shadow-deep flex h-full flex-col rounded-3xl p-7">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-leaf-soft text-leaf">
                      <c.icon className="h-6 w-6" />
                    </div>
                    <h2 className="mt-5 text-lg font-semibold text-ink">{c.title}</h2>
                    <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted">{c.text}</p>
                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading eyebrow="FAQ" title="Questions fréquentes" />
          </Reveal>
          <div className="mt-12 space-y-3">
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
          <Reveal>
            <div className="mt-12 text-center">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-full bg-leaf-deep px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-leaf"
              >
                Commencer maintenant
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
