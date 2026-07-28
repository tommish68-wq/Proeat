/* ------------------------------------------------------------------ */
/* Moteur de variantes — « recettes à l'infini »                       */
/*                                                                     */
/* Chaque recette déclinable référence ses bases (protéine, féculent)  */
/* dans la base d'aliments. Échanger une base = retirer les macros de  */
/* l'original, ajouter celles du remplaçant, à quantité égale.         */
/* ------------------------------------------------------------------ */

import { foods, portionMacros, type Food } from "@/lib/foods";
import type { Recipe, RecipeComponent } from "@/lib/recipes";

export type SwapRole = RecipeComponent["role"];

export const roleLabels: Record<SwapRole, string> = {
  proteine: "Protéine",
  feculent: "Féculent",
};

/* Bases proposées à l'échange, par rôle */
const SWAP_POOL: Record<SwapRole, string[]> = {
  proteine: [
    "poulet",
    "dinde",
    "boeuf5",
    "saumon",
    "cabillaud",
    "crevettes",
    "tofu",
    "tempeh",
    "oeuf",
    "pois-chiches",
    "lentilles",
  ],
  feculent: ["riz", "pates", "quinoa", "pdt", "patate-douce", "semoule"],
};

export function foodById(id: string): Food | undefined {
  return foods.find((f) => f.id === id);
}

export function swapOptions(role: SwapRole): Food[] {
  return SWAP_POOL[role]
    .map(foodById)
    .filter((f): f is Food => Boolean(f));
}

export interface VariantSelection {
  proteine?: string; // foodId choisi (absent = original)
  feculent?: string;
}

export interface VariantResult {
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  /* échanges effectifs, pour l'affichage et le journal */
  swaps: { role: SwapRole; from: Food; to: Food; grams: number }[];
}

export function computeVariant(
  recipe: Recipe,
  selection: VariantSelection
): VariantResult {
  let { kcal, protein, carbs, fat } = recipe;
  const swaps: VariantResult["swaps"] = [];

  for (const component of recipe.components ?? []) {
    const chosenId = selection[component.role];
    if (!chosenId || chosenId === component.foodId) continue;
    const from = foodById(component.foodId);
    const to = foodById(chosenId);
    if (!from || !to) continue;
    const a = portionMacros(from, component.grams);
    const b = portionMacros(to, component.grams);
    kcal += b.kcal - a.kcal;
    protein += b.protein - a.protein;
    carbs += b.carbs - a.carbs;
    fat += b.fat - a.fat;
    swaps.push({ role: component.role, from, to, grams: component.grams });
  }

  return {
    kcal: Math.max(0, Math.round(kcal)),
    protein: Math.max(0, Math.round(protein)),
    carbs: Math.max(0, Math.round(carbs)),
    fat: Math.max(0, Math.round(fat)),
    swaps,
  };
}

/* Nom affiché au journal : « Poulet grillé… (version saumon) » */
export function variantName(recipe: Recipe, result: VariantResult): string {
  if (!result.swaps.length) return recipe.title;
  const parts = result.swaps.map((s) => s.to.name.toLowerCase().split(" (")[0]);
  return `${recipe.title} (version ${parts.join(" & ")})`;
}

/* Nombre de combinaisons possibles d'une recette déclinable */
export function variantCount(recipe: Recipe): number {
  return (recipe.components ?? []).reduce(
    (n, c) => n * SWAP_POOL[c.role].length,
    1
  );
}
