"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Flame,
  Info,
  Scale,
  Target,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import {
  activityLevels,
  computeMetabolism,
  type ActivityId,
  type Goal,
  type Sex,
} from "@/lib/metabolism";
import { Badge, Button, Field, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/motion";

const goals: { id: Goal; label: string; icon: typeof Flame; hint: string }[] = [
  { id: "seche", label: "Sèche", icon: TrendingDown, hint: "Perdre du gras" },
  { id: "maintien", label: "Maintien", icon: Target, hint: "Stabiliser" },
  { id: "masse", label: "Prise de masse", icon: TrendingUp, hint: "Construire du muscle" },
];

export function CalculatorContent() {
  const [sex, setSex] = useState<Sex>("homme");
  const [age, setAge] = useState(28);
  const [height, setHeight] = useState(178);
  const [weight, setWeight] = useState(75);
  const [activity, setActivity] = useState<ActivityId>("modere");
  const [goal, setGoal] = useState<Goal>("maintien");
  const [result, setResult] = useState<ReturnType<typeof computeMetabolism> | null>(null);

  const valid = age >= 14 && age <= 99 && height >= 120 && height <= 230 && weight >= 35 && weight <= 250;

  const goalKcal = useMemo(() => {
    if (!result) return null;
    return { seche: result.seche, maintien: result.maintien, masse: result.masse }[goal];
  }, [result, goal]);

  return (
    <div className="hero-glow">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Calculateur"
            title="Connaissez vos besoins, maîtrisez vos résultats"
            description="Estimez votre métabolisme de base (BMR) et votre dépense énergétique totale (TDEE) avec l'équation de Mifflin-St Jeor, référence scientifique actuelle."
          />
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          {/* -------- Formulaire -------- */}
          <Reveal delay={0.1}>
            <form
              className="card space-y-6 p-7"
              onSubmit={(e) => {
                e.preventDefault();
                if (valid) setResult(computeMetabolism({ sex, age, height, weight, activity }));
              }}
            >
              <Field label="Sexe">
                <div className="grid grid-cols-2 gap-2">
                  {(["homme", "femme"] as Sex[]).map((s) => (
                    <button
                      key={s}
                      type="button"
                      data-active={sex === s}
                      onClick={() => setSex(s)}
                      className="chip py-3 text-center text-sm capitalize"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </Field>

              <div className="grid grid-cols-3 gap-4">
                <Field label="Âge" htmlFor="age">
                  <input
                    id="age"
                    type="number"
                    min={14}
                    max={99}
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="field"
                  />
                </Field>
                <Field label="Taille (cm)" htmlFor="height">
                  <input
                    id="height"
                    type="number"
                    min={120}
                    max={230}
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="field"
                  />
                </Field>
                <Field label="Poids (kg)" htmlFor="weight">
                  <input
                    id="weight"
                    type="number"
                    min={35}
                    max={250}
                    step="0.1"
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                    className="field"
                  />
                </Field>
              </div>

              <Field label="Activité physique">
                <div className="space-y-2">
                  {activityLevels.map((a) => (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => setActivity(a.id)}
                      className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition-all duration-200 ${
                        activity === a.id
                          ? "border-leaf bg-leaf-faint shadow-sm"
                          : "border-line bg-surface hover:border-leaf/40"
                      }`}
                    >
                      <span>
                        <span className="block text-sm font-medium text-ink">{a.label}</span>
                        <span className="block text-xs text-muted">{a.description}</span>
                      </span>
                      <Activity
                        className={`h-4 w-4 shrink-0 ${activity === a.id ? "text-leaf" : "text-muted/40"}`}
                      />
                    </button>
                  ))}
                </div>
              </Field>

              <Field label="Objectif">
                <div className="grid grid-cols-3 gap-2">
                  {goals.map((g) => (
                    <button
                      key={g.id}
                      type="button"
                      data-active={goal === g.id}
                      onClick={() => setGoal(g.id)}
                      className="chip flex flex-col items-center gap-1 py-3"
                    >
                      <g.icon className="h-4 w-4" />
                      <span className="text-xs font-semibold">{g.label}</span>
                    </button>
                  ))}
                </div>
              </Field>

              <Button type="submit" disabled={!valid} className="w-full py-3.5">
                Calculer mes besoins
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </Reveal>

          {/* -------- Résultats -------- */}
          <div>
            <AnimatePresence mode="wait">
              {result ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="card p-6">
                      <div className="flex items-center gap-2 text-xs font-medium text-muted">
                        <Scale className="h-4 w-4 text-leaf" />
                        Métabolisme de base
                      </div>
                      <p className="mt-2 font-display text-3xl font-semibold text-ink">
                        {result.bmr}
                      </p>
                      <p className="text-xs text-muted">kcal / jour (BMR)</p>
                    </div>
                    <div className="card p-6">
                      <div className="flex items-center gap-2 text-xs font-medium text-muted">
                        <Flame className="h-4 w-4 text-leaf" />
                        Dépense totale
                      </div>
                      <p className="mt-2 font-display text-3xl font-semibold text-ink">
                        {result.tdee}
                      </p>
                      <p className="text-xs text-muted">kcal / jour (TDEE)</p>
                    </div>
                  </div>

                  <div className="card p-6">
                    <h3 className="text-sm font-semibold text-ink">
                      Calories selon votre objectif
                    </h3>
                    <div className="mt-4 space-y-3">
                      {goals.map((g) => {
                        const kcal = { seche: result.seche, maintien: result.maintien, masse: result.masse }[g.id];
                        const active = goal === g.id;
                        return (
                          <button
                            key={g.id}
                            onClick={() => setGoal(g.id)}
                            className={`flex w-full items-center justify-between rounded-xl border px-4 py-3.5 transition-all ${
                              active
                                ? "border-leaf bg-leaf-faint"
                                : "border-line hover:border-leaf/40"
                            }`}
                          >
                            <span className="flex items-center gap-3">
                              <g.icon className={`h-4 w-4 ${active ? "text-leaf" : "text-muted"}`} />
                              <span className="text-left">
                                <span className="block text-sm font-medium text-ink">{g.label}</span>
                                <span className="block text-xs text-muted">{g.hint}</span>
                              </span>
                            </span>
                            <span className="text-lg font-bold text-ink">
                              {kcal}
                              <span className="ml-1 text-xs font-normal text-muted">kcal</span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {goalKcal && (
                    <div className="card p-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-ink">
                          Répartition des macros
                        </h3>
                        <Badge tone="leaf">{goals.find((g) => g.id === goal)?.label}</Badge>
                      </div>
                      <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                        {(
                          [
                            ["Protéines", result.macros[goal].protein, "var(--viz-protein)"],
                            ["Glucides", result.macros[goal].carbs, "var(--viz-carbs)"],
                            ["Lipides", result.macros[goal].fat, "var(--viz-fat)"],
                          ] as const
                        ).map(([label, grams, color]) => (
                          <div key={label} className="rounded-xl bg-sand/60 p-4 dark:bg-sand">
                            <span
                              className="mx-auto block h-2 w-8 rounded-full"
                              style={{ background: color }}
                            />
                            <p className="mt-2 text-xl font-bold text-ink">{grams} g</p>
                            <p className="text-xs text-muted">{label}</p>
                          </div>
                        ))}
                      </div>
                      <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-muted">
                        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                        Estimation indicative. Ajustez de ±100 kcal toutes les 2 semaines
                        selon l’évolution réelle de votre poids.
                      </p>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="card grid h-full min-h-[420px] place-items-center p-10 text-center"
                >
                  <div>
                    <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-leaf-soft">
                      <Flame className="h-8 w-8 text-leaf" />
                    </div>
                    <h3 className="mt-5 font-display text-xl font-semibold text-ink">
                      Vos résultats apparaîtront ici
                    </h3>
                    <p className="mx-auto mt-2 max-w-xs text-sm text-muted">
                      Renseignez vos informations puis lancez le calcul pour
                      découvrir vos besoins caloriques personnalisés.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
