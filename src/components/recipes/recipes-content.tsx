"use client";

import Link from "next/link";
import { SmartImage as Image } from "@/components/smart-image";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Calculator,
  Check,
  ChefHat,
  Clock,
  Flame,
  Heart,
  LayoutGrid,
  NotebookPen,
  Rows3,
  Search,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { Floaty, Orb } from "@/components/fx";
import {
  categoryLabels,
  recipes,
  tagLabels,
  type MealCategory,
  type Recipe,
  type RecipeTag,
} from "@/lib/recipes";
import { todayKey, useFoodLog } from "@/lib/store";
import { Badge, SectionHeading, Skeleton } from "@/components/ui";
import { Reveal } from "@/components/motion";

const categories = Object.entries(categoryLabels) as [MealCategory, string][];
const tags = Object.entries(tagLabels) as [RecipeTag, string][];

/* ------------------------------------------------------------------ */
/* Vitrine sombre « Les favoris ProEat » — façon rayon best-sellers    */
/* ------------------------------------------------------------------ */

function Favorites({ onOpen }: { onOpen: (r: Recipe) => void }) {
  const favorites = recipes.filter((r) => r.badge);
  if (!favorites.length) return null;
  return (
    <section
      aria-label="La sélection ProEat"
      className="noise relative mx-auto mt-14 max-w-7xl overflow-hidden rounded-[2rem] bg-[#2a454f] px-6 py-10 sm:px-10"
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(38rem 20rem at 85% -10%, rgba(94,124,116,0.35), transparent 62%), radial-gradient(26rem 16rem at 0% 110%, rgba(163,123,77,0.22), transparent 62%)",
        }}
      />
      <div className="relative">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#d9c5a5]">
              <Heart className="h-3.5 w-3.5" />
              La sélection ProEat
            </p>
            <h2 className="mt-2 max-w-xl font-display text-2xl font-semibold text-white sm:text-3xl">
              Nos recettes préférées, à découvrir en premier
            </h2>
            <p className="mt-1 text-sm text-white/60">
              Cliquez sur un plat pour la recette complète.
            </p>
          </div>
          <Link
            href="/calculateur"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#2a454f] shadow-lg transition-all hover:-translate-y-0.5"
          >
            <Calculator className="h-4 w-4" />
            Calculer mes besoins
          </Link>
        </div>

        <div className="mt-7 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
          {favorites.map((r) => (
            <button
              key={r.id}
              onClick={() => onOpen(r)}
              className="group w-60 shrink-0 snap-start overflow-hidden rounded-2xl bg-white/[0.06] text-left ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:ring-white/25"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#212724]">
                <Image
                  src={r.image}
                  alt={r.title}
                  fill
                  sizes="240px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {r.badge && (
                  <span className="absolute left-2.5 top-2.5 rounded-full bg-gold px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#1a140a]">
                    {r.badge}
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-white">
                  {r.title}
                </h3>
                <p className="mt-2 text-xs font-semibold text-[#c9b280]">
                  {r.protein} g prot · {r.kcal} kcal
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* La gamme plats — cartes flottantes légèrement inclinées             */
/* ------------------------------------------------------------------ */

const floatStyles = [
  { rotate: "-rotate-3", duration: 6.2, dy: -12, delay: 0, offset: "lg:mt-10" },
  { rotate: "rotate-2", duration: 7.4, dy: -16, delay: 0.5, offset: "lg:mt-0" },
  { rotate: "-rotate-1", duration: 6.8, dy: -10, delay: 1, offset: "lg:mt-16" },
  { rotate: "rotate-3", duration: 7.9, dy: -14, delay: 0.3, offset: "lg:mt-5" },
  { rotate: "-rotate-2", duration: 7.1, dy: -12, delay: 0.8, offset: "lg:mt-12" },
];

function FloatingDishes({ onOpen }: { onOpen: (r: Recipe) => void }) {
  const plats = recipes
    .filter((r) => r.category === "dejeuner" || r.category === "diner")
    .slice(0, 5);
  if (!plats.length) return null;
  return (
    <section
      aria-label="La gamme plats"
      className="relative mt-20 overflow-hidden bg-sand/50 py-20"
    >
      <Orb
        className="blur-3xl"
        style={{ top: "-10%", left: "-4%", width: 320, height: 320, background: "radial-gradient(circle at 40% 40%, rgba(94,124,116,0.25), transparent 70%)" }}
        duration={13}
        dy={26}
      />
      <Orb
        className="blur-3xl"
        style={{ bottom: "-12%", right: "-2%", width: 300, height: 300, background: "radial-gradient(circle at 40% 40%, rgba(163,123,77,0.18), transparent 70%)" }}
        duration={15}
        dy={-24}
        delay={1}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              <UtensilsCrossed className="h-3.5 w-3.5" />
              La gamme plats
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Des plats complets qui tiennent leurs macros
            </h2>
            <p className="mt-3 text-base text-muted">
              Déjeuners et dîners pensés pour la performance : cliquez sur un
              plat pour la recette complète.
            </p>
          </div>
        </Reveal>
        <div className="mt-14 grid grid-cols-2 items-start gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {plats.map((r, i) => {
            const f = floatStyles[i % floatStyles.length];
            return (
              <Floaty
                key={r.id}
                duration={f.duration}
                dy={f.dy}
                delay={f.delay}
                className={f.offset}
              >
                <button
                  onClick={() => onOpen(r)}
                  className={`group block w-full overflow-hidden rounded-2xl bg-card text-left shadow-deep ring-1 ring-line transition-transform duration-500 hover:rotate-0 hover:scale-[1.04] ${f.rotate}`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-sand">
                    <Image
                      src={r.image}
                      alt={r.title}
                      fill
                      sizes="(max-width: 640px) 50vw, 240px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-3.5">
                    <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-ink">
                      {r.title}
                    </h3>
                    <p className="mt-1.5 text-xs font-semibold text-muted">
                      {r.protein} g prot · {r.kcal} kcal
                    </p>
                  </div>
                </button>
              </Floaty>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function MacroPill({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-muted">
      <span className="h-2 w-2 rounded-full" style={{ background: color }} />
      <span className="font-semibold text-ink">{value}g</span> {label}
    </span>
  );
}

function RecipeCard({ recipe, onOpen }: { recipe: Recipe; onOpen: () => void }) {
  return (
    <motion.button
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.3 }}
      onClick={onOpen}
      className="card card-hover group block w-full overflow-hidden text-left"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-sand">
        <Image
          src={recipe.image}
          alt={recipe.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <Badge tone="sand" className="bg-white/90 text-ink backdrop-blur">
            {categoryLabels[recipe.category]}
          </Badge>
          {recipe.badge && (
            <span className="inline-flex items-center rounded-full bg-gold px-2.5 py-1 text-xs font-semibold text-[#241a10]">
              {recipe.badge}
            </span>
          )}
        </div>
        <div className="absolute bottom-3 right-3">
          <Badge tone="sand" className="bg-white/90 text-ink backdrop-blur">
            <Flame className="h-3 w-3 text-leaf" />
            {recipe.kcal} kcal
          </Badge>
        </div>
      </div>
      <div className="p-5">
        <h3 className="line-clamp-2 font-semibold leading-snug text-ink">
          {recipe.title}
        </h3>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5">
          <MacroPill label="prot." value={recipe.protein} color="var(--viz-protein)" />
          <MacroPill label="gluc." value={recipe.carbs} color="var(--viz-carbs)" />
          <MacroPill label="lip." value={recipe.fat} color="var(--viz-fat)" />
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-xs text-muted">
          <Clock className="h-3.5 w-3.5" />
          {recipe.time} min
        </div>
      </div>
    </motion.button>
  );
}

/* Rangée compacte — la vue liste condense le catalogue */
function RecipeRow({ recipe, onOpen }: { recipe: Recipe; onOpen: () => void }) {
  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
      onClick={onOpen}
      className="card card-hover group flex w-full items-center gap-4 p-3 text-left sm:gap-5 sm:p-4"
    >
      <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-sand sm:h-20 sm:w-28">
        <Image
          src={recipe.image}
          alt=""
          fill
          sizes="112px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="truncate font-semibold text-ink">{recipe.title}</h3>
          {recipe.badge && (
            <span className="hidden shrink-0 rounded-full bg-gold px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#241a10] sm:inline-flex">
              {recipe.badge}
            </span>
          )}
        </div>
        <p className="mt-1 text-xs text-muted">
          {categoryLabels[recipe.category]} · {recipe.time} min
        </p>
        <div className="mt-1.5 hidden flex-wrap items-center gap-x-4 gap-y-1 sm:flex">
          <MacroPill label="prot." value={recipe.protein} color="var(--viz-protein)" />
          <MacroPill label="gluc." value={recipe.carbs} color="var(--viz-carbs)" />
          <MacroPill label="lip." value={recipe.fat} color="var(--viz-fat)" />
        </div>
      </div>
      <div className="shrink-0 text-right">
        <p className="text-sm font-bold text-ink">{recipe.kcal} kcal</p>
        <p className="text-xs text-muted">{recipe.protein} g prot</p>
      </div>
      <ArrowRight className="h-4 w-4 shrink-0 text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:text-leaf" />
    </motion.button>
  );
}

function RecipeModal({
  recipe,
  onClose,
  onSwitch,
}: {
  recipe: Recipe;
  onClose: () => void;
  onSwitch: (r: Recipe) => void;
}) {
  const [, setLog] = useFoodLog();
  const [added, setAdded] = useState(false);
  const [addedPairings, setAddedPairings] = useState<string[]>([]);

  /* L'équivalent du « panier » : la recette part dans le journal du jour */
  const logRecipe = (r: Recipe) => {
    setLog((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${prev.length}`,
        date: todayKey(),
        meal: r.category,
        name: r.title,
        kcal: r.kcal,
        protein: r.protein,
        carbs: r.carbs,
        fat: r.fat,
      },
    ]);
  };

  const addToJournal = () => {
    logRecipe(recipe);
    setAdded(true);
  };

  /* Cross-sell : recettes d'un autre repas, proches par les tags puis la note */
  const pairings = useMemo(() => {
    return recipes
      .filter((r) => r.id !== recipe.id && r.category !== recipe.category)
      .map((r) => ({
        r,
        score:
          r.tags.filter((t) => recipe.tags.includes(t)).length +
          (r.badge ? 0.5 : 0),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 2)
      .map((x) => x.r);
  }, [recipe]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] grid place-items-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={recipe.title}
    >
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 32, scale: 0.97 }}
        transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-line bg-card shadow-2xl"
      >
        <div className="relative aspect-[16/8] overflow-hidden bg-sand">
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
          <button
            onClick={onClose}
            aria-label="Fermer"
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-ink shadow-lg backdrop-blur transition-transform hover:scale-105"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap gap-2">
            <Badge tone="leaf">{categoryLabels[recipe.category]}</Badge>
            {recipe.badge && (
              <Badge tone="gold">{recipe.badge}</Badge>
            )}
            {recipe.tags.map((t) => (
              <Badge key={t} tone="outline">{tagLabels[t]}</Badge>
            ))}
          </div>
          <h2 className="mt-4 font-display text-2xl font-semibold text-ink sm:text-3xl">
            {recipe.title}
          </h2>
          {recipe.sell && (
            <p className="mt-3 border-l-2 border-leaf pl-3 text-[15px] font-medium leading-relaxed text-ink">
              {recipe.sell}
            </p>
          )}
          <div className="mt-3 flex items-center gap-4 text-sm text-muted">
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" /> {recipe.time} min
            </span>
            <span className="flex items-center gap-1.5">
              <ChefHat className="h-4 w-4" /> {recipe.ingredients.length} ingrédients
            </span>
          </div>

          {/* Macros */}
          <div className="mt-6 grid grid-cols-4 gap-3">
            {(
              [
                ["Calories", `${recipe.kcal}`, "kcal", "var(--leaf)"],
                ["Protéines", `${recipe.protein}`, "g", "var(--viz-protein)"],
                ["Glucides", `${recipe.carbs}`, "g", "var(--viz-carbs)"],
                ["Lipides", `${recipe.fat}`, "g", "var(--viz-fat)"],
              ] as const
            ).map(([label, value, unit, color]) => (
              <div key={label} className="rounded-xl bg-sand/60 p-3 text-center">
                <span className="mx-auto block h-1.5 w-6 rounded-full" style={{ background: color }} />
                <p className="mt-1.5 text-lg font-bold text-ink">
                  {value}
                  <span className="text-xs font-normal text-muted"> {unit}</span>
                </p>
                <p className="text-[11px] text-muted">{label}</p>
              </div>
            ))}
          </div>

          {/* CTA « produit » : la recette part dans le journal du jour */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={addToJournal}
              disabled={added}
              className={`inline-flex flex-1 items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-300 ${
                added
                  ? "bg-leaf-soft text-leaf-deep"
                  : "bg-leaf-deep text-white shadow-sm hover:-translate-y-px hover:bg-leaf hover:shadow-md"
              }`}
            >
              {added ? (
                <>
                  <Check className="h-4 w-4" />
                  Ajouté à votre journal du jour
                </>
              ) : (
                <>
                  <NotebookPen className="h-4 w-4" />
                  Ajouter à mon journal · {recipe.kcal} kcal
                </>
              )}
            </button>
            {added && (
              <Link
                href="/tracker"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-surface px-6 py-3.5 text-sm font-semibold text-ink transition-all hover:border-leaf/40 hover:bg-leaf-faint"
              >
                Voir mon journal
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>

          {/* Argumentaire */}
          {recipe.benefits && (
            <div className="mt-6 rounded-2xl bg-leaf-faint p-5">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-leaf">
                Pourquoi vous allez l&apos;adorer
              </h3>
              <ul className="mt-3 space-y-2">
                {recipe.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-leaf" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Cross-sell « souvent ajoutés ensemble » */}
          {pairings.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-leaf">
                Souvent ajoutés ensemble
              </h3>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {pairings.map((p) => {
                  const pairAdded = addedPairings.includes(p.id);
                  return (
                    <div
                      key={p.id}
                      className="flex items-center gap-3 rounded-2xl border border-line p-3 transition-colors hover:border-leaf/40"
                    >
                      <button
                        onClick={() => onSwitch(p)}
                        className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-sand"
                        aria-label={`Voir la recette : ${p.title}`}
                      >
                        <Image
                          src={p.image}
                          alt=""
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </button>
                      <button
                        onClick={() => onSwitch(p)}
                        className="min-w-0 flex-1 text-left"
                      >
                        <p className="line-clamp-2 text-sm font-medium leading-snug text-ink">
                          {p.title}
                        </p>
                        <p className="mt-0.5 text-xs text-muted">
                          {categoryLabels[p.category]} · {p.protein} g prot · {p.kcal} kcal
                        </p>
                      </button>
                      <button
                        onClick={() => {
                          if (pairAdded) return;
                          logRecipe(p);
                          setAddedPairings((prev) => [...prev, p.id]);
                        }}
                        aria-label={
                          pairAdded
                            ? `${p.title} ajouté au journal`
                            : `Ajouter ${p.title} au journal`
                        }
                        className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-all ${
                          pairAdded
                            ? "bg-leaf-soft text-leaf-deep"
                            : "bg-leaf-deep text-white hover:scale-105"
                        }`}
                      >
                        {pairAdded ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <NotebookPen className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mt-8 grid gap-8 sm:grid-cols-[1fr_1.4fr]">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-leaf">
                Ingrédients
              </h3>
              <ul className="mt-3 space-y-2">
                {recipe.ingredients.map((ing) => (
                  <li key={ing} className="flex items-start gap-2 text-sm text-ink">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-leaf" />
                    {ing}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-leaf">
                Préparation
              </h3>
              <ol className="mt-3 space-y-4">
                {recipe.steps.map((step, i) => (
                  <li key={step} className="flex gap-3 text-sm leading-relaxed text-ink">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-leaf-soft text-xs font-bold text-leaf">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function RecipesContent() {
  const [category, setCategory] = useState<MealCategory | "toutes">("toutes");
  const [activeTags, setActiveTags] = useState<RecipeTag[]>([]);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"liste" | "grille">("liste");

  // skeleton loading à l'arrivée sur la page
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    return recipes.filter((r) => {
      if (category !== "toutes" && r.category !== category) return false;
      if (activeTags.length && !activeTags.every((t) => r.tags.includes(t))) return false;
      if (query && !r.title.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [category, activeTags, query]);

  const toggleTag = (tag: RecipeTag) =>
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );

  return (
    <div>
      <div className="hero-glow">
        <div className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Recettes"
              title="Manger sain n'a jamais été aussi bon"
              description="Chaque recette affiche ses calories et ses macros. Filtrez par repas, par objectif ou par régime pour trouver votre prochain plat en quelques secondes."
            />
          </Reveal>

          {/* -------- Filtres -------- */}
          <Reveal delay={0.1}>
            <div className="mx-auto mt-10 max-w-4xl">
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Rechercher une recette…"
                  aria-label="Rechercher une recette"
                  className="field pl-11"
                />
              </div>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <button
                  data-active={category === "toutes"}
                  onClick={() => setCategory("toutes")}
                  className="chip"
                >
                  Toutes
                </button>
                {categories.map(([id, label]) => (
                  <button
                    key={id}
                    data-active={category === id}
                    onClick={() => setCategory(id)}
                    className="chip"
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                {tags.map(([id, label]) => (
                  <button
                    key={id}
                    data-active={activeTags.includes(id)}
                    onClick={() => toggleTag(id)}
                    className="chip text-xs"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* -------- Favoris (vitrine) -------- */}
      <div className="px-4 sm:px-6 lg:px-8">
        <Favorites onOpen={setSelected} />
      </div>

      {/* -------- La gamme plats (cartes flottantes) -------- */}
      <FloatingDishes onOpen={setSelected} />

      {/* -------- Catalogue -------- */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <p className="text-sm text-muted" aria-live="polite">
            {loading ? "Chargement…" : `${filtered.length} recette${filtered.length > 1 ? "s" : ""}`}
          </p>
          <div
            className="flex items-center gap-1 rounded-full border border-line bg-surface p-1"
            role="group"
            aria-label="Mode d'affichage"
          >
            <button
              onClick={() => setView("liste")}
              aria-pressed={view === "liste"}
              aria-label="Afficher en liste"
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                view === "liste" ? "bg-leaf-deep text-white" : "text-muted hover:text-ink"
              }`}
            >
              <Rows3 className="h-3.5 w-3.5" />
              Liste
            </button>
            <button
              onClick={() => setView("grille")}
              aria-pressed={view === "grille"}
              aria-label="Afficher en grille"
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                view === "grille" ? "bg-leaf-deep text-white" : "text-muted hover:text-ink"
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              Grille
            </button>
          </div>
        </div>
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="card overflow-hidden">
                <Skeleton className="aspect-[4/3] rounded-none" />
                <div className="space-y-3 p-5">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="card mx-auto max-w-md p-12 text-center">
            <p className="font-display text-lg font-semibold text-ink">
              Aucune recette trouvée
            </p>
            <p className="mt-2 text-sm text-muted">
              Essayez de retirer un filtre ou de modifier votre recherche.
            </p>
          </div>
        ) : view === "liste" ? (
          <motion.div layout className="mx-auto max-w-4xl space-y-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((r) => (
                <RecipeRow key={r.id} recipe={r} onOpen={() => setSelected(r)} />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((r) => (
                <RecipeCard key={r.id} recipe={r} onOpen={() => setSelected(r)} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {selected && (
          <RecipeModal
            key={selected.id}
            recipe={selected}
            onClose={() => setSelected(null)}
            onSwitch={setSelected}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
