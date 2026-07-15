"use client";

import { SmartImage as Image } from "@/components/smart-image";
import Link from "next/link";
import { useMemo } from "react";
import {
  ArrowRight,
  Calculator,
  Dumbbell,
  Flame,
  Salad,
  Scale,
  Target,
  UtensilsCrossed,
} from "lucide-react";
import {
  dayTotals,
  shortLabel,
  todayKey,
  useFoodLog,
  useProfile,
  useWeights,
} from "@/lib/store";
import { recipes } from "@/lib/recipes";
import { LineChart, MacroRing } from "@/components/charts";
import { Badge, ButtonLink, ProgressBar, Skeleton } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

/* Séance du jour indicative selon le jour de la semaine */
const weeklyPlan = [
  { day: 0, title: "Repos actif", detail: "Marche 30 min · mobilité" },
  { day: 1, title: "Push — Poussée", detail: "Pectoraux, épaules, triceps · 60 min" },
  { day: 2, title: "Pull — Tirage", detail: "Dos, biceps · 60 min" },
  { day: 3, title: "Repos", detail: "Récupération & sommeil" },
  { day: 4, title: "Legs — Jambes", detail: "Quadriceps, ischios, mollets · 60 min" },
  { day: 5, title: "Haut du corps", detail: "Rappel poussée & tirage · 45 min" },
  { day: 6, title: "Cardio zone 2", detail: "Vélo ou course 40 min" },
];

const goalLabels = { seche: "Sèche", maintien: "Maintien", masse: "Prise de masse" } as const;

