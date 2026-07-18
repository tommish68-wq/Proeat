"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Coffee,
  Cookie,
  Flame,
  Moon,
  Plus,
  Scale,
  Sun,
  Trash2,
  UtensilsCrossed,
} from "lucide-react";
import {
  dayTotals,
  shortLabel,
  todayKey,
  toKey,
  useFoodLog,
  useProfile,
  useWeights,
  type FoodEntry,
  type MealSlot,
} from "@/lib/store";
import { recipes } from "@/lib/recipes";
import { BarChart, LineChart, MacroRing } from "@/components/charts";
import { Button, Field, ProgressBar, SectionHeading, Skeleton } from "@/components/ui";
import { Reveal } from "@/components/motion";

const mealSlots: { id: MealSlot; label: string; icon: typeof Coffee }[] = [
  { id: "petit-dejeuner", label: "Petit-déjeuner", icon: Coffee },
  { id: "dejeuner", label: "Déjeuner", icon: Sun },
  { id: "diner", label: "Dîner", icon: Moon },
  { id: "collation", label: "Collation", icon: Cookie },
];

function AddMealForm({
  onAdd,
  defaultSlot,
}: {
  onAdd: (entry: Omit<FoodEntry, "id" | "date">) => void;
  defaultSlot: MealSlot;
}) {
  const [meal, setMeal] = useState<MealSlot>(defaultSlot);
  const [name, setName] = useState("");
  const [kcal, setKcal] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");
  const [recipeId, setRecipeId] = useState("");

  const applyRecipe = (id: string) => {
    setRecipeId(id);
    const r = recipes.find((x) => x.id === id);
    if (r) {
      setName(r.title);
      setKcal(String(r.kcal));
      setProtein(String(r.protein));
      setCarbs(String(r.carbs));
      setFat(String(r.fat));
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !kcal) return;
    onAdd({
      meal,
      name: name.trim(),
      kcal: Math.max(0, Number(kcal) || 0),
      protein: Math.max(0, Number(protein) || 0),
      carbs: Math.max(0, Number(carbs) || 0),
      fat: Math.max(0, Number(fat) || 0),
    });
    setName("");
    setKcal("");
    setProtein("");
    setCarbs("");
    setFat("");
    setRecipeId("");
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <Field label="Depuis une recette ProEat (optionnel)" htmlFor="recipe">
        <select
          id="recipe"
          value={recipeId}
          onChange={(e) => applyRecipe(e.target.value)}
          className="field"
        >
          <option value="">— Saisie manuelle —</option>
          {recipes.map((r) => (
            <option key={r.id} value={r.id}>
              {r.title} ({r.kcal} kcal)
            </option>
          ))}
        </select>
      </Field>
      <Field label="Repas">
        <div className="flex flex-wrap gap-2">
          {mealSlots.map((s) => (
            <button
              key={s.id}
              type="button"
              data-active={meal === s.id}
              onClick={() => setMeal(s.id)}
              className="chip"
            >
              {s.label}
            </button>
          ))}
        </div>
      </Field>
      <Field label="Aliment / plat" htmlFor="food-name">
        <input
          id="food-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex : Poulet riz brocoli"
          className="field"
          required
        />
      </Field>
      <div className="grid grid-cols-4 gap-3">
        {(
          [
            ["Kcal", kcal, setKcal],
            ["Prot. (g)", protein, setProtein],
            ["Gluc. (g)", carbs, setCarbs],
            ["Lip. (g)", fat, setFat],
          ] as const
        ).map(([label, value, setter]) => (
          <Field key={label} label={label}>
            <input
              type="number"
              min={0}
              value={value}
              onChange={(e) => setter(e.target.value)}
              className="field px-2 text-center"
              required={label === "Kcal"}
            />
          </Field>
        ))}
      </div>
      <Button type="submit" className="w-full">
        <Plus className="h-4 w-4" />
        Ajouter au journal
      </Button>
    </form>
  );
}

