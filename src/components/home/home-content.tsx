"use client";

import { SmartImage as Image } from "@/components/smart-image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  BookOpen,
  Calculator,
  ChevronDown,
  Dumbbell,
  Flame,
  Leaf,
  LineChart,
  Salad,
  Sparkles,
  Star,
  UtensilsCrossed,
} from "lucide-react";
import { ButtonLink, Badge, SectionHeading } from "@/components/ui";
import { Counter, Reveal, Stagger, StaggerItem } from "@/components/motion";

/* ------------------------------------------------------------------ */
/* Données de la landing                                               */
/* ------------------------------------------------------------------ */

const stats = [
  { value: 25, suffix: "k+", label: "Membres actifs" },
  { value: 1.2, suffix: "M", label: "Repas trackés", decimals: 1 },
  { value: 340, suffix: "+", label: "Recettes healthy" },
  { value: 4.9, suffix: "/5", label: "Note moyenne", decimals: 1 },
];

const features = [
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
      "Un programme de musculation généré selon votre niveau, votre matériel et votre emploi du temps.",
    href: "/programme",
  },
  {
    icon: Salad,
    title: "Recettes healthy",
    description:
      "Une bibliothèque de recettes savoureuses avec macros détaillées, filtrables par objectif.",
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
      "Poids, mensurations et performances : visualisez votre évolution sur des graphiques clairs.",
    href: "/dashboard",
  },
  {
    icon: BookOpen,
    title: "Guides d'experts",
    description:
      "E-books nutrition et musculation rédigés par des coachs pour progresser plus vite.",
    href: "/boutique",
  },
];

const testimonials = [
  {
    name: "Camille R.",
    role: "-9 kg en 5 mois",
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
      "Je cherchais quelque chose de simple et motivant. ProHit est apaisant, clair, jamais culpabilisant. Les recettes sont devenues mes repas du quotidien.",
  },
];