export function DashboardContent() {
  const [profile, , profileReady] = useProfile();
  const [log, , logReady] = useFoodLog();
  const [weights, , weightsReady] = useWeights();
  const today = todayKey();

  const totals = useMemo(() => dayTotals(log, today), [log, today]);
  const kcalLeft = Math.max(0, Math.round(profile.targetKcal - totals.kcal));

  const weightSeries = useMemo(
    () =>
      weights
        .slice()
        .sort((a, b) => a.date.localeCompare(b.date))
        .slice(-9)
        .map((w) => ({ label: shortLabel(w.date), value: w.weight })),
    [weights]
  );

  const currentWeight = weightSeries.length
    ? weightSeries[weightSeries.length - 1].value
    : null;

  const workout = weeklyPlan[new Date().getDay()];
  const suggestions = useMemo(() => recipes.slice(0, 3), []);
  const ready = profileReady && logReady && weightsReady;

  const hour = new Date().getHours();
  const greeting = hour < 5 ? "Bonne nuit" : hour < 12 ? "Bonjour" : hour < 18 ? "Bon après-midi" : "Bonsoir";

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-leaf">
              Tableau de bord
            </p>
            <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              {greeting}, {profile.name.split(" ")[0]} 👋
            </h1>
            <p className="mt-2 text-muted">
              Voici votre journée en un coup d’œil.
            </p>
          </div>
          <Badge tone="leaf">
            <Target className="h-3 w-3" />
            Objectif : {goalLabels[profile.goal]}
          </Badge>
        </div>
      </Reveal>

      {!ready ? (
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <Skeleton className="h-56 rounded-2xl lg:col-span-2" />
          <Skeleton className="h-56 rounded-2xl" />
          <Skeleton className="h-64 rounded-2xl lg:col-span-3" />
        </div>
      ) : (
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {/* -------- Calories du jour -------- */}
          <Reveal className="lg:col-span-2">
            <div className="card h-full p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="flex items-center gap-2 font-semibold text-ink">
                  <Flame className="h-5 w-5 text-leaf" />
                  Calories du jour
                </h2>
                <Link
                  href="/tracker"
                  className="flex items-center gap-1 text-sm font-medium text-leaf hover:underline"
                >
                  Ouvrir le tracker <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-8">
                <div>
                  <p className="font-display text-5xl font-semibold text-ink">
                    {Math.round(totals.kcal)}
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    sur {profile.targetKcal} kcal · reste{" "}
                    <span className="font-semibold text-leaf">{kcalLeft}</span>
                  </p>
                  <div className="mt-3 w-48">
                    <ProgressBar value={totals.kcal} max={profile.targetKcal} />
                  </div>
                </div>
                <div className="flex flex-1 flex-wrap justify-around gap-4">
                  <MacroRing
                    label="Protéines"
                    value={totals.protein}
                    max={profile.targetProtein}
                    color="var(--viz-protein)"
                    size={100}
                  />
                  <MacroRing
                    label="Glucides"
                    value={totals.carbs}
                    max={profile.targetCarbs}
                    color="var(--viz-carbs)"
                    size={100}
                  />
                  <MacroRing
                    label="Lipides"
                    value={totals.fat}
                    max={profile.targetFat}
                    color="var(--viz-fat)"
                    size={100}
                  />
                </div>
              </div>
            </div>
          </Reveal>

          {/* -------- Entraînement du jour -------- */}
          <Reveal delay={0.08}>
            <div className="card flex h-full flex-col p-7">
              <h2 className="flex items-center gap-2 font-semibold text-ink">
                <Dumbbell className="h-5 w-5 text-leaf" />
                Entraînement du jour
              </h2>
              <div className="mt-5 flex-1 rounded-2xl bg-gradient-to-br from-leaf-dark to-leaf-deep p-6 text-white dark:from-leaf-soft dark:to-sand-deep dark:text-ink">
                <p className="text-xs uppercase tracking-wider opacity-70">
                  {new Date().toLocaleDateString("fr-FR", { weekday: "long" })}
                </p>
                <p className="mt-2 font-display text-2xl font-semibold">
                  {workout.title}
                </p>
                <p className="mt-1 text-sm opacity-80">{workout.detail}</p>
              </div>
              <ButtonLink href="/programme" variant="secondary" className="mt-4 w-full">
                Voir mon programme
              </ButtonLink>
            </div>
          </Reveal>

          {/* -------- Poids & progression -------- */}
          <Reveal className="lg:col-span-2">
            <div className="card p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="flex items-center gap-2 font-semibold text-ink">
                  <Scale className="h-5 w-5 text-leaf" />
                  Évolution du poids
                </h2>
                <p className="text-sm text-muted">
                  {currentWeight !== null && (
                    <>
                      Actuel :{" "}
                      <span className="font-semibold text-ink">{currentWeight} kg</span>
                      {" · "}Cible :{" "}
                      <span className="font-semibold text-leaf">
                        {profile.targetWeight} kg
                      </span>
                    </>
                  )}
                </p>
              </div>
              <div className="mt-5">
                {weightSeries.length > 1 ? (
                  <LineChart data={weightSeries} unit=" kg" height={230} />
                ) : (
                  <p className="rounded-xl bg-sand/50 p-8 text-center text-sm text-muted dark:bg-sand">
                    Enregistrez au moins deux pesées dans le tracker pour voir
                    votre courbe d’évolution.
                  </p>
                )}
              </div>
            </div>
          </Reveal>

          {/* -------- Objectifs -------- */}
          <Reveal delay={0.08}>
            <div className="card p-7">
              <h2 className="flex items-center gap-2 font-semibold text-ink">
                <Target className="h-5 w-5 text-leaf" />
                Mes objectifs
              </h2>
              <ul className="mt-5 space-y-4">
                {(
                  [
                    ["Calories", `${profile.targetKcal} kcal / jour`],
                    ["Protéines", `${profile.targetProtein} g / jour`],
                    ["Poids cible", `${profile.targetWeight} kg`],
                    ["Programme", "4 séances / semaine"],
                  ] as const
                ).map(([label, value]) => (
                  <li
                    key={label}
                    className="flex items-center justify-between border-b border-line pb-3 text-sm last:border-0 last:pb-0"
                  >
                    <span className="text-muted">{label}</span>
                    <span className="font-semibold text-ink">{value}</span>
                  </li>
                ))}
              </ul>
              <ButtonLink href="/profil" variant="secondary" className="mt-5 w-full">
                Ajuster mes objectifs
              </ButtonLink>
            </div>
          </Reveal>

          {/* -------- Dernières recettes -------- */}
          <Reveal className="lg:col-span-2">
            <div className="card p-7">
              <div className="flex items-center justify-between">
                <h2 className="flex items-center gap-2 font-semibold text-ink">
                  <Salad className="h-5 w-5 text-leaf" />
                  Recettes pour vous
                </h2>
                <Link
                  href="/recettes"
                  className="flex items-center gap-1 text-sm font-medium text-leaf hover:underline"
                >
                  Tout voir <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              <Stagger className="mt-5 grid gap-4 sm:grid-cols-3">
                {suggestions.map((r) => (
                  <StaggerItem key={r.id}>
                    <Link href="/recettes" className="group block">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-sand">
                        <Image
                          src={r.image}
                          alt={r.title}
                          fill
                          sizes="(max-width: 640px) 100vw, 250px"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <p className="mt-2.5 line-clamp-1 text-sm font-medium text-ink">
                        {r.title}
                      </p>
                      <p className="text-xs text-muted">
                        {r.kcal} kcal · {r.protein} g de protéines
                      </p>
                    </Link>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </Reveal>

          {/* -------- Accès rapides -------- */}
          <Reveal delay={0.08}>
            <div className="card p-7">
              <h2 className="font-semibold text-ink">Accès rapides</h2>
              <div className="mt-5 space-y-3">
                {(
                  [
                    [Calculator, "Recalculer mes besoins", "/calculateur"],
                    [Dumbbell, "Générer un programme", "/programme"],
                    [UtensilsCrossed, "Ajouter un repas", "/tracker"],
                  ] as const
                ).map(([Icon, label, href]) => (
                  <Link
                    key={href}
                    href={href}
                    className="group flex items-center gap-3 rounded-xl border border-line px-4 py-3.5 transition-all hover:border-leaf/40 hover:bg-leaf-faint"
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-leaf-soft text-leaf">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="flex-1 text-sm font-medium text-ink">{label}</span>
                    <ArrowRight className="h-4 w-4 text-muted transition-transform group-hover:translate-x-1 group-hover:text-leaf" />
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      )}
    </div>
  );
}
