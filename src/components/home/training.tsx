"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Dumbbell, Timer } from "lucide-react";
import { Reveal } from "@/components/motion";
import { Floaty } from "@/components/fx";
import { asset } from "@/lib/asset";

const points = [
  {
    title: "Un programme à votre mesure",
    text: "Niveau, objectif, matériel, temps disponible : votre plan est généré en 30 secondes.",
  },
  {
    title: "Des séances guidées",
    text: "Exercices, séries, répétitions et temps de repos — tout est détaillé, rien à improviser.",
  },
  {
    title: "Une progression visible",
    text: "Vos entraînements nourrissent votre tableau de bord, semaine après semaine.",
  },
];

export function Training({ ctaHref = "/programme" }: { ctaHref?: string }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
      <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        {/* Photo : des pratiquants en pleine séance */}
        <Reveal className="order-last lg:order-first">
          <div className="relative">
            <div className="shadow-deep relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-line">
              <Image
                src={asset("/images/gym-training.jpg")}
                alt="Membres ProEat en pleine séance de musculation : rowing haltère, développé couché et poulie"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent"
              />
            </div>
            {/* Carte flottante : la séance en cours */}
            <Floaty duration={5.5} className="absolute -right-3 top-6 sm:-right-6">
              <div className="glass shadow-deep flex items-center gap-3 rounded-2xl px-4 py-3">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#6f9681]/30 text-[#c6d6d3]">
                  <Dumbbell className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs font-semibold text-white">
                    Développé couché · 3 × 8
                  </p>
                  <p className="text-[10px] text-white/60">Repos 90 s</p>
                </div>
              </div>
            </Floaty>
            <Floaty duration={6.5} delay={1} dy={-12} className="absolute -left-3 bottom-6 sm:-left-6">
              <div className="glass shadow-deep flex items-center gap-3 rounded-2xl px-4 py-3">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#a0895a]/25 text-[#d9c5a5]">
                  <Timer className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs font-semibold text-white">Séance Push · 60 min</p>
                  <p className="text-[10px] text-white/60">4 exercices restants</p>
                </div>
              </div>
            </Floaty>
          </div>
        </Reveal>

        {/* Argumentaire */}
        <div>
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-leaf">
              Entraînement
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              La musculation, structurée — plus jamais de séance improvisée
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-muted">
              La nutrition fait la moitié du travail. ProEat s’occupe de
              l’autre moitié : un vrai plan d’entraînement, adapté à votre
              matériel comme à votre emploi du temps.
            </p>
          </Reveal>
          <div className="mt-8 space-y-5">
            {points.map((p, i) => (
              <Reveal key={p.title} delay={0.08 * (i + 1)}>
                <div className="flex items-start gap-3.5">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-leaf" />
                  <div>
                    <h3 className="font-semibold text-ink">{p.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{p.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.35}>
            <Link
              href={ctaHref}
              className="group mt-9 inline-flex items-center gap-2 rounded-full bg-leaf-deep px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-leaf hover:shadow-md"
            >
              Générer mon programme
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
