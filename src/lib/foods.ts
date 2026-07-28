/* ------------------------------------------------------------------ */
/* Base d'aliments courants — macros pour 100 g + portions usuelles.   */
/* L'utilisateur cherche, choisit une portion, ProEat calcule tout.    */
/* ------------------------------------------------------------------ */

export type FoodCategory =
  | "proteines"
  | "feculents"
  | "fruits"
  | "legumes"
  | "laitages"
  | "graisses"
  | "divers";

export const foodCategoryLabels: Record<FoodCategory, string> = {
  proteines: "Protéines",
  feculents: "Féculents",
  fruits: "Fruits",
  legumes: "Légumes",
  laitages: "Laitages",
  graisses: "Matières grasses",
  divers: "Divers",
};

export interface FoodUnit {
  label: string;
  grams: number;
}

export interface Food {
  id: string;
  name: string;
  category: FoodCategory;
  /* macros pour 100 g */
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  units: FoodUnit[]; // la première est la portion par défaut
}

const G100: FoodUnit = { label: "100 g", grams: 100 };

export const foods: Food[] = [
  /* ---------- Protéines ---------- */
  { id: "poulet", name: "Filet de poulet (cuit)", category: "proteines", kcal: 165, protein: 31, carbs: 0, fat: 3.6, units: [{ label: "1 filet (150 g)", grams: 150 }, G100] },
  { id: "boeuf5", name: "Bœuf haché 5 % (cuit)", category: "proteines", kcal: 145, protein: 26, carbs: 0, fat: 5, units: [{ label: "1 steak (125 g)", grams: 125 }, G100] },
  { id: "boeuf15", name: "Bœuf haché 15 % (cuit)", category: "proteines", kcal: 230, protein: 24, carbs: 0, fat: 15, units: [{ label: "1 steak (125 g)", grams: 125 }, G100] },
  { id: "oeuf", name: "Œuf entier", category: "proteines", kcal: 143, protein: 12.6, carbs: 0.7, fat: 9.5, units: [{ label: "1 œuf (60 g)", grams: 60 }, { label: "2 œufs", grams: 120 }, { label: "3 œufs", grams: 180 }] },
  { id: "blanc-oeuf", name: "Blanc d'œuf", category: "proteines", kcal: 47, protein: 10.5, carbs: 0.7, fat: 0.2, units: [{ label: "1 blanc (35 g)", grams: 35 }, G100] },
  { id: "thon", name: "Thon au naturel", category: "proteines", kcal: 116, protein: 26, carbs: 0, fat: 1, units: [{ label: "1 boîte (112 g)", grams: 112 }, G100] },
  { id: "saumon", name: "Saumon (cuit)", category: "proteines", kcal: 208, protein: 20, carbs: 0, fat: 13, units: [{ label: "1 pavé (130 g)", grams: 130 }, G100] },
  { id: "cabillaud", name: "Cabillaud / poisson blanc", category: "proteines", kcal: 82, protein: 18, carbs: 0, fat: 0.7, units: [{ label: "1 filet (150 g)", grams: 150 }, G100] },
  { id: "crevettes", name: "Crevettes (cuites)", category: "proteines", kcal: 99, protein: 24, carbs: 0, fat: 0.3, units: [{ label: "1 portion (150 g)", grams: 150 }, G100] },
  { id: "jambon", name: "Jambon blanc", category: "proteines", kcal: 115, protein: 20, carbs: 1, fat: 3.5, units: [{ label: "2 tranches (80 g)", grams: 80 }, G100] },
  { id: "dinde", name: "Escalope de dinde (cuite)", category: "proteines", kcal: 150, protein: 30, carbs: 0, fat: 2.5, units: [{ label: "1 escalope (130 g)", grams: 130 }, G100] },
  { id: "tofu", name: "Tofu ferme", category: "proteines", kcal: 118, protein: 12, carbs: 1.5, fat: 7, units: [{ label: "1/2 bloc (100 g)", grams: 100 }, { label: "1 bloc (200 g)", grams: 200 }] },
  { id: "tempeh", name: "Tempeh", category: "proteines", kcal: 192, protein: 20, carbs: 7.6, fat: 11, units: [{ label: "1/2 bloc (100 g)", grams: 100 }, { label: "1 bloc (200 g)", grams: 200 }] },
  { id: "whey", name: "Whey protéine", category: "proteines", kcal: 400, protein: 78, carbs: 7, fat: 6, units: [{ label: "1 scoop (30 g)", grams: 30 }, { label: "1,5 scoop (45 g)", grams: 45 }] },
  { id: "lentilles", name: "Lentilles (cuites)", category: "proteines", kcal: 116, protein: 9, carbs: 20, fat: 0.4, units: [{ label: "1 portion (200 g)", grams: 200 }, G100] },
  { id: "pois-chiches", name: "Pois chiches (cuits)", category: "proteines", kcal: 164, protein: 9, carbs: 27, fat: 2.6, units: [{ label: "1 portion (150 g)", grams: 150 }, G100] },

  /* ---------- Féculents ---------- */
  { id: "riz", name: "Riz (cuit)", category: "feculents", kcal: 130, protein: 2.7, carbs: 28, fat: 0.3, units: [{ label: "1 portion (180 g)", grams: 180 }, G100, { label: "60 g cru (≈180 g cuit)", grams: 180 }] },
  { id: "pates", name: "Pâtes (cuites)", category: "feculents", kcal: 155, protein: 5.8, carbs: 31, fat: 0.9, units: [{ label: "1 portion (200 g)", grams: 200 }, G100, { label: "80 g crues (≈200 g cuites)", grams: 200 }] },
  { id: "pdt", name: "Pommes de terre (cuites)", category: "feculents", kcal: 87, protein: 1.9, carbs: 20, fat: 0.1, units: [{ label: "1 portion (250 g)", grams: 250 }, G100] },
  { id: "patate-douce", name: "Patate douce (cuite)", category: "feculents", kcal: 86, protein: 1.6, carbs: 20, fat: 0.1, units: [{ label: "1 moyenne (200 g)", grams: 200 }, G100] },
  { id: "avoine", name: "Flocons d'avoine", category: "feculents", kcal: 379, protein: 13, carbs: 67, fat: 6.5, units: [{ label: "1 bol (40 g)", grams: 40 }, { label: "60 g", grams: 60 }, { label: "80 g", grams: 80 }] },
  { id: "pain-complet", name: "Pain complet", category: "feculents", kcal: 250, protein: 9, carbs: 45, fat: 3.5, units: [{ label: "1 tranche (35 g)", grams: 35 }, { label: "2 tranches (70 g)", grams: 70 }] },
  { id: "baguette", name: "Baguette", category: "feculents", kcal: 270, protein: 8.5, carbs: 55, fat: 1.5, units: [{ label: "1/4 de baguette (60 g)", grams: 60 }, { label: "1/2 baguette (120 g)", grams: 120 }] },
  { id: "quinoa", name: "Quinoa (cuit)", category: "feculents", kcal: 120, protein: 4.4, carbs: 21, fat: 1.9, units: [{ label: "1 portion (185 g)", grams: 185 }, G100] },
  { id: "semoule", name: "Semoule (cuite)", category: "feculents", kcal: 112, protein: 3.7, carbs: 23, fat: 0.2, units: [{ label: "1 portion (180 g)", grams: 180 }, G100] },
  { id: "wrap", name: "Tortilla / wrap", category: "feculents", kcal: 310, protein: 8, carbs: 50, fat: 8, units: [{ label: "1 wrap (60 g)", grams: 60 }] },
  { id: "galette-riz", name: "Galette de riz", category: "feculents", kcal: 387, protein: 8, carbs: 81, fat: 3, units: [{ label: "1 galette (8 g)", grams: 8 }, { label: "3 galettes (24 g)", grams: 24 }] },

  /* ---------- Fruits ---------- */
  { id: "banane", name: "Banane", category: "fruits", kcal: 89, protein: 1.1, carbs: 20, fat: 0.3, units: [{ label: "1 banane (120 g)", grams: 120 }, G100] },
  { id: "pomme", name: "Pomme", category: "fruits", kcal: 52, protein: 0.3, carbs: 12, fat: 0.2, units: [{ label: "1 pomme (150 g)", grams: 150 }, G100] },
  { id: "orange", name: "Orange", category: "fruits", kcal: 47, protein: 0.9, carbs: 10, fat: 0.1, units: [{ label: "1 orange (140 g)", grams: 140 }, G100] },
  { id: "fraises", name: "Fraises", category: "fruits", kcal: 32, protein: 0.7, carbs: 6, fat: 0.3, units: [{ label: "1 barquette (250 g)", grams: 250 }, G100] },
  { id: "myrtilles", name: "Myrtilles", category: "fruits", kcal: 57, protein: 0.7, carbs: 12, fat: 0.3, units: [{ label: "1 poignée (80 g)", grams: 80 }, G100] },
  { id: "kiwi", name: "Kiwi", category: "fruits", kcal: 61, protein: 1.1, carbs: 12, fat: 0.5, units: [{ label: "1 kiwi (75 g)", grams: 75 }, { label: "2 kiwis (150 g)", grams: 150 }] },
  { id: "avocat", name: "Avocat", category: "fruits", kcal: 160, protein: 2, carbs: 4, fat: 15, units: [{ label: "1/2 avocat (70 g)", grams: 70 }, { label: "1 avocat (140 g)", grams: 140 }] },

  /* ---------- Légumes ---------- */
  { id: "brocoli", name: "Brocoli", category: "legumes", kcal: 34, protein: 2.8, carbs: 4, fat: 0.4, units: [{ label: "1 portion (200 g)", grams: 200 }, G100] },
  { id: "haricots-verts", name: "Haricots verts", category: "legumes", kcal: 31, protein: 1.8, carbs: 4.7, fat: 0.2, units: [{ label: "1 portion (200 g)", grams: 200 }, G100] },
  { id: "courgette", name: "Courgette", category: "legumes", kcal: 17, protein: 1.2, carbs: 2.3, fat: 0.3, units: [{ label: "1 courgette (200 g)", grams: 200 }, G100] },
  { id: "tomate", name: "Tomate", category: "legumes", kcal: 18, protein: 0.9, carbs: 2.8, fat: 0.2, units: [{ label: "1 tomate (120 g)", grams: 120 }, G100] },
  { id: "carotte", name: "Carotte", category: "legumes", kcal: 41, protein: 0.9, carbs: 8, fat: 0.2, units: [{ label: "1 carotte (80 g)", grams: 80 }, G100] },
  { id: "salade", name: "Salade verte", category: "legumes", kcal: 15, protein: 1.4, carbs: 1.5, fat: 0.2, units: [{ label: "1 bol (50 g)", grams: 50 }, G100] },
  { id: "epinards", name: "Épinards", category: "legumes", kcal: 23, protein: 2.9, carbs: 1.4, fat: 0.4, units: [{ label: "1 portion (150 g)", grams: 150 }, G100] },
  { id: "poivron", name: "Poivron", category: "legumes", kcal: 20, protein: 0.9, carbs: 3.5, fat: 0.2, units: [{ label: "1 poivron (150 g)", grams: 150 }, G100] },
  { id: "champignons", name: "Champignons", category: "legumes", kcal: 22, protein: 3.1, carbs: 2.3, fat: 0.3, units: [{ label: "1 portion (150 g)", grams: 150 }, G100] },
  { id: "concombre", name: "Concombre", category: "legumes", kcal: 12, protein: 0.6, carbs: 2, fat: 0.1, units: [{ label: "1/2 concombre (150 g)", grams: 150 }, G100] },

  /* ---------- Laitages ---------- */
  { id: "skyr", name: "Skyr nature", category: "laitages", kcal: 63, protein: 11, carbs: 4, fat: 0.2, units: [{ label: "1 pot (150 g)", grams: 150 }, { label: "250 g", grams: 250 }] },
  { id: "fromage-blanc", name: "Fromage blanc 0 %", category: "laitages", kcal: 45, protein: 8, carbs: 4, fat: 0.2, units: [{ label: "1 pot (100 g)", grams: 100 }, { label: "250 g", grams: 250 }] },
  { id: "cottage", name: "Cottage cheese", category: "laitages", kcal: 98, protein: 11, carbs: 3.4, fat: 4.3, units: [{ label: "1 portion (200 g)", grams: 200 }, G100] },
  { id: "yaourt", name: "Yaourt nature", category: "laitages", kcal: 60, protein: 4, carbs: 5, fat: 3, units: [{ label: "1 pot (125 g)", grams: 125 }] },
  { id: "lait", name: "Lait demi-écrémé", category: "laitages", kcal: 46, protein: 3.3, carbs: 4.8, fat: 1.5, units: [{ label: "1 verre (250 ml)", grams: 250 }, { label: "1 bol (300 ml)", grams: 300 }] },
  { id: "lait-amande", name: "Lait d'amande", category: "laitages", kcal: 24, protein: 0.5, carbs: 3, fat: 1.1, units: [{ label: "1 verre (250 ml)", grams: 250 }] },
  { id: "mozzarella", name: "Mozzarella", category: "laitages", kcal: 280, protein: 18, carbs: 2.2, fat: 22, units: [{ label: "1/2 boule (62 g)", grams: 62 }, { label: "1 boule (125 g)", grams: 125 }] },
  { id: "emmental", name: "Emmental râpé", category: "laitages", kcal: 380, protein: 27, carbs: 0.5, fat: 30, units: [{ label: "1 poignée (30 g)", grams: 30 }] },
  { id: "feta", name: "Feta", category: "laitages", kcal: 264, protein: 14, carbs: 4, fat: 21, units: [{ label: "1/4 de bloc (50 g)", grams: 50 }, G100] },

  /* ---------- Matières grasses & oléagineux ---------- */
  { id: "huile-olive", name: "Huile d'olive", category: "graisses", kcal: 900, protein: 0, carbs: 0, fat: 100, units: [{ label: "1 c. à soupe (10 g)", grams: 10 }, { label: "1 c. à café (5 g)", grams: 5 }] },
  { id: "beurre", name: "Beurre", category: "graisses", kcal: 745, protein: 0.7, carbs: 0.6, fat: 82, units: [{ label: "1 noisette (10 g)", grams: 10 }, { label: "20 g", grams: 20 }] },
  { id: "beurre-cacahuete", name: "Beurre de cacahuète", category: "graisses", kcal: 590, protein: 25, carbs: 12, fat: 50, units: [{ label: "1 c. à soupe (15 g)", grams: 15 }, { label: "30 g", grams: 30 }] },
  { id: "amandes", name: "Amandes", category: "graisses", kcal: 610, protein: 21, carbs: 9, fat: 53, units: [{ label: "1 poignée (30 g)", grams: 30 }, { label: "15 g", grams: 15 }] },
  { id: "noix", name: "Noix", category: "graisses", kcal: 654, protein: 15, carbs: 7, fat: 65, units: [{ label: "1 poignée (30 g)", grams: 30 }] },
  { id: "chocolat-noir", name: "Chocolat noir 70 %", category: "graisses", kcal: 550, protein: 8, carbs: 34, fat: 42, units: [{ label: "2 carrés (20 g)", grams: 20 }, { label: "4 carrés (40 g)", grams: 40 }] },

  /* ---------- Divers ---------- */
  { id: "miel", name: "Miel", category: "divers", kcal: 320, protein: 0.3, carbs: 80, fat: 0, units: [{ label: "1 c. à café (7 g)", grams: 7 }, { label: "1 c. à soupe (20 g)", grams: 20 }] },
  { id: "confiture", name: "Confiture", category: "divers", kcal: 250, protein: 0.4, carbs: 60, fat: 0.1, units: [{ label: "1 c. à café (15 g)", grams: 15 }] },
  { id: "compote", name: "Compote sans sucre ajouté", category: "divers", kcal: 60, protein: 0.3, carbs: 14, fat: 0.2, units: [{ label: "1 gourde (90 g)", grams: 90 }] },
  { id: "barre-proteinee", name: "Barre protéinée", category: "divers", kcal: 380, protein: 33, carbs: 38, fat: 11, units: [{ label: "1 barre (45 g)", grams: 45 }] },
  { id: "jus-orange", name: "Jus d'orange", category: "divers", kcal: 45, protein: 0.7, carbs: 10, fat: 0.2, units: [{ label: "1 verre (200 ml)", grams: 200 }] },
  { id: "cacao", name: "Cacao non sucré", category: "divers", kcal: 340, protein: 20, carbs: 12, fat: 21, units: [{ label: "1 c. à soupe (10 g)", grams: 10 }] },
];

/* Recherche insensible aux accents et à la casse */
export function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

export function searchFoods(query: string, limit = 6): Food[] {
  const q = normalize(query.trim());
  if (q.length < 2) return [];
  const starts: Food[] = [];
  const contains: Food[] = [];
  for (const f of foods) {
    const n = normalize(f.name);
    if (n.startsWith(q)) starts.push(f);
    else if (n.includes(q)) contains.push(f);
  }
  return [...starts, ...contains].slice(0, limit);
}

/* Macros d'une portion donnée */
export function portionMacros(food: Food, grams: number) {
  const k = grams / 100;
  return {
    kcal: Math.round(food.kcal * k),
    protein: Math.round(food.protein * k * 10) / 10,
    carbs: Math.round(food.carbs * k * 10) / 10,
    fat: Math.round(food.fat * k * 10) / 10,
  };
}
