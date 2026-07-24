"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Coffee,
  Cookie,
  CopyPlus,
  Flame,
  History,
  Minus,
  Moon,
  Plus,
  Salad,
  Scale,
  Search,
  Sun,
  Trash2,
  UtensilsCrossed,
  X,
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
import { recipes, type Recipe } from "@/lib/recipes";
import {
  normalize,
  portionMacros,
  searchFoods,
  type Food,
} from "@/lib/foods";
import { BarChart, LineChart, MacroRing } from "@/components/charts";
import { Button, Field, ProgressBar, SectionHeading, Skeleton } from "@/components/ui";
import { Reveal } from "@/components/motion";

const mealSlots: { id: MealSlot; label: string; icon: typeof Coffee }[] = [
  { id: "petit-dejeuner", label: "Petit-déjeuner", icon: Coffee },
  { id: "dejeuner", label: "Déjeuner", icon: Sun },
  { id: "diner", label: "Dîner", icon: Moon },
  { id: "collation", label: "Collation", icon: Cookie },
];

/* ------------------------------------------------------------------ */
/* Ajout rapide : recherche aliments + recettes, portions, récents     */
/* ------------------------------------------------------------------ */

type SearchHit =
  | { kind: "food"; food: Food }
  | { kind: "recipe"; recipe: Recipe };

