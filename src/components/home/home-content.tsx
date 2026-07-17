"use client";

import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  Dumbbell,
  Flame,
  LayoutDashboard,
  LineChart,
  Salad,
  Sparkles,
} from "lucide-react";
import { Badge, SectionHeading } from "@/components/ui";
import { Counter, Reveal, Stagger, StaggerItem } from "@/components/motion";
import { Orb, TiltCard } from "@/components/fx";
import { Hero } from "@/components/home/hero";
import { Promo } from "@/components/home/promo";

/* ------------------------------------------------------------------ */
/* Données                                                             */
/* ------------------------------------------------------------------ */

const stats = [
  { value: 100, suffix: " %", label: "Gratuit au lancement" },
  { value: 2, suffix: " min", label: "Pour connaître vos besoins" },
  { value: 30, suffix: " s", label: "Pour générer un programme" },
  { value: 0, suffix: " pub", label: "Et zéro revente de données" },
];

const features = [
  {
    icon: LayoutDashboard,
    title: "Tableau de bord",
    description:
      "Votre point d'entrée : calories du jour, séance, progression et accès à chaque outil en un coup d'œil.",
    href: "/dashboard",
    highlight: true,
  },
  {
    icon: Calculator,
    title: "Calculateur de métabolisme",
    description:
      "BMR, TDEE et calories cibles selon votre objectif : sèche, maintien ou prise de masse.",
    href: "/calculateur",
  },
  {
    icon: Dumbbell,
    title: "Programmes sur mesure",
    description:
      "Un programme généré selon votre niveau, votre matériel et votre emploi du temps.",
    href: "/programme",
  },
  {
    icon: Salad,
    title: "Recettes healthy",
    description:
      "Des recettes savoureuses avec macros détaillées — la sélection s'enrichit chaque semaine.",
    href: "/recettes",
  },
  {
    icon: Flame,
    title: "Tracker de calories",
    description:
      "Suivez calories, protéines, glucides et lipides jour après jour, sans friction.",
    href: "/tracker",
  },
  {
    icon: LineChart,
    title: "Suivi de progression",
    description:
      "Poids et performances visualisés sur des graphiques clairs, semaine après semaine.",
    href: "/profil",
  },
];


/* ------------------------------------------------------------------ */
/* Sections                                                            */
/* ------------------------------------------------------------------ */

function Stats() {
  return (
    <section className="relative border-b border-line">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-4 py-16 sm:px-6 lg:grid-cols-4 lg:px-8">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="font-display text-4xl font-semibold text-ink sm:text-5xl">
              <Counter to={s.value} suffix={s.suffix} />
            </p>
            <p className="mt-2 text-sm text-muted">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Features() {
  return (
    <section className="relative overflow-hidden py-28">
      <Orb
        className="blur-3xl"
        style={{ top: "-4%", right: "-6%", width: 380, height: 380, background: "radial-gradient(circle at 40% 40%, color-mix(in srgb, var(--leaf) 22%, transparent), transparent 70%)" }}
        duration={14}
        dy={30}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="La plateforme"
            title="Tout part du tableau de bord"
            description="Un espace central qui réunit vos outils du quotidien. Chaque fonctionnalité est à un clic, et de nouvelles arrivent à chaque mise à jour."
          />
        </Reveal>
        <Stagger className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <StaggerItem key={f.title} className="h-full">
              <TiltCard className="h-full">
                <Link
                  href={f.href}
                  className={`card shadow-deep block h-full rounded-3xl p-7 ${
                    f.highlight
                      ? "border-leaf/30 bg-gradient-to-br from-leaf-faint to-card"
                      : ""
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-leaf-soft text-leaf">
                      <f.icon className="h-6 w-6" />
                    </div>
                    {f.highlight && (
                      <Badge tone="leaf">
                        <Sparkles className="h-3 w-3" />
                        Point d’entrée
                      </Badge>
                    )}
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-ink">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {f.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-leaf">
                    Découvrir
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-28 sm:px-6 lg:px-8">
      <Reveal>
        <div className="noise relative overflow-hidden rounded-[2.5rem] bg-[#0a2e22] px-6 py-24 text-center sm:px-16">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(44rem 24rem at 75% -10%, rgba(46,158,104,0.4), transparent 62%), radial-gradient(32rem 20rem at 12% 110%, rgba(185,154,95,0.3), transparent 62%)",
            }}
          />
          <Orb
            className="blur-2xl"
            style={{ top: "18%", left: "12%", width: 140, height: 140, background: "radial-gradient(circle at 40% 35%, rgba(159,224,188,0.35), transparent 70%)" }}
            duration={9}
            dy={18}
          />
          <div className="relative">
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-white/85">
              <Sparkles className="h-3.5 w-3.5 text-[#e7d9a8]" />
              Gratuit, sans inscription
            </span>
            <h2 className="mx-auto mt-7 max-w-2xl font-display text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              Votre transformation commence{" "}
              <span className="text-gradient-tropical">aujourd’hui</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base text-white/60">
              Calculez vos besoins, générez votre programme et suivez vos
              premiers repas en moins de 5 minutes.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/dashboard"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-[#0a2e22] shadow-glow transition-all duration-300 hover:-translate-y-0.5"
              >
                Ouvrir mon tableau de bord
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/calculateur"
                className="glass inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/15"
              >
                Calculer mes besoins
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function HomeContent() {
  return (
    <>
      <Hero />
      <Promo />
      <Stats />
      <Features />
      <FinalCta />
    </>
  );
}
