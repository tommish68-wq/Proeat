export type ProductCategory =
  | "nutrition"
  | "musculation"
  | "seche"
  | "masse"
  | "recettes";

export interface Product {
  id: string;
  title: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  description: string;
  preview: string[];
  pages: number;
  bestseller?: boolean;
  emoji: string;
}

export const productCategoryLabels: Record<ProductCategory, string> = {
  nutrition: "Nutrition",
  musculation: "Musculation",
  seche: "Guide de sèche",
  masse: "Prise de masse",
  recettes: "Recettes premium",
};

export const products: Product[] = [
  {
    id: "ebook-nutrition-101",
    title: "Nutrition 101 — Les fondations",
    category: "nutrition",
    price: 19,
    originalPrice: 29,
    description:
      "Le guide complet pour comprendre les calories, les macros et construire une alimentation durable sans frustration.",
    preview: [
      "Comprendre son métabolisme en 10 minutes",
      "Construire son assiette idéale",
      "Gérer les repas au restaurant et les écarts",
    ],
    pages: 96,
    bestseller: true,
    emoji: "🥗",
  },
  {
    id: "ebook-muscu-fondamentaux",
    title: "Musculation — Les fondamentaux",
    category: "musculation",
    price: 24,
    description:
      "Technique, programmation et surcharge progressive : tout ce qu'il faut pour progresser dès la première année.",
    preview: [
      "Les 12 mouvements essentiels illustrés",
      "Programmer ses semaines d'entraînement",
      "Éviter les 8 erreurs qui bloquent la progression",
    ],
    pages: 128,
    emoji: "🏋️",
  },
  {
    id: "guide-seche-12-semaines",
    title: "Protocole Sèche — 12 semaines",
    category: "seche",
    price: 29,
    originalPrice: 39,
    description:
      "Un protocole progressif de 12 semaines pour perdre du gras en conservant un maximum de muscle.",
    preview: [
      "Calculer et ajuster son déficit semaine après semaine",
      "Gérer la faim, le cardio et les plateaux",
      "Stratégie de fin de sèche et maintien",
    ],
    pages: 84,
    bestseller: true,
    emoji: "🔥",
  },
  {
    id: "guide-masse-propre",
    title: "Prise de masse propre",
    category: "masse",
    price: 29,
    description:
      "Construire du muscle sans prendre un gramme de gras superflu : surplus intelligent, entraînement et suivi.",
    preview: [
      "Définir son surplus calorique optimal",
      "Les meilleurs aliments pour la construction musculaire",
      "Suivre sa progression et ajuster tous les 15 jours",
    ],
    pages: 92,
    emoji: "💪",
  },
  {
    id: "recettes-high-protein",
    title: "50 recettes high-protein",
    category: "recettes",
    price: 15,
    description:
      "50 recettes gourmandes à plus de 30 g de protéines, prêtes en moins de 25 minutes, macros détaillées.",
    preview: [
      "15 petits-déjeuners protéinés",
      "20 plats complets express",
      "15 collations & desserts fitness",
    ],
    pages: 68,
    bestseller: true,
    emoji: "🍳",
  },
  {
    id: "recettes-batch-cooking",
    title: "Batch cooking fitness",
    category: "recettes",
    price: 17,
    description:
      "Préparez 5 jours de repas équilibrés en 2 heures le dimanche. Menus, listes de courses et plans détaillés.",
    preview: [
      "4 semaines de menus complets",
      "Listes de courses prêtes à imprimer",
      "Techniques de conservation optimales",
    ],
    pages: 74,
    emoji: "🍱",
  },
  {
    id: "ebook-mobilite",
    title: "Mobilité & récupération",
    category: "musculation",
    price: 14,
    description:
      "Routines de mobilité de 10 minutes pour progresser sur les mouvements clés et s'entraîner sans douleur.",
    preview: [
      "Routines ciblées épaules, hanches, chevilles",
      "Échauffements spécifiques par séance",
      "Protocole récupération & sommeil",
    ],
    pages: 56,
    emoji: "🧘",
  },
  {
    id: "pack-transformation",
    title: "Pack Transformation complète",
    category: "nutrition",
    price: 59,
    originalPrice: 89,
    description:
      "L'intégrale ProEat : les 6 e-books réunis + mises à jour à vie. Le chemin le plus court vers votre transformation.",
    preview: [
      "Les 6 guides complets (498 pages)",
      "Mises à jour à vie incluses",
      "Bonus : templates de suivi imprimables",
    ],
    pages: 498,
    bestseller: true,
    emoji: "📦",
  },
];
