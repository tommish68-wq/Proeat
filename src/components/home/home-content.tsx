"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Calculator,
  Check,
  Dumbbell,
  Flame,
  LayoutDashboard,
  LineChart,
  Play,
  Salad,
  Sparkles,
  Timer,
} from "lucide-react";
import { asset } from "@/lib/asset";
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

/* ------------------------------------------------------------------ */
/* Séance guidée — la fonctionnalité que personne d'autre n'a          */
/* ------------------------------------------------------------------ */

function SeanceFeature() {
  const points = [
    "Le chrono de repos démarre tout seul et annonce votre prochaine série",
    "Vous notez le réalisé en un geste : plus ou moins que prévu",
    "L'algorithme ajuste la prochaine séance : +2,5 kg quand vous êtes prêt",
    "Pressé ? La séance express se calibre sur votre temps : 15, 25, 40 ou 60 min",
  ];
  return (
    <section className="noise relative overflow-hidden bg-[#22383F] py-24">
      <Orb
        className="blur-3xl"
        style={{ top: "-8%", right: "-4%", width: 340, height: 340, background: "radial-gradient(circle at 40% 40%, rgba(94,124,116,0.35), transparent 70%)" }}
        duration={13}
        dy={26}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <p className="flex items-center gap-2 font-tech text-xs uppercase tracking-[0.18em] text-[#d9c5a5]">
              <Timer className="h-4 w-4" />
              Nouveau — Séance guidée
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              Ne perdez plus jamais le fil de vos séries
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-white/70">
              « J’en suis à quelle série ? » — plus jamais. Lancez votre séance
              depuis votre programme : ProEat compte, chronomètre et fait
              progresser vos charges à votre place.
            </p>
            <ul className="mt-7 space-y-3">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm leading-relaxed text-white/85">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#9db4ae]" />
                  {p}
                </li>
              ))}
            </ul>
            <Link
              href="/seance"
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-[#22383F] shadow-glow transition-all duration-300 hover:-translate-y-0.5"
            >
              <Play className="h-4 w-4" />
              Essayer la séance guidée
            </Link>
          </div>

          {/* Aperçu du chrono, fidèle à l'écran réel */}
          <Reveal delay={0.1}>
            <div className="mx-auto w-full max-w-sm rounded-3xl bg-white p-8 text-center shadow-deep">
              <p className="font-tech text-[11px] uppercase tracking-[0.18em] text-muted">
                Repos
              </p>
              <div className="relative mx-auto mt-5 h-48 w-48" aria-hidden>
                <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90">
                  <circle cx="100" cy="100" r="86" fill="none" stroke="var(--viz-grid)" strokeWidth="11" />
                  <circle
                    cx="100"
                    cy="100"
                    r="86"
                    fill="none"
                    stroke="var(--leaf)"
                    strokeWidth="11"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 86}
                    strokeDashoffset={2 * Math.PI * 86 * 0.35}
                  />
                </svg>
                <div className="absolute inset-0 grid place-items-center">
                  <p className="font-poster text-5xl tracking-tight text-ink">1:12</p>
                </div>
              </div>
              <p className="mt-5 text-sm text-muted">À la sonnerie</p>
              <p className="mt-1 font-display text-lg font-semibold text-ink">
                Squat barre — série 3 / 4
              </p>
              <p className="mt-4 rounded-xl bg-gold/10 px-3 py-2 text-xs leading-relaxed text-[#7c5a33]">
                ✦ Objectifs atteints la dernière fois : +2,5 kg aujourd’hui
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Recettes stars — vraies photos, vraies macros                       */
/* ------------------------------------------------------------------ */

const starRecipes = [
  {
    img: "/images/recette-bowl-acai.jpg",
    alt: "Bowl açaï glacé aux fraises et pollen",
    title: "Bowl glacé açaï, fraises & pollen",
    macros: "220 kcal · 7 g prot · 10 min",
    tag: "Sèche",
  },
  {
    img: "/images/recette-pad-thai-tempeh.webp",
    alt: "Pad thaï de tempeh sauce cacahuète",
    title: "Pad thaï de tempeh, sauce cacahuète",
    macros: "730 kcal · 40 g prot · 25 min",
    tag: "Masse",
  },
  {
    img: "/images/recette-galette-oeuf.jpg",
    alt: "Galette rustique à l'œuf, courgette et parmesan",
    title: "Galette rustique à l'œuf & parmesan",
    macros: "480 kcal · 22 g prot · 35 min",
    tag: "Plaisir",
  },
];

function StarRecipes() {
  return (
    <section className="relative overflow-hidden bg-sand/50 py-24">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Les recettes"
            title="Des plats qui donnent envie de bien manger"
            description="Chaque recette est expliquée comme par un chef : ingrédients précis, gestes détaillés, astuces — et les macros toujours affichées."
          />
        </Reveal>
        <Stagger className="mt-14 grid gap-5 sm:grid-cols-3">
          {starRecipes.map((r) => (
            <StaggerItem key={r.title} className="h-full">
              <Link
                href="/recettes"
                className="card card-hover group block h-full overflow-hidden"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-sand">
                  <Image
                    src={asset(r.img)}
                    alt={r.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-ink backdrop-blur">
                    {r.tag}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold leading-snug text-ink">{r.title}</h3>
                  <p className="mt-2 text-xs font-medium text-muted">{r.macros}</p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal>
          <div className="mt-10 text-center">
            <Link
              href="/recettes"
              className="inline-flex items-center gap-2 rounded-full bg-leaf-deep px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-leaf"
            >
              <Salad className="h-4 w-4" />
              Voir les 18 recettes
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-28 sm:px-6 lg:px-8">
      <Reveal>
        <div className="noise relative overflow-hidden rounded-[2.5rem] bg-[#2a454f] px-6 py-24 text-center sm:px-16">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(44rem 24rem at 75% -10%, rgba(94,124,116,0.4), transparent 62%), radial-gradient(32rem 20rem at 12% 110%, rgba(163,123,77,0.3), transparent 62%)",
            }}
          />
          <Orb
            className="blur-2xl"
            style={{ top: "18%", left: "12%", width: 140, height: 140, background: "radial-gradient(circle at 40% 35%, rgba(198,214,211,0.35), transparent 70%)" }}
            duration={9}
            dy={18}
          />
          <div className="relative">
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-white/85">
              <Sparkles className="h-3.5 w-3.5 text-[#d9c5a5]" />
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
                className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-[#2a454f] shadow-glow transition-all duration-300 hover:-translate-y-0.5"
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
      <SeanceFeature />
      <StarRecipes />
      <Features />
      <FinalCta />
    </>
  );
}