function AddMealForm({
  onAdd,
  defaultSlot,
  recents,
}: {
  onAdd: (entry: Omit<FoodEntry, "id" | "date">) => void;
  defaultSlot: MealSlot;
  recents: Omit<FoodEntry, "id" | "date">[];
}) {
  const [meal, setMeal] = useState<MealSlot>(defaultSlot);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Food | null>(null);
  const [unitIndex, setUnitIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const [manualOpen, setManualOpen] = useState(false);
  const [name, setName] = useState("");
  const [kcal, setKcal] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");

  /* Résultats combinés : aliments de la base + recettes ProEat */
  const hits = useMemo<SearchHit[]>(() => {
    const q = normalize(query.trim());
    if (q.length < 2 || selected) return [];
    const foodHits: SearchHit[] = searchFoods(query, 5).map((food) => ({
      kind: "food",
      food,
    }));
    const recipeHits: SearchHit[] = recipes
      .filter((r) => normalize(r.title).includes(q))
      .slice(0, 2)
      .map((recipe) => ({ kind: "recipe", recipe }));
    return [...foodHits, ...recipeHits].slice(0, 6);
  }, [query, selected]);

  const grams = selected ? selected.units[unitIndex].grams * qty : 0;
  const macros = selected ? portionMacros(selected, grams) : null;

  const reset = () => {
    setQuery("");
    setSelected(null);
    setUnitIndex(0);
    setQty(1);
  };

  const addFood = () => {
    if (!selected || !macros) return;
    onAdd({
      meal,
      name: `${selected.name} — ${Math.round(grams)} g`,
      kcal: macros.kcal,
      protein: Math.round(macros.protein),
      carbs: Math.round(macros.carbs),
      fat: Math.round(macros.fat),
    });
    reset();
  };

  const addRecipe = (r: Recipe) => {
    onAdd({
      meal,
      name: r.title,
      kcal: r.kcal,
      protein: r.protein,
      carbs: r.carbs,
      fat: r.fat,
    });
    reset();
  };

  const submitManual = (e: React.FormEvent) => {
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
  };

  return (
    <div className="space-y-4">
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

      {/* Recherche */}
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <input
          value={selected ? selected.name : query}
          onChange={(e) => {
            setSelected(null);
            setQuery(e.target.value);
          }}
          placeholder="Poulet, riz, skyr, banane…"
          aria-label="Rechercher un aliment ou une recette"
          className="field pl-11 pr-10"
        />
        {(selected || query) && (
          <button
            onClick={reset}
            aria-label="Effacer la recherche"
            className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-muted hover:bg-sand"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        {hits.length > 0 && (
          <ul className="absolute z-20 mt-2 w-full overflow-hidden rounded-2xl border border-line bg-card shadow-deep">
            {hits.map((h) =>
              h.kind === "food" ? (
                <li key={`f-${h.food.id}`}>
                  <button
                    onClick={() => {
                      setSelected(h.food);
                      setUnitIndex(0);
                      setQty(1);
                    }}
                    className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-leaf-faint"
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium text-ink">
                        {h.food.name}
                      </span>
                      <span className="text-xs text-muted">
                        {h.food.kcal} kcal · P {h.food.protein} g / 100 g
                      </span>
                    </span>
                    <Plus className="h-4 w-4 shrink-0 text-leaf" />
                  </button>
                </li>
              ) : (
                <li key={`r-${h.recipe.id}`}>
                  <button
                    onClick={() => addRecipe(h.recipe)}
                    className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-leaf-faint"
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium text-ink">
                        {h.recipe.title}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gold">
                        <Salad className="h-3 w-3" />
                        Recette ProEat · {h.recipe.kcal} kcal
                      </span>
                    </span>
                    <Plus className="h-4 w-4 shrink-0 text-leaf" />
                  </button>
                </li>
              )
            )}
          </ul>
        )}
      </div>

      {/* Portion */}
      {selected && macros && (
        <div className="space-y-3 rounded-2xl border border-leaf/25 bg-leaf-faint p-4">
          <div className="flex flex-wrap gap-2">
            {selected.units.map((u, i) => (
              <button
                key={u.label}
                data-active={unitIndex === i}
                onClick={() => setUnitIndex(i)}
                className="chip text-xs"
              >
                {u.label}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQty((q) => Math.max(0.5, q - 0.5))}
                aria-label="Réduire la quantité"
                className="grid h-9 w-9 place-items-center rounded-full border border-line bg-surface text-ink active:scale-95"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center text-sm font-bold text-ink">
                ×{qty}
              </span>
              <button
                onClick={() => setQty((q) => q + 0.5)}
                aria-label="Augmenter la quantité"
                className="grid h-9 w-9 place-items-center rounded-full border border-line bg-surface text-ink active:scale-95"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <p className="text-right text-xs text-muted">
              <span className="block text-sm font-bold text-ink">
                {macros.kcal} kcal
              </span>
              P {Math.round(macros.protein)} · G {Math.round(macros.carbs)} · L{" "}
              {Math.round(macros.fat)}
            </p>
          </div>
          <Button onClick={addFood} className="w-full">
            <Plus className="h-4 w-4" />
            Ajouter · {Math.round(grams)} g
          </Button>
        </div>
      )}

      {/* Récents */}
      {!selected && recents.length > 0 && (
        <div>
          <p className="mb-2 flex items-center gap-1.5 text-xs font-medium text-muted">
            <History className="h-3.5 w-3.5" />
            Récents — un tap pour re-ajouter
          </p>
          <div className="flex flex-wrap gap-2">
            {recents.map((r) => (
              <button
                key={r.name}
                onClick={() => onAdd({ ...r, meal })}
                className="chip text-xs"
                title={`${r.kcal} kcal`}
              >
                {r.name.length > 28 ? `${r.name.slice(0, 28)}…` : r.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Saisie manuelle repliable */}
      <div className="border-t border-line pt-3">
        <button
          onClick={() => setManualOpen(!manualOpen)}
          aria-expanded={manualOpen}
          className="flex w-full items-center justify-between text-sm font-medium text-muted transition-colors hover:text-ink"
        >
          Saisie manuelle (macros connues)
          <ChevronDown
            className={`h-4 w-4 transition-transform ${manualOpen ? "rotate-180" : ""}`}
          />
        </button>
        {manualOpen && (
          <form onSubmit={submitManual} className="mt-4 space-y-4">
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
        )}
      </div>
    </div>
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

  /* Hier, pour la duplication en un tap */
  const yesterdayKey = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return toKey(d);
  }, []);
  const yesterdayEntries = useMemo(
    () => log.filter((e) => e.date === yesterdayKey),
    [log, yesterdayKey]
  );

  /* Derniers aliments distincts, pour les raccourcis « récents » */
  const recents = useMemo(() => {
    const seen = new Set<string>();
    const out: Omit<FoodEntry, "id" | "date">[] = [];
    for (let i = log.length - 1; i >= 0 && out.length < 6; i--) {
      const e = log[i];
      if (seen.has(e.name)) continue;
      seen.add(e.name);
      out.push({
        meal: e.meal,
        name: e.name,
        kcal: e.kcal,
        protein: e.protein,
        carbs: e.carbs,
        fat: e.fat,
      });
    }
    return out;
  }, [log]);

  const duplicateYesterday = () => {
    if (!yesterdayEntries.length) return;
    setLog((prev) => [
      ...prev,
      ...yesterdayEntries.map((e, i) => ({
        ...e,
        id: `${Date.now()}-dup-${i}`,
        date: today,
      })),
    ]);
  };

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
                <AddMealForm
                  onAdd={addEntry}
                  defaultSlot="dejeuner"
                  recents={recents}
                />
              </div>
            </div>
          </Reveal>

          {/* -------- Journal du jour -------- */}
          <Reveal className="lg:col-span-2">
            <div className="card p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-semibold text-ink">Journal du jour</h2>
                {yesterdayEntries.length > 0 && (
                  <button
                    onClick={duplicateYesterday}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-4 py-2 text-xs font-semibold text-ink transition-all hover:border-leaf/40 hover:text-leaf"
                  >
                    <CopyPlus className="h-3.5 w-3.5" />
                    Dupliquer hier ({yesterdayEntries.length} repas)
                  </button>
                )}
              </div>
              {todayEntries.length === 0 ? (
                <p className="mt-6 rounded-xl bg-sand/50 p-6 text-center text-sm text-muted">
                  Aucun repas enregistré aujourd’hui. Cherchez un aliment
                  (« poulet », « skyr »…) ou dupliquez la journée d’hier.
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
