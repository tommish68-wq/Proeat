"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Calculator,
  ChevronDown,
  Dumbbell,
  Flame,
  LayoutDashboard,
  LineChart,
  Salad,
  Sparkles,
  Star,
} from "lucide-react";
import { Badge, SectionHeading } from "@/components/ui";
import { Counter, Reveal, Stagger, StaggerItem } from "@/components/motion";
import { Orb, TiltCard } from "@/components/fx";
import { SmartImage as Image } from "@/components/smart-image";
import { recipes } from "@/lib/recipes";
import { Hero } from "@/components/home/hero";
import { Promo } from "@/components/home/promo";
import { Training } from "@/components/home/training";

/* ------------------------------------------------------------------ */
/* Données                                                             */
/* ------------------------------------------------------------------ */

const stats = [
  { value: 25, suffix: "k+", label: "Membres actifs" },
  { value: 1.2, suffix: "M", label: "Repas trackés", decimals: 1 },
  { value: 4.9, suffix: "/5", label: "Note moyenne", decimals: 1 },
  { value: 100, suffix: "%", label: "Gratuit" },
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

const steps = [
  {
    number: "01",
    title: "Calculez vos besoins",
    description:
      "Deux minutes suffisent pour connaître votre métabolisme et vos calories cibles, selon votre objectif.",
  },
  {
    number: "02",
    title: "Recevez votre plan",
    description:
      "Programme d'entraînement adapté à votre matériel et recettes alignées sur vos macros.",
  },
  {
    number: "03",
    title: "Suivez votre progression",
    description:
      "Trackez vos repas et votre poids : les graphiques racontent votre transformation.",
  },
];

const testimonials = [
  {
    name: "Camille R.",
    role: "−9 kg en 5 mois",
    quote:
      "Le calculateur puis le tracker ont tout changé. Pour la première fois, je comprends ce que je mange. L'interface est tellement agréable que le suivi est devenu un plaisir.",
  },
  {
    name: "Thomas L.",
    role: "+6 kg de muscle en 1 an",
    quote:
      "Le générateur de programme est bluffant : un vrai plan structuré en 30 secondes, adapté à mon matériel. Je progresse à chaque séance depuis 8 mois.",
  },
  {
    name: "Inès M.",
    role: "Retour au sport après 3 ans",
    quote:
      "Je cherchais quelque chose de simple et motivant. ProEat est apaisant, clair, jamais culpabilisant. Les recettes sont devenues mes repas du quotidien.",
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
              <Counter to={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
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

function HowItWorks() {
  return (
    <section className="noise relative overflow-hidden bg-[#0c3427] py-28">
      <Orb
        className="blur-3xl"
        style={{ top: "10%", left: "-4%", width: 300, height: 300, background: "radial-gradient(circle at 40% 40%, rgba(127,214,166,0.28), transparent 70%)" }}
        duration={12}
        dy={26}
      />
      <Orb
        className="blur-3xl"
        style={{ bottom: "-8%", right: "0%", width: 340, height: 340, background: "radial-gradient(circle at 40% 40%, rgba(231,217,168,0.2), transparent 70%)" }}
        duration={15}
        dy={-28}
        delay={1}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#9fe0bc]">
              Comment ça marche
            </p>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Trois étapes vers votre transformation
            </h2>
          </div>
        </Reveal>
        <Stagger className="mt-16 grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => (
            <StaggerItem key={s.number} className="h-full">
              <div className="glass relative h-full rounded-3xl p-8">
                <span className="text-gradient-tropical font-display text-5xl font-semibold">
                  {s.number}
                </span>
                <h3 className="mt-5 text-lg font-semibold text-white">{s.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-white/60">
                  {s.description}
                </p>
                {i < steps.length - 1 && (
                  <ArrowRight className="absolute -right-4 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-white/25 md:block" />
                )}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function RecipesShowcase() {
  const featured = recipes.slice(0, 3);
  return (
    <section className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            align="left"
            eyebrow="Recettes"
            title="Manger sain n'a jamais été aussi bon"
            description="Chaque recette affiche ses calories et ses macros. La sélection s'enrichit à chaque mise à jour."
          />
          <Link
            href="/recettes"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3 text-sm font-semibold text-ink transition-all hover:-translate-y-px hover:border-leaf/40 hover:bg-leaf-faint"
          >
            Toutes les recettes
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Reveal>
      <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((r) => (
          <StaggerItem key={r.id} className="h-full">
            <TiltCard className="h-full" max={5}>
              <Link
                href="/recettes"
                className="card shadow-deep block h-full overflow-hidden rounded-3xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-sand">
                  <Image
                    src={r.image}
                    alt={r.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute bottom-3 right-3">
                    <span className="glass rounded-full px-3 py-1 text-xs font-semibold text-white">
                      {r.kcal} kcal
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="line-clamp-1 font-semibold text-ink">{r.title}</h3>
                  <div className="mt-3 flex items-center gap-4 text-xs text-muted">
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full" style={{ background: "var(--viz-protein)" }} />
                      <b className="text-ink">{r.protein}g</b> prot.
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full" style={{ background: "var(--viz-carbs)" }} />
                      <b className="text-ink">{r.carbs}g</b> gluc.
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full" style={{ background: "var(--viz-fat)" }} />
                      <b className="text-ink">{r.fat}g</b> lip.
                    </span>
                  </div>
                </div>
              </Link>
            </TiltCard>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-sand/50 py-28 dark:bg-sand/30">
      <Orb
        className="blur-3xl"
        style={{ top: "20%", right: "-5%", width: 320, height: 320, background: "radial-gradient(circle at 40% 40%, color-mix(in srgb, var(--gold) 25%, transparent), transparent 70%)" }}
        duration={13}
        dy={24}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Témoignages"
            title="Ils ont transformé leur quotidien"
          />
        </Reveal>
        <Stagger className="mt-16 grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <StaggerItem key={t.name} className="h-full">
              <TiltCard className="h-full" max={5}>
                <figure className="glass-card shadow-deep flex h-full flex-col rounded-3xl p-7">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink">
                    « {t.quote} »
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-leaf-deep font-display text-sm font-semibold text-white dark:bg-leaf dark:text-[#08130d]">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-ink">{t.name}</p>
                      <p className="text-xs text-leaf">{t.role}</p>
                    </div>
                  </figcaption>
                </figure>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-28">
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
                      <p className="px-6 pb-6 text-sm leading-relaxed text-muted">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
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
      <HowItWorks />
      <Training />
      <RecipesShowcase />
      <Testimonials />
      <Faq />
      <FinalCta />
    </>
  );
}