export function TrackerContent() {
  const [profile] = useProfile();
  const [log, setLog, logReady] = useFoodLog();
  const [weights, setWeights, weightsReady] = useWeights();
  const [newWeight, setNewWeight] = useState("");
  const today = todayKey();

  const totals = useMemo(() => dayTotals(log, today), [log, today]);
  const todayEntries = useMemo(
    () => log.filter((e) => e.date === today),
    [log, today]
  );

  /* Historique 7 jours pour l'histogramme calories */
  const weekBars = useMemo(() => {
    const out: { label: string; value: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = toKey(d);
      out.push({
        label: i === 0 ? "Auj." : shortLabel(key),
        value: dayTotals(log, key).kcal,
      });
    }
    return out;
  }, [log]);

  const weightSeries = useMemo(
    () =>
      weights
        .slice()
        .sort((a, b) => a.date.localeCompare(b.date))
        .slice(-10)
        .map((w) => ({ label: shortLabel(w.date), value: w.weight })),
    [weights]
  );

  const addEntry = (entry: Omit<FoodEntry, "id" | "date">) => {
    setLog((prev) => [
      ...prev,
      { ...entry, id: `${Date.now()}-${prev.length}`, date: today },
    ]);
  };

  const removeEntry = (id: string) =>
    setLog((prev) => prev.filter((e) => e.id !== id));

  const addWeight = (e: React.FormEvent) => {
    e.preventDefault();
    const w = Number(newWeight);
    if (!w || w < 30 || w > 300) return;
    setWeights((prev) => [
      ...prev.filter((x) => x.date !== today),
      { date: today, weight: Math.round(w * 10) / 10 },
    ]);
    setNewWeight("");
  };

  const ready = logReady && weightsReady;

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <Reveal>
        <SectionHeading
          align="left"
          eyebrow="Tracker"
          title="Votre journal nutrition du jour"
          description="Ajoutez vos repas, suivez vos macros et votre poids. Toutes vos données restent sur votre appareil."
        />
      </Reveal>

      {!ready ? (
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <Skeleton className="h-64 rounded-2xl lg:col-span-2" />
          <Skeleton className="h-64 rounded-2xl" />
          <Skeleton className="h-80 rounded-2xl lg:col-span-3" />
        </div>
      ) : (
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {/* -------- Résumé du jour -------- */}
          <Reveal className="lg:col-span-2">
            <div className="card h-full p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="flex items-center gap-2 font-semibold text-ink">
                  <Flame className="h-5 w-5 text-leaf" />
                  Aujourd’hui
                </h2>
                <p className="text-sm text-muted">
                  <span className="text-2xl font-bold text-ink">{Math.round(totals.kcal)}</span>{" "}
                  / {profile.targetKcal} kcal
                </p>
              </div>
              <div className="mt-4">
                <ProgressBar value={totals.kcal} max={profile.targetKcal} />
                <p className="mt-2 text-xs text-muted">
                  {totals.kcal <= profile.targetKcal
                    ? `Il vous reste ${Math.max(0, Math.round(profile.targetKcal - totals.kcal))} kcal`
                    : `Dépassement de ${Math.round(totals.kcal - profile.targetKcal)} kcal`}
                </p>
              </div>
              <div className="mt-6 flex flex-wrap justify-around gap-4">
                <MacroRing
                  label="Protéines"
                  value={totals.protein}
                  max={profile.targetProtein}
                  color="var(--viz-protein)"
                />
                <MacroRing
                  label="Glucides"
                  value={totals.carbs}
                  max={profile.targetCarbs}
                  color="var(--viz-carbs)"
                />
                <MacroRing
                  label="Lipides"
                  value={totals.fat}
                  max={profile.targetFat}
                  color="var(--viz-fat)"
                />
              </div>
            </div>
          </Reveal>

          {/* -------- Ajout de repas -------- */}
          <Reveal delay={0.1}>
            <div className="card h-full p-7">
              <h2 className="flex items-center gap-2 font-semibold text-ink">
                <UtensilsCrossed className="h-5 w-5 text-leaf" />
                Ajouter un repas
              </h2>
              <div className="mt-5">
                <AddMealForm onAdd={addEntry} defaultSlot="dejeuner" />
              </div>
            </div>
          </Reveal>

          {/* -------- Journal du jour -------- */}
          <Reveal className="lg:col-span-2">
            <div className="card p-7">
              <h2 className="font-semibold text-ink">Journal du jour</h2>
              {todayEntries.length === 0 ? (
                <p className="mt-6 rounded-xl bg-sand/50 p-6 text-center text-sm text-muted">
                  Aucun repas enregistré aujourd’hui. Ajoutez votre premier
                  repas pour commencer le suivi.
                </p>
              ) : (
                <div className="mt-4 space-y-5">
                  {mealSlots.map((slot) => {
                    const entries = todayEntries.filter((e) => e.meal === slot.id);
                    if (!entries.length) return null;
                    return (
                      <div key={slot.id}>
                        <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
                          <slot.icon className="h-3.5 w-3.5" />
                          {slot.label}
                        </h3>
                        <ul className="mt-2 space-y-2">
                          <AnimatePresence initial={false}>
                            {entries.map((e) => (
                              <motion.li
                                key={e.id}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: -16 }}
                                className="flex items-center gap-3 rounded-xl border border-line px-4 py-3"
                              >
                                <div className="min-w-0 flex-1">
                                  <p className="truncate text-sm font-medium text-ink">{e.name}</p>
                                  <p className="text-xs text-muted">
                                    P {e.protein}g · G {e.carbs}g · L {e.fat}g
                                  </p>
                                </div>
                                <span className="text-sm font-semibold text-ink">
                                  {e.kcal} kcal
                                </span>
                                <button
                                  onClick={() => removeEntry(e.id)}
                                  aria-label={`Supprimer ${e.name}`}
                                  className="grid h-8 w-8 place-items-center rounded-full text-muted transition-colors hover:bg-red-500/10 hover:text-red-500"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </motion.li>
                            ))}
                          </AnimatePresence>
                        </ul>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </Reveal>

          {/* -------- Poids -------- */}
          <Reveal delay={0.1}>
            <div className="card p-7">
              <h2 className="flex items-center gap-2 font-semibold text-ink">
                <Scale className="h-5 w-5 text-leaf" />
                Poids du jour
              </h2>
              <form onSubmit={addWeight} className="mt-4 flex gap-2">
                <input
                  type="number"
                  step="0.1"
                  min={30}
                  max={300}
                  value={newWeight}
                  onChange={(e) => setNewWeight(e.target.value)}
                  placeholder={
                    weights.length
                      ? `Dernier : ${weights[weights.length - 1].weight} kg`
                      : "Ex : 74,8"
                  }
                  aria-label="Poids du jour en kilogrammes"
                  className="field"
                />
                <Button type="submit" className="shrink-0 px-4">
                  <Plus className="h-4 w-4" />
                </Button>
              </form>
              {weightSeries.length > 1 && (
                <div className="mt-5">
                  <p className="mb-2 text-xs font-medium text-muted">
                    Évolution (kg)
                  </p>
                  <LineChart data={weightSeries} unit=" kg" height={180} />
                </div>
              )}
            </div>
          </Reveal>

          {/* -------- Histogramme 7 jours -------- */}
          <Reveal className="lg:col-span-3">
            <div className="card p-7">
              <h2 className="font-semibold text-ink">Calories des 7 derniers jours</h2>
              <p className="mt-1 text-sm text-muted">
                La ligne pointillée indique votre objectif quotidien.
              </p>
              <div className="mt-5">
                <BarChart data={weekBars} unit=" kcal" target={profile.targetKcal} />
              </div>
            </div>
          </Reveal>
        </div>
      )}
    </div>
  );
}
