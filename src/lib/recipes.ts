export type MealCategory =
  | "petit-dejeuner"
  | "dejeuner"
  | "diner"
  | "collation";

export type RecipeTag =
  | "proteine"
  | "vegetarien"
  | "faible-calories"
  | "masse"
  | "seche";

export interface Recipe {
  id: string;
  title: string;
  category: MealCategory;
  tags: RecipeTag[];
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  time: number; // minutes
  image: string;
  ingredients: string[];
  steps: string[];
}

export const categoryLabels: Record<MealCategory, string> = {
  "petit-dejeuner": "Petit-déjeuner",
  dejeuner: "Déjeuner",
  diner: "Dîner",
  collation: "Collation",
};

export const tagLabels: Record<RecipeTag, string> = {
  proteine: "Riche en protéines",
  vegetarien: "Végétarien",
  "faible-calories": "Faible en calories",
  masse: "Prise de masse",
  seche: "Sèche",
};

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=75`;

/* Sélection de démonstration — la base s'enrichit à chaque mise à jour. */
export const recipes: Recipe[] = [
  {
    id: "bowl-proteine-avoine",
    title: "Porridge protéiné banane & beurre de cacahuète",
    category: "petit-dejeuner",
    tags: ["proteine", "vegetarien", "masse"],
    kcal: 540,
    protein: 38,
    carbs: 62,
    fat: 16,
    time: 10,
    image: img("photo-1484723091739-30a097e8f929"),
    ingredients: [
      "80 g de flocons d'avoine",
      "1 scoop (30 g) de whey vanille",
      "250 ml de lait demi-écrémé",
      "1 banane",
      "15 g de beurre de cacahuète",
      "1 pincée de cannelle",
    ],
    steps: [
      "Faites chauffer les flocons d'avoine avec le lait 3 à 4 minutes à feu doux.",
      "Hors du feu, incorporez la whey en mélangeant énergiquement.",
      "Ajoutez la banane en rondelles, le beurre de cacahuète et la cannelle.",
    ],
  },
  {
    id: "skyr-granola",
    title: "Bol de skyr, granola maison & fruits rouges",
    category: "petit-dejeuner",
    tags: ["proteine", "vegetarien", "faible-calories", "seche"],
    kcal: 320,
    protein: 28,
    carbs: 38,
    fat: 7,
    time: 5,
    image: img("photo-1488477181946-6428a0291777"),
    ingredients: [
      "250 g de skyr nature",
      "30 g de granola",
      "100 g de fruits rouges",
      "1 c. à café de miel",
    ],
    steps: [
      "Versez le skyr dans un bol.",
      "Ajoutez le granola, les fruits rouges et le filet de miel.",
    ],
  },
  {
    id: "poulet-riz-brocoli",
    title: "Poulet grillé, riz basmati & brocoli vapeur",
    category: "dejeuner",
    tags: ["proteine", "masse"],
    kcal: 620,
    protein: 52,
    carbs: 68,
    fat: 12,
    time: 25,
    image: img("photo-1432139555190-58524dae6a55"),
    ingredients: [
      "180 g de filet de poulet",
      "90 g de riz basmati (cru)",
      "200 g de brocoli",
      "Paprika fumé, ail, huile d'olive",
    ],
    steps: [
      "Cuisez le riz selon les indications du paquet.",
      "Grillez le poulet mariné au paprika et à l'ail 5 à 6 minutes par face.",
      "Cuisez le brocoli 6 minutes à la vapeur et dressez avec un filet d'huile d'olive.",
    ],
  },
  {
    id: "buddha-bowl",
    title: "Buddha bowl quinoa, pois chiches & avocat",
    category: "dejeuner",
    tags: ["vegetarien", "proteine"],
    kcal: 560,
    protein: 24,
    carbs: 62,
    fat: 24,
    time: 20,
    image: img("photo-1512621776951-a57141f2eefd"),
    ingredients: [
      "80 g de quinoa (cru)",
      "120 g de pois chiches cuits",
      "1/2 avocat",
      "1 carotte râpée",
      "80 g de chou rouge émincé",
      "Sauce tahini-citron",
    ],
    steps: [
      "Cuisez le quinoa 12 minutes puis laissez-le refroidir.",
      "Rôtissez les pois chiches au paprika 10 minutes à la poêle.",
      "Assemblez le bowl et nappez de sauce tahini-citron.",
    ],
  },
  {
    id: "curry-lentilles",
    title: "Curry de lentilles corail au lait de coco",
    category: "diner",
    tags: ["vegetarien", "proteine"],
    kcal: 520,
    protein: 24,
    carbs: 66,
    fat: 18,
    time: 25,
    image: img("photo-1455619452474-d2be8b1e70cd"),
    ingredients: [
      "120 g de lentilles corail",
      "150 ml de lait de coco léger",
      "200 g de tomates concassées",
      "1 oignon, curry, curcuma",
      "Coriandre fraîche",
    ],
    steps: [
      "Faites revenir l'oignon avec les épices 2 minutes.",
      "Ajoutez lentilles, tomates et 250 ml d'eau, cuisez 15 minutes.",
      "Incorporez le lait de coco, laissez épaissir et parsemez de coriandre.",
    ],
  },
  {
    id: "brochettes-poulet",
    title: "Brochettes de poulet marinées & quinoa citronné",
    category: "diner",
    tags: ["proteine", "seche"],
    kcal: 470,
    protein: 45,
    carbs: 44,
    fat: 12,
    time: 25,
    image: img("photo-1555939594-58d7cb561ad1"),
    ingredients: [
      "160 g de filet de poulet en cubes",
      "70 g de quinoa (cru)",
      "1 poivron, 1/2 oignon rouge",
      "Yaourt, citron, paprika, origan",
    ],
    steps: [
      "Faites mariner le poulet 15 minutes dans le yaourt citronné épicé.",
      "Montez les brochettes en alternant poulet et légumes.",
      "Grillez 12 minutes en tournant et servez sur le quinoa.",
    ],
  },
  {
    id: "shake-post-training",
    title: "Shake post-training banane & flocons",
    category: "collation",
    tags: ["proteine", "vegetarien", "masse"],
    kcal: 390,
    protein: 32,
    carbs: 52,
    fat: 6,
    time: 5,
    image: img("photo-1553530666-ba11a7da3888"),
    ingredients: [
      "1 scoop de whey chocolat",
      "1 banane",
      "40 g de flocons d'avoine",
      "300 ml de lait d'amande",
      "Glaçons",
    ],
    steps: [
      "Placez tous les ingrédients dans un blender.",
      "Mixez 30 secondes et consommez dans l'heure qui suit la séance.",
    ],
  },
  {
    id: "bowl-cottage",
    title: "Bowl de cottage cheese, concombre & noix",
    category: "collation",
    tags: ["proteine", "vegetarien", "faible-calories", "seche"],
    kcal: 240,
    protein: 24,
    carbs: 10,
    fat: 12,
    time: 5,
    image: img("photo-1490645935967-10de6ba17061"),
    ingredients: [
      "200 g de cottage cheese",
      "1/4 de concombre",
      "15 g de noix",
      "Ciboulette, poivre",
    ],
    steps: [
      "Versez le cottage cheese dans un bol.",
      "Ajoutez le concombre en dés, les noix concassées et la ciboulette.",
    ],
  },
];