const faqs = [
  {
    q: "ProHit est-il adapté aux débutants ?",
    a: "Absolument. Le générateur de programme propose des séances spécifiques débutant avec des mouvements simples, et le calculateur vous guide pas à pas pour définir vos calories. Chaque outil est pensé pour être utilisable sans aucune connaissance préalable.",
  },
  {
    q: "Les outils sont-ils gratuits ?",
    a: "Le calculateur de métabolisme, le générateur de programme, la bibliothèque de recettes et le tracker de calories sont 100 % gratuits. Seuls les e-books et guides premium de la boutique sont payants.",
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

function Hero() {
  return (
    <section className="hero-glow relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 pt-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:pb-28 lg:pt-24">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <Badge tone="leaf">
              <Leaf className="h-3 w-3" />
              La performance, naturellement
            </Badge>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl"
          >
            Construisez votre
            <span className="text-leaf"> meilleure version</span>,
            <br />
            un jour à la fois.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.16 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted"
          >
            Musculation, nutrition et remise en forme réunies dans une seule
            plateforme. Des outils précis, une expérience apaisante, des
            résultats durables.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.24 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <ButtonLink href="/calculateur" className="px-8 py-3.5 text-base">
              Commencer gratuitement
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink
              href="/recettes"
              variant="secondary"
              className="px-8 py-3.5 text-base"
            >
              Explorer les recettes
            </ButtonLink>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 flex items-center gap-2 text-sm text-muted"
          >
            <span className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-gold text-gold" />
              ))}
            </span>
            4,9/5 par plus de 25 000 membres
          </motion.div>
        </div>

        {/* Visuel hero : photo + carte flottante */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative aspect-[4/5] max-h-[560px] w-full overflow-hidden rounded-[2rem] border border-line shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=80"
              alt="Bowl healthy coloré aux légumes frais"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </div>
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="card absolute -left-4 bottom-10 w-52 p-4 sm:-left-8"
          >
            <div className="flex items-center gap-2 text-xs font-medium text-muted">
              <Flame className="h-4 w-4 text-leaf" />
              Calories du jour
            </div>
            <p className="mt-1 text-2xl font-bold text-ink">
              1 847 <span className="text-sm font-medium text-muted">/ 2 300</span>
            </p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-sand">
              <div className="h-full w-[80%] rounded-full bg-leaf" />
            </div>
          </motion.div>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="card absolute -right-3 top-10 w-48 p-4 sm:-right-6"
          >
            <div className="flex items-center gap-2 text-xs font-medium text-muted">
              <Activity className="h-4 w-4 text-leaf" />
              Séance du jour
            </div>
            <p className="mt-1 text-sm font-semibold text-ink">
              Push — Poussée
            </p>
            <p className="text-xs text-muted">6 exercices · 60 min</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="border-y border-line bg-surface">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="font-display text-4xl font-semibold text-ink">
              <Counter to={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
            </p>
            <p className="mt-2 text-sm text-muted">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function AppPreview() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <Reveal>
        <SectionHeading
          eyebrow="Aperçu"
          title="Un espace pensé pour vous faire progresser"
          description="Tableau de bord, tracker, programmes : chaque écran est conçu pour aller à l'essentiel et rendre la constance facile."
        />
      </Reveal>
      <Reveal delay={0.15}>
        <div className="card mt-14 overflow-hidden p-2 sm:p-3">
          <div className="grid gap-2 sm:grid-cols-3 sm:gap-3">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl sm:aspect-auto sm:min-h-[320px]">
              <Image
                src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=75"
                alt="Athlète s'entraînant avec des haltères"
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl sm:aspect-auto">
              <Image
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=75"
                alt="Assiette healthy riche en légumes et protéines"
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl sm:aspect-auto">
              <Image
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=75"
                alt="Salle de sport moderne et lumineuse"
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Features() {
  return (
    <section className="bg-surface py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Fonctionnalités"
            title="Tout ce qu'il faut pour transformer votre physique"
            description="Six outils complémentaires, une seule plateforme. Conçus pour fonctionner ensemble et vous accompagner du premier jour jusqu'à vos objectifs."
          />
        </Reveal>
        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <StaggerItem key={f.title}>
              <Link
                href={f.href}
                className="card card-hover group block h-full p-7"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-leaf-soft text-leaf transition-transform duration-300 group-hover:scale-110">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-ink">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {f.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-leaf">
                  Découvrir
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <Reveal>
        <SectionHeading
          eyebrow="Témoignages"
          title="Ils ont transformé leur quotidien"
        />
      </Reveal>
      <Stagger className="mt-14 grid gap-5 md:grid-cols-3">
        {testimonials.map((t) => (
          <StaggerItem key={t.name}>
            <figure className="card card-hover flex h-full flex-col p-7">
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
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-surface py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="FAQ"
            title="Questions fréquentes"
          />
        </Reveal>
        <div className="mt-12 space-y-3">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.05}>
              <div className="card overflow-hidden">
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
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] bg-leaf-dark px-6 py-20 text-center dark:bg-leaf-soft sm:px-16">
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              background:
                "radial-gradient(40rem 20rem at 80% 0%, rgba(46,158,104,0.5), transparent 60%), radial-gradient(30rem 18rem at 10% 100%, rgba(185,154,95,0.35), transparent 60%)",
            }}
          />
          <div className="relative">
            <Badge tone="gold" className="bg-white/10 text-sand">
              <Sparkles className="h-3 w-3" />
              Gratuit, sans inscription
            </Badge>
            <h2 className="mx-auto mt-6 max-w-2xl font-display text-3xl font-semibold tracking-tight text-white dark:text-ink sm:text-4xl">
              Votre transformation commence aujourd’hui
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-white/70 dark:text-muted">
              Calculez vos besoins, générez votre programme et suivez vos
              premiers repas en moins de 5 minutes.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <ButtonLink
                href="/calculateur"
                className="bg-white px-8 py-3.5 text-base text-leaf-dark hover:bg-sand dark:bg-leaf dark:text-[#08130d]"
              >
                <UtensilsCrossed className="h-4 w-4" />
                Calculer mes besoins
              </ButtonLink>
              <ButtonLink
                href="/programme"
                className="border border-white/25 bg-transparent px-8 py-3.5 text-base text-white hover:bg-white/10 dark:border-line dark:text-ink dark:hover:bg-sand"
                variant="ghost"
              >
                <Dumbbell className="h-4 w-4" />
                Générer mon programme
              </ButtonLink>
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
      <Stats />
      <AppPreview />
      <Features />
      <Testimonials />
      <Faq />
      <FinalCta />
    </>
  );
}
