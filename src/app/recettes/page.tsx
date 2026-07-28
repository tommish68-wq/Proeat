import type { Metadata } from "next";
import { RecipesContent } from "@/components/recipes/recipes-content";

export const metadata: Metadata = {
  title: "Bibliothèque de recettes healthy",
  description:
    "Des dizaines de recettes healthy avec calories et macros détaillées : petit-déjeuner, déjeuner, dîner, collations. Filtres riche en protéines, végétarien, sèche ou prise de masse.",
};

export default function RecipesPage() {
  return <RecipesContent />;
}
